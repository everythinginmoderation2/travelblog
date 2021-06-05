import api from "../../apiService";
import * as types from "../constants/auth.constants";

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: types.LOGIN_STARTED });
  try {
    const response = await api.post("/auth/login", {
      email,
      password,
    });
    if (response.data.success) {
      dispatch({ type: types.LOGIN_SUCCESS, payload: response.data.data.user });

      const userAvatarSrc = response.data.data.user?.avatarUrl
        ? response.data.data.user.avatarUrl
        : `https://ui-avatars.com/api/?name=${response.data.data.user.name}&background=random&length=1&bold=true`;

      localStorage.setItem("userAvatarSrc", userAvatarSrc);
    }
  } catch (error) {
    dispatch({ type: types.LOGIN_FAIL, payload: error.message });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("_id");
  localStorage.removeItem("userAvatarSrc");
  dispatch({ type: types.LOGOUT });
};

export const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: types.REGISTER_STARTED });
  try {
    const response = await api.post("/users", {
      name,
      email,
      password,
    });
    if (response.data.success) {
      console.log("success", response.data.message);
      dispatch({
        type: types.REGISTER_SUCCESS,
        payload: response.data.message,
      });
    }
  } catch (error) {
    console.log("error register", error);
    dispatch({ type: types.REGISTER_FAIL, payload: error });
  }
};
export const getCurrentUser = () => async (dispatch) => {
  dispatch({ type: types.GET_CURRENT_USER_STARTED });
  try {
    const response = await api.get("/users/me");
    if (response.data.success) {
      dispatch({
        type: types.GET_CURRENT_USER_SUCCESS,
        payload: response.data.data,
      });
    }
  } catch (e) {
    dispatch({ type: types.GET_CURRENT_USER_FAIL, payload: e.message });
  }
};
export const updateProfile = (name) => async (dispatch) => {
  dispatch({ type: types.UPDATE_PROFILE_STARTED });
  try {
    const response = await api.put("/users", {
      name,
    });
    if (response.data.success) {
      dispatch(getCurrentUser());
    }
  } catch (error) {
    dispatch({ type: types.UPDATE_PROFILE_FAIL });
  }
};
