import {} from "react-redux";
import { combineReducers } from "redux";
import {} from "redux-thunk";
import cellReducer from "./cellsReducer";

const reducers = combineReducers({
  cells: cellReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
