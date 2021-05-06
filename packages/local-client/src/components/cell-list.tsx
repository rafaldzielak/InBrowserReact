import "./cell-list.css";
import React, { Fragment, useEffect } from "react";
import { useTypedSelector } from "../hooks/use-typed-selector";
import AddCell from "./add-cell";
import CellListItem from "./cell-list-item";
import { useActions } from "../hooks/use-actions";

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells }) => cells?.order.map((id) => cells.data[id]));
  const { fetchCells, saveCells } = useActions();

  useEffect(() => {
    fetchCells();
  }, []);

  // useEffect(() => {
  //   saveCells();
  // }, [JSON.stringify(cells)]);

  const renderedCells = cells?.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem key={cell.id} cell={cell} />
      <AddCell previousCellId={cell.id} />
    </Fragment>
  ));

  return (
    <div className={"cell-list" + (cells?.length === 0 ? "force-visible" : "")}>
      <AddCell previousCellId={null} />
      {renderedCells}
    </div>
  );
};

export default CellList;
