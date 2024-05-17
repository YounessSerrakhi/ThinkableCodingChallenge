import React from 'react';

type PageHeaderProps = {
  title: string;
  subheading: string;
  backgroundImage: string;
};

const PageHeader: React.FC<PageHeaderProps> = ({ title, subheading, backgroundImage }) => (
  <header className="masthead" style={{ backgroundImage: `url('${backgroundImage}')` }}>
    <div className="container position-relative px-4 px-lg-5">
      <div className="row gx-4 gx-lg-5 ">
        <div className="col-md-10 col-lg-8 col-xl-7">
          <div className="post-heading">
            <h1>{title}</h1>
            <h2 className="subheading">{subheading}</h2>
          </div>
        </div>
      </div>
    </div>
   </header> 
   );

export default PageHeader;