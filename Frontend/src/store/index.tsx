import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import counterReducer from "./reducers/counterReducer";
import clientReducer from "./reducers/clientReducer";
import roomReducer from "./reducers/roomReducer";
import memberReducer from "./reducers/memberReducer";
import socketReducer from "./reducers/socketReducer";
import messageReducer from "./reducers/messageReducer";

const rootReducer = combineReducers({
  counter: counterReducer,
  client: clientReducer,
  room: roomReducer,
  member: memberReducer,
  socket: socketReducer,
  message: messageReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {

  const store = createStore(
    rootReducer,
    composeWithDevTools()
  );

  return store;
}
