import React from 'react';
import Link from 'next/link';

type Post = {
  id: string;
  title: string;
  subheading: string;
  DateTime: string;
};

type PostListProps = {
  posts: Post[];
};

const PostList: React.FC<PostListProps> = ({ posts }) => (
  <div className="container px-4 px-lg-5">
    <div className="row gx-4 gx-lg-5 justify-content-center">
      <div className="col-md-10 col-lg-8 col-xl-7">
        {posts.map((post) => (
          <div key={post.id} className="post-preview">
            <Link href={`/posts/${post.id}`} legacyBehavior>
              <a>
                <h2 className="post-title">{post.title}</h2>
                <h3 className="post-subtitle">{post.subheading}</h3>
              </a>
            </Link>
            <p className="post-meta">
              on {post.DateTime}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default PostList;