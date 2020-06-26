import React from "react";
import { connect } from "react-redux";
import {
  getAuthor,
  createAuthor,
  updateAuthor,
  deleteAuthor,
  search as search2,
} from "../../../redux/actions/author";

import { Modal, ModalBody } from "reactstrap";
import Swal from "sweetalert2";

const mapStateToProps = (state) => ({
  author: state.author,
  auth: state.auth,
});

const mapDispatchToProps = {
  getAuthor,
  createAuthor,
  updateAuthor,
  deleteAuthor,
  search2,
};

class Author extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      author: "",
      isOpen: false,
      author_id: "",
      authorName: "",
      authorDescription: "",
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  componentDidMount() {
    this.props.getAuthor();
  }

  submit = (e) => {
    e.preventDefault();
    this.props.search2(this.state.author, this.props.author.real);
  };

  addAuthor = (e) => {
    e.preventDefault();
    this.props
      .createAuthor(
        {
          name: this.state.authorName,
          description: this.state.authorDescription,
        },
        this.props.auth.session.token
      )
      .then((res) => {
        Swal.fire("Success", "Success create author", "success").then(() => {
          this.props.getAuthor();
        });
      })
      .catch((rej) => {
        Swal.fire("Error", "Error server", "error");
      })
      .finally(() => {
        this.setState({ isOpen: false, author_id: "" });
      });
  };

  editAuthor = (e) => {
    e.preventDefault();
    this.props
      .updateAuthor(
        {
          name: this.state.authorName,
          description: this.state.authorDescription,
        },
        this.state.author_id,
        this.props.auth.session.token
      )
      .then((res) => {
        Swal.fire("Success", "Success update author", "success").then(() => {
          this.props.getAuthor();
        });
      })
      .catch((rej) => {
        Swal.fire("Error", "Error server", "error");
      })
      .finally(() => {
        this.setState({ isOpen: false, author_id: "" });
      });
  };

  deleteAuthor = (id) => {
    Swal.fire({
      title: "Are you sure to delete this author?",
      text: "You can't recover this data",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.value) {
        this.props
          .deleteAuthor(id, this.props.auth.session.token)
          .then((res) => {
            Swal.fire("Success", "Success delete author", "success").then(
              () => {
                this.props.getAuthor();
              }
            );
          })
          .catch((rej) => {
            Swal.fire("Error", "Error server", "error");
          })
          .finally(() => {
            this.setState({ isOpen: false, author_id: "" });
          });
      }
    });
  };

  render() {
    return (
      <div className="col-sm-6 mt-2">
        <Modal isOpen={this.state.isOpen} toggle={this.toggle}>
          <ModalBody>
            <form
              onSubmit={this.state.author_id ? this.editAuthor : this.addAuthor}
            >
              <h3 className="mb-3">Manage Author</h3>
              <div className="form-group">
                <div className="label-control">Name</div>
                <input
                  type="text"
                  defaultValue={
                    this.state.author_id ? this.state.authorName : ""
                  }
                  onChange={(e) =>
                    this.setState({ authorName: e.target.value })
                  }
                  placeholder="Author name"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <div className="label-control">Description</div>
                <input
                  type="text"
                  defaultValue={
                    this.state.author_id ? this.state.authorDescription : ""
                  }
                  onChange={(e) =>
                    this.setState({ authorDescription: e.target.value })
                  }
                  placeholder="Author description"
                  className="form-control"
                />
              </div>
              <button
                className="cta px-3 py-2 rounded-pill text-white border-0 mt-3"
                type="submit"
              >
                Submit
              </button>
              <button
                className="cta cta-secondary px-3 py-2 rounded-pill text-white border-0 ml-2 mt-3"
                type="button"
                onClick={this.toggle}
              >
                Close
              </button>
            </form>
          </ModalBody>
        </Modal>
        <div className="card shadow-sm border-0">
          <div className="card-body">
            <div className="d-flex flex-row justify-content-between align-items-center">
              <span className="font-weight-bold">Author Table</span>
              <div className="control d-flex align-items-center">
                <form
                  action=""
                  onSubmit={this.submit}
                  className="d-flex align-items-center"
                >
                  <input
                    type="text"
                    onChange={(e) => this.setState({ author: e.target.value })}
                    className="form-control"
                    value={this.state.author}
                    placeholder="Search authors"
                  />
                </form>
                <button
                  className="btn btn-primary btn-sm d-flex align-self-stretch align-items-center justify-content-center ml-2"
                  onClick={(e) => {
                    this.setState({
                      author_id: "",
                    });
                    this.toggle();
                  }}
                >
                  <span className="fas fa-plus mr-2"></span> Author
                </button>
              </div>
            </div>

            <div style={{ overflowX: "auto", overflowY: "auto" }}>
              <table className="mt-2 w-100 table mt-4">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.author.items.map((val, index) => (
                    <tr key={index}>
                      <td>{val.name}</td>
                      <td>{val.description}</td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={(e) => this.deleteAuthor(val.id)}
                        >
                          <span className="fas fa-trash"></span>
                        </button>
                        <button
                          className="btn btn-warning btn-sm ml-2"
                          onClick={(e) => {
                            this.setState({
                              authorName: val.name,
                              authorDescription: val.description,
                              author_id: val.id,
                            });
                            this.toggle();
                          }}
                        >
                          <span className="fas fa-pen"></span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Author);
