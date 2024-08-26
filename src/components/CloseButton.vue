<template>
   <button @click="closeModal" class="absolute top-3 right-4 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
      &times;
    </button>

  </template>
  
  <script>
  export default {
    name: 'CloseButton',
    methods: {
      closeModal() {
        this.$emit('close');  // Emite el evento 'close' al hacer clic en el botón
      }
    }
  }
  </script>
  