import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/actions/auth.actions";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const success = useSelector((state) => state.auth.success);

  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Password & confirmedPass must match");
    } else {
      setError("");
      dispatch(register(name, email, password));
    }
  };

  return (
    <div
      className='RegisterPage d-flex justify-content-center align-items-center text-center'
      style={{ minHeight: "90vh" }}
    >
      <div
        className='border border-primary px-3 py-5 d-flex flex-column justify-content-center align-items-center'
        style={{ width: "400px", borderRadius: "1rem" }}
      >
        <h1 className='text-primary'>Register</h1>
        {error && <Alert variant='danger'>{error}</Alert>}
        {success && (
          <Alert variant='success'>
            Welcome, {name} .
            <Alert.Link href='/login'>Click here to login</Alert.Link>
          </Alert>
        )}
        <Form
          style={{ width: "100%", maxWidth: "330px" }}
          onSubmit={handleSubmit}
        >
          <Form.Group controlId='formBasicName'>
            <Form.Control
              type='text'
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

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

          <Form.Group controlId='formConfirmPassword'>
            <Form.Control
              type='password'
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant='primary' type='submit' block>
            Register
          </Button>
        </Form>
        <div>
          Already have an account? <Link to='/login'>Log In</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
