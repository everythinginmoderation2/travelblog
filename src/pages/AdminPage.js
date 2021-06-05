import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuAdmin from "../components/MenuAdmin";
import { Row, Col, Button, Form } from "react-bootstrap";
import { getCurrentUser } from "../redux/actions/auth.actions";
import { updateProfile } from "../redux/actions/auth.actions";
import LoadingSpinner from "../components/LoadingSpinner";

const AdminPage = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);
  const handleSubmit = () => {
    dispatch(updateProfile(name));
    setShow(false);
  };
  return (
    <>
      <Row>
        <Col md={2}>
          <MenuAdmin />
        </Col>
        <Col md={8}>
          <Row className='d-flex justify-content-between mt-2'>
            <h2>Profile Page</h2>
            <Button variant='primary' onClick={() => setShow(true)}>
              Edit
            </Button>
          </Row>
          {loading ? (
            <LoadingSpinner />
          ) : (
            user && (
              <Row className='mt-5 justify-content-center'>
                <Col md={8}>
                  <Form>
                    <Form.Group as={Row} controlId='formName'>
                      <Form.Label column sm='2'>
                        Name
                      </Form.Label>
                      <Col sm='10'>
                        <Form.Control
                          type='text'
                          defaultValue={user.name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId='formEmail'>
                      <Form.Label column sm='2'>
                        Email
                      </Form.Label>
                      <Col sm='10'>
                        <Form.Control
                          type='email'
                          value={user.email}
                          readOnly
                        />
                      </Col>
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
            )
          )}

          {show && (
            <div className='text-center'>
              <Button variant='primary' onClick={handleSubmit} className='mr-2'>
                Submit
              </Button>
              <Button variant='light' onClick={() => setShow(false)}>
                Cancel
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </>
  );
};

export default AdminPage;
