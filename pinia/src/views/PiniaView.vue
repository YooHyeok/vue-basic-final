<script setup>
import { useCntStore } from '@/store/cnt'
const cntStore = useCntStore();
</script>

<template>
  <h2>방문자 집계: {{ cntStore.cnt }}</h2>
  <h2>홀짝 판별: {{ cntStore.oddOrEven }}</h2>
  <button @click="cntStore.inc">방문자 1 증가</button>
  <button @click="cntStore.dec">방문자 1 감소</button>
</template>
