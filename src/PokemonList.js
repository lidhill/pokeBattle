//PokemonList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pokemon from './Pokemon';

const PokemonList = () => {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon-species/');
        const data = response.data.results;
        const formattedData = data.map((pokemon, index) => ({
          id: index + 1,
          name: pokemon.name
        }));
        setPokemonData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>

        {pokemonData.map((pokemon) => (
          <Pokemon key={pokemon.id} id={pokemon.id} name={pokemon.name} />
        ))}
    </div>
  );
};

export default PokemonList;