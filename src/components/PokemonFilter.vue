<template>
    <div class="flex justify-center items-center my-5">
      <select id="type" v-model="selectedType" @change="filterByType" class="bg-gray-800 text-white py-2 px- rounded">
        <option value="">Todos</option>
        <option v-for="type in types" :key="type" :value="type">{{ type }}</option>
      </select>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const types = [
    'Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 'Fighting', 'Poison', 'Ground',
    'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'
  ];
  
  const selectedType = ref('');
  const emit = defineEmits(['filter']);
  
  const filterByType = () => {
    emit('filter', selectedType.value);
  };
  </script>
  
  <style scoped>
  /* Añadir estilos personalizados aquí si es necesario */
  </style>
  