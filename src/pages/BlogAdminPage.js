import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuAdmin from "../components/MenuAdmin";
import { Row, Col, Table, Button } from "react-bootstrap";
import FormSearch from "../components/FormSearch";
import blogActions from "../redux/actions/blog.actions";
import Moment from "react-moment";
import { getCurrentUser } from "../redux/actions/auth.actions";
import PaginationBar from "../components/PaginationBar";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

const BlogAdminPage = () => {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [showAction, setShowAction] = useState(false);
  const limit = 10;
  const blogs = useSelector((state) => state.blog.blogs);
  const loading = useSelector((state) => state.blog.loading);
  const totalPages = useSelector((state) => state.blog.totalPages);
  const [sortBy, setSortBy] = useState("title");
  const [order, setOrder] = useState(1);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      return;
    }
    dispatch(getCurrentUser());
  }, [dispatch, user]);

  useEffect(() => {
    dispatch(blogActions.getBlogs(pageNum, limit, query, sortBy, order));
  }, [dispatch, pageNum, limit, query, sortBy, order]);

  const handleCheckBox = (e) => {
    if (e.target.checked) {
      if (user._id) {
        dispatch(blogActions.getOwnerBlogs(pageNum, limit, query, user._id));
        setShowAction(true);
      }
    } else {
      setShowAction(false);
      dispatch(blogActions.getBlogs(pageNum, limit, query));
    }
  };

  const handleSortBy = (e) => {
    const arraySort = e.target.value.split("_");
    setSortBy(arraySort[0]);
    if (arraySort[1] === "DESC") {
      setOrder(-1);
    } else {
      setOrder(1);
    }
    setPageNum(1);
  };

  const shouldShowPagination = blogs.length > 0 && totalPages > 1 && !loading;

  return (
    <>
      <Row>
        <Col md={2}>
          <MenuAdmin />
        </Col>
        <Col md={9}>
          <h2>Blog Manage</h2>
          <FormSearch
            searchInput={input}
            handleSearchChange={(e) => setInput(e.target.value)}
            handleSubmit={(e) => {
              e.preventDefault();
              setQuery(input);
            }}
          />
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexCheckDefault"
              defaultChecked={false}
              onChange={handleCheckBox}
            />
            <label className="form-check-label">My Blogs Only</label>
          </div>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>
                    Title{" "}
                    <button
                      className="m-2 link-button"
                      value="title_ASC"
                      onClick={handleSortBy}
                    >
                      ⬆️
                    </button>
                    <button
                      className="link-button"
                      value="title_DESC"
                      onClick={handleSortBy}
                    >
                      ⬇️
                    </button>
                  </th>
                  <th className="pb-4">Author</th>
                  <th>
                    Review Count{" "}
                    <button
                      className="m-2 link-button"
                      value="reviewCount_ASC"
                      onClick={handleSortBy}
                    >
                      ⬆️
                    </button>
                    <button
                      className="link-button"
                      value="reviewCount_DESC"
                      onClick={handleSortBy}
                    >
                      ⬇️
                    </button>
                  </th>
                  <th className="pb-4">Created At</th>
                  <th className="pb-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((b) => (
                  <tr key={b._id}>
                    <td>
                      <Link to={`/admin/blogs/${b._id}`}>
                        {b.title.substring(0, 20)}
                      </Link>
                    </td>
                    <td>{b.author.name}</td>
                    <td>{b.reviewCount}</td>
                    <td>
                      <Moment fromNow>{b.createdAt}</Moment>
                    </td>
                    <td>
                      {showAction && (
                        <>
                          <Link to={`/blog/edit/${b._id}`}>
                            <Button variant="primary" className="mr-2">
                              Edit
                            </Button>
                          </Link>

                          <Button
                            variant="danger"
                            value={b._id}
                            onClick={(e) =>
                              dispatch(blogActions.deleteBlog(e.target.value))
                            }
                          >
                            Delete
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}

          {shouldShowPagination && (
            <PaginationBar
              pageNum={pageNum}
              setPageNum={setPageNum}
              totalPageNum={totalPages}
            />
          )}
        </Col>
      </Row>
    </>
  );
};

export default BlogAdminPage;
