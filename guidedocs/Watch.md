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

## 기본예제2) 옵션1 - 옵션 적용 문법 및 옵션의 종류
<details>
<summary>접기/펼치기</summary>
<br>

1회만 감시(`once`)하거나, 컴포넌트가 마운트될 때(`immediate`) 혹은 Object 타입의 데이터의 속성을 감시하는 깊은 감시 등에 필요한 옵션(`deep`)을 추가할때 사용한다.

vue2에서는 감시할 속성을 함수형태가 아닌 객체 형태로 정의한 후, 내부에 handler라는 옵션을 통해 감시후 실행할 핵심 로직을 담은 콜백 함수를 정의하여 함께 사용해야 하며, vue3에서는 세번째 인자에 객체 형태로 정의하여 사용한다.

### 한번만 호출하는 once

- vue2
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

- vue3
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

## 기본예제3) 옵션2 - 깊은 감지와 deep
<details>
<summary>접기/펼치기</summary>
<br>

deep이란? 
watch 대상의 데이터가 하위 속성을 가지고 있는 객체타입인 경우, 하위 속성 감지 여부를 결정한다.  
object타입의 반응형 변수에서 object의 값을 통으로 변경하지 않고, 속성 값을 변경할 경우 감지되지 않는다.  
기본적으로 object타입의 반응형 변수가 감지되는 범위는 얕은 감지로 값 자체의 변경만 감지한다.  
만약 객체의 변경을 감지하기 위해서는 아래와 같다.
- vue2  
  감지 대상을 객체형 watch 구문과 handler 함수 형태로 작성해야 하고, deep 옵션을 추가해야 한다.
  ```vue
  <template>
    <div>
      <button @click="counter">속성 변경</button>
      <button @click="replace">객체 교체</button>
    </div>
  </template>

  <script>
  export default {
    data() {
      return {
        obj: { name: '홍길동', age: 30 },
        obj2: { name: '홍길동', age: 30 }
      }
    },
    methods: {
      // 내부 속성 변경
      counter() {
        this.obj.age++   // 내부 속성만 변경
        this.obj2.age++  // 내부 속성만 변경
      },
      // 객체 자체 교체
      replace() {
        this.obj = { name: '임꺽정', age: 50 }   // 참조 변경
        this.obj2 = { name: '임꺽정', age: 50 }  // 참조 변경
      }
    },
    watch: {
      // 얕은 감지 (deep: false)
      // ➡ 객체 참조(주소)가 바뀔 때만 감지됨
      // ➡ 내부 속성(this.obj.age) 변경 시 감지 ❌
      // ➡ this.obj = {...} 처럼 객체 자체가 바뀌면 감지 ✅
      obj: {
        handler(newVal, oldVal) {
          console.log('얕은 감지 - obj 접근') // ✅ 객체 교체 시 감지됨 / ❌ 속성 변경 시 감지 안됨
        },
        deep: false
      },

      // 깊은 감지 (deep: true)
      // ➡ 내부 속성(this.obj2.age) 변경 시에도 감지됨 ✅
      // ➡ 객체 자체가 바뀌어도 감지됨 ✅
      obj2: {
        handler(newVal, oldVal) {
          console.log('깊은 감지 - obj2 접근') // ✅ 속성 변경 & 객체 교체 모두 감지됨
        },
        deep: true
      }
    }
  }
  </script>
  ```
- vue3  
  감지 대상을 value로 접근하거나 3번째 매개변수로 deep 옵션 사용해야 한다.
  (reactive의 경우 기본적으로 깊은 감지 까지 가능하다.)
  ```vue
  <script setup>

  import { ref, reactive, watch } from 'vue';


  const counter = () => {
    obj.value.age ++; 
    obj2.age ++; 
  }

  const obj = ref({name: '홍길동', age: 30})
  const obj2 = reactive({name: '홍길동', age: 30})

  watch(obj, (n, o) => {
    console.log('얕은 감지 - obj2접근')
  }, {deep: false})

  watch(obj.value, (n, o) => {
    console.log('얕은 감지 - obj.value접근') // 감지
  }, {deep: false})

  watch(obj, (n, o) => {
    console.log('깊은 감지 - obj접근') // 감지
  }, {deep: true})

  watch(obj2, (n, o) => {
    console.log('얕은 감지 - obj2접근')  // 감지
  }, {deep: false})
  </script>

  <template>
    <button @click="counter">클릭</button>
  </template>
  ```
</details>

## 기본예제4) vue2 객체 내 속성 감시 - 문자열 형식
<details>
<summary>접기/펼치기</summary>
<br>

vue2에서 특정 속성을 감시할때는 감시 대상을 문자열로 처리해야한다.  
vue가 내부적으로 경로(path)를 파싱해서 반응형 추적을 하기 때문이다.  
즉, vue2의 initWatch() 내부에서 watch의 key를 읽을 때 문자열 경로를 경로파서(parsePath)로 분석한다.
이 과정에서 내부적으로 getter를 생성하게된다.

