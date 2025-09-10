import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useCntStore = defineStore('cnt', () => {
  const cnt = ref(0)
  const oddOrEven = computed(() => (cnt.value % 2 == 0) ? '짝수' : '홀수')
  const inc = () => cnt.value ++;
  const dec = () => cnt.value --;
  return { cnt, oddOrEven, inc, dec }
})