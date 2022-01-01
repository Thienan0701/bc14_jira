import React, { useEffect, useState } from "react";
import _ from "lodash";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { updateStatus } from "../modules/actions";
import { useSelector } from "react-redux";
import TaskDetail from "./TaskDetail/TaskDetail";
import { message } from "antd";

const Content = (props) => {
  const [listTask, setListTask] = useState();
  const dispatch = useDispatch();
  const { arrUserFilter, arrPriorityFilter, valueSearch } = props;
  const { id } = props.match.params;

  const { data } = useSelector((state) => state.projectDetailReducer);

  useEffect(() => {
    if (data) {
      setListTask(data?.lstTask);
    }
  }, [data]);

  const handleDragEnd = (result) => {
    const listTaskPrev = listTask;
    const { destination, source } = result;
    if (destination) {
      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }
      if (
        destination.droppableId === source.droppableId &&
        destination.index !== source.index
      ) {
        return;
      }

      const listTaskTemp = [...listTask];
      const indexDropSource = +source.droppableId - 1;
      const indexDropDestination = +destination.droppableId - 1;
      const arrTempSource = [...listTask[indexDropSource].lstTaskDeTail];
      const arrTempDestination = [
        ...listTask[indexDropDestination].lstTaskDeTail,
      ];
      const tempSource = { ...arrTempSource[source.index] };

      arrTempSource.splice(source.index, 1);
      listTaskTemp.splice(indexDropSource, 1, {
        ...listTaskTemp[indexDropSource],
        lstTaskDeTail: arrTempSource,
      });
      arrTempDestination.push(tempSource);

      listTaskTemp.splice(indexDropDestination, 1, {
        ...listTaskTemp[indexDropDestination],
        lstTaskDeTail: [...arrTempDestination],
      });
      dispatch(
        updateStatus(
          {
            taskId: tempSource.taskId,
            statusId: destination.droppableId,
          },
          id,
          props.history,
          setListTask,
          listTaskPrev,
          message
        )
      );

      setListTask(listTaskTemp);
    }
  };

  const handleRenderCol = (lstTaskDeTail, provided) => {
    let lstTaskDeTailTemp = [...lstTaskDeTail];

    if (arrUserFilter.length) {
      lstTaskDeTailTemp = lstTaskDeTailTemp.filter((item) => {
        const assigness = item.assigness.filter((item) => {
          return arrUserFilter.includes(item.id);
        });
        if (assigness.length) {
          return item;
        }
      });
    }

    if (arrPriorityFilter.length) {
      lstTaskDeTailTemp = lstTaskDeTailTemp.filter((item) => {
        return arrPriorityFilter.includes(item.priorityTask.priorityId);
      });
    }
    if (valueSearch) {
      lstTaskDeTailTemp = lstTaskDeTailTemp.filter((item) => {
        return item.taskName
          .trim()
          .toLowerCase()
          .includes(valueSearch.trim().toLowerCase());
      });
    }

    return lstTaskDeTailTemp.map((task, index) => {
      return (
        <Draggable
          key={task.taskId + ""}
          draggableId={task.taskId + ""}
          {...provided.draggableProps}
          index={index}
        >
          {(provided) => {
            return (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className="project-content-content"
              >
                <TaskDetail
                  isOpen={props.isOpen}
                  setIsOpen={props.setIsOpen}
                  task={task}
                />
              </div>
            );
          }}
        </Draggable>
      );
    });
  };

  return (
    <div className="project-content">
      <div className="project-content-wrapper">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="project-content-list">
            {_.map(listTask, (taskListDetail, index) => {
              return (
                <div key={index} className="project-content-col">
                  <div className="project-content-container">
                    <div className="project-content-item-title">
                      {taskListDetail.statusName}
                    </div>
                    <Droppable
                      key={index}
                      droppableId={taskListDetail.statusId}
                    >
                      {(provided) => {
                        return (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="content-list"
                          >
                            {handleRenderCol(
                              taskListDetail.lstTaskDeTail,
                              provided
                            )}

                            {provided.placeholder}
                          </div>
                        );
                      }}
                    </Droppable>
                  </div>
                </div>
              );
            })}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Content;