```vue
<template>
  <div>
    <button @click="counter">속성 변경</button>
    <button @click="replace">객체 교체</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      obj: { name: '홍길동', age: 30 },
      obj2: { info: { name: '홍길동', age: 30 } }
    }
  },
  methods: {
    // 내부 속성 변경
    counter() {
      this.obj.age++   // 내부 속성 변경
      this.obj2.info.age++  // 내부 속성 변경
    },
  },
  watch: {
    'obj.age'(newVal, oldVal) {
      console.log('obj.age 변경 감지')
    },
    'obj2.info': {
      handler(newVal, oldVal) {
        console.log('깊은 감지 - obj2.info 접근')
      },
      deep: true
    }
  }
}
</script>
```
</details>

## 기본예제5) vue2 객체 내 속성 감시 - this.$watch() (getter)
<details>
<summary>접기/펼치기</summary>
<br>

this.$watch()를 통해 getter 함수 방식을 사용한다면, 문자열을 사용하지 않고 동적 속성에 직접 접근이 가능하다.
this.$watch()는 런타임 시점에 watcher를 동적으로 등록할 때 사용한다.  
보통 watch 옵션은 컴포넌트 옵션에서 선언적(declarative)로 정의하지만, this.$watch()를 쓰면 실행중에도 watcher를 만들고 제거할 수 있다.  

```vue
<template>
  <div>
    <p>workOption.autoYn: {{ workOption.autoYn }}</p>
    <button @click="toggleAutoYn">autoYn 변경</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      workOption: {
        autoYn: 'N'
      }
    }
  },
  methods: {
    toggleAutoYn() {
      // 클릭할 때마다 N ↔ Y 변경
      this.workOption.autoYn = this.workOption.autoYn === 'N' ? 'Y' : 'N';
    }
  },
  created() {
    // 함수형 getter watcher 등록
    this.$watch(
      () => this.workOption.autoYn,   // getter 함수
      (newVal, oldVal) => {
        console.log(`watch 실행됨: ${oldVal} → ${newVal}`);
      }
    )
  }
}
</script>
```
기본적으로 created 훅에 등록하여 사용하면 컴포넌트가 destroyed 되기 전까지 해당 watch는 유효하다.

앞서 말했듯, 실행중에도 만들고 제거할수 있다는것은 특정 method 호출 시점에도 watch를 등록하여 해당 method가 실행되는 동안에만 감지할 수 있도록 처리할 수도 있다.  
제거만 잘 해주면 된다.  
메소드 내부에서 등록 및 제거하는 코드를 구현해본다.  

```vue
<template>
  <div>
    <p>count: {{ count }}</p>
    <button @click="runWatcherOnce">메소드 실행 + 감시</button>
    <button @click="increment">count 증가</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    },
    runWatcherOnce() {
      // watcher 등록
      const unwatch = this.$watch(
        'count',
        (newVal, oldVal) => {
          console.log(`count 변경 감지: ${oldVal} → ${newVal}`)
        }
      )

      console.log('메소드 내부 watcher 등록 완료')

      // watcher 제거
      // 여기서 메소드 종료 전에 unwatch 호출
      unwatch()
      console.log('메소드 종료 전에 watcher 제거됨')
    }
  }
}
</script>
```

</details>

## 기본예제6) vue3 proxy와 getter
<details>
<summary>접기/펼치기</summary>
<br>

객체 타입에서 특정 속성에 대한 감지를 하기 위해서는 getter를 사용해야 한다.  
단순히 감지대상을 `obj.value.속성` 형태로만 처리할 경우 속성에 대한 값 그 자체를 감시 대상으로 지정해버리기 때문이다.  
watch에서는 감시 대상자에 ref를 등록하면 내부적으로 getter가 호출되어 반응성을 추적한다.  
그러나 object의 속성을 접근할 경우 값 그 자체이므로 getter를 통해 접근할 수 있도록 함수로 한번 감싸줘야 한다.  
이것은 기본타입의 ref에도 마찬가지이다.  
primitive ref를 감시대상으로 지정할 때 watch(count.value, ...)와 같이 값 자체를 넣으면 변경이 추적되지 않으므로, 
watch(count, ...) 처럼 ref 변수명 자체를 감시 대상으로 사용하거나 혹은 watch(() => count.value, ...)와 같이 value속성으로 접근하되, 함수로 한번 감싸줘야 한다.

```vue
<script setup>

import { ref, reactive, watch } from 'vue';


const counter = () => {
  count.value ++;
  obj.value.age ++; 
}

/* primitive 타입 */
const count = ref(0)
watch(count, (n, o) => {
  console.log('count 직접 감지')
})

watch(count.value, (n, o) => {
  console.log('count.value 직접 감지') // 감지안됨
})

watch(() => count.value, (n, o) => {
  console.log('count.value getter 접근')
})

/* Object 타입 */
const obj = ref({name: '홍길동', age: 30})
watch(obj.value.age, (n, o) => {
  console.log('obj.value.age 직접 감지') // 감지안됨
})

watch(() => obj.value.age, (n, o) => {
  console.log('obj.value.age getter 접근')
})

</script>

<template>
  <button @click="counter">클릭</button>
</template>
```
</details>
