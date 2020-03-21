import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import counterReducer from "./reducers/counterReducer";

const rootReducer = combineReducers({
  counter: counterReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {

  const store = createStore(
    rootReducer,
    composeWithDevTools()
  );

  return store;
}
