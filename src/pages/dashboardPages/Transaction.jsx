import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import ForAdmin from "./TransactionPages/ForAdmin";
import ForMember from "./TransactionPages/ForMember";

import { getMember, getAdmin } from "../../redux/actions/transaction";
import qs from "querystring";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";

class Transaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      limit: 5,
    };
  }

  sortBy = (param) => {
    this.setState({
      sortBy: param,
    });
  };

  status = (param) => {
    this.setState({
      status: param,
    });
  };

  setStatus = (status) => {
    const params = qs.parse(this.props.location.search.slice(1));
    const search = {
      ...params,
      ...{ page: 1, search: status },
    };

    this.props.history.push(`/dashboard/history?${qs.stringify(search)}`);
    if (this.props.auth.session.role === "Member") {
      this.props.getMember(search, this.props.auth.session.token);
    } else if (
      this.props.auth.session.role === "Admin" ||
      this.props.auth.session.role === "Super Admin"
    ) {
      this.props.getAdmin(search, this.props.auth.session.token);
    }
  };

  setSortBy = (sortBy) => {
    const params = {
      ...qs.parse(this.props.location.search.slice(1)),
      ...{ sort: sortBy, page: 1 },
    };
    this.props.history.push("/dashboard/history?" + qs.stringify(params));
    if (this.props.auth.session.role === "Member") {
      this.props.getMember(params, this.props.auth.session.token);
    } else if (
      this.props.auth.session.role === "Admin" ||
      this.props.auth.session.role === "Super Admin"
    ) {
      this.props.getAdmin(params, this.props.auth.session.token);
    }
  };

  search = (e) => {
    e.preventDefault();
    const params = {
      ...qs.parse(this.props.location.search.slice(1)),
      ...{ search: this.state.search, page: 1, limit: this.state.limit },
    };
    this.props.history.push(`/dashboard/history?${qs.stringify(params)}`);
    if (this.props.auth.session.role === "Member") {
      this.props.getMember(params, this.props.auth.session.token);
    } else if (
      this.props.auth.session.role === "Admin" ||
      this.props.auth.session.role === "Super Admin"
    ) {
      this.props.getAdmin(params, this.props.auth.session.token);
    }
  };

  render() {
    return (
      <div className="container-fluid p-0 mb-5" style={{ overflowX: "hidden" }}>
        <Breadcrumb>
          <BreadcrumbItem>
            <span>Dashboard</span>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to="/dashboard/history">History Transaction</Link>
          </BreadcrumbItem>
        </Breadcrumb>
        <div className="d-flex flex-column flex-lg-row align-items-center px-4 pb-0 mt-3 justify-content-between">
          <h3 className="my-1">History Transaction</h3>
          <div className="control">
            <form
              action=""
              className="d-inline-flex d-flex align-items-center justify-content-center flex-column flex-lg-row"
              onSubmit={this.search}
            >
              <label htmlFor="" className="mb-0 pl-2 pr-1 my-1">
                Limit:{" "}
              </label>
              <input
                type="number"
                min="1"
                onChange={(e) => this.setState({ limit: e.target.value })}
                className="form-control shadow-sm my-1"
                placeholder="Limit"
              />
              <label htmlFor="" className="mb-0 pl-3 pr-1 my-1">
                Search:{" "}
              </label>
              <input
                type="search"
                onChange={(e) => this.setState({ search: e.target.value })}
                className="form-control shadow-sm ml-2 my-1"
                placeholder="Search here"
              />
              <button type="submit" className="btn d-none"></button>
              <div className="dropdown ml-2 mr-0 my-1">
                <button
                  className="btn btn-outline-secondary d-flex my-1 flex-row align-items-center dropdown-toggle"
                  type="button"
                  id="1dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Status
                </button>
                <div
                  className="dropdown-menu my-1"
                  aria-labelledby="1dropdownMenuButton"
                >
                  <Link
                    className="dropdown-item"
                    to="#"
                    onClick={(e) => {
                      e.preventDefault();
                      this.setStatus("booked");
                    }}
                  >
                    Booked
                  </Link>
                  <Link
                    className="dropdown-item"
                    to="#"
                    onClick={(e) => {
                      e.preventDefault();
                      this.setStatus("borrowed");
                    }}
                  >
                    Borrowed
                  </Link>
                  <Link
                    className="dropdown-item"
                    to="#"
                    onClick={(e) => {
                      e.preventDefault();
                      this.setStatus("returned");
                    }}
                  >
                    Returned
                  </Link>
                  <Link
                    className="dropdown-item"
                    to="#"
                    onClick={(e) => {
                      e.preventDefault();
                      this.setStatus("");
                    }}
                  >
                    All
                  </Link>
                </div>
              </div>
              <div className="filter d-flex align-items-center my-1 ml-2">
                <div className="dropdown">
                  <button
                    className="btn btn-outline-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButtonw"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Sort By
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButtonw"
                  >
                    <Link
                      className="dropdown-item"
                      to="#"
                      onClick={(e) => {
                        e.preventDefault();
                        this.setSortBy("desc");
                      }}
                    >
                      Desc
                    </Link>
                    <Link
                      className="dropdown-item"
                      to="#"
                      onClick={(e) => {
                        e.preventDefault();
                        this.setSortBy("asc");
                      }}
                    >
                      Asc
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="px-lg-3 px-1 mt-2">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              {(this.props.auth.session.role === "Admin" ||
                this.props.auth.session.role === "Super Admin") && (
                <ForAdmin
                  location={this.props.location}
                  history={this.props.history}
                />
              )}
              {this.props.auth.session.role === "Member" && (
                <ForMember location={this.props.location} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = { getMember, getAdmin };

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);
