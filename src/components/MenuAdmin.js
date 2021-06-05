import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const MenuAdmin = () => {
  return (
    <div>
      <Nav className='flex-column text-left'>
        <Nav.Item>
          <Nav.Link as={NavLink} to='/admin/profile'>
            Profile
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to='/admin/blogs'>
            Blogs
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to='/admin/friends'>
            Friends
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default MenuAdmin;
