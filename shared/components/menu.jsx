import React from 'react';

const Menu = ({ boardSize, changeBoardSize }) => {

  return (
    <div className="menu">
      <div className="menu-item">
        <h3 className="menu-title">Board Size</h3>
        <select
          name=""
          id=""
          className="menu-select"
          onChange={(e) => changeBoardSize(e.target.value)}
        >
          {boardSize.map((size, i) => (
            <option key={i} value={i}>{Math.sqrt(size)} x {Math.sqrt(size)}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Menu;