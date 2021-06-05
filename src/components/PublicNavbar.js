import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import logo from '../logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/auth.actions';

const PublicNavbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  return (
    <>
      <Navbar bg='light' expand='lg'>
        <Navbar.Brand>
          <Nav.Link as={NavLink} to='/'>
            <img src={logo} alt='logo' width='50px' />
          </Nav.Link>
        </Navbar.Brand>
        <Nav className='mr-auto'>
          {!isAuthenticated ? (
            <Nav.Link as={NavLink} to='/register'>
              Register
            </Nav.Link>
          ) : (
            <Nav.Link as={NavLink} to='/admin/profile'>
              Admin
            </Nav.Link>
          )}

          {!isAuthenticated ? (
            <Nav.Link as={NavLink} to='/login'>
              Login
            </Nav.Link>
          ) : (
            <Nav.Link onClick={() => dispatch(logout())}>Logout</Nav.Link>
          )}
        </Nav>
      </Navbar>
    </>
  );
};

export default PublicNavbar;
