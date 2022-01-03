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
export const actDeleteUser = (id, message) => {
  return (dispatch) => {
    api
      .delete(`Users/deleteUser?id=${id}`)
      .then((result) => {
        message.success("Delete user successfully!");
        dispatch(actGetUserList());
      })
      .catch((error) => {
        if (error.response.data.statusCode === 404) {
          message.error("User does not exist!");

          dispatch(actGetUserList());
        } else {
          message.error("Delete user failed!");
        }
      });
  };
};

export const createUser = (info, message) => {
  return (dispatch, getState) => {
    api
      .post("Users/signup", info)
      .then((result) => {
        message.success("Create user successfully!");

        const { callbackClose } = getState().drawerCommonReducer;
        callbackClose();
        dispatch(actGetUserList());
      })
      .catch((error) => {
        if (error.response.data.statusCode === 400) {
          message.error("Email is existed!");
        } else {
          message.error("Create user failed!");
        }
      });
  };
};

export const setUserUpdate = (info) => {
  return {
    type: actType.SET_USER_UPDATE,
    payload: info,
  };
};

export const actUpdateUser = (info, message) => {
  return (dispatch, getState) => {
    api
      .put("Users/editUser", info)
      .then((result) => {
        message.success("Update user successfully!");
        const { callbackClose } = getState().drawerCommonReducer;
        dispatch(actGetUserList());
        callbackClose();
      })
      .catch((error) => {
        if (error.response.data.statusCode === 404) {
          message.error("User does not exist!");

          const { callbackClose } = getState().drawerCommonReducer;
          dispatch(actGetUserList());
          callbackClose();
        } else {
          message.error("Update user failed!");
        }
      });
  };
};
