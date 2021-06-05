import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import "../App.css";

const JumbotronBlog = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Jumbotron className='text-center jumbotron-bg'>
      <h1>Social Blog</h1>
      <p>Write about your amazing experiences.</p>
      {isAuthenticated && (
        <Link to='/blog/add'>
          <Button variant='primary'>Write now</Button>
        </Link>
      )}
    </Jumbotron>
  );
};

export default JumbotronBlog;
