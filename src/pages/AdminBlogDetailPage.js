import React from "react";
import { Row, Col } from "react-bootstrap";
import BlogDetailPage from "./BlogDetailPage";
import MenuAdmin from "../components/MenuAdmin";

const AdminBlogDetailPage = () => {
  return (
    <>
      <Row>
        <Col md={2}>
          <MenuAdmin />
        </Col>
        <Col>
          <BlogDetailPage />
        </Col>
      </Row>
    </>
  );
};

export default AdminBlogDetailPage;
