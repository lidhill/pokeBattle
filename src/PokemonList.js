// PokemonList.js
import React from 'react';
import Pokemon from './Pokemon';

const PokemonList = ({ pokemons }) => {
  return (
    <div>
      {pokemons.map((pokemon, i) => (
        <Pokemon
          key={i}
          id={pokemon.id}
          name={pokemon.name}
          baseScore={pokemon.base_happiness || 'N/A'}
        />
      ))}
    </div>
  );
};

export default PokemonList;