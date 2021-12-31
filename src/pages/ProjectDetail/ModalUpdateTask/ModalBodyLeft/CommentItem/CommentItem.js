import React from "react";

export default function CommentItem(props) {
  const { item, handleDeleteComment } = props;

  return (
    <div className="comment-item">
      <div className="avatar">
        <img src={item.avatar} alt="" />
      </div>
      <div className="comment-comment">
        <div className="author">
          <div>{item.name}</div>
        </div>
        <p className="comment-content">{item.commentContent}</p>
        <div className="action">
          <span>Edit</span> <div className="dot">·</div>
          <span
            onClick={() => {
              handleDeleteComment(item);
            }}
          >
            Delete
          </span>
        </div>
      </div>
    </div>
  );
}
