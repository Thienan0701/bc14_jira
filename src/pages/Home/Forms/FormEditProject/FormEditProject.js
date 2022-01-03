import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actEditProject, actGetCategory } from "../../modules/actions";

import { Editor } from "@tinymce/tinymce-react";
import {
  setCallBack,
  actCloseDrawerCommon,
  setCallbackClose,
  setCallbackFocus,
} from "../../../../components/DrawerCommon/modules/actions";
import { message } from "antd";

function FormEditProject(props) {
  const [state, setState] = useState({
    values: {
      id: 0,
      projectName: "",
      description: "",
      category: "",
      categoryId: "",
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
  }, [dispatch]);

  const { allCategory, projectEdit } = useSelector(
    (state) => state.homeReducer
  );

  const handleOnchange = (e) => {
    const { name, value } = e.target;

    setState({
      ...state,
      values: { ...state.values, [name]: value },
      errors: { ...state.errors, [name]: "" },
    });
  };
  useEffect(() => {
    if (projectEdit) {
      setState({
        ...state,
        values: {
          id: projectEdit.id,
          projectName: projectEdit.projectName,
          description: projectEdit.description,
          category: projectEdit.category,
          categoryId: projectEdit?.projectCategory.id.toString(),
        },
      });
    }
  }, [projectEdit]);

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

  const handleValidation = () => {
    let isValid = true;
    let messageProjectName = "";
    if (!state.values.projectName) {
      messageProjectName = "Project name is required!";
      isValid = false;
    }
    setState({
      ...state,
      errors: {
        projectName: messageProjectName,
      },
    });
    return isValid;
  };

  const handleUpdateProject = (e) => {
    e.preventDefault();
    const isValid = handleValidation();
    if (isValid) {
      dispatch(actEditProject(state.values.id, state.values, message));
    }
  };

  const reSetForm = () => {
    setState({
      values: {
        id: 0,
        projectName: "",
        description: "",
        category: "",
      },
      errors: {
        projectName: "",
        description: "",
      },
    });
  };

  const handleClose = () => {
    reSetForm();
    dispatch(actCloseDrawerCommon());
  };
  useEffect(() => {
    dispatch(setCallBack(handleUpdateProject));
    dispatch(setCallbackClose(handleClose));
  }, []);

  const btnSubmitRef = useRef(null);

  useEffect(() => {
    if (btnSubmitRef.current) {
      dispatch(setCallbackFocus(() => btnSubmitRef.current.focus()));
    }
  }, [btnSubmitRef]);

  return (
    <div className="container">
      <form onSubmit={handleUpdateProject}>
        <div className="form-group">
          <label>ID:</label>
          <input
            className="input-global input-project disabled"
            name="id"
            placeholder="Project name"
            disabled
            value={state.values.id}
          />
        </div>
        <div className="form-group">
          <label>Name:</label>
          <input
            className="input-global input-project"
            name="projectName"
            placeholder="Project name"
            value={state.values.projectName}
            onBlur={handleErors}
            onChange={handleOnchange}
          />
          {state.errors.projectName ? (
            <span className="text-danger">{state.errors.projectName}</span>
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
            defaultValue={state.categoryId}
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
            className="btn-global btn-global-primary mr-1"
            type="submit"
          >
            Update
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

export default FormEditProject;
