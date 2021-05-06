import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import axios from "axios";
import { DeleteCellAction, InserCellAfterAction, MoveCellAction, UpdateCellAction, Action } from "../actions";
import { CellTypes, Cell } from "../cell";
import { Direction } from "../actions";
import bundle from "../../bundler";
import { RootState } from "../reducers";

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return { type: ActionType.UPDATE_CELL, payload: { id, content } };
};
export const deleteCell = (id: string): DeleteCellAction => {
  return { type: ActionType.DELETE_CELL, payload: id };
};
export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return { type: ActionType.MOVE_CELL, payload: { id, direction } };
};
export const insertCellAfter = (id: string | null, type: CellTypes): InserCellAfterAction => {
  return { type: ActionType.INSERT_CELL_AFTER, payload: { id, type } };
};

export const createBundle = (cellId: string, input: string) => async (dispatch: Dispatch<Action>) => {
  dispatch({ type: ActionType.BUNDLE_START, payload: { cellId } });
  const result = await bundle(input);
  dispatch({ type: ActionType.BUNDLE_COMPLETE, payload: { cellId, bundle: result } });
};

export const fetchCells = () => async (dispatch: Dispatch<Action>) => {
  dispatch({ type: ActionType.FETCH_CELLS });
  try {
    const { data }: { data: Cell[] } = await axios.get("/cells");
    dispatch({ type: ActionType.FETCH_CELLS_COMPLETE, payload: data });
  } catch (error) {
    dispatch({ type: ActionType.FETCH_CELLS_ERROR, payload: error.message });
  }
};

export const saveCells = () => async (dispatch: Dispatch<Action>, getState: () => RootState) => {
  const { cells: cellState } = getState();
  const { data, order } = cellState!;
  const cells = order.map((id) => data[id]);

  try {
    await axios.post("/cells", { cells });
  } catch (error) {
    dispatch({ type: ActionType.SAVE_CELLS_ERROR, payload: error.message });
  }
};
