import "./sidebar.css";
import { Link } from "react-router-dom";

function SideNavHome() {
  return (
    <div className="sidebar-container">
      <div className="sidebar-logo">Project Name</div>
      <ul className="sidebar-navigation">
        <li className="header">Navigation</li>
        <li>
          <Link to="/">
            <i className="fa fa-home" aria-hidden="true" /> Homepage
          </Link>
        </li>
        <li>
          <Link to="/create-project">
            <i className="fas fa-plus"></i> Create Project
          </Link>
        </li>
        <li className="header">Another Menu</li>
        <li>
          <Link to="/user-manage">
            <i className="fa fa-users" aria-hidden="true" /> User manage
          </Link>
        </li>
        <li>
          <Link to="#">
            <i className="fa fa-users" aria-hidden="true" />
            Settings
          </Link>
        </li>
        <li>
          <Link to="#">
            <i className="fa fa-users" aria-hidden="true" />
            Information
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default SideNavHome;
