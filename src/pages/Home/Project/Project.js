import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  actDeleteProject,
  actFetchListProject,
  actSearchUser,
  actAsignUserProject,
  actDeleteUserProject,
} from "../modules/actions";
import { Popconfirm, message, Popover, AutoComplete } from "antd";

function Project(props) {
  const { project } = props;

  const dispatch = useDispatch();
  const [state, setstate] = useState({
    visible: false,
  });

  const searchData = useSelector((state) => state.homeReducer.searchdata);

  const [value, setValue] = useState("");
  //confirm delete project
  function confirm() {
    dispatch(actDeleteProject(project.id));
    //reload lai danh sach;
    dispatch(actFetchListProject());
    message.success("Deleted");
  }

  function cancel() {
    message.error("Clicked on No");
  }

  //The hien cac loi, ket qua cua action add,remove user project
  const [error, setError] = useState({});
  const asignErr = useSelector((state) => state.homeReducer.asignErr);
  const asignResult = useSelector((state) => state.homeReducer.asignResult);
  const deleteUserResult = useSelector(
    (state) => state.homeReducer.deleteUserResult
  );
  const deleteUserErr = useSelector((state) => state.homeReducer.deleteUserErr);
  useEffect(() => {
    setError({
      asignErr: asignErr,
      asignResult: asignResult,
      deleteUserResult: deleteUserResult,
      deleteUserErr: deleteUserErr,
    });
  }, [asignErr, asignResult, deleteUserErr, deleteUserResult]);

  const showErr = () => {
    if (error.asignErr) {
      return message.error("You dont have permission on this project");
    } else if (asignResult) {
      return message.success("User added to project");
    }
  };
  const showErrRemoveUser = () => {
    if (error.deleteUserErr) {
      return message.error("You dont have permission on this project");
    } else if (deleteUserResult) {
      return message.success("User removed from project");
    }
  };

  // Content cac member cua project
  const content = (
    <div className="table-responsive " style={{ height: 300 }}>
      <table className="table">
        <thead>
          <tr>
            <th>id</th>
            <th>avatar</th>
            <th>username</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {project?.members.map((member) => {
            return (
              <tr key={member.userId}>
                <td>{member.userId}</td>
                <td>
                  <img
                    src={member.avatar}
                    alt="sdsds"
                    style={{ borderRadius: "50%", width: 30, height: 30 }}
                  />
                </td>
                <td>{member.name}</td>
                <td>
                  <button
                    className="btn-sm btn-danger"
                    style={{ borderRadius: "50%" }}
                    onClick={() => {
                      dispatch(
                        actDeleteUserProject({
                          projectId: project.id,
                          userId: member.userId,
                        })
                      );
                      if (error.deleteUserResult) {
                        dispatch(actFetchListProject());
                      }
                      showErrRemoveUser();
                    }}
                  >
                    X
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  //Nut them user vao project

  const handleVisibleChange = (visible) => {
    setstate({ visible });
  };

  return (
    <tr>
      <th scope="row">{project.id}</th>
      <td>
        <Link to={`/project-detail/${project.id}`} className="text-primary">
          {project.projectName}
        </Link>
      </td>
      <td>{project.categoryName}</td>
      <td>
        <span className="text-success border border-success rounded px-1 py-1">
          {project.creator?.name}
        </span>
      </td>
      <td>
        {project.members.slice(0, 2).map((member) => {
          return (
            <Popover content={content} title="Members" key={member.userId}>
              <img
                src={member.avatar}
                title={member.name}
                alt="frf"
                style={{ width: 40, height: 40, borderRadius: "50%" }}
              />
            </Popover>
          );
        })}
        <Popover
          content={() => {
            return (
              <AutoComplete
                options={searchData?.slice(0, 10).map((opts) => {
                  return {
                    label: opts.name,
                    value: opts.userId.toString(),
                  };
                })}
                value={value}
                className="w-100"
                onChange={(txt) => {
                  setValue(txt);
                }}
                onSelect={(option, values) => {
                  //set lai gia tri hop thoai
                  setValue(values.label);
                  setstate({ visible: !state.visible });

                  dispatch(
                    actAsignUserProject({
                      projectId: project.id,
                      userId: option,
                    })
                  );
                  if (error.asignResult) {
                    dispatch(actFetchListProject());
                  }
                  showErr();
                }}
                onSearch={(value) => {
                  dispatch(actSearchUser(value));
                }}
              />
            );
          }}
          title="Add member"
          trigger="click"
          visible={state.visible}
          onVisibleChange={handleVisibleChange}
        >
          <button
            className="btn-sm btn-secondary ml-1"
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
            }}
          >
            <i className="fas fa-plus"></i>
          </button>
        </Popover>
      </td>
      <td>
        <div className="row">
          <div className="col-md-6">
            <Link
              type="button"
              className="btn-sm btn-primary"
              title="Edit Project"
              to={`edit/${project.id}`}
            >
              <i className="fas fa-pen"></i>
            </Link>
          </div>
          <div className="col-md-6">
            <Popconfirm
              title="Are you sure to delete this project?"
              onConfirm={confirm}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <button
                type="button"
                className="btn-sm btn-danger"
                title="Delete Project"
              >
                <i className="far fa-trash-alt"></i>
              </button>
            </Popconfirm>
          </div>
        </div>
      </td>
    </tr>
  );
}

export default Project;
