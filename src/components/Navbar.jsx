import React from "react";
import { connect } from "react-redux";

import { Link, Redirect } from "react-router-dom";

import { logout } from "../redux/actions/auth";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRedirect: false,
    };
  }

  logout = (e) => {
    this.props.logout();
    this.setState({
      isRedirect: true,
    });
  };

  render() {
    return this.state.isRedirect ? (
      <Redirect to="/auth/login" />
    ) : (
      <div
        className="navbar navbar-expand-lg sticky-top navbar-light bg-white shadow-sm d-flex flex-row justify-content-between align-items-center px-4"
        style={{ height: "70px" }}
      >
        <Link className="navbar-brand font-weight-bold" to="/">
          EXP.L!bs
        </Link>
        <ul className="navbar-nav">
          {this.props.auth.session.token && (
            <li className="nav-item">
              <Link
                to="#"
                className="px-3 nav-link btn btn-danger text-white font-weight-bold  btn-sm ml-3"
                onClick={this.logout}
              >
                Logout
              </Link>
            </li>
          )}
          {!this.props.auth.session.token && (
            <li className="nav-item">
              <Link
                to="/auth/login"
                className="btn btn-outline-primary font-weight-bold ml-3"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
