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
import Swal from "sweetalert2";

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
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

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
      errors: { ...state.errors, description: "" },
    });
  };

  const handleOnEditorBlur = (e) => {
    if (!state.values.description) {
      setState({
        ...state,
        errors: { ...state.errors, description: "Description is required!" },
      });
      return false;
    } else {
      setState({
        ...state,
        errors: { ...state.errors, description: "" },
      });
      return true;
    }
  };

  const handleValidation = () => {
    let isValid = true;
    let messageProjectName = "";
    let messageDescription = "";
    if (!state.values.projectName) {
      messageProjectName = "Project name is required!";
      isValid = false;
    }
    if (!state.values.description) {
      messageDescription = "Description is required!";
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
      dispatch(actCreateProject(state.values, props.history, Swal));
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
          <label>Category:</label>
          <select
            className="form-control"
            aria-label="Default select example"
            name="categoryId"
            // defaultValue={state.values.categoryId}
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
            onBlur={handleOnEditorBlur}
            onEditorChange={handleOnEditorChange}
          />
          {state.errors.description ? (
            <div className="alert alert-danger">{state.errors.description}</div>
          ) : (
            " "
          )}
        </div>

        <div className="form-group text-right">
          <button
            onClick={handleClose}
            className="btn btn-secondary mr-1"
            type="button"
          >
            Cancel
          </button>
          <button ref={btnSubmitRef} className="btn btn-primary" type="submit">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormCreateProject;
