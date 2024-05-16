import React from 'react';

type PostProps = {
  title: string;
  subheading: string;
  DateTime: string;
  content: string;
};

const Post: React.FC<PostProps> = ({ title, subheading, DateTime, content }) => (
  <article className="mb-4">
    <div className="container px-4 px-lg-5">
      <div className="row gx-4 gx-lg-5 justify-content-center">
        <div className="col-md-10 col-lg-8 col-xl-7">
          <div className="post-heading">
            <h1>{title}</h1>
            <h2 className="subheading">{subheading}</h2>
            <span className="meta">
              on {DateTime}
            </span>
          </div>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </div>
  </article>
);

export default Post;
