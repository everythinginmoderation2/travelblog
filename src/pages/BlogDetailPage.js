import React, { useEffect } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import blogActions from "../redux/actions/blog.actions";
import Reactions from "../components/Reactions";
import AddReviewForm from "../components/AddReviewForm";
import LoadingSpinner from "../components/LoadingSpinner";
import { useHistory } from "react-router-dom";

const BACKEND_API = process.env.REACT_APP_BACKEND_API;
const BlogDetailPage = () => {
  const history = useHistory();
  const { id } = useParams();
  const currentUser = localStorage.getItem("_id");

  const blog = useSelector((state) => state.blog.blog);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  let reviews;
  if (blog && blog.reviews) {
    reviews = blog.reviews.slice().reverse();
  }
  const loading = useSelector((state) => state.blog.loading);
  const error = useSelector((state) => state.blog.error);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(blogActions.getBlog(id));
  }, [dispatch, id]);

  const userAvatarSrc = blog?.author?.avatarUrl
    ? blog?.author?.avatarUrl
    : `https://ui-avatars.com/api/?name=${blog?.author?.name}&background=random&length=1&bold=true`;

  const reviewUserAvatarSrc = (review) =>
    review?.user?.avatarUrl
      ? review?.user?.avatarUrl
      : `https://ui-avatars.com/api/?name=${review?.user?.name}&background=random&length=1&bold=true`;

  const handleDelete = () => {
    fetch(`${BACKEND_API}/blogs/` + blog._id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then(() => {
      history.push("/");
    });
  };

  const blogImageSrc = blog?.images?.length > 0 && blog.images[0];

  return (
    <Container className="BlogDetailPage">
      <Row>
        <Col lg={{ span: 6, offset: 3 }}>
          {error && <h1 className="text-center mt-5">{error}</h1>}

          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              {blog && (
                <div className="Blog-detail-wrapper border rounded px-3 pt-3 mb-3">
                  <div className="Blog-detail">
                    <div className="d-flex mb-3">
                      <div className="mr-2">
                        <Image
                          src={userAvatarSrc}
                          alt=""
                          width="50px"
                          height="50px"
                          roundedCircle
                        />
                      </div>
                      <div>
                        <div className="font-weight-bold">
                          {blog.author.name}
                        </div>
                        <div style={{ color: "rgb(91, 112, 131)" }}>
                          {blog.author.email}
                        </div>
                      </div>
                      <div className="flex-grow-1"></div>
                      <div>
                        {/* If current user is also author, show edit button */}
                        {currentUser === blog?.author?._id ? (
                          <>
                            <Link to={`/blog/edit/${blog._id}`}>
                              <Button variant="primary">Edit</Button>
                            </Link>
                            <Button
                              className="ml-2"
                              variant="danger"
                              onClick={handleDelete}
                            >
                              Delete
                            </Button>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                    <div className="mb-3">
                      <h3>{blog.title}</h3>
                      <div className="mb-3" style={{ fontSize: "20px" }}>
                        {blog.content}
                      </div>
                      {blogImageSrc && (
                        <Image fluid src={blogImageSrc} alt="" />
                      )}
                    </div>
                    <div className="pb-1 border-bottom">
                      <Moment
                        style={{ color: "rgb(91, 112, 131)", fontSize: "13px" }}
                        fromNow
                      >
                        {blog.createdAt}
                      </Moment>
                    </div>
                    <Reactions
                      blog={blog}
                      dispatch={dispatch}
                      id={id}
                      isAuthenticated={isAuthenticated}
                    />
                  </div>

                  <div
                    className={`${
                      isAuthenticated || reviews.length > 0
                        ? "border-top pb-3"
                        : ""
                    } px-3`}
                    style={{
                      marginLeft: "-1rem",
                      marginRight: "-1rem",
                    }}
                  >
                    {isAuthenticated && <AddReviewForm blogId={id} />}
                    {reviews.length > 0 && (
                      <ul className="Reviews list-unstyled pt-3 mb-0 mt-3 border-top">
                        {reviews.map((r) => (
                          <li key={r._id} className="mb-4">
                            <div className="d-flex">
                              <div className="mr-2">
                                <Image
                                  src={reviewUserAvatarSrc(r)}
                                  alt=""
                                  width="40px"
                                  height="40px"
                                  roundedCircle
                                />
                              </div>
                              <div className="d-flex flex-column">
                                <div
                                  className="border p-2"
                                  style={{
                                    backgroundColor: "#eff1f3",
                                    padding: "10px 15px !important",
                                    borderRadius: "13px",
                                    width: "fit-content",
                                  }}
                                >
                                  <div className="d-flex ">
                                    <div className="font-weight-bold mr-1">
                                      {r.user.name}
                                    </div>
                                  </div>
                                  <div>{r.content}</div>
                                </div>
                                <div>
                                  <Moment
                                    style={{
                                      color: "rgb(91, 112, 131)",
                                      fontSize: "13px",
                                    }}
                                    fromNow
                                  >
                                    {r.createdAt}
                                  </Moment>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default BlogDetailPage;
