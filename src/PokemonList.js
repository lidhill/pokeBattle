//PokemonList.js
import React from 'react';
import Pokemon from './Pokemon';

const PokemonList = ({ pokemons }) => {
  return (
    <div>
      {
        pokemons.map((user, i) =>  {
         return (
          <Pokemon 
            key={i} 
            id={pokemons[i].id} 
            name={pokemons[i].name}               
            />
        );
      })
    }
  </div>
 );
};

export default PokemonList;