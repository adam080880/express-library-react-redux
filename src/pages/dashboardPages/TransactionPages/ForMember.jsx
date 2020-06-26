import React from "react";
import { connect } from "react-redux";
import { getMember } from "../../../redux/actions/transaction";
import qs from "querystring";
import PaginationTransaction from "../../../components/PaginationTransaction";

class ForMember extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      histories: [],
    };
  }

  componentDidMount() {
    const params = qs.parse(this.props.location.search.slice(1));
    params.page = params.page || 1;
    this.props.getMember(qs.stringify(params), this.props.auth.session.token);
  }

  date = (val) => {
    const date = new Date(val)
      .toLocaleString()
      .split(",")[0]
      .replace(/\//g, "-")
      .split("-");

    return `${date[2].concat("-" + date[0]).concat("-" + date[1])}`;
  };

  memberTransaction = (val, index) => (
    <tr key={index}>
      <td>
        {index +
          1 +
          (this.props.transaction.pageInfo.page - 1) *
            this.props.transaction.pageInfo.perPage}
      </td>
      <td>{val.book_title}</td>
      <td>{this.date(val.last_updated)}</td>
      <td>{val.promise_returned_at}</td>
      <td>
        <div
          className={`badge ${
            val.status === "returned" ? "badge-primary" : "badge-danger"
          }`}
        >
          {val.status}
        </div>
      </td>
    </tr>
  );

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
                      <th>Last Updated</th>
                      <th>Return Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.transaction.lists.map(this.memberTransaction)}
                  </tbody>
                </table>
                <PaginationTransaction
                  token={this.props.auth.session.token}
                  role="member"
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
  getMember,
};

export default connect(mapStateToProps, mapDispatchToProps)(ForMember);
