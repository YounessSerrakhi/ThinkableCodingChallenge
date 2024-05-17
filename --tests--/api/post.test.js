const handler = require('../../pages/api/post');

describe('/api/post', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should fetch all posts', async () => {
    const req = {
      method: 'GET',
    };

    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    const mockPosts = [
      {
        id: '1',
        title: 'Post 1',
        subheading: 'Subheading 1',
        content: 'Content 1',
        createdAt: '2023-05-17T00:00:00.000Z',
      },
      {
        id: '2',
        title: 'Post 2',
        subheading: 'Subheading 2',
        content: 'Content 2',
        createdAt: '2023-05-18T00:00:00.000Z',
      },
    ];

    const mockFindMany = jest.fn().mockResolvedValueOnce(mockPosts);
    const originalFindMany = global.prisma.post.findMany;
    global.prisma.post.findMany = mockFindMany;

    await handler(req, res);

    expect(mockFindMany).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockPosts);

    global.prisma.post.findMany = originalFindMany;
  });

  test('should create a new post', async () => {
    const req = {
      method: 'POST',
      body: {
        title: 'New Post',
        subheading: 'New Subheading',
        content: 'New Content',
      },
    };

    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    const mockCreate = jest.fn().mockResolvedValueOnce({
      id: '1',
      title: 'New Post',
      subheading: 'New Subheading',
      content: 'New Content',
      createdAt: new Date(),
    });

    const originalCreate = global.prisma.post.create;
    global.prisma.post.create = mockCreate;

    await handler(req, res);

    expect(mockCreate).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      id: '1',
      title: 'New Post',
      subheading: 'New Subheading',
      content: 'New Content',
      createdAt: expect.any(String),
    });

    global.prisma.post.create = originalCreate;
  });

  test('should update a post', async () => {
    const req = {
      method: 'PUT',
      body: {
        id: '1',
        title: 'Updated Post',
        subheading: 'Updated Subheading',
        content: 'Updated Content',
        createdAt: '2023-05-17T00:00:00.000Z',
      },
    };

    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    const mockUpdate = jest.fn().mockResolvedValueOnce({
      id: '1',
      title: 'Updated Post',
      subheading: 'Updated Subheading',
      content: 'Updated Content',
      createdAt: new Date('2023-05-17T00:00:00.000Z'),
    });

    const originalUpdate = global.prisma.post.update;
    global.prisma.post.update = mockUpdate;

    await handler(req, res);

    expect(mockUpdate).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      id: '1',
      title: 'Updated Post',
      subheading: 'Updated Subheading',
      content: 'Updated Content',
      createdAt: expect.any(String),
    });

    global.prisma.post.update = originalUpdate;
  });

  test('should delete a post', async () => {
    const req = {
      method: 'DELETE',
      body: {
        id: '1',
      },
    };

    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
      end: jest.fn(),
    };

    const mockDelete = jest.fn().mockResolvedValueOnce({
      id: '1',
      title: 'Post 1',
      subheading: 'Subheading 1',
      content: 'Content 1',
      createdAt: new Date('2023-05-17T00:00:00.000Z'),
    });

    const originalDelete = global.prisma.post.delete;
    global.prisma.post.delete = mockDelete;

    await handler(req, res);

    expect(mockDelete).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      id: '1',
      title: 'Post 1',
      subheading: 'Subheading 1',
      content: 'Content 1',
      createdAt: expect.any(String),
    });

    global.prisma.post.delete = originalDelete;
  });
});