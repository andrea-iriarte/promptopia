"use client"
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Profile from '@components/Profile'

const MyProfile = ({ params }) => {

  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const [creator, setCreator] = useState({});
  const router = useRouter();

  useEffect (() => {

    const fetchUser = async () => {
        const response = await fetch(`/api/users/${params.id}`);
        const data = await response.json();

       setCreator(data[0]);
    }

    fetchUser();

    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`);
      const data = await response.json();

      if(creator) {
        setPosts(data);
        
      }
      
    }

    fetchPosts();
  }, [])

  return (
    <Profile 
        name={creator.username}
        desc={`Welcome to ${creator.username}'s personalized profile page. Explore ${creator.username}'s exceptional prompts and be inspired by the power of their imagination`}
        data={posts}
    />
  )
}

export default MyProfile