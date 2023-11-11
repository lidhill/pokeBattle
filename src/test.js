async function FetchPokemon1() {
  const species1 = 'https://pokeapi.co/api/v2/pokemon-species/';
  const pokemonIdNumber1 = Math.floor(Math.random() * 900);
  const pokemonIdString1 = pokemonIdNumber1.toString();
  const pokemonId1 = species1.concat(pokemonIdString1);
  const resp = await fetch(pokemonId1);
  const data = await resp.json()
  console.log(data);
  const image1 = PokemonImage1(pokemonIdString1);
  console.log(image1);
}

async function FetchPokemon2() {
  const species2 = 'https://pokeapi.co/api/v2/pokemon-species/';
  const pokemonIdNumber2 = Math.floor(Math.random() * 900);
  const pokemonIdString2 = pokemonIdNumber2.toString();
  const pokemonId2 = species2.concat(pokemonIdString2);
  const resp = await fetch(pokemonId2);
  const data = await resp.json()
  console.log(data);
  const image2 = PokemonImage2(pokemonIdString2);
  console.log(image2);
}



const PokemonImage1 = (pokemonIdString1) => {
  return "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + pokemonIdString1 + ".png";
}

const PokemonImage2 = (pokemonIdString2) => {
  return "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + pokemonIdString2 + ".png";
}



//pokemonData.js
