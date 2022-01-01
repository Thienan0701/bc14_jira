import { message } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { actUpdateComment } from "../../../modules/actions";

function useRefObject() {
  const ref = useRef();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ref.current) setReady(true);
  }, [ref.current]);

  return [ref, ready];
}

export default function CommentItem(props) {
  const {
    item,
    handleDeleteComment,
    taskDetailReal,
    setTaskDetailReal,
    history,
    handleClear,
    addEventListenerKeyPress,
    commenting,
    inputCommentRefReal,
  } = props;
  const normalRef = useRef();
  const editRef = useRef();
  const inputEditRef = useRef();
  const contentRef = useRef();
  const [commentContent, setCommentContent] = useState("");

  const normalRefCB = useCallback((node) => {
    if (node !== null) {
      normalRef.current = node;
    }
  }, []);

  const editRefCB = useCallback((node) => {
    if (node !== null) {
      editRef.current = node;
    }
  }, []);

  const inputEditRefCB = useCallback((node) => {
    if (node !== null) {
      inputEditRef.current = node;
    }
  }, []);
  const contentRefCB = useCallback((node) => {
    if (node !== null) {
      contentRef.current = node;
    }
  }, []);

  const { data: userLogin } = useSelector((state) => state.loginReducer);

  const { data } = useSelector((state) => state.projectDetailReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (item.commentContent) {
      setCommentContent(item.commentContent);
    }
  }, [item.commentContent]);

  const handleChangeNormalToEdit = (e) => {
    if (
      normalRef.current &&
      editRef.current &&
      inputEditRef.current &&
      contentRef.current
    ) {
      normalRef.current.style.display = "none";
      inputEditRef.current.style.display = "block";
      editRef.current.style.display = "flex";
      contentRef.current.style.display = "none";
    }
  };

  const handleChangeEditToNormal = () => {
    if (
      normalRef.current &&
      editRef.current &&
      inputEditRef.current &&
      contentRef.current
    ) {
      normalRef.current.style.display = "flex";
      inputEditRef.current.style.display = "none";
      editRef.current.style.display = "none";
      contentRef.current.style.display = "block";
    }
  };
  useEffect(() => {
    setCommentContent(item.commentContent);
    handleChangeEditToNormal();
  }, [taskDetailReal]);

  const handleEditComment = () => {
    const prevTask = taskDetailReal;
    let tempComment = { ...item };
    const { lstComment } = taskDetailReal;
    let lstCommentTemp = [...lstComment];
    const indexComment = lstComment?.findIndex(
      (item) => item.id === props.item.id
    );
    if (indexComment !== -1) {
      tempComment.commentContent = commentContent;
      lstCommentTemp[indexComment] = tempComment;
      setTaskDetailReal({
        ...taskDetailReal,
        lstComment: lstCommentTemp,
      });
      const info = {
        id: lstCommentTemp[indexComment].id,
        contentComment: commentContent,
      };
      dispatch(
        actUpdateComment(
          info,
          data?.id,
          history,
          setTaskDetailReal,
          prevTask,
          message,
          setCommentContent,
          item.commentContent,
          handleChangeEditToNormal
        )
      );
    }
  };
  return (
    <div className="comment-item">
      <div className="avatar">
        <img src={item.avatar} alt="" />
      </div>
      <div className="comment-comment">
        <div className="author">
          <div>{item.name}</div>
        </div>
        <p ref={contentRefCB} className="comment-content">
          {item.commentContent}
        </p>
        {item.idUser === userLogin.id ? (
          <>
            <input
              style={{
                display: "none",
              }}
              ref={inputEditRefCB}
              type="text"
              value={commentContent}
              onChange={(e) => {
                setCommentContent(e.target.value);
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
            />

            <div>
              <div ref={normalRefCB} className="action">
                <span onClick={handleChangeNormalToEdit}>Edit</span>{" "}
                <div className="dot">·</div>
                <span
                  onClick={() => {
                    handleDeleteComment(item);
                  }}
                >
                  Delete
                </span>
              </div>
              <div
                style={{
                  display: "none",
                }}
                ref={editRefCB}
                className="action"
              >
                <span onClick={handleEditComment}>Save</span>{" "}
                <div className="dot">·</div>
                <span
                  onClick={() => {
                    setCommentContent(item.commentContent);
                    handleChangeEditToNormal();
                  }}
                >
                  Cancel
                </span>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
