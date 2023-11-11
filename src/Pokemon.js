// Pokemon.js
import React from 'react';

const Pokemon = ({ name, id, baseScore, isWinner, isLoser, isDraw }) => {
  const parsedId = parseInt(id, 10);
  let paddedId;

  if (parsedId < 10) {
    paddedId = `00${parsedId}`;
  } else if (parsedId < 100) {
    paddedId = `0${parsedId}`;
  } else {
    paddedId = `${parsedId}`;
  }

  return (
    <div className="tc bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5">
      <img
        src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedId}.png`}
        alt={name}
      />
      <div className="result-text">
        {isWinner ? 'Win' : isLoser ? 'Loss' : isDraw ? 'Draw' : ''}
      </div>
      <div>
        <h2>{name}</h2>
        <p>Base Score: {baseScore}</p>
      </div>
    </div>
  );
};

export default Pokemon;
