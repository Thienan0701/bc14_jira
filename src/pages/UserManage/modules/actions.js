import * as actType from "./constant";
import api from "../../../utils/apiUtils";

export const actGetUserList = () => {
  return (dispatch) => {
    dispatch(actListUserRequest());
    api
      .get("Users/getUser")
      .then((result) => {
        dispatch(actListUserSuccess(result.data.content));
      })
      .catch((error) => {
        dispatch(actListUserFailed(error));
      });
  };
};

const actListUserRequest = () => {
  return {
    type: actType.LIST_USER_REQUEST,
  };
};
const actListUserSuccess = (data) => {
  return {
    type: actType.LIST_USER_SUCCESS,
    payload: data,
  };
};

const actListUserFailed = (error) => {
  return {
    type: actType.LIST_USER_FAILED,
    payload: error,
  };
};

//delete user
export const actDeleteUser = (id) => {
  return (dispatch) => {
    api
      .delete(`Users/deleteUser?id=${id}`)
      .then((result) => {
        dispatch(actDeleteUserSuccess(result.data.content));
      })
      .catch((error) => {
        dispatch(actDeleteUserFailed(error));
      });
  };
};
const actDeleteUserSuccess = (data) => {
  return {
    type: actType.DELETE_USER_SUCCESS,
    payload: data,
  };
};

const actDeleteUserFailed = (error) => {
  return {
    type: actType.DELETE_USER_FAILED,
    payload: error,
  };
};
