<template>
  <div class="w-screen flex flex-col items-center gap-10 justify-center p-10">

    <img src="../assets/pokemon-23.svg" class="w-52 -scroll-my-20 transition-transform duration-500">
    
    <div class="w-full">
      <SearchComponent @search="searchPokemons" />
      <PokemonFilter @filter="filterPokemonsByType" />
    </div>

    <ul class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-5">
      <li v-for="pokemon in filteredPokemons" :key="pokemon.name" :ref="el => pokemonRefs[pokemon.name] = el" class="opacity-0 transition-opacity duration-500">
        <div @click="openPokemonModal(pokemon)" class="rounded-xl h-auto items-center w-56 flex flex-col hover:scale-105 hover:brightness-125 transition-transform duration-300 bg-black bg-opacity-45 cursor-pointer">
          <div class="h-40 flex items-center justify-center">
            <img :src="pokemon.sprites?.other?.showdown?.front_default" alt="Pokémon sprite" class="w-25">
          </div>
          <div class="bg-opacity-70 bg-black rounded-xl w-[100%] p-5 flex flex-col gap-2">
            <span class="text-2xl text-white">#{{ pokemon.id }}</span>
            <span class="text-2xl capitalize text-white ">{{ pokemon.name }}</span>
            <PokemonType v-if="pokemon.types" :types="pokemon.types" />
          </div>
        </div>
      </li>
    </ul>

    <PokemonDetailsModal :showModal="showModal" :pokemon="selectedPokemon" @close="closeModal" />

    <div ref="loadRef" class="h-1"></div>

    <div v-if="isLoading" class="mt-5">
      <img :src="loadingGif" alt="Loading" class="w-36 h-auto" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, computed } from 'vue';
import { getPokemonDetails, getPokemonList } from '../api/Api.vue';

// Assets
import loadingGif from '../assets/pokeball-pokemon.gif';

// Components
import PokemonType from '../components/PokemonType.vue';
import SearchComponent from '../components/SearchComponent.vue';
import PokemonDetailsModal from '../components/DetailsModal.vue';
import PokemonFilter from '../components/PokemonFilter.vue';

const pokemons = ref([]);
const selectedPokemon = ref(null);
const offset = ref(0);
const isLoading = ref(false);
const loadRef = ref(null);
const pokemonRefs = ref({});
const showModal = ref(false);
const selectedType = ref('');

const fetchPokemons = async () => {
  try {
    const newPokemons = await getPokemonList(25, offset.value);
    const pokemonDetails = await Promise.all(
      newPokemons.map(async (pokemon) => {
        const details = await getPokemonDetails(pokemon.name);
        return {
          ...pokemon,
          sprites: details.sprites,
          types: details.types,
          id: details.id,
          showdownGif: details.sprites.other?.showdown?.front_default || details.sprites.front_default
        };
      })
    );
    pokemons.value = [...pokemons.value, ...pokemonDetails];
    offset.value += 25;
    nextTick(() => {
      Object.values(pokemonRefs.value).forEach(el => {
        if (el) {
          observerIntersection.observe(el);
        }
      });
    });
  } catch (error) {
    console.error('Error fetching Pokémon list:', error);
  }
};

const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const openPokemonModal = async (pokemon) => {
  try {
    selectedPokemon.value = await getPokemonDetails(pokemon.name);
    const audioURL = selectedPokemon.value.cries?.legacy;

    if (audioURL) {
      const audio = new Audio(audioURL);
      audio.play();
    }
    openModal();
  } catch (error) {
    console.error(`Error fetching details for ${pokemon.name}:`, error);
  }
};

const loadMore = async () => {
  isLoading.value = true;
  setTimeout(async () => {
    await fetchPokemons();
    isLoading.value = false;
  }, 1000);
};

const handleScroll = (entries) => {
  const entry = entries[0];
  if (entry.isIntersecting && !isLoading.value) {
    loadMore();
  }
};

const handleIntersection = (entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('opacity-100');
      entry.target.classList.remove('opacity-0');
    } else {
      entry.target.classList.add('opacity-0');
      entry.target.classList.remove('opacity-100');
    }
  });
};

const searchPokemons = async (query) => {
  try {
    const searchedPokemon = await getPokemonDetails(query.toLowerCase());
    if (searchedPokemon) {
      selectedPokemon.value = searchedPokemon;
      openModal();
    } else {
      alert('No se encontró ningún Pokémon con ese nombre.');
    }
  } catch (error) {
    alert('No se encontró ningún Pokémon con ese nombre.');
    console.error('Error fetching Pokémon details:', error);
  }
};

const filterPokemonsByType = (type) => {
  selectedType.value = type;
};

const filteredPokemons = computed(() => {
  if (selectedType.value === '') {
    return pokemons.value;
  }
  return pokemons.value.filter(pokemon =>
    pokemon.types.some(t => t.type.name.toLowerCase() === selectedType.value.toLowerCase())
  );
});

let observerScroll;
let observerIntersection;

onMounted(() => {
  fetchPokemons();

  observerIntersection = new IntersectionObserver(handleIntersection, { threshold: 0.1 });
  observerScroll = new IntersectionObserver(handleScroll, { threshold: 0.1 });
  if (loadRef.value) {
    observerScroll.observe(loadRef.value);
  }
});

onBeforeUnmount(() => {
  if (observerScroll && loadRef.value) {
    observerScroll.unobserve(loadRef.value);
  }

  if (observerIntersection) {
    Object.values(pokemonRefs.value).forEach(el => {
      if (el) {
        observerIntersection.unobserve(el);
      }
    });
  }
});
</script>

<style scoped>
/* Estilos específicos del componente si es necesario */
</style>
