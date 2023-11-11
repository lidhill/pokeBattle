//App.js
// App.js
// App.js
import React, { useState, useEffect } from 'react';
import PokemonList from './PokemonList';
import SearchBox from './SearchBox';
import Scroll from './Scroll';
import './App.css';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [searchfield, setSearchfield] = useState('');

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=900');
        const data = await response.json();

        // Fetch additional details for each Pokemon
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const pokemonResponse = await fetch(pokemon.url);
            const pokemonData = await pokemonResponse.json();
            return {
              id: pokemonData.id,
              name: pokemonData.name,
            };
          })
        );

        setPokemons(pokemonDetails);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPokemons();
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  const onSearchChange = (event) => {
    setSearchfield(event.target.value);
  }

  const filteredPokemons = pokemons.filter(pokemon => {
    return pokemon.name.toLowerCase().includes(searchfield.toLowerCase());
  });

  return !pokemons.length ?
    <h1>Loading</h1> :
    (
      <div className='tc'>
        <h1 className='f1'>PokeBattle</h1>
        <SearchBox searchChange={onSearchChange} />
        <Scroll>
          <PokemonList pokemons={filteredPokemons} />
        </Scroll>
      </div>
    );
}

export default App;
