import React from "react";
import { Link } from "react-router-dom";

import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { connect } from "react-redux";
import { get, toggleRole } from "../../redux/actions/user";
import qs from "querystring";
import Swal from "sweetalert2";

import PaginationUser from "../../components/PaginationUser";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
    };
  }

  componentDidMount() {
    const params = qs.parse(this.props.location.search.slice(1));
    params.page = params.page || 1;
    this.props.get(params, this.props.auth.session.token);
  }

  toggleRole = (id) => {
    const query = qs.parse(this.props.location.search.slice(1));
    query.page = query.page || 1;

    this.props
      .toggleRole(id, this.props.auth.session.token)
      .then((res) => {
        Swal.fire("Success", "Success update role", "success").then(() => {
          this.props.get(query, this.props.auth.session.token);
        });
      })
      .catch((rej) => {
        Swal.fire("Error", rej.value.msg || "Error server", "error");
      });
  };

  renderUser = (val, index) => {
    const Button = this.props.auth.session.role === "Super Admin" && (
      <button
        onClick={(e) => this.toggleRole(val.id)}
        disabled={val.role === "super_admin"}
        className="btn btn-outline-primary"
      >
        {val.role === "admin"
          ? "To Member"
          : val.role === "super_admin"
          ? "super_admin"
          : "To Admin"}
      </button>
    );
    return (
      <tr key={index}>
        <td>{val.email}</td>
        <td>{val.name}</td>
        <td>{val.phone}</td>
        <td>{val.role}</td>
        <td>{Button}</td>
      </tr>
    );
  };

  search = (e) => {
    e.preventDefault();
    const query = qs.parse(this.props.location.search.slice(1));
    const param = { ...query, ...{ page: 1, search: this.state.user } };
    console.log(qs.stringify(param));
    this.props.history.push("/dashboard/users?" + qs.stringify(param));
    this.props.get(param, this.props.auth.session.token);
  };

  render() {
    return (
      <>
        <div
          className="container-fluid p-0 mb-5"
          style={{ overflowX: "hidden" }}
        >
          <Breadcrumb>
            <BreadcrumbItem>
              <span>Dashboard</span>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link to="/dashboard/users">Users</Link>
            </BreadcrumbItem>
          </Breadcrumb>

          <div className="d-flex flex-column flex-lg-row justify-content-between mt-3 align-items-center px-4 pb-0">
            <h3>List User</h3>
            <form onSubmit={this.search}>
              <input
                type="text"
                onChange={(e) => this.setState({ user: e.target.value })}
                className="form-control"
                placeholder="Search user"
              />
            </form>
          </div>
          <div className="row px-lg-3 px-1">
            {this.props.user.isLoading && (
              <div className="w-100 text-center py-4">
                <div className="spinner-border text-primary">
                  <div className="sr-only">loading...</div>
                </div>
              </div>
            )}
            {!this.props.user.isLoading && (
              <div className="col mt-2">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <div style={{ overflowX: "auto", overflowY: "auto" }}>
                      <table className="w-100 table">
                        <thead>
                          <tr>
                            <th>Email</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Role</th>
                            {this.props.auth.session.role === "Super Admin" && (
                              <th>Action</th>
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {this.props.user.users.map(this.renderUser)}
                        </tbody>
                      </table>
                    </div>
                    <PaginationUser token={this.props.auth.session.token} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
});

const mapDispatchToProps = {
  get,
  toggleRole,
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
