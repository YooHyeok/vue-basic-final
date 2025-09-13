<script setup>
import Second from '@/views/prop-drilling/Second.vue';

const props = defineProps({
  count: Number
});

</script>
<template>
  <p>First Component</p>
  <Second :count/>
</template>