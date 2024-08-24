<template>
    <ul class="flex gap-5" v-if="types">
        <li v-for="type in types" :key="type.slot" :class="typeColor(type.type.name)" class="p-1 rounded-lg text-xs uppercase">
            {{ type.type.name }}
        </li>
    </ul>
    <div v-else>
        <span>No types</span>
    </div>
</template>

<script setup>
    import { defineProps } from 'vue';

    const props = defineProps({
        types: {
            type: Array,
            required: true
        }
    });

    const typeColor = (type) => {
        switch (type) {
            case 'normal':
            return 'bg-gray-400 text-white ';
        case 'fighting':
            return 'bg-red-500 text-white  ';
        case 'flying':
            return 'bg-indigo-300 text-white  ';
        case 'poison':
            return 'bg-purple-600 text-white  ';
        case 'ground':
            return 'bg-yellow-600 text-white  ';
        case 'rock':
            return 'bg-yellow-900 text-white  ';
        case 'bug':
            return 'bg-green-500 text-white  ';
        case 'ghost':
            return 'bg-indigo-800 text-white  ';
        case 'steel':
            return 'bg-gray-500 text-white  ';
        case 'fire':
            return 'bg-red-600 text-white  ';
        case 'water':
            return 'bg-blue-500 text-white  ';
        case 'grass':
            return 'bg-green-600 text-white  ';
        case 'electric':
            return 'bg-yellow-300 text-yellow-900  ';
        case 'psychic':
            return 'bg-pink-500 text-white  ';
        case 'ice':
            return 'bg-blue-200 text-white';
        case 'dragon':
            return 'bg-indigo-900 text-white';
        case 'dark':
            return 'bg-black text-white';
        case 'fairy':
            return 'bg-pink-200 text-pink-800';
        default:
            return 'bg-gray-200 text-gray-700';
        }
    }
</script>