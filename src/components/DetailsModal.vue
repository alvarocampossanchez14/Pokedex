<template>
  <div v-if="showModal" 
       class="select-none	fixed inset-0 flex justify-center items-center bg-black/60 text-white z-50">
       
    <div class="relative bg-gradient-to-b from-gray-800 via-gray-900 to-black shadow-xl rounded-lg p-4 sm:p-8 max-w-xs sm:max-w-sm md:max-w-md w-full mx-4"
         @mousemove="handleMouseMove"
         :style="cardStyle">

      <!-- Imagen de fondo del card -->
      <div class="absolute inset-0 opacity-10 z-10 bg-center bg-no-repeat bg-contain rotate-12 " 
           style="background-image: url('https://static.thenounproject.com/png/40583-200.png');">
      </div>

    <!-- Botón de cierre -->
    <CloseButton @close="closeModal" />
    
      <!-- Contenedor de la imagen con botones de navegación -->
      <div class="relative flex justify-center items-center mb-4 z-20">
        <!-- Botón anterior -->
        <button @click="prevImage" class="absolute left-0 z-10 p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition duration-300">
          <FontAwesomeIcon :icon="faArrowLeft" />
        </button>

        <!-- Imagen -->
        <img :src="pokemonImages[currentImageIndex]" class="block max-w-[10rem] h-auto z-20" alt="">

        <!-- Botón siguiente -->
        <button @click="nextImage" class="absolute right-0 z-10 p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition duration-300">
          <FontAwesomeIcon :icon="faArrowRight" />
        </button>
      </div>

      <!-- Nombre del Pokémon -->
      <h2 class="text-2xl font-bold text-center mb-2 z-20">{{ pokemon?.name }}</h2>

      <!-- Altura, Tipo y Peso -->
      <div class="flex justify-around items-center text-center mb-6 z-20">
        <div>
          <p class="text-sm">Altura</p>
          <p class="text-lg font-bold">{{ pokemon?.height }} M</p>
        </div>
        <PokemonType :types="pokemon.types" class="flex items-center" />
        <div>
          <p class="text-sm">Peso</p>
          <p class="text-lg font-bold">{{ pokemon?.weight }} KG</p>
        </div>
      </div>

      <!-- Barra de estadísticas -->
      <div class="w-full z-20">
        <StatsProgressBar :pokemon="pokemon" /> 
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faXmark, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import StatsProgressBar from '../components/StatsProgressBar.vue';
import PokemonType from '../components/PokemonType.vue';
import CloseButton from './CloseButton.vue'

const props = defineProps({
  showModal: Boolean,
  pokemon: Object,
});

const emit = defineEmits(['close']);

const currentImageIndex = ref(0);
const pokemonImages = ref([]);
const cardStyle = ref({});

const handleMouseMove = (event) => {
  const { clientX, clientY } = event;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const deltaX = (clientX - centerX) / centerX;
  const deltaY = (clientY - centerY) / centerY;

  cardStyle.value = {
    transform: `perspective(1000px) rotateX(${deltaY * 10}deg) rotateY(${deltaX * 10}deg)`,
    willChange: 'transform',
    transition: 'transform 0.1s ease-out'
  };
};

watch(() => props.showModal, (newVal) => {
  document.body.style.overflow = newVal ? 'hidden' : '';
});

watch(() => props.pokemon, (newVal) => {
  if (newVal) {
    pokemonImages.value = [
      newVal.sprites.other['official-artwork']?.front_default,
      newVal.sprites.other['dream_world']?.front_default,
      newVal.sprites.other['home']?.front_default,
    ].filter(Boolean);
    currentImageIndex.value = 0;
  }
});

const closeModal = () => emit('close');

const prevImage = () => {
  currentImageIndex.value = (currentImageIndex.value > 0) 
    ? currentImageIndex.value - 1 
    : pokemonImages.value.length - 1;
};

const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value < pokemonImages.value.length - 1) 
    ? currentImageIndex.value + 1 
    : 0;
};
</script>

<style scoped>
.modal-card {
  background: linear-gradient(to bottom, #3a3a3a, #222);
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
  transition: transform 0.1s ease-out;
}

button {
  transition: background-color 0.3s ease;
}

</style>
