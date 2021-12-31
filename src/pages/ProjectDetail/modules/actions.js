import api from "../../../utils/apiUtils";
import * as actTypes from "./constants";

export const actGetDetailProject = (id, history) => {
  return (dispatch) => {
    api
      .get(`Project/getProjectDetail?id=${id}`)
      .then((result) => {
        dispatch(actDetailProjectSuccess(result.data.content));
      })
      .catch((error) => {
        if (error.response?.data.statusCode === 404) {
          history.push("/");
        }
        dispatch(actDetailProjectFailed(error));
      });
  };
};

// const actDetailProjectRequest = () => {
//   return {
//     type: actTypes.PROJECT_DETAIL_REQUEST,
//   };
// };
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

export const actCreateTask = (info) => {
  return (dispatch) => {
    api
      .post("Project/createTask", info)
      .then((result) => {
        dispatch(actGetDetailProject(info.projectId));
      })
      .catch((error) => {
        console.log(error);
      });
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
        dispatch(actGetDetailProject(id, history));
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
        dispatch(actGetDetailProject(id, history));
      })
      .catch((error) => {
        setStatus(prevStatusId);
        if (error) {
          message.error(error.response?.data.content);
        }
      });
  };
};

// export const actUpdatePriority = (
//   info,
//   id,
//   prevPriority,
//   setPriority,
//   history,
//   message
// ) => {
//   return (dispatch) => {
//     console.log(info);
//     api
//       .put(`Project/updatePriority`, info)
//       .then((result) => {
//         dispatch(actGetDetailProject(id, history));
//       })
//       .catch((error) => {
//         setPriority(prevPriority);
//       });
//   };
// };

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
        dispatch(actGetDetailProject(id, history));
        if (callBackDifference) {
          callBackDifference();
        }
      })
      .catch((error) => {
        setTask(prevTask);
        if (error) {
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
      .catch((error) => {
        console.log(error);
      });
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
    const { avatar, name, id: userId } = getState().loginReducer.data;

    api
      .post("Comment/insertComment", info)
      .then((result) => {
        dispatch(actGetDetailProject(id, history));
        setTask({
          ...prevTask,
          lstComment: [
            ...prevTask.lstComment,
            {
              id: result.data.content.id,
              userId,
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
        dispatch(actGetDetailProject(id, history));
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
