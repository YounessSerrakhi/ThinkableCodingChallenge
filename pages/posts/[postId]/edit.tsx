import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { PrismaClient, Post } from '@prisma/client';

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
    <div>
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <input
          type="text"
          name="subheading"
          value={formData.subheading}
          onChange={handleChange}
          placeholder="Subheading"
        />
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Content"
        />
        <button type="submit">Update Post</button>
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
