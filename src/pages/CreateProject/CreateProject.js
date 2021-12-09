import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actGetCategory } from "../EditProject/modules/actions";
import { actCreateProject } from "./modules/actions";

function CreateProject(props) {
  const [state, setstate] = useState({
    projectName: "",
    description: "",
    categoryId: 0,
    alias: "",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actGetCategory());
  }, [dispatch]);

  const allCategory = useSelector(
    (state) => state.editProjectReducer.allCategory
  );

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setstate({
      ...state,
      [name]: value,
    });
  };

  const handleCreate = (e) => {
    e.preventDefault();

    dispatch(actCreateProject(state, props.history));
  };

  return (
    <div className="container">
      <h3>Create Project</h3>
      <form onSubmit={handleCreate}>
        <div className="form-group">
          <label>Name:</label>
          <input
            className="form-control"
            name="projectName"
            placeholder="Project name"
            onChange={handleOnchange}
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            rows="8"
            className="form-control"
            name="description"
            placeholder="Enter description here"
            onChange={handleOnchange}
          />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <select
            className="form-control"
            aria-label="Default select example"
            name="categoryId"
            defaultValue={state.categoryId}
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
        <div className="form-group">
          <button className="btn btn-primary" type="submit">
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateProject;
