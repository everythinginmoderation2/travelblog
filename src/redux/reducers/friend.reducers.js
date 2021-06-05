import * as types from "../constants/friend.constants";
const initialState = {
  friends: [],
  totalPages: 1,
  loading: false,
};
const friendReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_FRIENDS_REQUEST:
    case types.GET_LIST_USER_REQUEST:
    case types.GET_SENT_REQUESTS_REQUEST:
    case types.GET_RECEIVED_REQUESTS_REQUEST:
      return { ...state, loading: true, friends: [] };

    case types.CANCEL_FRIEND_REQUEST_STARTED:
      return { ...state };

    case types.GET_FRIENDS_SUCCESS:
    case types.GET_LIST_USER_SUCCESS:
    case types.GET_SENT_REQUESTS_SUCCESS:
    case types.GET_RECEIVED_REQUESTS_SUCCESS:
      return {
        ...state,
        friends: payload.users,
        totalPages: payload.totalPages,
        loading: false,
      };
    case types.CANCEL_FRIEND_REQUEST_SUCCESS:
    case types.REMOVE_FRIEND_SUCCESS:
    case types.ACCEPT_FRIEND_SUCCESS:
    case types.DECLINE_FRIEND_SUCCESS:
      return {
        ...state,
        friends: state.friends.filter((f) => f._id !== payload),
      };

    case types.SEND_FRIEND_REQUEST_SUCCESS:
      return {
        ...state,
        friends: state.friends.map((f) => {
          if (f._id === payload) {
            return { ...f, requestingStatus: true };
          }
          return { ...f };
        }),
      };
    case types.GET_FRIENDS_FAILURE:
    case types.GET_LIST_USER_FAILURE:
    case types.GET_SENT_REQUESTS_FAILURE:
    case types.GET_RECEIVED_REQUESTS_FAILURE:
    case types.CANCEL_FRIEND_REQUEST_FAIL:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default friendReducer;
