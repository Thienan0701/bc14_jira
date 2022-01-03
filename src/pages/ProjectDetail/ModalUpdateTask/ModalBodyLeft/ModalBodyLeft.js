import { Editor } from "@tinymce/tinymce-react";
import { message } from "antd";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  actDeleteComment,
  actInsertComment,
  actUpdateTask,
} from "../../modules/actions";
import Action from "../Action/Action";
import CommentItem from "./CommentItem/CommentItem";

export default function ModalBodyLeft(props) {
  const {
    taskDetailReal,
    setTaskDetailReal,
    inputDescriptionRefFake,
    handleClear,
    commenting,
    addEventListenerKeyPress,
    inputCommentRefReal,
    inputCommentRefFake,
    handleFocusRealComment,
    contentComment,
    isFirst,
    setIsFirst,
    setContentComment,
    taskUpdate,
    setCommenting,
    setTaskType,
    history,
  } = props;

  const [description, setDescription] = useState("");

  const inputDescriptionRefReal = useRef();

  const { data } = useSelector((state) => state.projectDetailReducer);
  const { data: userLogin } = useSelector((state) => state.loginReducer);

  const dispatch = useDispatch();

  const handleOnEditorChange = (value) => {
    setDescription(value);
  };

  useEffect(() => {
    if (taskDetailReal.description) {
      setDescription(taskDetailReal.description);
    }
  }, [taskDetailReal.description]);

  const handleDisplayDescriptionReal = () => {
    inputDescriptionRefReal.current.style.display = "none";
    inputDescriptionRefFake.current.style.display = "block";
  };

  const handleChangeDescription = () => {
    const prevTaskDetailReal = taskDetailReal;
    const id = data.id;
    setTaskDetailReal({
      ...taskDetailReal,
      description: description,
    });
    const info = {
      ...taskUpdate,
      listUserAsign: taskDetailReal?.assigness?.reduce((total, item) => {
        return [...total, item.id];
      }, []),
      description: description,
    };

    dispatch(
      actUpdateTask(
        info,
        id,
        prevTaskDetailReal,
        setTaskDetailReal,
        history,
        message,
        handleDisplayDescriptionReal
      )
    );
  };

  const handleCancelDescription = (e) => {
    inputDescriptionRefReal.current.style.display = "none";
    inputDescriptionRefFake.current.style.display = "block";
    setDescription(taskDetailReal.description);
  };

  // set up comment
  const handleInsertComment = () => {
    if (contentComment) {
      const prevTaskDetailReal = { ...taskDetailReal };

      const info = {
        taskId: taskDetailReal.taskId,
        contentComment: contentComment,
      };

      const id = data.id;

      setTaskDetailReal({
        ...taskDetailReal,
        lstComment: [
          ...taskDetailReal.lstComment,
          {
            avatar: userLogin.avatar,
            commentContent: contentComment,
            idUser: userLogin.id,
            name: userLogin.name,
          },
        ],
      });

      dispatch(
        actInsertComment(
          info,
          id,
          history,
          setTaskDetailReal,
          prevTaskDetailReal,
          message,
          setContentComment
        )
      );
    }
  };

  const handleCancelComment = (e) => {
    if (inputCommentRefFake && inputCommentRefReal) {
      addEventListenerKeyPress();
      inputCommentRefFake.current.style.display = "block";
      inputCommentRefReal.current.style.display = "none";
      setCommenting(false);
    }
  };

  const handleDeleteComment = (comment) => {
    const prevTaskDetailReal = { ...taskDetailReal };
    const id = data.id;
    const commentId = comment.id;
    const taskId = taskDetailReal.taskId;
    setTaskType(false);

    setTaskDetailReal({
      ...taskDetailReal,
      lstComment: taskDetailReal.lstComment.filter((item) => {
        return comment.id !== item.id;
      }),
    });

    dispatch(
      actDeleteComment(
        commentId,
        id,
        history,
        setTaskDetailReal,
        prevTaskDetailReal,
        message,
        taskId
      )
    );
  };
  return (
    <div className="modal-body-update-left">
      <div className="modal-body-update-left-container">
        <div className="header">
          <div type="text" className="task-name">
            {taskDetailReal?.taskName}
          </div>
        </div>
        <div className="modal-left-content">
          <div className="description">
            <span className="title">Description</span>
            <div
              ref={inputDescriptionRefFake}
              className="description-fake"
              onClick={(e) => {
                inputDescriptionRefFake.current.style.display = "none";
                inputDescriptionRefReal.current.style.display = "block";
              }}
            >
              {taskDetailReal?.description.length ? (
                <span
                  dangerouslySetInnerHTML={{
                    __html: description,
                  }}
                />
              ) : (
                <span>Add a description...</span>
              )}
            </div>
            <div ref={inputDescriptionRefReal} style={{ display: "none" }}>
              <Editor
                id="description-update-task"
                // onInit={(evt, editor) => (editorRef.current = editor)}
                value={description}
                init={{
                  height: 300,
                  menubar: false,
                  plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code help wordcount",
                  ],
                  toolbar:
                    "undo redo | formatselect | " +
                    "bold italic backcolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
                onFocus={() => {
                  handleClear();
                }}
                onBlur={() => {
                  if (!commenting) {
                    addEventListenerKeyPress();
                  }
                  if (inputCommentRefReal.current?.style.display === "block") {
                    handleClear();
                  }
                }}
                onEditorChange={handleOnEditorChange}
              />
              <Action
                handleSave={handleChangeDescription}
                handleCancel={handleCancelDescription}
              />
            </div>
          </div>
          <div className="comment">
            <span className="title">Comments</span>

            <div className="comment-item">
              <div className="avatar">
                <img src={userLogin.avatar} alt="" />
              </div>
              <div className="comment-input">
                <div ref={inputCommentRefFake}>
                  <div
                    onClick={(e) => {
                      if (inputCommentRefReal) {
                        setCommenting(false);
                        setIsFirst(false);
                        handleFocusRealComment(false);
                      }
                    }}
                    className="input-comment"
                  >
                    Add a comment
                  </div>
                  <div className="tip">
                    <strong>Pro tip: </strong> press <span>M</span> to comment
                  </div>
                </div>
                <div
                  ref={inputCommentRefReal}
                  style={{
                    display: "none",
                  }}
                >
                  <textarea
                    placeholder="Add a comment"
                    value={contentComment}
                    onChange={(e) => {
                      if (isFirst) {
                        setIsFirst(false);
                      } else {
                        setContentComment(e.target.value);
                      }
                    }}
                  ></textarea>
                  <Action
                    handleSave={handleInsertComment}
                    handleCancel={handleCancelComment}
                  />
                </div>
              </div>
            </div>
            {[...taskDetailReal?.lstComment].reverse().map((item, index) => {
              return (
                <CommentItem
                  key={index}
                  item={item}
                  history={history}
                  taskDetailReal={taskDetailReal}
                  setTaskDetailReal={setTaskDetailReal}
                  handleDeleteComment={handleDeleteComment}
                  handleClear={handleClear}
                  addEventListenerKeyPress={addEventListenerKeyPress}
                  commenting={commenting}
                  inputCommentRefReal={inputCommentRefReal}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
