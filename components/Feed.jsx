"use client"
import { useState, useEffect } from 'react'
import PromptCard from '@components/PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {

  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState();
  const [searchTimeout, setSearchTimeout] = useState(null);

  const filterPosts = (searchtext) => {
    const regex = new RegExp(searchtext);
    const searchResult = posts.filter((post) => regex.test(post.creator.username) || regex.test(post.prompt) || regex.test(post.tag));

    setSearchResults(searchResult);
  }

  const handleSearchChange = (e) => {

    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    
    setSearchTimeout(
      setTimeout(() => {
        filterPosts(e.target.value);
      }, 500)
    )
  }

  const handleTagClick = (tag) => {
    setSearchText(tag)
    filterPosts(tag);
  }

  useEffect (() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/prompt`);
      const data = await response.json();

      setPosts(data);
    }

    fetchPosts();
  }, [])

  return (
    <section className='feed'>
      <form
        className='relative w-full flex-center'
      >
        <input type="text" 
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      <PromptCardList 
        data={searchResults ? searchResults : posts}
        handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed