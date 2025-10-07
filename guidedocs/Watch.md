# [README.md](../README.md)

# Watch
반응형 속성이 변경될 때마다 함수를 트리거(호출) 할 수 있다.  
vue3에서는 watcher를 함수내에서 선언하여 감시를 시작할 수 있다.  
또한 stop을 지원해 추적 중단이 가능하다.  
이에, 함수 호출등을 통한 트리거로 추적을 실행하고, stop으로 추적을 중단할 수 있다.  
추가로 value의 3번째 매개변수로 cleanup 콜백함수도 지원해준다.  

## 기본예제1) 버튼을 통한 값 증가 및 감지
<details>
<summary>접기/펼치기</summary>
<br>

- v02
  ```vue
  <script>
  export default {
    data: function() {
      return {
        count: 0,
      }
    },
    watch: {
      count(newVal, oldVal) {
        console.log(`[count 변경 감지] - old : ${oldVal}, new : ${newVal}`)
      },
    },
    methods: {
      increment() {
        this.count ++
      }
    }
  }
  </script>
  <template>
    <div>
        <p>[Count]: {{ count }}</p>
        <button @click="increment">Increment</button>
    </div>
  </template>
  ```

- v03
  ```vue
  <script>
  import { ref, watch } from 'vue'

  const count = ref(0)
  
  watch(count, (newVal, oldVal) => {
    console.log(`[count 변경 감지] - old : ${oldVal}, new : ${newVal}`)
  })

  const increment = () => count.value ++

  </script>
  <template>
    <div>
        <p>[Count]: {{ count }}</p>
        <button @click="increment">Increment</button>
    </div>
  </template>
  ```
</details>

## 기본예제2) 옵션
<details>
<summary>접기/펼치기</summary>
<br>

1회만 감시(`once`)하거나, 컴포넌트가 마운트될 때(`immediate`) 혹은 Object 타입의 데이터의 속성을 감시하는 깊은 감시 등에 필요한 옵션(`deep`)을 추가할때 사용한다.

vue2에서는 감시할 속성을 함수형태가 아닌 객체 형태로 정의한 후, 내부에 handler라는 옵션을 통해 감시후 실행할 핵심 로직을 담은 콜백 함수를 정의하여 함께 사용해야 하며, vue3에서는 세번째 인자에 객체 형태로 정의하여 사용한다.

### 한번만 호출하는 once

```vue
<script>
export default {
  data: function() {
    return {
      count: 0,
    }
  },
  watch: {
    count: {
      handler(newVal, oldVal) {
        console.log(`[count 변경 감지] - old : ${oldVal}, new : ${newVal}`)
      },
      once: true
    },
  },
  methods: {
    increment() {
      this.count ++
    }
  }
}
</script>
<template>
  <div>
      <p>[Count]: {{ count }}</p>
      <button @click="increment">Increment</button>
  </div>
</template>
```
### 한번만 호출하는 once

```vue
  <script>
  import { ref, watch } from 'vue'

  const count = ref(0)
  
  watch(count, (newVal, oldVal) => {
    console.log(`[count 변경 감지] - old : ${oldVal}, new : ${newVal}`)
  },{ once: true })

  const increment = () => count.value ++

  </script>
  <template>
    <div>
        <p>[Count]: {{ count }}</p>
        <button @click="increment">Increment</button>
    </div>
  </template>
  ```

- 결과(버튼 3회 클릭) - 1번 출력
  ```
  [count 변경 감지] - old : 0, new : 1 
  ```

</details>