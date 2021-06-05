import React from "react";
import Moment from "react-moment";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const userAvatarSrc = blog?.author?.avatarUrl
    ? blog?.author?.avatarUrl
    : `https://ui-avatars.com/api/?name=${blog?.author?.name}&background=random&length=1&bold=true`;

  const blogImageSrc = blog?.images?.length > 0 && blog.images[0];

  return (
    <li className="w-100">
      <Link
        to={`/blogs/${blog._id}`}
        className="text-reset text-decoration-none"
      >
        <div className="Blog-detail p-3 border rounded my-2">
          <div className="d-flex">
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
              <div className="d-flex">
                <div className="font-weight-bold mr-2">{blog.author.name}</div>
                <div className="mr-2" style={{ color: "rgb(91, 112, 131)" }}>
                  {blog.author.email + " · "}
                </div>
                <div>
                  <Moment
                    style={{ color: "rgb(91, 112, 131)", fontSize: "13px" }}
                    fromNow
                  >
                    {blog.createdAt}
                  </Moment>
                </div>
              </div>
              <div className="mt-2">
                <h3>{blog.title}</h3>
                <div style={{ fontSize: "20px" }}>
                  {blog.content.substring(0, 280)}
                  {blog.content.length > 280 && "..."}
                </div>
                {blogImageSrc && (
                  <Image fluid className="mt-3" src={blogImageSrc} alt="" />
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default BlogCard;
