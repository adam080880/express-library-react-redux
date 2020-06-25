import React from "react";

import { ModalBody } from "reactstrap";
import Select from "react-select";
import { connect } from "react-redux";

import { toggleModal } from "../../redux/actions/controllerPage";
import { addBook, getBook } from "../../redux/actions/books";
import Swal from "sweetalert2";

class AddBookModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      author_id: "",
      genre_id: "",
      file: [],
      file_: {},
    };
  }

  submit = (e) => {
    e.preventDefault();
    if (this.state.file_.size) {
      if (
        this.state.file_.size >= 1240000 ||
        this.state.file_.type.split("/")[0] !== "image"
      ) {
        Swal.fire(
          "Failed",
          "Max file size is 1240KB and file type just image",
          "error"
        );
        return;
      }
    } else {
      Swal.fire("Failed", "Image is required", "error");
      return;
    }

    let formData = new FormData();
    formData.append("image", this.state.file_);
    formData.set("title", this.state.title);
    formData.set("description", this.state.description);
    formData.set("author_id", this.state.author_id);
    formData.set("genre_id", this.state.genre_id);
    this.props.addBook(formData, this.props.auth.session.token);
    this.props.toggleModal();
  };

  componentDidUpdate() {}

  render() {
    return (
      <>
        {/* Form Add Book */}
        <form method="post" onSubmit={this.submit}>
          <ModalBody>
            <h3 className="font-weight-bold mb-3">Add Book</h3>
            <div className="form-group">
              <label htmlFor="title" className="label-control">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                className="form-control"
                onChange={(e) => this.setState({ title: e.target.value })}
                placeholder="title"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description" className="label-control">
                Description
              </label>
              <textarea
                type="text"
                name="description"
                id="description"
                className="form-control"
                onChange={(e) => this.setState({ description: e.target.value })}
                placeholder="description"
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="genre" className="label-control">
                Genre
              </label>
              <Select
                onChange={(value) => this.setState({ genre_id: value.value })}
                className="flex-grow-1"
                placeholder="Choose a genre"
                options={this.props.genre.items.map((val) => ({
                  value: val.id,
                  label: val.name,
                }))}
              />
            </div>
            <div className="form-group">
              <label htmlFor="author" className="label-control">
                Author
              </label>
              <Select
                onChange={(value) => this.setState({ author_id: value.value })}
                className="flex-grow-1"
                placeholder="Choose a author"
                options={this.props.author.items.map((val) => {
                  return { value: val.id, label: val.name };
                })}
              />
            </div>
            <div className="form-group w-100 d-flex justify-content-center">
              {this.state.file.length > 0 && (
                <img
                  src={this.state.file}
                  alt="Preview"
                  width="200px"
                  className="m-auto"
                />
              )}
            </div>
            <div className="form-group">
              <input
                type="file"
                accept="image/*"
                name="file"
                id="file"
                onChange={(e) =>
                  this.setState({
                    file: URL.createObjectURL(e.target.files[0]),
                    file_: e.target.files[0],
                  })
                }
              />
            </div>
            <button
              type="submit"
              className="mt-4 cta rounded-pill px-3 text-white border-0 py-2"
            >
              Submit
            </button>
            <button
              className="cta cta-secondary px-3 py-2 rounded-pill text-white border-0 ml-2 mt-3"
              type="button"
              onClick={(e) => this.props.toggleModal()}
            >
              Close
            </button>
          </ModalBody>
        </form>
        {/* Form Add Book */}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  author: state.author,
  genre: state.genre,
  auth: state.auth,
  books: state.books,
});

const mapDispatchToProps = {
  toggleModal,
  addBook,
  getBook,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBookModal);
