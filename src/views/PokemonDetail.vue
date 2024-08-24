<template>
    <div class="flex justify-center items-center min-h-screen bg-red-700">
      <div v-if="pokemon" class="w-[80%] md:w-[60%] lg:w-[40%] bg-white p-10 rounded-lg flex flex-col justify-center items-center">
        <div @click="goToHome()" class="flex gap-x-2 bg-red-700 py-2 px-6 mb-10 rounded shadow-sm shadow-red-500 text-white cursor-pointer">
          <FontAwesomeIcon :icon="faArrowLeft" class="text-xl color-black" />
          <span>HOME</span>
        </div>
        <h2 class="text-4xl uppercase text-red-700 mb-4">{{ pokemon.name }}</h2>
        <img :src="pokemon.sprites.other?.showdown?.front_default" class="w-20"/>
        <div class=" flex flex-col w-46 justify-center">
          <div class="flex gap-x-5 my-5 justify-center">
            <p><b>Height:</b> {{ pokemon.height }}</p>
            <p><b>Weight:</b> {{ pokemon.weight }}</p>
            <p><b>Base Experience:</b> {{ pokemon.base_experience }}</p>
          </div>
          
          <StatsProgressBar />

        </div>
        <div class="mt-4">
          <p class="mb-2"><b>Game Indices:</b></p>
          <ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
            <li v-for="index in pokemon.game_indices" :key="index.version.name" class="text-white bg-red-800 p-2 rounded">
              <b>{{ index.version.name }}</b>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { getPokemonDetails } from '../api/Api.vue';
  import { useRouter, useRoute } from 'vue-router';

  import StatsProgressBar from '../components/StatsProgressBar.vue';

  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { faArrowLeft} from '@fortawesome/free-solid-svg-icons';

  
  const pokemon = ref(null);
  const route = useRoute();
  const router = useRouter();
  const images = ref([]);
  
  const fetchPokemonDetails = async () => {
    try {
      const { name } = route.params;
      pokemon.value = await getPokemonDetails(name);
      // Añadir URLs de imágenes al array images
      images.value = [
        pokemon.value.sprites.other?.showdown?.front_default,
        pokemon.value.sprites.other?.showdown?.back_default,
        pokemon.value.sprites.other?.showdown?.front_shiny,
        pokemon.value.sprites.other?.showdown?.back_shiny,
      ];
    } catch (error) {
      console.error('Error fetching Pokémon details:', error);
    }
  };
  
  const goToHome = () => {
    router.push({ path: '/' });
  };
  
  onMounted(() => {
    fetchPokemonDetails();
  });
  </script>
  
  <style scoped>
  /* Puedes agregar estilos personalizados aquí */
  </style>
  