<script setup>
import { computed, ref } from 'vue'
const cnt = ref(0)
const oddOrEven = computed(() => (cnt.value % 2 == 0) ? '짝수' : '홀수')
const inc = () => cnt.value ++;
const dec = () => cnt.value --;
</script>

<template>
  <h2>방문자 집계: {{ cnt }}</h2>
  <h2>홀짝 판별: {{ oddOrEven }}</h2>
  <button @click="inc">방문자 1 증가</button>
  <button @click="dec">방문자 1 감소</button>

</template>
