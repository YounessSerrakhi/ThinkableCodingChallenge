import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { PrismaClient, Post } from '@prisma/client';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import PageHeader from '../../../components/PageHeader';
import PostComponent from '../../../components/Post';
import axios from 'axios';
import Button from '@/components/Button';

const prisma = new PrismaClient();

interface PostDetailsProps {
  post: Post & { createdAt: string };
}

const PostDetails = ({ post }: PostDetailsProps) => {
  const router = useRouter();
  const { postId } = router.query;

  const handleUpdate = () => {
    router.push(`/posts/${postId}/edit`);
  };

  const deletePost = async (id: string) => {
    try {
      const response = await axios.delete(`/api/post`, {
        data: { id },
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  };
  
  const handleDelete = async () => {
    try {
      await deletePost(post.id);
      router.push('/');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  if (!post) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );
  }

  return (
    <Layout>
    <>
      <PageHeader
        title={post.title}
        subheading={post.subheading}
        backgroundImage="null"
      />
      <PostComponent
        title={post.title}
        subheading={post.subheading}
        DateTime={post.createdAt}
        content={post.content}
      />
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
        <Button onClick={handleUpdate}>Edit</Button>
        <Button onClick={handleDelete}>Delete</Button>
      </div>
    </>
  </Layout>
  );
};

export default PostDetails;

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const postId = context.params?.postId;

  if (!postId) {
    return { notFound: true };
  }

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId as string },
    });

    if (!post) {
      return { notFound: true };
    }

    const serializedPost = {
      ...post,
      createdAt: post.createdAt.toISOString(),
    };

    return {
      props: { post: serializedPost },
    };
  } catch (error) {
    console.error('Error fetching post:', error);
    return { notFound: true };
  }
};
