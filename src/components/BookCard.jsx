import React from "react";

import { Link } from "react-router-dom";

export default (book, index) => {
  return (
    <div
      className="col-12 col-xs-12 col-sm-12 col-md-3 col-lg-3 px-1 p-0 px-lg-2 mb-4"
      key={index}
    >
      <div className="card h-100 card-hoverable border-0 shadow-sm">
        <Link to={`/dashboard/catalog/detail/${book.id}`}>
          <div
            className="card-img-top bg-secondary w-100 img-card-top"
            style={{
              backgroundImage: `url(${book.image})`,
              backgroundSize: "cover",
            }}
          ></div>
        </Link>
        <div className="card-body">
          <h5 className="card-title font-weight-bold">{book.title}</h5>
          <div className="d-flex mt-0 mb-2 flex-lg-row align-items-start flex-column justify-content-between">
            <h6 className="card-subtitle mb-0 text-muted">{book.genre}</h6>
            <div
              className={`mt-2 mt-lg-0 badge badge-${
                book.status === "available" ? "success" : "danger"
              }`}
            >
              {book.status}
            </div>
          </div>
          <Link to={`detail/${book.id}`} className="card-link">
            More
          </Link>
        </div>
      </div>
    </div>
  );
};
