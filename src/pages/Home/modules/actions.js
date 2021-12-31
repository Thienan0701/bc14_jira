import * as actTypes from "./constants";

import api from "../../../utils/apiUtils";
import {
  // actCloseDrawerCommon,
  actOpenDrawerCommonFull,
} from "../../../components/DrawerCommon/modules/actions";

export const actFetchListProject = () => {
  //Goi Api trong nay
  return (dispatch) => {
    dispatch(actListProjectRequest());
    api
      .get("Project/getAllProject")
      .then((result) => {
        dispatch(actListProjectSuccess(result.data.content));
      })
      .catch((error) => {
        dispatch(actListProjectFailed(error));
      });
  };
};
const actListProjectRequest = () => {
  return {
    type: actTypes.HOME_LIST_REQUEST,
  };
};

const actListProjectSuccess = (data) => {
  return {
    type: actTypes.HOME_LIST_SUCCESS,
    payload: data,
  };
};
const actListProjectFailed = (error) => {
  return {
    type: actTypes.HOME_LIST_FAILED,
    payload: error,
  };
};
//Delete project
export const actDeleteProject = (id, Swal) => {
  return (dispatch) => {
    api
      .delete(`Project/deleteProject?projectId=${id}`)
      .then((result) => {
        Swal.fire({
          title: "Delete project success!",
          icon: "success",
          showConfirmButton: false,
          timer: 2500,
        }).then(() => {
          dispatch(actFetchListProject());
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Delete project failed!",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };
};

// const actDeleteProjectSuccess = (data) => {
//   return {
//     type: actTypes.DELETE_SUCCESS,
//     payload: data,
//   };
// };
// const actDeleteProjectFailed = (error) => {
//   return {
//     type: actTypes.DELETE_FAILED,
//     payload: error,
//   };
// };

//Search user
export const actSearchUser = (keyword) => {
  return (dispatch) => {
    api
      .get(`Users/getUser?keyword=${keyword}`)
      .then((result) => {
        dispatch(actSearchUserSuccess(result.data.content));
      })
      .catch((err) => {
        dispatch(actSearchUserFailed(err));
      });
  };
};
const actSearchUserSuccess = (data) => {
  return {
    type: actTypes.SEARCH_USER_SUCCESS,
    payload: data,
  };
};

const actSearchUserFailed = (err) => {
  return {
    type: actTypes.SEARCH_USER_FAILED,
    payload: err,
  };
};

//adduser to project
export const actAsignUserProject = (object, Swal) => {
  return (dispatch, getState) => {
    api
      .post("Project/assignUserProject", object)
      .then((result) => {
        // message.success(result.data);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Assign user to project successfully!",
          showConfirmButton: false,
          timer: 2500,
        }).then(() => {
          dispatch(actFetchListProject());
        });
      })
      .catch((error) => {
        if (error.response.data.statusCode === 403) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "You can not assign this project!",
            showConfirmButton: true,
          });
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Assign user to project failed",
            showConfirmButton: true,
          });
        }
      });
  };
};

// const actAsignUserSuccess = (data) => {
//   return {
//     type: actTypes.ASIGN_USER_PROJECT_SUCCESS,
//     payload: data,
//   };
// };

// const actAsignUserFailed = (err) => {
//   return {
//     type: actTypes.ASIGN_USER_PROJECT_FAILED,
//     payload: err,
//   };
// };

//delete user from project
export const actDeleteUserProject = (object, Swal) => {
  return (dispatch) => {
    api
      .post("Project/removeUserFromProject", object)
      .then((result) => {
        // message.success(result.data.content);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Delete user from project successfully!",
          showConfirmButton: false,
          timer: 2500,
        }).then(() => {
          dispatch(actFetchListProject());
        });
        // dispatch(actDeleteUserProjectSuccess(result.data.content));
      })
      .catch((err) => {
        if (err.response.data.statusCode === 403) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "You can not delete this user!",
            showConfirmButton: true,
          });
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Delete user from project failed!",
            showConfirmButton: true,
          });
        }
        // message.error(err.response.data.message);
        // dispatch(actDeleteUserProjectFailed(err.response.data.message));
      });
  };
};

// const actDeleteUserProjectSuccess = (data) => {
//   return {
//     type: actTypes.DELETE_USER_PROJECT_SUCCESS,
//     payload: data,
//   };
// };

// const actDeleteUserProjectFailed = (error) => {
//   return {
//     type: actTypes.DELETE_USER_PROJECT_FAILED,
//     payload: error,
//   };
// };

export const actCreateProject = (project, history, Swal) => {
  return (dispatch, getState) => {
    api
      .post(`Project/createProjectAuthorize`, project)
      .then((result) => {
        const { callbackFocus } = getState().drawerCommonReducer;
        callbackFocus();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Create project success",
          showConfirmButton: false,
          timer: 2500,
        }).then(() => {
          const { callbackClose } = getState().drawerCommonReducer;
          callbackClose();
          dispatch(actFetchListProject());
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: error.response.data.content,
        });
      });
  };
};

// const actCreateSuccess = (data) => {
//   return {
//     type: actTypes.CREATE_PROJECT_SUCCESS,
//     payload: data,
//   };
// };

// const actCreateFailed = (error) => {
//   return {
//     type: actTypes.CREATE_PROJECT_FAILED,
//     payload: error,
//   };
// };
export const actGetCategory = () => {
  return (dispatch) => {
    api
      .get(`ProjectCategory`)
      .then((result) => {
        dispatch(actCategorySuccess(result.data.content));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const actCategorySuccess = (data) => {
  return {
    type: actTypes.GET_CATEGORY_SUCCESS,
    payload: data,
  };
};

// action get user edit
export const actGetProjectEdit = (id, Component, title, Swal) => {
  return (dispatch, getState) => {
    api
      .get(`Project/getProjectDetail?id=${id}`)
      .then((result) => {
        const drawerCommonReducer = getState().drawerCommonReducer;
        dispatch(
          actOpenDrawerCommonFull({
            ...drawerCommonReducer,
            component: <Component />,
            title,
          })
        );
        dispatch(actGetUserEditSuccess(result.data.content));
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: error.response.data.content,
        }).then(() => {
          dispatch(actFetchListProject());
        });
      });
  };
};
const actGetUserEditSuccess = (data) => {
  return {
    type: actTypes.GET_PROJECT_EDIT_SUCCESS,
    payload: data,
  };
};

//Edit project
export const actEditProject = (id, project, Swal) => {
  return (dispatch, getState) => {
    api
      .put(`Project/updateProject?projectId=${id}`, project)
      .then((result) => {
        const { callbackFocus } = getState().drawerCommonReducer;
        callbackFocus();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Edit project successfully!",
          showConfirmButton: false,
          timer: 2500,
        }).then(() => {
          const { callbackClose } = getState().drawerCommonReducer;
          dispatch(actFetchListProject());
          callbackClose();
        });
      })
      .catch((error) => {
        if (error.response.data.statusCode === 403) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "You can not edit this project!",
            showConfirmButton: true,
          });
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Edit project failed!",
            showConfirmButton: true,
          });
        }
      });
  };
};

// const actEditSuccess = (data) => {
//   return {
//     type: actTypes.EDIT_SUCCESS,
//     payload: data,
//   };
// };

// const actEditFailed = (error) => {
//   return {
//     type: actTypes.EDIT_FAILED,
//     payload: error,
//   };
// };
