import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { signalRMiddleware } from "./middleware/ReduxMiddleware";
import rootReducer from "./reducers/RootReducer";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, signalRMiddleware))
);

export default store;
