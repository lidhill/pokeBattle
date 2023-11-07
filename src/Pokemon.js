//Pokemon.js
import React from 'react';

const Pokemon = ({ name, id }) => {
  const parsedId = parseInt(id, 10);

  let paddedId;
  if (parsedId < 10) {
    paddedId = `00${parsedId}`;
  } else if (parsedId < 100) {
    paddedId = `0${parsedId}`;
  } else {
    paddedId = `${parsedId}`;
  }

  console.log(paddedId);
  return (
    <div className="tc bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5">
      <img alt={name} src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedId}.png`} />
      <div>
        <h2>{name}</h2>
      </div>
    </div>
  );
};

export default Pokemon;
