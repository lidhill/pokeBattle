//pokemonData.js
const axios = require('axios');

const fetchData = async () => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon-species/');
    const data = response.data.results;
    const formattedData = data.map((pokemon, index) => ({
      id: index + 1,
      name: pokemon.name
    }));
    console.log('Data:', formattedData);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

fetchData();