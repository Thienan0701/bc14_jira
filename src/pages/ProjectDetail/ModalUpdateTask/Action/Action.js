import React from "react";

export default function Action(props) {
  const { handleSave, handleCancel } = props;
  return (
    <div>
      <div className="action-common">
        <button className="btn-save" onClick={handleSave}>
          <span>Save</span>
        </button>
        <button onClick={handleCancel} className="btn-cancel">
          <span>Cancel</span>
        </button>
      </div>
    </div>
  );
}
