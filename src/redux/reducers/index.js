import { combineReducers } from "redux";

import auth from "./auth";
import books from "./books";
import author from "./author";
import genre from "./genre";
import controllerPage from "./controllerPage";
import transaction from "./transaction";
import user from "./user";

export default combineReducers({
  auth,
  books,
  author,
  genre,
  controllerPage,
  transaction,
  user,
});
