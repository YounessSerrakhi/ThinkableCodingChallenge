import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const postId = req.query.postId as string;
      console.log(postId);
      if (!postId) {
        return res.status(400).json({ error: 'Post ID is required' });
      }

      const post = await prisma.post.findUnique({
        where: { id: postId },
      });

      if (post) {
        res.setHeader('Location', `/posts/${postId}`);
        res.status(307).end(); // Use HTTP status code 307 for temporary redirect
      } else {
        return res.status(404).json({ error: 'Post not found' });
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      return res.status(500).json({ error: 'An error occurred while fetching the post' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
