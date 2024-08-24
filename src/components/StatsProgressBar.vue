<template>
  <div>
    <div v-if="pokemon">
        <div class="flex flex-col gap-1">
          <div v-for="stat in pokemon.stats" :key="stat.stat.name" class="flex items-center justify-between gap-x-4 ">
            <FontAwesomeIcon :icon="getStatIcon(stat.stat.name)" class="text-2xl" />
            <!-- <p class=" font-medium text-right">{{ stat.base_stat }}</p> -->
            <div class="flex-1 bg-gray-200 rounded-full border border-gray-500 ">
                <div :style="{ width: getProgressWidth(stat.base_stat, 255) }" class="h-3 rounded-full" :class="getProgressColor(stat.base_stat)"></div>
            </div>
        </div>
    </div>
    </div>
  </div>
</template>

<script setup>

// Import Icons
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faHeartCircleBolt, faHandFist, faShieldHalved, faFire, faBolt, faGaugeHigh } from '@fortawesome/free-solid-svg-icons';

const statIcons = {
  'hp': faHeartCircleBolt,
  'attack': faHandFist,
  'defense': faShieldHalved,
  'special-attack': faFire,
  'special-defense': faBolt,
  'speed': faGaugeHigh
};

const props = defineProps({
  pokemon: Object,
});

//change the background color of the progress bar based on the stat value
const getProgressColor = (value) => {
  if (value > 200) {
    return 'bg-green-500';
  } else if (value > 100) {
    return 'bg-yellow-500';
  } else {
    return 'bg-red-500';
  }
};



const getProgressWidth = (value, max) => {
  const percentage = Math.min((value / max) * 100, 100);
  return `${percentage}%`;
};

const getStatIcon = (statName) => {
  return statIcons[statName] || faShieldHalved;
};

</script>

<style scoped></style>