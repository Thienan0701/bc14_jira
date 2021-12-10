import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actGetDetailProject } from "../EditProject/modules/actions";

function ProjectDetail(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    const id = props.match.params.id;

    dispatch(actGetDetailProject(id));
  }, [dispatch, props.match.params]);

  const detail = useSelector((state) => state.editProjectReducer.data);
  return (
    <div>
      <h3>Project {detail?.projectName}</h3>
    </div>
  );
}

export default ProjectDetail;
