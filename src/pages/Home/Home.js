import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actFetchListProject } from "./modules/actions";
import Project from "./Project/Project";

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actFetchListProject());
  }, [dispatch]);

  const data = useSelector((state) => state.homeReducer.data);

  const renderListProject = () => {
    return data?.map((project) => {
      return <Project key={project.id} project={project} />;
    });
  };

  return (
    <div className="container">
      <h3>Project management</h3>
      <div className="table-responsive mt-3 mb-5" style={{ height: 500 }}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">projectName</th>
              <th scope="col">category</th>
              <th scope="col">creator</th>
              <th scope="col">members</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>{renderListProject()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
