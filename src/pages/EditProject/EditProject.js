import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { actGetCategory, actGetDetailProject } from "./modules/actions";
import Loader from "../../components/Loader/Loader";

function EditProject(props) {
  const id = props.match.params.id;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actGetDetailProject(id));
  }, []);
  const detail = useSelector((state) => state.editProjectReducer.data);
  const loading = useSelector((state) => state.editProjectReducer.loading);
  const allCategory = useSelector(
    (state) => state.editProjectReducer.allCategory
  );
  console.log(allCategory);
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="container">
      <h3>Edit Project {id}</h3>
      <hr className="mt-1 mb-1" />
      <form>
        <div className="row">
          <div className="col-sm-4">
            <div className="form-group">
              <label>Project id</label>
              <input
                type="text"
                name="projectId"
                disabled="true"
                value={detail?.id}
                id
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
                value={detail?.projectName}
                placeholder="name"
                id
                className="form-control"
              />
            </div>
          </div>
          <div className="col-sm-4">
            <div className="form-group">
              <label>Project category</label>
              <select class="form-control" aria-label="Default select example">
                <option selected name="categoryId">
                  {detail?.projectCategory.name}
                </option>
                {allCategory?.map((category) => {
                  return (
                    <option value={category.id}>
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
                value={detail?.description}
                className="form-control"
                placeholder="Enter project description here"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 d-flex justify-content-end container">
            <Link type="button" to="/" className="btn btn-warning">
              Cancel
            </Link>
            <button type="button" className="btn btn-primary">
              Edit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditProject;
