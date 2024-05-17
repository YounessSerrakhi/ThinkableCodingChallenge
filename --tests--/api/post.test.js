import { PrismaClient } from '@prisma/client';
import handler from '../../pages/api/post';

jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    post: {
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mockPrismaClient) };
});

const prisma = new PrismaClient();

describe('/api/post', () => {
  let req, res;

  beforeEach(() => {
    req = {
      method: '',
      body: {},
      query: {},
    };
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should fetch all posts', async () => {
    req.method = 'GET';
    const mockPosts = [
      { id: '1', title: 'Post 1', subheading: 'Subheading 1', content: 'Content 1', createdAt: new Date() },
      { id: '2', title: 'Post 2', subheading: 'Subheading 2', content: 'Content 2', createdAt: new Date() },
    ];

    prisma.post.findMany.mockResolvedValue(mockPosts);

    await handler(req, res);

    expect(prisma.post.findMany).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockPosts);
  });

  test('should create a new post', async () => {
    req.method = 'POST';
    req.body = { title: 'New Post', subheading: 'New Subheading', content: 'New Content' };
    const mockPost = {
      id: '1',
      title: 'New Post',
      subheading: 'New Subheading',
      content: 'New Content',
      createdAt: new Date(),
    };

    prisma.post.create.mockResolvedValue(mockPost);

    await handler(req, res);

    expect(prisma.post.create).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockPost);
  });

  test('should update a post', async () => {
    req.method = 'PUT';
    req.body = { id: '1', title: 'Updated Post', subheading: 'Updated Subheading', content: 'Updated Content' };
    const mockUpdatedPost = {
      id: '1',
      title: 'Updated Post',
      subheading: 'Updated Subheading',
      content: 'Updated Content',
      createdAt: new Date(),
    };

    prisma.post.update.mockResolvedValue(mockUpdatedPost);

    await handler(req, res);

    expect(prisma.post.update).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUpdatedPost);
  });

  test('should delete a post', async () => {
    req.method = 'DELETE';
    req.body = { id: '1' };
    const mockDeletedPost = {
      id: '1',
      title: 'Post 1',
      subheading: 'Subheading 1',
      content: 'Content 1',
      createdAt: new Date(),
    };

    prisma.post.delete.mockResolvedValue(mockDeletedPost);

    await handler(req, res);

    expect(prisma.post.delete).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockDeletedPost);
  });
});
