import React from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { openModal } from "../redux/actions/controllerPage";
import { getAuthor } from "../redux/actions/author";
import { getGenre } from "../redux/actions/genre";

class Sidebar extends React.Component {
  render() {
    const user =
      Object.keys(this.props.auth.session).length > 0 &&
      this.props.auth.session;
    return (
      <div className="sidebar text-white sticky-top vh-100">
        <div
          className="d-flex flex-column justify-content-between"
          style={{ height: "100%" }}
        >
          <div className="p-3 flex-grow-1 d-flex flex-column justify-content-center mb-5 pb-5">
            <div>
              Hello, <br />
              <b>{user ? user.email : "Guest"}</b>
            </div>
            <div className="mt-3 ml-0 mb-5">
              <div className="nav pl-0 flex-column sidebar-menu">
                <div className="nav-item">
                  <Link to="/dashboard/catalog" className="nav-link ml-0 pl-0">
                    Catalog
                  </Link>
                </div>
                {user && user.name && (
                  <div className="nav-item">
                    <Link
                      to="/dashboard/history"
                      className="nav-link ml-0 pl-0"
                    >
                      History Transaction
                    </Link>
                  </div>
                )}
                {user && !user.name && (
                  <div className="nav-item">
                    <Link
                      to="#"
                      onClick={(e) => {
                        e.preventDefault();
                        this.props.openModal("complete_biodata");
                      }}
                      className="nav-link ml-0 pl-0"
                    >
                      Complete Biodata
                    </Link>
                  </div>
                )}
                {user &&
                  (user.role.toLowerCase() === "super admin" ||
                    user.role.toLowerCase() === "admin") && (
                    <div className="nav-item">
                      <Link
                        to="#"
                        onClick={(e) => {
                          e.preventDefault();
                          this.props.openModal("add_book");
                          this.props.getGenre();
                          this.props.getAuthor();
                        }}
                        className="nav-link ml-0 pl-0"
                      >
                        Add Book
                      </Link>
                    </div>
                  )}
                {user &&
                  (user.role.toLowerCase() === "super admin" ||
                    user.role.toLowerCase() === "admin") && (
                    <div className="nav-item">
                      <Link
                        to="/dashboard/users"
                        className="nav-link ml-0 pl-0"
                      >
                        Users
                      </Link>
                    </div>
                  )}
                {user &&
                  (user.role.toLowerCase() === "super admin" ||
                    user.role.toLowerCase() === "admin") && (
                    <div className="nav-item">
                      <Link
                        to="/dashboard/configs"
                        className="nav-link ml-0 pl-0"
                      >
                        Configs
                      </Link>
                    </div>
                  )}
              </div>
            </div>
          </div>
          <div className="p-3 bg-sidebar-secondary small">
            &copy; Copyright <b>EXP.L!bs</b>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  controllerPage: state.controllerPage,
});

const mapDispatchToProps = {
  openModal,
  getGenre,
  getAuthor,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
