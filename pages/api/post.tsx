import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body, query } = req;

  switch (method) {
    case 'GET':
      try {
        const posts = await prisma.post.findMany({});
        return res.status(200).json(posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
        return res.status(500).json({ error: 'An error occurred while fetching posts' });
      }

    case 'POST':
      try {
        const { title, subheading, content } = body;
        const post = await prisma.post.create({
          data: { title, subheading, content, createdAt: new Date() },
        });
        return res.status(201).json(post);
      } catch (error) {
        console.error('Error creating post:', error);
        return res.status(500).json({ error: 'An error occurred while creating the post' });
      }

    case 'PUT':
      try {
        const { id, title, subheading, content } = body;
        if (!id) {
          return res.status(400).json({ error: 'Post ID is required' });
        }
        const updatedPost = await prisma.post.update({
          where: { id },
          data: { title, subheading, content },
        });
        return res.status(200).json(updatedPost);
      } catch (error) {
        console.error('Error updating post:', error);
        return res.status(500).json({ error: 'An error occurred while updating the post' });
      }

    case 'DELETE':
      try {
        const { id } = body;
        if (!id) {
          return res.status(400).json({ error: 'Post ID is required' });
        }
        const deletedPost = await prisma.post.delete({
          where: { id },
        });
        return res.status(200).json(deletedPost);
      } catch (error) {
        console.error('Error deleting post:', error);
        return res.status(500).json({ error: 'An error occurred while deleting the post' });
      }

    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}

export default handler;
