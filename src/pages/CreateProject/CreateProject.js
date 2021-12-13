import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actGetCategory } from "../EditProject/modules/actions";
import { actCreateProject } from "./modules/actions";

function CreateProject(props) {
  const [state, setState] = useState({
    values: {
      projectName: "",
      description: "",
      categoryId: 0,
      alias: "",
    },
    errors: {
      projectName: "",
      description: "",
    },
    projectNameValid: false,
    descriptionValid: false,
    formValid: false,
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
    setState({
      ...state,
      values: { ...state.values, [name]: value },
    });
  };

  const handleErors = (e) => {
    const { name, value } = e.target;
    let mess = value.trim() === "" ? name + " không được rỗng" : "";
    let { projectNameValid, descriptionValid } = state;
    switch (name) {
      case "projectName":
        projectNameValid = mess === "" ? true : false;

        break;
      case "description":
        descriptionValid = mess === "" ? true : false;

        break;

      default:
        break;
    }
    setState({
      ...state,
      errors: { ...state.errors, [name]: mess },
      projectNameValid,
      descriptionValid,
      formValid: projectNameValid && descriptionValid,
    });
  };

  const handleCreate = (e) => {
    e.preventDefault();

    dispatch(actCreateProject(state.values, props.history));
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
            onBlur={handleErors}
            onChange={handleOnchange}
          />
          {state.errors.projectName ? (
            <div className="alert alert-danger">{state.errors.projectName}</div>
          ) : (
            " "
          )}
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            rows="8"
            className="form-control"
            name="description"
            placeholder="Enter description here"
            onBlur={handleErors}
            onChange={handleOnchange}
          />
          {state.errors.description ? (
            <div className="alert alert-danger">{state.errors.description}</div>
          ) : (
            " "
          )}
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
          <button
            className="btn btn-primary"
            type="submit"
            disabled={!state.formValid}
          >
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateProject;
