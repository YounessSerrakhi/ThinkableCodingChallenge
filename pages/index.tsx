import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';
import PostList from '../components/PostList';

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState([]);
  const fetchPosts = async () => {
    try {
      const response = await axios.get('/api/post'); 
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  // Fetch posts when the component mounts
  useEffect(() => {
    fetchPosts();
  }, []); // Empty dependency array ensures fetchPosts() is only called once on mount

  return (
    <Layout>
      <PageHeader
        title="Serrakhi Blog"
        subheading="A Hiking & Trekimg Blog presented by SERRAKHI Youness"
        backgroundImage="/images/home-bg.jpg"
      />
      <PostList posts={posts} />
    </Layout>
  );
};

export default HomePage;
