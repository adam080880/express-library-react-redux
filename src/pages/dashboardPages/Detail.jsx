import React from "react";

import { Breadcrumb, BreadcrumbItem, Modal } from "reactstrap";

import { Link } from "react-router-dom";

import Swal from "sweetalert2";

import { connect } from "react-redux";
import { findBook, deleteBook, setStatus } from "../../redux/actions/books";
import { toggleModal, openModal } from "../../redux/actions/controllerPage";

import EditBookModal from "./DetailModals/EditBook";
import Booking from "./DetailModals/Booking";

class Detail extends React.Component {
  componentDidMount() {
    this.props.findBook(this.props.match.params.id);
  }

  componentDidUpdate() {
    if (
      Object.keys(this.props.books.data).length === 0 &&
      !this.props.books.isLoading
    ) {
      this.props.history.push("/dashboard/catalog");
    }

    if (this.props.books.onProgress === "delete") {
      if (this.props.books.status === true && !this.props.books.isLoading) {
        Swal.fire("Success", "Success deleted", "success").then(() => {
          this.props.setStatus(null);
          this.props.history.push("/dashboard/catalog");
        });
      } else if (
        this.props.books.status === false &&
        !this.props.books.isLoading
      ) {
        Swal.fire("Error", this.props.books.msg, "error").then(() => {
          this.props.setStatus(null);
          this.props.history.push("/dashboard/catalog");
        });
      }
    } else if (this.props.books.onProgress === "edit") {
      if (this.props.books.status === true && !this.props.books.isLoading) {
        Swal.fire("Success", "Success updated", "success").then(() => {
          this.props.setStatus(null);
          this.props.findBook(this.props.match.params.id);
        });
      } else if (
        this.props.books.status === false &&
        !this.props.books.isLoading
      ) {
        Swal.fire("Error", this.props.books.msg, "error").then(() => {
          this.props.setStatus(null);
        });
      }
    }
  }

  deleteBook = () => {
    Swal.fire({
      title: "Are you sure delete this book?",
      text: "You can't recover this book and transactions with this book",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
    }).then((willDelete) => {
      if (willDelete.value) {
        this.props.deleteBook(
          this.props.match.params.id,
          this.props.auth.session.token
        );
      }
    });
  };

  render() {
    return (
      <div className="container-fluid p-0 mb-5">
        <Modal
          isOpen={this.props.controllerPage.isOpen}
          toggle={this.props.toggleModal}
        >
          {this.props.controllerPage.modalInDashboard === "edit_book" && (
            <EditBookModal match={this.props.match} />
          )}
          {this.props.controllerPage.modalInDashboard === "booking" && (
            <Booking match={this.props.match} />
          )}
        </Modal>
        <Breadcrumb>
          <BreadcrumbItem>
            <span>Dashboard</span>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to="/dashboard/catalog">Catalog</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link
              to={`/dashboard/catalog/detail/${this.props.match.params.id}`}
            >
              Book Id #{`${this.props.match.params.id}`}
            </Link>
          </BreadcrumbItem>
        </Breadcrumb>
        <div
          className="w-100 bg-secondary"
          style={{
            height: "280px",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundImage: `url(${this.props.books.data.image})`,
          }}
        >
          <div className="position-absolute p-3 d-flex flex-row w-100 justify-content-between align-items-center">
            <div
              onClick={() => this.props.history.goBack()}
              className="rounded-circle bg-white d-flex align-items-center justify-content-center"
              style={{ width: "35px", height: "35px", cursor: "pointer" }}
            >
              <i className="fas fa-arrow-left"></i>
            </div>
            {Object.keys(this.props.auth.session).length > 0 &&
              (this.props.auth.session.role === "Super Admin" ||
                this.props.auth.session.role === "Admin") && (
                <div className="control">
                  <button className="btn btn-danger" onClick={this.deleteBook}>
                    <i className="fas fa-trash fa-sm"></i>
                  </button>
                  <button
                    className="btn btn-warning ml-2 text-white"
                    onClick={(e) => {
                      this.props.openModal("edit_book");
                    }}
                  >
                    <i className="fas fa-pen fa-sm"></i>
                  </button>
                </div>
              )}
          </div>
        </div>
        <div className="container">
          <div
            className="card border-0 shadow-sm"
            style={{ marginTop: "-80px" }}
          >
            <div className="card-body">
              <div className="row">
                <div className="col-lg-3 mb-3 col-12 order-1 order-lg-2 d-flex align-items-center flex-column">
                  <img
                    src={`${this.props.books.data.image}`}
                    alt=""
                    className="cover"
                    width="200px"
                    style={{ borderRadius: "10px" }}
                  />
                </div>
                <div className="col-12 col-lg-9 order-2 order-lg-1 mb-3 text-center text-lg-left">
                  <div className="d-flex justify-content-between flex-column flex-lg-row aign-items-center mb-3">
                    <div className="title">
                      <h3 className="font-weight-bold mb-1">
                        {this.props.books.data.title}
                      </h3>
                      <div className="badge badge-secondary">
                        {this.props.books.data.genre}
                      </div>
                    </div>
                    {Object.keys(this.props.auth.session).length > 0 &&
                      this.props.auth.session.role === "Member" && (
                        <div className="control d-flex align-items-center">
                          <button
                            disabled={
                              !(this.props.books.data.status === "available")
                            }
                            onClick={(e) => this.props.openModal("booking")}
                            className="rounded-pill mx-auto mx-lg-0 mt-3 mt-lg-0 cta border-0 px-4 py-2 text-white"
                          >
                            Booking
                          </button>
                        </div>
                      )}
                  </div>
                  <ul className="list-style-type-none list-unstyled">
                    <li className="mb-1 mb-lg-0">
                      <span className="font-weight-bold d-block d-lg-inline">
                        Author:
                      </span>{" "}
                      {this.props.books.data.author}
                    </li>
                    <li className="mb-1 mb-lg-0">
                      <span className="font-weight-bold d-block d-lg-inline">
                        Status:
                      </span>{" "}
                      <span
                        className={`${
                          this.props.books.data.status === "available"
                            ? "text-success"
                            : "text-danger"
                        }`}
                      >
                        {this.props.books.data.status}
                      </span>
                    </li>
                    <li>
                      <span className="font-weight-bold"> Description:</span>
                      <br />
                      <p className="description">
                        {this.props.books.data.description}
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  books: state.books,
  controllerPage: state.controllerPage,
});

const mapDispatchToProps = {
  // updateBooks,
  findBook,
  deleteBook,
  setStatus,
  toggleModal,
  openModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
