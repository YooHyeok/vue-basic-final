<script setup>
const props = defineProps({
  count: Number
});
</script>
<template>
  <p>Second Component</p>
  Count: {{ count }} <!-- toRefs로 구조분해 하지 않는다면  -->
</template>