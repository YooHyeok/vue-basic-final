<script setup>
import { ref } from 'vue';
import First from '@/views/prop-drilling-pinia/First.vue';

import { useCntStore } from '@/store/cnt';
const cntStore = useCntStore();
const {inc } = cntStore;

const increment = inc;

</script>
<template>
  <button @click="increment">카운팅</button>
  <First/>
</template>