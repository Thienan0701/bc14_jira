import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actGetDetailProject } from "./modules/actions";

function ProjectDetail(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    const id = props.match.params.id;

    dispatch(actGetDetailProject(id));
  }, [dispatch, props.match.params]);

  const detail = useSelector((state) => state.projectDetailReducer.data);

  const renderAvatar = () => {
    return detail?.members.map((member, index) => {
      return (
        <img
          className="px-1"
          key={index}
          title={member.name}
          src={member.avatar}
          alt="ssds"
          style={{ borderRadius: "50%", width: 30, heigth: 30 }}
        />
      );
    });
  };
  const renderTask = () => {
    return detail?.lstTask.map((task, index) => {
      return (
        <div
          className="col-md-2 mx-3 my-2 d-flex justify-content-between"
          key={index}
        >
          <div className="row">
            <div className="col-md-12">
              <div className="card" style={{ width: "10rem", height: "12rem" }}>
                <div className="card-body">
                  <div className="card-title font-weight-bold">
                    {task.statusName}
                  </div>
                  <hr />
                  <p className="card-text">{task.alias}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="container">
      <h3>Project {detail?.projectName}</h3>
      <div style={{ display: "flex" }}>
        <div className="form-outline">
          <input
            type="search"
            className="form-control"
            placeholder="Search"
            aria-label="Search"
          />
        </div>

        <div className="ml-2" style={{ display: "flex" }}>
          {renderAvatar()}
        </div>
      </div>
      <div className="mt-4 row" style={{ display: "flex" }}>
        {renderTask()}
      </div>
    </div>
  );
}

export default ProjectDetail;
