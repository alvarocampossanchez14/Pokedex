import {createRouter, createWebHistory} from 'vue-router'

import PokemonList from '../views/PokemonList.vue'
import PokemonDetail from '../views/PokemonDetail.vue'

const routes = [
    {
        path: '/', component: PokemonList
    },
]


const router = createRouter({
    history: createWebHistory(),
    routes,
 })

 export default router;
