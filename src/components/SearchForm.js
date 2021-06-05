import React from "react";
import { Button, Col, Form } from "react-bootstrap";

const SearchForm = ({ searchInput, handleSearchChange, handleSubmit }) => {
  return (
    <Form onSubmit={handleSubmit} className="my-3">
      <Form.Row>
        <Col>
          <Form.Control
            placeholder="Search..."
            value={searchInput}
            onChange={handleSearchChange}
          />
        </Col>
        <Button type="submit">Search</Button>
      </Form.Row>
    </Form>
  );
};

export default SearchForm;
