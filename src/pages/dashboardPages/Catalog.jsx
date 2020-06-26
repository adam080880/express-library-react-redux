import React from "react";
import { Link } from "react-router-dom";
import qs from "querystring";
import { getBook } from "../../redux/actions/books";

import { Breadcrumb, BreadcrumbItem } from "reactstrap";

import BookCard from "../../components/BookCard";

import { connect } from "react-redux";
import Pagination from "../../components/PaginationBook";

import Swal from "sweetalert2";

class Catalog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
    };
  }

  search = (e) => {
    e.preventDefault();
    const params = {
      ...qs.parse(this.props.location.search.slice(1)),
      ...{ search: this.state.search, page: 1 },
    };
    this.props.history.push(`/dashboard/catalog?${qs.stringify(params)}`);
    this.props.getBook(params);
  };

  sortBy = (param) => {
    const params = {
      ...qs.parse(this.props.location.search.slice(1)),
      ...{ sort: param, page: 1 },
    };
    this.props.history.push(`/dashboard/catalog?${qs.stringify(params)}`);
    this.props.getBook(params);
  };

  componentDidMount() {
    this.props.getBook(qs.parse(this.props.location.search.slice(1)));
  }

  componentDidUpdate() {
    if (this.props.books.status && !this.props.books.isLoading) {
      this.props.getBook(qs.parse(this.props.location.search.slice(1)));
      Swal.fire("Success", "Success create book", "success").then(() => {
        if (this.props.location.pathname !== "/dashboard/catalog") {
          this.props.history.push("/dashboard/catalog");
        }
      });
    } else if (
      this.props.books.status === false &&
      !this.props.books.isLoading
    ) {
      Swal.fire("Error", this.props.books.msg, "error");
    }
  }

  render() {
    return (
      <div className="container-fluid p-0 mb-5" style={{ overflowX: "hidden" }}>
        <Breadcrumb>
          <BreadcrumbItem>
            <span>Dashboard</span>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to="/dashboard/catalog">Catalog</Link>
          </BreadcrumbItem>
        </Breadcrumb>
        <div className="d-flex flex-column flex-lg-row align-items-center justify-content-between px-4 pb-0 mt-3">
          <h3>List Book</h3>
          <div className="filter d-flex align-items-center">
            <form className="d-none d-lg-block" onSubmit={this.search}>
              <input
                type="text"
                className="form-control"
                onChange={(e) => this.setState({ search: e.target.value })}
                placeholder="Search book"
              />
            </form>
            <div className="dropdown ml-2">
              <button
                className="btn btn-outline-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Sort By
              </button>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <Link
                  className="dropdown-item"
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    this.sortBy("desc");
                  }}
                >
                  Desc
                </Link>
                <Link
                  className="dropdown-item"
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    this.sortBy("asc");
                  }}
                >
                  Asc
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="w-100 text-center">
          {this.props.books.isLoading && (
            <div className="spinner-border text-primary mx-auto my-5">
              <div className="sr-only">Loading...</div>
            </div>
          )}
        </div>
        {!this.props.books.isLoading && (
          <div id="listBookWrapper" className="px-lg-3 px-1 mt-2">
            <div className="row no-gutters">
              {!this.props.books.items && (
                <div className="alert alert-danger text-center">
                  Data tidak ada
                </div>
              )}
              {this.props.books.items && this.props.books.items.map(BookCard)}
            </div>
          </div>
        )}
        {this.props.books.items.length === 0 && !this.props.books.isLoading && (
          <div className="container">
            <div className="alert alert-danger mt-3">Book is not found</div>
          </div>
        )}
        <Pagination />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  books: state.books,
});

const mapDispatchToProps = {
  getBook,
};

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
