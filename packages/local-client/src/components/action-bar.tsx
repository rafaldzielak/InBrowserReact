import React from "react";
import "./action-bar.css";
import { useActions } from "../hooks/use-actions";

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { deleteCell, moveCell } = useActions();

  const buttonClass = "button is-primary is-small";
  return (
    <div className='action-bar'>
      <button className={buttonClass} onClick={() => moveCell(id, "up")}>
        <span className='icon'>
          <i className='fas fa-arrow-up'></i>
        </span>
      </button>
      <button className={buttonClass} onClick={() => moveCell(id, "down")}>
        <span className='icon'>
          <i className='fas fa-arrow-down'></i>
        </span>
      </button>
      <button className={buttonClass} onClick={() => deleteCell(id)}>
        <span className='icon'>
          <i className='fas fa-times'></i>
        </span>
      </button>
    </div>
  );
};

export default ActionBar;
