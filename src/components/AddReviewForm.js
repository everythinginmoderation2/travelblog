import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button, Image } from 'react-bootstrap';

import blogActions from '../redux/actions/blog.actions';

const AddReviewForm = ({ blogId }) => {
  const [review, setReview] = useState('');

  const dispatch = useDispatch();

  const handleReviewSubmit = (e, submittedReview, blogId) => {
    e.preventDefault();
    setReview('');
    dispatch(blogActions.submitReview(submittedReview, blogId));
  };

  const currentUserAvatarSrc = localStorage.getItem('userAvatarSrc');

  return (
    <Form
      onSubmit={(e) => {
        handleReviewSubmit(e, review, blogId);
      }}
      className="mt-3"
    >
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <Image
            src={currentUserAvatarSrc}
            alt=""
            width="50px"
            height="50px"
            roundedCircle
          />
        </div>
        <div className="flex-grow-1 mx-3">
          <Form.Label htmlFor="inlineFormInputReview" srOnly>
            Review
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Write a comment ..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </div>
        <div>
          <Button type="submit">Post</Button>
        </div>
      </div>
    </Form>
  );
};

export default AddReviewForm;
