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
          <a href="#">
            <i className="fa fa-users" aria-hidden="true" /> Friends
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fa fa-cog" aria-hidden="true" /> Settings
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fa fa-info-circle" aria-hidden="true" /> Information
          </a>
        </li>
      </ul>
    </div>
  );
}

export default SideNavHome;
