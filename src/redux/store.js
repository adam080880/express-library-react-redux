import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import promiseMiddleware from "redux-promise-middleware";

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootReducers from "./reducers";

const config = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(config, rootReducers);

const store = createStore(
  persistedReducer,
  applyMiddleware(promiseMiddleware, logger)
);

const persistor = persistStore(store);

export default { store, persistor };
