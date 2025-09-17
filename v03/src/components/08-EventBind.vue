<script setup>
import { ref } from 'vue';

const value1 = ref('')
const value2 = ref('')

const changeValue1 = (e) => {
  console.log(e.target.value)
  value1.value = e.target.value
}
const changeValue2 = (e, value) => {
  console.log(e.target.value)
  console.log(value)
}

</script>
<template>
  <hr/>
  <a target="_blank" href="https://github.com/YooHyeok/vue-basic-todo-app/blob/main/v03/src/components/09-EventBind.vue" style="text-decoration: none; color: blue;">
    <h2 style="cursor: pointer;">코드 보러 가기</h2>
  </a>
  <hr/>
  <h2>이벤트 할당과 이벤트 객체</h2>
  <!-- 
    # 함수 참조 방식(함수 이름만 할당) - event객체 바로 전달
    vue에서 이벤트 핸들러에 콜백함수를 할당할때, 이름만 할당할 경우 콜백함수 매개변수로 바로 event객체가 전달된다.
    예제: changeValue1 혹은 (e)=> value1 = e.target.value

    # 인라인 호출 방식(함수 호출 형태 할당) - $event 키워드로 이벤트 객체를 전달
    만약 괄호를 열어 호출하는 형태로 추가 인자를 넘기면서 이벤트객체도 같이 쓰고싶을때는 $event를 명시해야한다.
    예제: changeValue2($event, $event.target.value)
  -->
  <input type="text" @input="changeValue1" :value="value1"><br/>
  <!-- <input type="text" @input="(e)=> value1 = e.target.value" :value="value1"> -->
  <input type="text" @input="(e)=> console.log(e.target.value)" :value="value1">
  <h4></h4>
  <input type="text" @input="changeValue2($event, $event.target.value)" :value="value2">
</template>