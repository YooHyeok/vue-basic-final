<script setup>
import { useCntStore } from '@/store/cnt'
const cntStore = useCntStore();

import { toRefs } from 'vue'
const { inc:incr } = toRefs(cntStore); // 구조분해 할당.

// incr(); // [Error]: toRefs는 action도 ref proxy로 랩핑된다.
incr.value(); // value로 접근 후 소괄호 함수호출을 해야 정상적으로 적용된다.

import { storeToRefs } from 'pinia' // state, getters만 취급하며, actions는 제외된다.
const { cnt, oddOrEven } = storeToRefs(cntStore); // toRefs보다 조금 더 효율적으로 랩핑 관리(?)됨
const {inc, dec } = cntStore;

</script>

<template>
  <h2>방문자 집계: {{ cnt }}</h2>
  <h2>홀짝 판별: {{ oddOrEven }}</h2>
  <button @click="inc">방문자 1 증가</button>
  <button @click="dec">방문자 1 감소</button>
</template>
