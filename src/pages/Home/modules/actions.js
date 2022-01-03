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
export const actDeleteProject = (id, message) => {
  return (dispatch) => {
    api
      .delete(`Project/deleteProject?projectId=${id}`)
      .then((result) => {
        message.success("Delete project success!");

        dispatch(actFetchListProject());
      })
      .catch((error) => {
        message.error("Delete project failed!");
      });
  };
};

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
export const actAsignUserProject = (object, message = undefined) => {
  return (dispatch, getState) => {
    api
      .post("Project/assignUserProject", object)
      .then((result) => {
        if (message) {
          message.success("Assign user to project successfully!");

          dispatch(actFetchListProject());
        } else {
        }
      })
      .catch((error) => {
        if (error.response.data.statusCode === 403) {
          message.error("You can not assign this project!");
        } else {
          message.error("Assign user to project failed!");
        }
      });
  };
};

//delete user from project
export const actDeleteUserProject = (object, message) => {
  return (dispatch) => {
    api
      .post("Project/removeUserFromProject", object)
      .then((result) => {
        dispatch(actFetchListProject());
        message.success("Delete user from project successfully!");
      })
      .catch((err) => {
        if (err.response.data.statusCode === 403) {
          message.error("You can not delete this user!");
        } else {
          message.error("Delete user from project failed!");
        }
      });
  };
};

export const actCreateProject = (project, history, message) => {
  return (dispatch, getState) => {
    api
      .post(`Project/createProjectAuthorize`, project)
      .then((result) => {
        const { callbackFocus } = getState().drawerCommonReducer;
        dispatch(
          actAsignUserProject({
            projectId: result.data.content.id,
            userId: result.data.content.creator,
          })
        );
        callbackFocus();
        message.success("Create project success");

        const { callbackClose } = getState().drawerCommonReducer;
        callbackClose();
        dispatch(actFetchListProject());
      })
      .catch((error) => {
        message.error(error.response?.data.content);
      });
  };
};

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
export const actGetProjectEdit = (id, Component, title, message) => {
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
        message.error(error.response?.data.content);
        dispatch(actFetchListProject());
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
export const actEditProject = (id, project, message) => {
  return (dispatch, getState) => {
    api
      .put(`Project/updateProject?projectId=${id}`, project)
      .then((result) => {
        const { callbackFocus } = getState().drawerCommonReducer;
        callbackFocus();
        message.success("Edit project successfully!");
        const { callbackClose } = getState().drawerCommonReducer;
        dispatch(actFetchListProject());
        callbackClose();
      })
      .catch((error) => {
        if (error.response.data.statusCode === 403) {
          message.error("You can not edit this project!");
        } else {
          message.error("Edit project failed!");
        }
      });
  };
};
