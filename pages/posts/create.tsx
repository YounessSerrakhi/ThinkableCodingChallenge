import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import axios from 'axios';
import Button from '@/components/Button';

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
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h1>Create New Post</h1>
          <form onSubmit={handleSubmit} style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Subheading</label>
              <input type="text" name="subheading" value={formData.subheading} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Content</label>
              <textarea name="content" value={formData.content} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
            </div>
            <Button type="submit">Create Post</Button>
          </form>
        </div>

    </Layout>
  );
};

export default CreatePostPage;
