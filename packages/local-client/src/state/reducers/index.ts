import {} from "react-redux";
import { combineReducers } from "redux";
import {} from "redux-thunk";
import cellReducer from "./cellsReducer";
import bundleReducer from "./bundlesReducer";

const reducers = combineReducers({
  cells: cellReducer,
  bundle: bundleReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
