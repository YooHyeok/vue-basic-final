<script setup>
import { useCntStore } from '@/store/cnt';
import { storeToRefs } from 'pinia' // state, getters만 취급하며, actions는 제외된다.
const cntStore = useCntStore();
const { cnt } = storeToRefs(cntStore); // toRefs보다 조금 더 효율적으로 랩핑 관리(?)됨

</script>
<template>
  <p>Second Component</p>
  Count: {{ cnt }}
</template>