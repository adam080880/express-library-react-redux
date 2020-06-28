import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { openModal } from "../redux/actions/controllerPage";
import { getGenre } from "../redux/actions/genre";
import { getAuthor } from "../redux/actions/author";

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  getAuthor,
  getGenre,
  openModal,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)((props) => (
  <div
    className="bottom-bar border d-block d-lg-none px-3 py-2 position-fixed flex-row d-flex bg-white shadow-sm align-items-center justify-content-between"
    style={{
      width: "100%",
      bottom: 0,
      zIndex: 100,
      overflowX: "auto",
    }}
  >
    <div className="d-flex align-items-center flex-column flex-grow-1 text-center justify-content-center">
      <Link
        to="/dashboard/catalog"
        style={{ fontSize: "13px" }}
        className="ml-0 pl-0 text-dark"
      >
        <span
          style={{ fontSize: "18px", textAlign: "center" }}
          className="fas fa-book mb-1 d-block text-dark"
        ></span>
        <span style={{ fontSize: "13px", color: "black" }}>Catalog</span>
      </Link>
    </div>
    {Object.keys(props.auth.session).length > 0 && props.auth.session.name && (
      <div className="d-flex align-items-center flex-column flex-grow-1 text-center justify-content-center">
        <div className="d-flex align-items-center flex-column justify-content-center">
          <Link
            to="/dashboard/history"
            style={{ fontSize: "13px" }}
            className="ml-0 pl-0"
          >
            <span
              style={{ fontSize: "18px", textAlign: "center" }}
              className="fas fa-history mb-1 text-dark d-block"
            ></span>
            <span style={{ fontSize: "13px", color: "black" }}>History</span>
          </Link>
        </div>
      </div>
    )}
    {Object.keys(props.auth.session).length > 0 && !props.auth.session.name && (
      <div className="d-flex align-items-center flex-column justify-content-center flex-grow-1 text-center">
        <div className="d-flex align-items-center flex-column justify-content-center">
          <Link
            to="#"
            onClick={(e) => {
              e.preventDefault();
              props.openModal("complete_biodata");
            }}
            style={{ fontSize: "13px" }}
            className="ml-0 pl-0"
          >
            <span
              style={{ fontSize: "18px", textAlign: "center" }}
              className="fas fa-scroll mb-1 text-dark d-block"
            ></span>
            <span style={{ fontSize: "13px", color: "black" }}>Biodata</span>
          </Link>
        </div>
      </div>
    )}
    {Object.keys(props.auth.session).length > 0 &&
      (props.auth.session.role.toLowerCase() === "super admin" ||
        props.auth.session.role.toLowerCase() === "admin") && (
        <div className="d-flex align-items-center flex-column justify-content-center flex-grow-1 text-center">
          <Link
            to="#"
            onClick={(e) => {
              e.preventDefault();
              props.openModal("add_book");
              props.getAuthor();
              props.getGenre();
            }}
            style={{ fontSize: "13px" }}
            className="ml-0 pl-0"
          >
            <span
              style={{ fontSize: "18px", textAlign: "center" }}
              className="fas fa-plus mb-1 text-dark d-block"
            ></span>
            <span style={{ fontSize: "13px", color: "black" }}>Add Book</span>
          </Link>
        </div>
      )}
    {Object.keys(props.auth.session).length > 0 &&
      (props.auth.session.role.toLowerCase() === "super admin" ||
        props.auth.session.role.toLowerCase() === "admin") && (
        <div className="d-flex align-items-center flex-column justify-content-center flex-grow-1 text-center">
          <Link
            to="/dashboard/users"
            style={{ fontSize: "13px" }}
            className="ml-0 pl-0"
          >
            <span
              style={{ fontSize: "18px", textAlign: "center" }}
              className="fas fa-users mb-1 text-dark d-block"
            ></span>
            <span style={{ fontSize: "13px", color: "black" }}>Users</span>
          </Link>
        </div>
      )}
    {Object.keys(props.auth.session).length > 0 &&
      (props.auth.session.role.toLowerCase() === "super admin" ||
        props.auth.session.role.toLowerCase() === "admin") && (
        <div className="d-flex align-items-center flex-column justify-content-center flex-grow-1 text-center">
          <Link
            to="/dashboard/configs"
            style={{ fontSize: "13px" }}
            className="ml-0 pl-0"
          >
            <span
              style={{ fontSize: "18px", textAlign: "center" }}
              className="fas fa-cog mb-1 text-dark d-block"
            ></span>
            <span style={{ fontSize: "13px", color: "black" }}>Configs</span>
          </Link>
        </div>
      )}
  </div>
));
