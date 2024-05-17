import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import axios from 'axios';

const CreatePostPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    subheading: '',
    content: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/post', formData);
      router.push(`/posts/${response.data.id}`);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <Layout>
      <div>
        <h1>Create New Post</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required />
          </div>
          <div>
            <label>Subheading</label>
            <input type="text" name="subheading" value={formData.subheading} onChange={handleChange} required />
          </div>
          <div>
            <label>Content</label>
            <textarea name="content" value={formData.content} onChange={handleChange} required />
          </div>
          <button type="submit">Create Post</button>
        </form>
      </div>
    </Layout>
  );
};

export default CreatePostPage;
