import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";

import Author from "./ConfigPages/Author";
import Genre from "./ConfigPages/Genre";

class Config extends React.Component {
  render() {
    return (
      <div className="container-fluid p-0 mb-5" style={{ overflowX: "hidden" }}>
        <Breadcrumb>
          <BreadcrumbItem>
            <span>Dashboard</span>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to="/dashboard/config">Config</Link>
          </BreadcrumbItem>
        </Breadcrumb>
        <div className="d-flex flex-row align-items-center justify-content-between px-4 pb-0 mt-3">
          <h3>Configs</h3>
        </div>
        <div className="row px-3">
          <Author />
          <Genre />
        </div>
      </div>
    );
  }
}

export default Config;
