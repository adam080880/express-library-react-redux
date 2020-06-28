import React from "react";
import { connect } from "react-redux";
import qs from "querystring";

import { Link, Redirect } from "react-router-dom";
import { logout } from "../redux/actions/auth";
import { getBook } from "../redux/actions/books";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRedirect: false,
      search: "",
    };
  }

  logout = (e) => {
    this.props.logout();
    this.setState({
      isRedirect: true,
    });
  };

  search = (e) => {
    e.preventDefault();
    const params = {
      ...qs.parse(this.props.location.search.slice(1)),
      ...{ search: this.state.search, page: 1 },
    };

    this.props.history.push("/dashboard/catalog?" + qs.stringify(params));
    this.props.getBook(params);
  };

  render() {
    return this.state.isRedirect ? (
      <Redirect to="/auth/login" />
    ) : (
      <>
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
        {this.props.location.pathname === "/dashboard/catalog" && (
          <div className="bg-white p-2 d-block d-lg-none">
            <form action="" onSubmit={this.search}>
              <div className="form-group mb-0">
                <input
                  type="text"
                  name=""
                  id=""
                  onChange={(e) => this.setState({ search: e.target.value })}
                  placeholder="Search book"
                  className="form-control"
                />
              </div>
            </form>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  logout,
  getBook,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
