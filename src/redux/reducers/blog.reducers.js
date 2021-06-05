import * as types from "../constants/blog.constants";
const initialState = {
  blogs: [],
  blog: null,
  totalPages: 1,
  loading: false,
  error: null,
  successMsg: "",
};

const blogReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    /************************ BLOGS ************************/
    case types.GET_BLOGS_REQUEST:
      return { ...state, loading: true, error: null };
    case types.GET_OWNER_BLOGS_REQUEST:
    case types.UPDATE_BLOG_REQUEST:
      return { ...state, loading: true };

    case types.GET_BLOGS_SUCCESS:
    case types.GET_OWNER_BLOGS_SUCCESS:
      return {
        ...state,
        blogs: payload.blogs,
        totalPages: payload.totalPages,
        loading: false,
        error: null,
      };

    case types.GET_BLOGS_FAILURE:
      return { ...state, loading: false, error: payload, blogs: [] };
    case types.GET_OWNER_BLOGS_FAILURE:
      return { ...state, loading: false };

    /************************ BLOG ************************/
    case types.GET_BLOG_REQUEST:
      return { ...state, loading: true, error: null };

    case types.GET_BLOG_SUCCESS:
      return { ...state, loading: false, error: null, blog: payload };

    case types.GET_BLOG_FAILURE:
      return { ...state, loading: false, error: payload };

    /************************ REACTION ************************/
    case types.BLOG_REACTION_REQUEST:
      return { ...state };
    // TODO

    case types.BLOG_REACTION_SUCCESS:
      return { ...state, blog: { ...state.blog, reactions: payload } };

    case types.BLOG_REACTION_FAILURE:
      return { ...state };
    // TODO

    /************************ REVIEW ************************/
    case types.BLOG_REVIEW_REQUEST:
      return { ...state };
    // TODO

    case types.BLOG_REVIEW_SUCCESS:
      return {
        ...state,
        blog: { ...state.blog, reviews: [...state.blog.reviews, payload] },
      };

    case types.BLOG_REVIEW_FAILURE:
      return { ...state };
    // TODO

    case types.DELETE_BLOG_SUCCESS:
      return { ...state, blogs: state.blogs.filter((b) => b._id !== payload) };

    case types.UPDATE_BLOG_SUCCESS:
      return { ...state, successMsg: payload };

    default:
      return state;
  }
};

export default blogReducer;
