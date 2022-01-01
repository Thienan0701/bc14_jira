import React, { useEffect, useState } from "react";

import "./style.scss";
import Header from "./Header/Header";
import Content from "./Content/Content";
import ModalUpdateTask from "./ModalUpdateTask/ModalUpdateTask";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import { useDispatch } from "react-redux";
import { actGetDetailProject } from "./modules/actions";
function ProjectDetail(props) {
  const [isOpen, setIsOpen] = useState(false);
  const { loading } = useSelector((state) => state.projectDetailReducer);
  // setup filter
  const [arrUserFilter, setArrUserFilter] = useState([]);
  const [arrUserFilterCheckbox, setArrUserFilterCheckbox] = useState([]);
  const [arrUserFilterFirst, setArrUserFilterFirst] = useState([]);
  const [arrPriorityFilter, setArrPriorityFilter] = useState([]);
  const [valueSearch, setValueSearch] = useState("");

  const dispatch = useDispatch();

  const { id } = props.match.params;
  useEffect(() => {
    dispatch(actGetDetailProject(id, props.history, true));
  }, [id]);

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }
  return (
    <>
      <div className="project-detail">
        <Header
          arrUserFilter={arrUserFilter}
          setArrUserFilter={setArrUserFilter}
          arrUserFilterCheckbox={arrUserFilterCheckbox}
          setArrUserFilterCheckbox={setArrUserFilterCheckbox}
          arrUserFilterFirst={arrUserFilterFirst}
          setArrUserFilterFirst={setArrUserFilterFirst}
          arrPriorityFilter={arrPriorityFilter}
          setArrPriorityFilter={setArrPriorityFilter}
          valueSearch={valueSearch}
          setValueSearch={setValueSearch}
          {...props}
        />
        <Content
          arrUserFilter={arrUserFilter}
          arrPriorityFilter={arrPriorityFilter}
          valueSearch={valueSearch}
          {...props}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>
      <ModalUpdateTask {...props} isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}

export default ProjectDetail;
