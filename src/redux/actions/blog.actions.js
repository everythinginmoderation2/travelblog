import * as types from "../constants/blog.constants";
import * as errors from "../constants/errors.constants";
import api from "../../apiService";

const getBlogs = (pageNum, limit, query, sortBy, order) => async (dispatch) => {
  dispatch({ type: types.GET_BLOGS_REQUEST });
  try {
    let url = `/blogs?page=${pageNum}&limit=${limit}`;
    if (query)
      url += `&title[$regex]=${query}&title[$options]=${query.charAt(0)}`;
    if (sortBy) url += `&sortBy[${sortBy}]=${order}`;
    const response = await api.get(url);

    if (response.data.success) {
      dispatch({ type: types.GET_BLOGS_SUCCESS, payload: response.data.data });
    }

    if (response.errors) {
      dispatch({
        type: types.GET_BLOGS_FAILURE,
        payload: response.errors,
      });
    }
  } catch (error) {
    dispatch({ type: types.GET_BLOGS_FAILURE, payload: errors.FETCH_ERROR });
  }
};

const getBlog = (blogId) => async (dispatch) => {
  dispatch({ type: types.GET_BLOG_REQUEST });
  try {
    let url = `/blogs/${blogId}`;
    const response = await api.get(url);
    dispatch({ type: types.GET_BLOG_SUCCESS, payload: response.data.data });
  } catch (error) {
    dispatch({ type: types.GET_BLOG_FAILURE, payload: errors.FETCH_ERROR });
  }
};

const submitReaction = (targetType, targetId, emoji) => async (dispatch) => {
  dispatch({ type: types.BLOG_REACTION_REQUEST });

  try {
    let url = "/reactions";
    const response = await api.post(url, {
      targetType,
      targetId,
      emoji,
    });

    if (response.data.success) {
      dispatch({
        type: types.BLOG_REACTION_SUCCESS,
        payload: response.data.data,
      });
    }

    if (response.errors) {
      dispatch({
        type: types.BLOG_REACTION_FAILURE,
        payload: response.errors,
      });
    }
  } catch (error) {
    dispatch({
      type: types.BLOG_REACTION_FAILURE,
      payload: errors.FETCH_ERROR,
    });
  }
};

const submitReview = (submittedReview, blogId) => async (dispatch) => {
  dispatch({ type: types.BLOG_REVIEW_REQUEST });

  try {
    let url = `/reviews/blogs/${blogId}`;
    const response = await api.post(url, {
      content: submittedReview,
    });

    if (response.data.success) {
      dispatch({
        type: types.BLOG_REVIEW_SUCCESS,
        payload: response.data.data,
      });
    }

    if (response.errors) {
      dispatch({
        type: types.BLOG_REVIEW_FAILURE,
        payload: response.errors,
      });
    }
  } catch (error) {
    dispatch({ type: types.BLOG_REVIEW_FAILURE, payload: errors.FETCH_ERROR });
  }
};
const getOwnerBlogs = (pageNum, limit, query, authorId) => async (dispatch) => {
  dispatch({ type: types.GET_OWNER_BLOGS_REQUEST });
  try {
    let url = `/blogs?page=${pageNum}&limit=${limit}&author=${authorId}`;
    if (query)
      url += `&title[$regex]=${query}&title[$options]=${query.charAt(0)}`;
    const response = await api.get(url);
    console.log("response owner", response);
    dispatch({
      type: types.GET_OWNER_BLOGS_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_OWNER_BLOGS_FAILURE, payload: error });
  }
};
const deleteBlog = (id) => async (dispatch) => {
  dispatch({ type: types.DELETE_BLOG_REQUEST });
  try {
    const response = await api.delete(`/blogs/${id}`);
    console.log("delete blog", response);
    if (response.data.success) {
      dispatch({
        type: types.DELETE_BLOG_SUCCESS,
        payload: id,
      });
    }
  } catch (e) {
    dispatch({ type: types.DELETE_BLOG_FAILURE, payload: e.message });
  }
};
const updateBlog = (title, content, images, id) => async (dispatch) => {
  dispatch({ type: types.UPDATE_BLOG_SUCCESS });
  try {
    const response = await api.put(`/blogs/${id}`, {
      title,
      content,
      images,
    });
    console.log("response update");
    if (response.data.success) {
      dispatch({
        type: types.UPDATE_BLOG_SUCCESS,
        payload: response.data.message,
      });
    }
  } catch (error) {
    dispatch({ type: types.UPDATE_BLOG_FAILURE });
  }
};

const blogActions = {
  getBlogs,
  getBlog,
  submitReaction,
  submitReview,
  getOwnerBlogs,
  deleteBlog,
  updateBlog,
};

export default blogActions;
