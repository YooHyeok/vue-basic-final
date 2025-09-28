# [README.md](README.md)

# `Event바인드와 Event객체`

## 함수 참조 방식 
### `함수명 혹은 (e) => console.log(e.target.value)`
함수 이름만 할당하여 event객체를 바로 전달하는 방식이다.
vue에서 이벤트 핸들러에 콜백함수를 할당할 때, 이름만 할당할 경우 콜백함수 매개변수로 바로 event 객체가 전달된다.  
- [08-EventBind.vue]()
  ```vue
  <script setup>
  import { ref } from 'vue';

  const value1 = ref('')

  const changeValue1 = (e) => value1.value = e.target.value
  </script>
  <template>

    <input type="text" @input="changeValue1" :value="value1"><br/>
    <input type="text" @input="(e)=> value1 = e.target.value" :value="value1">
    <h4></h4>
  </template>
  ```
  위와 같이 함수명 `changeValue1`을 할당하거나, 화살표 함수로 바로 적용이 가능하다.

<br>  

## 인라인 호출 방식
### `함수명($event) `
함수 호출 형태로 할당하여 $event 키워드로 이벤트 객체를 전달하는 방식이다.  
만약 괄호를 열어 호출하는 형태로 추가 인자를 넘기면서 이벤트객체도 같이 쓰고싶을때는 $event를 명시해야한다.
- [08-EventBind.vue]()
  ```vue
  <script setup>
  import { ref } from 'vue';

  const value2 = ref('')

  const changeValue2 = (e, value) => {
    console.log(e.target.value)
    console.log(value)
  }

  </script>
  <template>
    <input type="text" @input="changeValue2($event, $event.target.value)" :value="value2">
  </template>
  ```


</details>
<br>