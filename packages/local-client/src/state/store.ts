import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistMiddleware } from "./middlewares/persist-middleware";
// import { ActionType } from "./action-types";
import reducers from "./reducers";

export const store = createStore(reducers, {}, applyMiddleware(persistMiddleware, thunk));

// Manual Testing of redux store
// store.dispatch({ type: ActionType.INSERT_CELL_AFTER, payload: { id: null, type: "text" } });
// store.dispatch({ type: ActionType.INSERT_CELL_AFTER, payload: { id: null, type: "code" } });
// store.dispatch({ type: ActionType.INSERT_CELL_AFTER, payload: { id: null, type: "text" } });
// store.dispatch({ type: ActionType.INSERT_CELL_AFTER, payload: { id: null, type: "code" } });
// console.log(store.getState());
