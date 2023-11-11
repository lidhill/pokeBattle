// BattleButton.js
import React from 'react';

const BattleButton = ({ onClick }) => {
  return (
    <button className="f3 link dim ph3 pv2 mb2 dib white bg-light-purple battle-button" onClick={onClick}>
      Battle
    </button>
  );
};

export default BattleButton;