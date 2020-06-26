import React from "react";
import { connect } from "react-redux";
import qs from "querystring";
import {
  getAdmin,
  borrow,
  toReturn,
  cancel,
  setStatus,
} from "../../../redux/actions/transaction";
import { Link } from "react-router-dom";
import PaginationTransaction from "../../../components/PaginationTransaction";
import Swal from "sweetalert2";

class ForAdmin extends React.Component {
  borrow = (id) => {
    const params = qs.parse(this.props.location.search.slice(1));
    this.props
      .borrow(id, this.props.auth.session.token)
      .then(() => {
        Swal.fire("Success", "Success update status", "success");
        this.props.getAdmin(params, this.props.auth.session.token);
        this.props.history.push(`/dashboard/history?${qs.stringify(params)}`);
      })
      .catch((rej) => {
        Swal.fire("Error", this.props.transaction.msg, "success");
        this.props.getAdmin(params, this.props.auth.session.token);
        this.props.history.push(`/dashboard/history?${qs.stringify(params)}`);
      });
  };

  cancel = (id) => {
    const params = qs.parse(this.props.location.search.slice(1));
    this.props
      .cancel(id, this.props.auth.session.token)
      .then((res) => {
        Swal.fire("Success", "Success cancel transaction", "success");
        this.props.getAdmin(params, this.props.auth.session.token);
        this.props.history.push(`/dashboard/history?${qs.stringify(params)}`);
      })
      .catch((rej) => {
        Swal.fire("Error", this.props.transaction.msg, "success");
        this.props.getAdmin(params, this.props.auth.session.token);
        this.props.history.push(`/dashboard/history?${qs.stringify(params)}`);
      });
  };

  toReturn = (id) => {
    const params = qs.parse(this.props.location.search.slice(1));
    this.props
      .toReturn(id, this.props.auth.session.token)
      .then((res) => {
        Swal.fire("Success", "Success cancel transaction", "success");
        this.props.getAdmin(params, this.props.auth.session.token);
        this.props.history.push(`/dashboard/history?${qs.stringify(params)}`);
      })
      .catch((rej) => {
        Swal.fire("Error", this.props.transaction.msg, "success");
        this.props.getAdmin(params, this.props.auth.session.token);
        this.props.history.push(`/dashboard/history?${qs.stringify(params)}`);
      });
  };

  date = (val) => {
    const date = new Date(val)
      .toLocaleString()
      .split(",")[0]
      .replace(/\//g, "-")
      .split("-");

    return `${date[2].concat("-" + date[0]).concat("-" + date[1])}`;
  };

  adminTransaction = (val, index) => (
    <tr key={index}>
      <td>
        {index +
          1 +
          (this.props.transaction.pageInfo.page - 1) *
            this.props.transaction.pageInfo.perPage}
      </td>
      <td>{val.book_title}</td>
      <td>{val.member}</td>
      <td>{this.date(val.last_updated)}</td>
      <td>{val.promise_returned_at}</td>
      <td>
        <div className="dropdown">
          <button
            className={`btn ${
              val.status !== "returned" ? "btn-danger" : "btn-success"
            } dropdown-toggle`}
            disabled={val.status !== "returned" ? false : true}
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {val.status}
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {val.status === "booked" && (
              <>
                <Link
                  className="dropdown-item"
                  onClick={(e) => this.borrow(val.id)}
                  to="#"
                >
                  To Borrow
                </Link>
                <Link
                  className="dropdown-item"
                  onClick={(e) => this.cancel(val.id)}
                  to="#"
                >
                  To Cancel
                </Link>
              </>
            )}
            {val.status === "borrowed" && (
              <>
                <Link
                  className="dropdown-item"
                  onClick={(e) => this.toReturn(val.id)}
                  to="#"
                >
                  To Return
                </Link>
                <Link
                  className="dropdown-item"
                  onClick={(e) => this.cancel(val.id)}
                  to="#"
                >
                  To Cancel
                </Link>
              </>
            )}
          </div>
        </div>
      </td>
    </tr>
  );

  componentDidMount() {
    const params = qs.parse(this.props.location.search.slice(1));
    params.page = params.page || 1;
    this.props.getAdmin(qs.stringify(params), this.props.auth.session.token);
  }

  render() {
    return (
      <>
        {!this.props.transaction.isLoading && (
          <div className="table-responsive">
            {this.props.transaction.lists.length > 0 && (
              <>
                <table className="table">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Book Title</th>
                      <th>Member Email</th>
                      <th>Last Updated</th>
                      <th>Return Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.transaction.lists.map(this.adminTransaction)}
                  </tbody>
                </table>
                <PaginationTransaction
                  token={this.props.auth.session.token}
                  role="admin"
                />
              </>
            )}
          </div>
        )}
        {this.props.transaction.lists.length === 0 &&
          !this.props.transaction.isLoading && (
            <div className="alert alert-danger">Failed to get data</div>
          )}
        {this.props.transaction.isLoading && (
          <div className="w-100 text-center">
            <div className="spinner-border text-primary">
              <div className="sr-only">loading...</div>
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  transaction: state.transaction,
  auth: state.auth,
});

const mapDispatchToProps = {
  getAdmin,
  borrow,
  setStatus,
  cancel,
  toReturn,
};

export default connect(mapStateToProps, mapDispatchToProps)(ForAdmin);
