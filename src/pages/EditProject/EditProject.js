import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { actGetDetailProject, actEditProject } from "./modules/actions";
import Loader from "../../components/Loader/Loader";

function EditProject(props) {
  const id = props.match.params.id;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actGetDetailProject(id));
  }, [dispatch, id]);
  const detail = useSelector((state) => state.editProjectReducer.data);
  const loading = useSelector((state) => state.editProjectReducer.loading);
  const allCategory = useSelector(
    (state) => state.editProjectReducer.allCategory
  );

  const [state, setState] = useState({
    id: 0,
    projectName: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    if (detail) {
      setState({
        id: detail?.id,
        projectName: detail?.projectName,
        description: detail?.description,
        categoryId: detail?.projectCategory.id.toString(),
      });
    }
  }, [detail, id]);

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleEdit = (e) => {
    e.preventDefault();

    dispatch(actEditProject(state.id, state, props.history));
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container">
      <h3>Edit Project {state.id}</h3>
      <hr className="mt-1 mb-1" />
      <form onSubmit={handleEdit}>
        <div className="row">
          <div className="col-sm-4">
            <div className="form-group">
              <label>Project id</label>
              <input
                type="text"
                name="id"
                disabled={true}
                value={state.id}
                className="form-control"
              />
            </div>
          </div>
          <div className="col-sm-4">
            <div className="form-group">
              <label>Project name</label>
              <input
                type="text"
                name="projectName"
                value={state?.projectName}
                onChange={handleOnchange}
                placeholder="name"
                className="form-control"
              />
            </div>
          </div>
          <div className="col-sm-4">
            <div className="form-group">
              <label>Project category</label>
              <select
                className="form-control"
                aria-label="Default select example"
                name="categoryId"
                value={detail?.projectCategory.id}
                onChange={handleOnchange}
              >
                {allCategory?.map((category, index) => {
                  return (
                    <option key={index} value={category.id}>
                      {category.projectCategoryName}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label>Description</label>
              <textarea
                type="text"
                rows="8"
                name="description"
                value={state.description}
                onChange={handleOnchange}
                className="form-control"
                placeholder="Enter project description here"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 d-flex justify-content-end container">
            <Link
              type="button"
              to="/"
              className="btn btn-warning mx-1 my-1"
              onClick={() => {
                setState({
                  id: 0,
                  projectName: "",
                  description: "",
                  categoryId: 0,
                });
              }}
            >
              Cancel
            </Link>
            <button type="submit" className="btn btn-primary mx-1 my-1">
              Edit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditProject;
