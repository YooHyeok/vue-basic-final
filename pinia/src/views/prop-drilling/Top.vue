<script setup>
import { ref } from 'vue';
import First from '@/views/prop-drilling/First.vue';

const count = ref(0);
const increment = () => count.value++;

</script>
<!-- 
Prop drilling

상위 컴포넌트의 데이터를 하위 컴포넌트로 전달하기 위해, 중간에 데이터를 전달하는 용도로만 쓰이는 여러 컴포넌트들을 거치는것을 말한다.
데이터가 드릴처럼 여러 컴포넌트를 뚫고 내려간다고 해서 붙여진 이름으로, 애플리케이션이 복잡해질수록 유지보수가 어려워지고 비효율적인 문제가 발생한다.
-->
<template>
  <button @click="increment">카운팅</button>
  <First :count/>
</template>