import React, { useState } from 'react';
import Link from 'next/link';
import Button from './Button';
import SearchBar from './SearchBar';

type Post = {
  id: string;
  title: string;
  subheading: string;
  createdAt: string;
};

type PostListProps = {
  posts: Post[];
};

const PostList: React.FC<PostListProps> = ({ posts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const postsPerPage = 6;

  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const filteredPosts = searchQuery
    ? posts.filter((post) =>
        Object.values(post).some((value) =>
          value.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : posts;

  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <div className="container px-4 px-lg-5">
      <div className="row gx-4 gx-lg-5 justify-content-center">
        <div className="col-md-10 col-lg-8 col-xl-7">
          <SearchBar value={searchQuery} onChange={handleSearch} />
          {currentPosts.map((post) => (
            <div key={post.id} className="post-preview">
              <Link href={`/posts/${post.id}`} legacyBehavior>
                <a>
                  <h2 className="post-title">{post.title}</h2>
                  <h3 className="post-subtitle">{post.subheading}</h3>
                </a>
              </Link>
              <p className="post-meta">
                on {new Date(post.createdAt).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          ))}
          <div
            className="pagination"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '20px',
            }}
          >
            <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous
            </Button>
            <span style={{ fontSize: '16px' }}>
              Page {currentPage} of {totalPages}
            </span>
            <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostList;
