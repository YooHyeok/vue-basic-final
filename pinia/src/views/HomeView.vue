<script setup>
import { computed, ref } from 'vue'
const cnt = ref(0)
const oddOrEven = computed(() => (cnt.value % 2 == 0) ? '짝수' : '홀수')
const inc = () => cnt.value ++;
const dec = () => cnt.value --;
</script>

<!-- 
라우터 이동시 state 유지가 되지 않는다.
컴포넌트가 리랜더링 되기 때문이다.
pinia를 사용하여 데이터를 전역으로 관리해야한다.
-->
<template>
  <h2>방문자 집계: {{ cnt }}</h2>
  <h2>홀짝 판별: {{ oddOrEven }}</h2>
  <button @click="inc">방문자 1 증가</button>
  <button @click="dec">방문자 1 감소</button>

</template>
