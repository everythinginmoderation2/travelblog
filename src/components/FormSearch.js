import React from "react";
import { Col, Button, Form } from "react-bootstrap";
const FormSearch = ({ searchInput, handleSearchChange, handleSubmit }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Row className='align-items-center'>
        <Col sm={3}>
          <Form.Control
            id='inlineFormInputName'
            placeholder='Search....'
            value={searchInput}
            onChange={handleSearchChange}
          />
        </Col>
        <Col xs='auto' className='my-1'>
          <Button type='submit'>Submit</Button>
        </Col>
      </Form.Row>
    </Form>
  );
};

export default FormSearch;
