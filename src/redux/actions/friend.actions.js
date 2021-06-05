import * as types from "../constants/friend.constants";
import api from "../../apiService";

const friendActions = {
  getFriends: (pageNum, limit, searchTerm, sortBy, order) => async (
    dispatch
  ) => {
    dispatch({ type: types.GET_FRIENDS_REQUEST });
    try {
      let url = `/friends?page=${pageNum}&limit=${limit}&sortBy[${sortBy}]=${order}`;
      if (searchTerm) {
        url += `&name[$regex]=${searchTerm}&name[$options]=${searchTerm.charAt(
          0
        )})}`;
      }
      console.log("url sort", url);
      const response = await api.get(url);
      dispatch({
        type: types.GET_FRIENDS_SUCCESS,
        payload: response.data.data,
      });
    } catch (error) {
      dispatch({ type: types.GET_FRIENDS_FAILURE, payload: error });
    }
  },
  getListUsers: (pageNum, limit, searchTerm, sortBy, order) => async (
    dispatch
  ) => {
    dispatch({ type: types.GET_LIST_USER_REQUEST });
    try {
      let url = `/users?page=${pageNum}&limit=${limit}&sortBy[${sortBy}]=${order}`;
      if (searchTerm) {
        url += `&name[$regex]=${searchTerm}&name[$options]=${searchTerm.charAt(
          0
        )}`;
      }
      const response = await api.get(url);
      dispatch({
        type: types.GET_LIST_USER_SUCCESS,
        payload: response.data.data,
      });
    } catch (error) {
      dispatch({ type: types.GET_LIST_USER_FAILURE, payload: error });
    }
  },
  getSentRequest: (pageNum, limit, searchTerm, sortBy, order) => async (
    dispatch
  ) => {
    dispatch({ type: types.GET_SENT_REQUESTS_REQUEST });
    try {
      let url = `friends/add?page=${pageNum}&limit=${limit}&sortBy[${sortBy}]=${order}`;
      if (searchTerm) {
        url += `&name[$regex]=${searchTerm}&name[$options]=${searchTerm.charAt(
          0
        )}`;
      }
      const response = await api.get(url);
      dispatch({
        type: types.GET_SENT_REQUESTS_SUCCESS,
        payload: response.data.data,
      });
    } catch (error) {
      dispatch({ type: types.GET_SENT_REQUESTS_FAILURE, payload: error });
    }
  },
  getReceivedRequest: (pageNum, limit, searchTerm, sortBy, order) => async (
    dispatch
  ) => {
    dispatch({ type: types.GET_RECEIVED_REQUESTS_REQUEST });
    try {
      let url = `friends/manage?page=${pageNum}&limit=${limit}&sortBy[${sortBy}]=${order}`;
      if (searchTerm) {
        url += `&name[$regex]=${searchTerm}&name[$options]=${searchTerm.charAt(
          0
        )}`;
      }
      const response = await api.get(url);
      dispatch({
        type: types.GET_RECEIVED_REQUESTS_SUCCESS,
        payload: response.data.data,
      });
    } catch (error) {
      dispatch({ type: types.GET_RECEIVED_REQUESTS_FAILURE, payload: error });
    }
  },
  sendFriendRequest: (id) => async (dispatch) => {
    dispatch({ type: types.SEND_FRIEND_REQUEST_STARTED });
    try {
      const response = await api.post(`friends/add/${id}`);
      dispatch({ type: types.SEND_FRIEND_REQUEST_SUCCESS, payload: id });
      console.log("response", response);
    } catch (e) {
      dispatch({ type: types.SEND_FRIEND_REQUEST_FAIL });
    }
  },
  cancelFriendRequest: (id) => async (dispatch) => {
    dispatch({ type: types.CANCEL_FRIEND_REQUEST_STARTED });
    try {
      const response = await api.delete(`friends/add/${id}`);
      if (response.data.success) {
        dispatch({
          type: types.CANCEL_FRIEND_REQUEST_SUCCESS,
          payload: id,
        });
      }
    } catch (e) {
      dispatch({ type: types.CANCEL_FRIEND_REQUEST_FAIL, payload: e.message });
    }
  },
  removeFriend: (id) => async (dispatch) => {
    dispatch({ type: types.REMOVE_FRIEND_STARTED });
    try {
      const response = await api.delete(`friends/${id}`);
      console.log("response remove Friend", response);
      if (response.data.success) {
        dispatch({
          type: types.REMOVE_FRIEND_SUCCESS,
          payload: id,
        });
      }
    } catch (e) {
      dispatch({ type: types.REMOVE_FRIEND_FAIL, payload: e.message });
    }
  },
  acceptFriend: (id) => async (dispatch) => {
    dispatch({ type: types.ACCEPT_FRIEND_STARTED });
    try {
      const response = await api.post(`friends/manage/${id}`);
      console.log("response accept Friend", response);
      if (response.data.success) {
        dispatch({
          type: types.ACCEPT_FRIEND_SUCCESS,
          payload: id,
        });
      }
    } catch (e) {
      dispatch({ type: types.ACCEPT_FRIEND_FAIL, payload: e.message });
    }
  },
  declineFriendRequest: (id) => async (dispatch) => {
    dispatch({ type: types.DECLINE_FRIEND_STARTED });
    try {
      const response = await api.delete(`friends/manage/${id}`);
      console.log("decline Friend Request", response);
      if (response.data.success) {
        dispatch({
          type: types.DECLINE_FRIEND_SUCCESS,
          payload: id,
        });
      }
    } catch (e) {
      dispatch({ type: types.DECLINE_FRIEND_SUCCESS, payload: e.message });
    }
  },
};

export default friendActions;
