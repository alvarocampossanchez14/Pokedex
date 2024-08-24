<script>
  import { onMounted} from 'vue';
  import axios from 'axios';
  
  const apiLink = 'https://pokeapi.co/api/v2/';
  // Fetch API data
  export const getPokemonList = async (limit , offset ) => {
    const response = await axios.get(apiLink + `pokemon?limit${limit}&offset=${offset}`);
    return response.data.results
  };

  export const getAllPokemon = async (limit = 1500) => {
    const response = await axios.get(apiLink + `pokemon?limit=${limit}`);
    return response.data.results
  };

  export const getPokemonDetails = async(name) => {
    const response = await axios.get(apiLink + `pokemon/${name}`);
    return response.data
  };
  
  export const getMoves = async(moveName) => {
    const response = await axios.get(apiLink + `move/${moveName}`);
    return response.data
  };

  export const getPokemonTypes = async () => {
  const response = await axios.get(apiLink + `/type`);
  return response.data.results;
  }

  onMounted(getPokemonList); 
  </script>