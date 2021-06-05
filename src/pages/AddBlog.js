import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import "../pages/AddBlog.css";
const BACKEND_API = process.env.REACT_APP_BACKEND_API;
const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, content, images };
    // async (dispatch) => {
    //   dispatch({ type: types.LOGIN_STARTED });
    //   try {
    //     const response = await api.post('/auth/login', {
    //       email,
    //       password,
    //     });
    console.log(blog);
    fetch(`${BACKEND_API}/blogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(blog),
    }).then(() => {
      // console.log("new blog added");
      history.push("/");
    });
  };
  return (
    <div className="create-new-blog">
      <h2>Add a new blog post</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <label>Content:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <label>Image Link:</label>
        <input
          type="text"
          value={images}
          onChange={(e) => setImages(e.target.value)}
          onSubmit={(e) => setImages(images.push(e.target.value))}
        ></input>
      </form>
      <button onClick={handleSubmit}>Add blog</button>
    </div>
  );
};

export default AddBlog;
