import api from "../../../utils/apiUtils";
import * as actTypes from "./constants";

export const actGetDetailProject = (
  id,
  history,
  message,
  isLoading = false
) => {
  return (dispatch) => {
    if (isLoading) {
      dispatch(actDetailProjectRequest());
    }
    api
      .get(`Project/getProjectDetail?id=${id}`)
      .then((result) => {
        dispatch(actDetailProjectSuccess(result.data.content));
      })
      .catch((error) => {
        if (
          error.response?.data.statusCode === 404 ||
          error.response?.data.statusCode === 500
        ) {
          history.push("/");
        }
        message?.error(error.response?.data.content);
        dispatch(actDetailProjectFailed(error));
      });
  };
};

const actDetailProjectRequest = () => {
  return {
    type: actTypes.PROJECT_DETAIL_REQUEST,
  };
};
const actDetailProjectSuccess = (data) => {
  return {
    type: actTypes.PROJECT_DETAIL_SUCCESS,
    payload: data,
  };
};
const actDetailProjectFailed = (error) => {
  return {
    type: actTypes.PROJECT_DETAIL_FAILED,
    payload: error,
  };
};

export const updateStatus = (
  info,
  id,
  history,
  setListTask,
  listTaskPrev,
  message
) => {
  return (dispatch) => {
    api
      .put(`Project/updateStatus`, info)
      .then((result) => {
        dispatch(actGetDetailProject(id, history, message));
      })
      .catch((error) => {
        message.error("Update status failed!", [2.5]);
        setListTask(listTaskPrev);
      });
  };
};

export const getTaskDetail = (id) => {
  return (dispatch) => {
    dispatch(getTaskDetailRequest());
    api
      .get(`Project/getTaskDetail?taskId=${id}`)
      .then((result) => {
        dispatch(getTaskDetailSuccess(result.data.content));
      })
      .catch((error) => {
        dispatch(getTaskDetailFailed(error));
      });
  };
};
const getTaskDetailRequest = () => ({
  type: actTypes.TASK_DETAIL_REQUEST,
});
const getTaskDetailSuccess = (data) => ({
  type: actTypes.TASK_DETAIL_SUCCESS,
  payload: data,
});
const getTaskDetailFailed = (error) => ({
  type: actTypes.TASK_DETAIL_FAILED,
  payload: error,
});

export const actGetStatusTask = () => {
  return async (dispatch) => {
    try {
      const result = await api.get(`Status/getAll`);
      dispatch(actGetStatusTaskSuccess(result.data.content));
    } catch (error) {}
  };
};
const actGetStatusTaskSuccess = (data) => ({
  type: actTypes.DATA_STATUS_SUCCESS,
  payload: data,
});

export const actGetPriority = () => {
  return async (dispatch) => {
    try {
      const result = await api.get(`Priority/getAll`);
      dispatch(actGetPrioritySuccess(result.data.content));
    } catch (error) {}
  };
};
const actGetPrioritySuccess = (data) => ({
  type: actTypes.DATA_PRIORITY_SUCCESS,
  payload: data,
});

export const actUpdateStatusDetail = (
  info,
  id,
  prevStatusId,
  setStatus,
  history,
  message
) => {
  return (dispatch) => {
    api
      .put(`Project/updateStatus`, info)
      .then((result) => {
        dispatch(actGetDetailProject(id, history, message));
      })
      .catch((error) => {
        setStatus(prevStatusId);
        if (error) {
          message.error(error.response?.data.content);
        }
      });
  };
};

export const actUpdateTask = (
  info,
  id,
  prevTask,
  setTask,
  history,
  message,
  callBackDifference
) => {
  return (dispatch) => {
    api
      .post("Project/updateTask", info)
      .then((result) => {
        dispatch(actGetDetailProject(id, history, message));
        if (callBackDifference) {
          callBackDifference();
        }
      })
      .catch((error) => {
        setTask(prevTask);
        const valueInt32 = 2147483647;
        if (
          error.response?.status === 400 &&
          (info.timeTrackingSpent > valueInt32 ||
            info.timeTrackingRemaining > valueInt32 ||
            info.originalEstimate > valueInt32)
        ) {
          message.error(`The maximum value is ${valueInt32}`);
        } else {
          message.error(error.response?.data.content);
        }
      });
  };
};

export const actTaskType = () => {
  return (dispatch) => {
    api
      .get("TaskType/getAll")
      .then((result) => {
        dispatch(actTaskTypeSuccess(result.data.content));
      })
      .catch((error) => {});
  };
};

const actTaskTypeSuccess = (data) => ({
  type: actTypes.DATA_TASK_TYPE_SUCCESS,
  payload: data,
});

export const actInsertComment = (
  info,
  id,
  history,
  setTask,
  prevTask,
  message,
  setContentComment
) => {
  return (dispatch, getState) => {
    const { avatar, name, id: idUser } = getState().loginReducer.data;

    api
      .post("Comment/insertComment", info)
      .then((result) => {
        dispatch(actGetDetailProject(id, history, message));
        setTask({
          ...prevTask,
          lstComment: [
            ...prevTask.lstComment,
            {
              id: result.data.content.id,
              idUser,
              commentContent: result.data.content.contentComment,
              avatar,
              name,
            },
          ],
        });
        setContentComment("");
      })
      .catch((error) => {
        setTask(prevTask);
        if (error) {
          message.error(error.response?.data.content);
        }
      });
  };
};

export const actDeleteComment = (
  commentId,
  id,
  history,
  setTask,
  prevTask,
  message,
  taskId
) => {
  return (dispatch) => {
    api
      .delete(`Comment/deleteComment?idComment=${commentId}`)
      .then(() => {
        dispatch(actGetDetailProject(id, history, message));
      })
      .catch((error) => {
        setTask(prevTask);
        if (error.response?.data.statusCode === 404) {
          message.error(error.response?.data.content);
          dispatch(getTaskDetail(taskId));
        }
      });
  };
};

export const actUpdateComment = (
  info,
  id,
  history,
  setTask,
  prevTask,
  message,
  setContentComment,
  prevComment,
  callBackDifference
) => {
  return (dispatch) => {
    api
      .put(
        `Comment/updateComment?id=${info.id}&contentComment=${info.contentComment}`
      )
      .then((result) => {
        dispatch(actGetDetailProject(id, history, message));
        callBackDifference();
      })
      .catch((error) => {
        setTask(prevTask);
        setContentComment(prevComment);
        message.error(error.response?.data.content);
      });
  };
};

export const actDeleteTask = (
  id,
  projectId,
  history,
  prevProject,
  setListTask,
  message
) => {
  return (dispatch) => {
    api
      .delete(`Project/removeTask?taskId=${id}`)
      .then((result) => {
        dispatch(actGetDetailProject(projectId, history, message));
        message.success("Delete task successfully!");
      })
      .catch((error) => {
        setListTask(prevProject);
        message.error(error.response?.data.content);
      });
  };
};
