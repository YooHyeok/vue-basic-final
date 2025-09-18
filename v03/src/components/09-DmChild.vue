<script setup>

// const props = 
defineProps({
  subject1: {
    type: String,
    default: ''
  },
  subject2: {
    type: String,
    default: ''
  },
  subject3: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['changeSubject1', 'changeSubject2'])

/**
 defineModel
 vue3.4부터 사용을 권장하는 CompositionAPI Helper(편의 매크로)이다.  
 컴포넌트 간의 양방향 데이터 바인딩을 더 쉽게 구현할 수 있다.  
 props와 emits 방식을 v-model로 사용할 수 있게 확장된 기능이다.  
 */
const model = defineModel()

/* 
 defineModel에는 key 이름을 붙혀줄 수 있다.  
 해당 key 이름은 자식에서 부모를 향해 쏘는 emit의 key로 사용될 수 있으며, key 앞에는 `update:key값` 형태로 구분자 : 앞에 update 키워드를 붙혀준다.
 부모에서는 자식에서 defineModel에 정의한 key를 기준으로 자식 컴포넌트 태그에 `v-model:key값="변수명"` 형태로 할당하여 사용하거나, 
 emit함수에 정의한 `update:key값` 형태의 키값과 동일하게 자식 컴포넌트 태그에 emit이벤트를 할당 하여 사용한다.
 
 자식: v-model="keyModel" 혹은 $emit('update:keyModel', 값)
 부모: <Child v-model:keyModel/> 혹은 <Child @update:keyModel/>

 교차로 적용이 4가지 경우의 수로 사용이 가능하며 결국 defineModel은 내부적으로 'update:키값' 형태의 emit키 기준 @update:key값 이벤트가 할당되는 원리라고 할 수 있다.
*/
const keyModel = defineModel('keyModel')

</script>
<template>
  <hr/>
  <a target="_blank" href="https://github.com/YooHyeok/vue-basic-todo-app/blob/main/v03/src/components/09-DmChild.vue" style="text-decoration: none; color: blue;">
    <h2 style="cursor: pointer;">코드 보러 가기</h2>
  </a>
  <hr/>
  <h2>자식 컴포넌트</h2>
  <h4>subject1: {{ subject1 }}</h4>
  <h4>subject2: {{ subject2 }}</h4>
  <h4>subject3: {{ subject3 }}</h4>
  <input type="text" @input="(e)=> emit('changeSubject1', e.target.value)" :value="subject1">
  <input type="text" @input="$emit('changeSubject2', $event)" :value="subject2">
  <h3>vue3 - defineModel 방식1</h3>
  <input type="text" v-model="model">
  <h3>vue3 - defineModel 방식2</h3>
  <input type="text" v-model="keyModel">
  <input type="text" @input="$emit('update:keyModel', $event.terget.value)" :value="subject3">
  <h3>vue3 - defineModel 내부 동작</h3>
  <input type="text" @input="$emit('update:subject3', $event)" :value="subject3">
</template>