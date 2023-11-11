//App.js
import React, { useState } from 'react';
import PokemonList from './PokemonList';
import SearchBox from './SearchBox';
import Scroll from './Scroll';
import { pokemons } from './pokemons'; // Import the pokemons data
import './App.css';

function App() {
  const [searchfield, setSearchfield] = useState('');

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