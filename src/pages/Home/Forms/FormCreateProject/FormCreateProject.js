import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actCreateProject, actGetCategory } from "../../modules/actions";

import { Editor } from "@tinymce/tinymce-react";
import {
  actCloseDrawerCommon,
  setCallBack,
  setCallbackClose,
  setCallbackFocus,
} from "../../../../components/DrawerCommon/modules/actions";
import { message } from "antd";

function FormCreateProject(props) {
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
  });

  const editorRef = useRef(null);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actGetCategory());
    dispatch(setCallbackClose(handleClose));
    dispatch(setCallBack(handleCreateProject));
  }, []);

  const allCategory = useSelector((state) => state.homeReducer.allCategory);

  const handleOnchange = (e) => {
    const { name, value } = e.target;

    setState({
      ...state,
      values: { ...state.values, [name]: value },
      errors: { ...state.errors, [name]: "" },
    });
  };

  const handleErors = (e) => {
    const { name, value } = e.target;
    if (!value) {
      setState({
        ...state,
        errors: { ...state.errors, [name]: "Project name is required!" },
      });
      return false;
    } else {
      setState({
        ...state,
        errors: { ...state.errors, [name]: "" },
      });
      return true;
    }
  };

  const handleOnEditorChange = (value) => {
    setState({
      ...state,
      values: { ...state.values, description: value },
    });
  };

  const handleValidation = () => {
    let isValid = true;
    let messageProjectName = "";
    let messageDescription = "";
    if (!state.values.projectName) {
      messageProjectName = "Project name is required!";
      isValid = false;
    }

    setState({
      ...state,
      errors: {
        projectName: messageProjectName,
        description: messageDescription,
      },
    });
    return isValid;
  };

  const handleCreateProject = (e) => {
    e.preventDefault();
    const isValid = handleValidation();
    if (isValid) {
      dispatch(actCreateProject(state.values, props.history, message));
    }
  };

  const resetForm = () => {
    setState({
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
    });
  };

  const handleClose = () => {
    resetForm();
    dispatch(actCloseDrawerCommon());
  };
  const btnSubmitRef = useRef(null);

  useEffect(() => {
    if (btnSubmitRef) {
      dispatch(setCallbackFocus(() => btnSubmitRef.current.focus()));
    }
  }, [btnSubmitRef]);

  return (
    <div className="container">
      <form onSubmit={handleCreateProject}>
        <div className="form-group">
          <label>Name:</label>
          <input
            value={state.values.projectName}
            className="input-global input-project"
            name="projectName"
            placeholder="Project name"
            onBlur={handleErors}
            onChange={handleOnchange}
          />
          {state.errors.projectName ? (
            <p className="text-danger">{state.errors.projectName}</p>
          ) : (
            " "
          )}
        </div>
        <div className="form-group">
          <label>Category:</label>
          <select
            className="input-global input-project"
            aria-label="Default select example"
            name="categoryId"
            value={state.values.categoryId}
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
          <label htmlFor="description">Descriptions:</label>

          <Editor
            id="description"
            onInit={(evt, editor) => (editorRef.current = editor)}
            value={state.values.description}
            initialValue=""
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
            onEditorChange={handleOnEditorChange}
          />
        </div>

        <div className="form-group text-right">
          <button
            ref={btnSubmitRef}
            className="btn-global btn-global-primary  mr-1"
            type="submit"
          >
            Create
          </button>
          <button
            onClick={handleClose}
            className="btn-global btn-global-secondary"
            type="button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormCreateProject;
