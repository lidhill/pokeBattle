//App.js
import React from 'react';
import PokemonList from './PokemonList';
import SearchBox from './SearchBox';
import { pokemons } from './pokemons';
import Scroll from './Scroll';
import './App.css';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      pokemons: [],
      searchfield: ''
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/')
      .then(response => response.json())
      .then(users => this.setState({ pokemons: users }));

    this.setState({ pokemons: pokemons })
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value })
  }

  render() {
    const { pokemons, searchfield } = this.state;
    const filteredPokemons = pokemons.filter(pokemon => {
      return pokemon.name.toLowerCase().includes(searchfield.toLowerCase());
    })
    if (!pokemons.length) {
      return <h1>Loading</h1>
    } else {
      return (
        <div className='tc'>
          <h1 className='f1'>PokeBattle</h1>
          <SearchBox searchChange={this.onSearchChange} />
          <Scroll>
            <PokemonList pokemonData={pokemons} />
          </Scroll>
        </div>
      );
    };
  }
}
export default App;