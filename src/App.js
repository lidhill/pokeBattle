// App.js
import React, { useState, useEffect } from 'react';
import Pokemon from './Pokemon';
import Scroll from './Scroll';
import BattleButton from './BattleButton';
import './App.css';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [randomPokemons, setRandomPokemons] = useState([]);
  const [highestBaseExperiencePokemon, setHighestBaseExperiencePokemon] = useState(null);
  const [battleResult, setBattleResult] = useState(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=900');
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
    const randomIndexes = Array.from({ length: 2 }, () => Math.floor(Math.random() * pokemons.length));
    const randomPokemonSelection = randomIndexes.map(index => pokemons[index]);

    // Identify the Pokemon with the highest base experience
    const highestBaseExperiencePokemon = randomPokemonSelection.reduce((prev, current) =>
      prev.base_experience > current.base_experience ? prev : current
    );

    // Check for a draw condition
    const isDraw = randomPokemonSelection[0].base_experience === randomPokemonSelection[1].base_experience;

    // Set a flag for the Pokemon with the highest base experience or mark it as a draw
    setHighestBaseExperiencePokemon(isDraw ? null : highestBaseExperiencePokemon);
    setBattleResult(isDraw ? 'draw' : 'battle');

    // Update randomPokemons state
    setRandomPokemons(randomPokemonSelection);
  };

  return !randomPokemons.length ? (
    <div className='tc' style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <h1 className='loading'>Loading</h1>
    </div>
  ) : (
    <div className='tc'>
      <h1 className='f1'>PokeBattle</h1>
      <Scroll>
        {/* Display two random Pokemon */}
        <div className="random-pokemon-container">
          {randomPokemons.map((pokemon, index) => (
            <div key={pokemon.id} className={`pokemon-container ${pokemon === highestBaseExperiencePokemon ? 'win' : ''} ${battleResult === 'draw' ? 'draw' : ''}`}>
              <Pokemon
                id={pokemon.id}
                name={pokemon.name}
                baseScore={pokemon.base_experience}
                hasHighestBaseExperience={pokemon === highestBaseExperiencePokemon && battleResult !== 'draw'}
              />
              {battleResult === 'draw' && <div className="draw-text">Draw!</div>}
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
