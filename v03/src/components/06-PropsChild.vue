<script setup>
import { onMounted, onUpdated, toRef } from 'vue'
/**
 * Vue3 props
 * <script setup> 구문이라면 defineProps를 통해 props를 전달받을 수 있다.
 * defineProps에 정의한 객체 내 속성을 template 영역에서 바로 참조할 수 있으며 
 * template 내에서 접근하더라도 반응성이 유지되기 때문에 따로 toRefs등과 같은 기능을 통해 구조분해 하지 않아도 된다.
 * (script내에서는 구조분해 하지 않으면 props로 참조해야한다.)
 * 
 * setup 함수를 직접 선언하여 사용하는 경우라면 defineProps를 사용할 수 없어 `setup(props, {}){}` 와 같이 매개변수로 전달받은 뒤
 * toRef 혹은 toRefs를 사용하여 구조분해 해야만 template 영역과 script 영역에서 변수에서 반응성이 유지된채 참조가 가능하다.
 * toRefs를 하게되면 props가 3개있다고 가정할때 1개만 분해한다고 해도 3개 모두에 getter가 생기니, 
 * script내에 모든것을 다 사용하지 않는 경우에는 toRef를 사용하여 사용할 prop만 정규화 하는것이 리소스 측면에서 바람직하다
 */
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  mainCont: {
    type: String,
    default: ''
  },
})
// const {title, mainCont} = toRefs(props) // script 영역에서 함수등에 의해 접근하여 값을 사용해야할 때 반응성을 유지하기 위해서는 구조분해(정규화) 해야한다.
// const { title } = toRefs(props) // toRefs는 모든 prop의 getter를 만들기 때문에 만약 script 영역에서 props 중 1개만 사용하거나 모든 props를 다 사용하지 않는 경우 toRefs는 비효율적이다
const title = toRef(props, 'title') // 이 경우 toRef로 사용할 prop만 정규화한다.

const print = () => {
  console.log(props.title)
  console.log(title.value)
}
onMounted(print)
onUpdated(print)
</script>
<template>
  <hr/>
  <a target="_blank" href="https://github.com/YooHyeok/vue-basic-todo-app/blob/main/v03/src/components/06-PropsChild.vue" style="text-decoration: none; color: blue;">
    <h2 style="cursor: pointer;">코드 보러 가기</h2>
  </a>
  <hr/>
  <h2>자식 컴포넌트</h2>
  
  <p>title: {{ title }}</p>
  <p>mainCont: {{ mainCont }}</p> <!-- script setup에서는 Vue가 내부적으로 props를 바로 변수처럼 쓸 수 있도록 컴파일해준다. -->
</template>