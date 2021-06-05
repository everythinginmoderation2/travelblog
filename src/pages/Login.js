import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/auth.actions';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();
  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const history = useHistory();
  useEffect(() => {
    if (isAuthenticated) history.push('/');
  }, [isAuthenticated, history]);

  return (
    <div
      className='LoginPage d-flex justify-content-center align-items-center text-center'
      style={{ minHeight: '90vh' }}
    >
      <div
        className='border border-primary px-3 py-5 d-flex flex-column justify-content-center align-items-center'
        style={{ width: '400px', borderRadius: '1rem' }}
      >
        <h1 className='text-primary'>Sign In</h1>
        <Form
          style={{ width: '100%', maxWidth: '330px' }}
          onSubmit={handleFormSubmit}
        >
          <Form.Group controlId='formBasicEmail'>
            <Form.Control
              type='email'
              placeholder='Email Address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='formBasicPassword'>
            <Form.Control
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant='primary' type='submit' block>
            Sign in
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
