// App.js
import React, { useState, useEffect } from 'react';
import Pokemon from './Pokemon';
import Scroll from './Scroll';
import BattleButton from './BattleButton';
import './App.css';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [randomPokemons, setRandomPokemons] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const data = await response.json();

        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const pokemonResponse = await fetch(pokemon.url);
            const pokemonData = await pokemonResponse.json();

            // Include base_experience in the Pokemon data
            return {
              id: pokemonData.id,
              name: pokemonData.name,
              base_experience: pokemonData.base_experience,
            };
          })
        );

        setPokemons(pokemonDetails);

        // Select two random Pokemon from the fetched data
        const randomIndexes = Array.from({ length: 2 }, () => Math.floor(Math.random() * pokemonDetails.length));
        const randomPokemonSelection = randomIndexes.map(index => pokemonDetails[index]);
        setRandomPokemons(randomPokemonSelection);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPokemons();
  }, []);

  const handleBattleButtonClick = () => {
    // Trigger randomization/update logic here
    const randomIndexes = Array.from({ length: 2 }, () => Math.floor(Math.random() * pokemons.length));
    const randomPokemonSelection = randomIndexes.map(index => pokemons[index]);
    setRandomPokemons(randomPokemonSelection);
  };

  return !randomPokemons.length ? (
    <h1>Loading</h1>
  ) : (
    <div className='tc'>
      <h1 className='f1'>PokeBattle</h1>
      <Scroll>
        {/* Display two random Pokemon */}
        <div className="random-pokemon-container">
          {randomPokemons.map((pokemon) => (
            <div key={pokemon.id} className="pokemon-container">
              <Pokemon
                id={pokemon.id}
                name={pokemon.name}
                baseScore={pokemon.base_experience}
              />
            </div>
          ))}
        </div>
        {/* Battle Button */}
        <BattleButton onClick={handleBattleButtonClick} />
      </Scroll>
    </div>
  );
}

export default App;
