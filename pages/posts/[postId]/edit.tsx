import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { PrismaClient, Post } from '@prisma/client';
import Button from '@/components/Button';
import TextEditor from '@/components/TextEditor';

const prisma = new PrismaClient();

interface EditPostProps {
  post: Post & { createdAt: string };
}

const EditPost: React.FC<EditPostProps> = ({ post }) => {
  const router = useRouter();
  const { postId } = router.query;
  const [formData, setFormData] = useState({
    title: post.title,
    subheading: post.subheading,
    content: post.content,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleContentChange = (content: string) => {
    setFormData({ ...formData, content });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`/api/post`, {
        id: postId,
        ...formData,
        createdAt: post.createdAt,
      });
      router.push(`/posts/${postId}`);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
  <h1>Edit Post</h1>
  <form onSubmit={handleSubmit} style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
    <input
      type="text"
      name="title"
      value={formData.title}
      onChange={handleChange}
      placeholder="Title"
      style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '4px', border: '1px solid #ccc' }}
    />
    <input
      type="text"
      name="subheading"
      value={formData.subheading}
      onChange={handleChange}
      placeholder="Subheading"
      style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '4px', border: '1px solid #ccc' }}
    />
    <TextEditor
                value={formData.content}
                onChange={handleContentChange}
    />
    <Button type="submit">Update Post</Button>
  </form>
</div>

  );
};

export default EditPost;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const postId = context.params?.postId;

  if (!postId) {
    return { notFound: true };
  }

  const post = await prisma.post.findUnique({
    where: { id: postId as string },
  });

  if (!post) {
    return { notFound: true };
  }

  // Convert createdAt to a string, problem serialisation
  const serializedPost = {
    ...post,
    createdAt: post.createdAt.toISOString(),
  };

  return {
    props: { post: serializedPost },
  };
};
