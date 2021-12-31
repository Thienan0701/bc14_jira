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
export const actDeleteUser = (id, Swal) => {
  return (dispatch) => {
    api
      .delete(`Users/deleteUser?id=${id}`)
      .then((result) => {
        Swal.fire({
          title: "Delete user successfully!",
          icon: "success",
          timer: 2500,
          showConfirmButton: false,
        }).then(() => {
          dispatch(actGetUserList());
        });
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data.statusCode === 404) {
          Swal.fire({
            title: "User does not exist!",
            icon: "error",
          }).then(() => {
            dispatch(actGetUserList());
          });
        } else {
          Swal.fire({
            title: "Delete user failed!",
            icon: "error",
          });
        }
      });
  };
};
// const actDeleteUserSuccess = (data) => {
//   return {
//     type: actType.DELETE_USER_SUCCESS,
//     payload: data,
//   };
// };

// const actDeleteUserFailed = (error) => {
//   return {
//     type: actType.DELETE_USER_FAILED,
//     payload: error,
//   };
// };

export const createUser = (info, Swal) => {
  return (dispatch, getState) => {
    api
      .post("Users/signup", info)
      .then((result) => {
        Swal.fire({
          title: "Create user successfully!",
          icon: "success",
          timer: 2500,
          showConfirmButton: false,
        }).then(() => {
          const { callbackClose } = getState().drawerCommonReducer;
          callbackClose();
          dispatch(actGetUserList());
        });
      })
      .catch((error) => {
        if (error.response.data.statusCode === 400) {
          Swal.fire({
            title: "Email is existed!",
            icon: "error",
          });
        } else {
          Swal.fire({
            title: "Create user failed!",
            icon: "error",
            timer: 2500,
            showConfirmButton: false,
          });
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

export const actUpdateUser = (info, Swal) => {
  return (dispatch, getState) => {
    api
      .put("Users/editUser", info)
      .then((result) => {
        Swal.fire({
          title: "Update user successfully!",
          icon: "success",
          timer: 2500,
          showConfirmButton: false,
        }).then(() => {
          const { callbackClose } = getState().drawerCommonReducer;
          dispatch(actGetUserList());
          callbackClose();
        });
      })
      .catch((error) => {
        if (error.response.data.statusCode === 404) {
          Swal.fire({
            title: "User does not exist!",
            icon: "error",
          }).then(() => {
            const { callbackClose } = getState().drawerCommonReducer;
            dispatch(actGetUserList());
            callbackClose();
          });
        } else {
          Swal.fire({
            title: "Update user failed!",
            icon: "error",
          });
        }
      });
  };
};
