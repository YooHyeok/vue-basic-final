# [README.md](../README.md)

# Computed

함수처럼 보이지만 반드시 return 키워드가 있어야 한다.  
계산된 데이터 형식 자체를 반환하기 때문에 모양은 함수이지만 데이터 취급을 한다.  
캐싱 기능이 있어 계산 결과를 기억해둔 뒤, 다음 호출시 재계산 하지 않고 기억해둔 값을 반환한다.  
종속된 값의 변화가 발생했을 때 재계산하여 캐싱한 후 데이터를 반환한다.  
읽기 전용 이지만 getter/setter를 이용하여 읽기/쓰기도 가능하다.  
고차함수를 사용하여 복잡한 계산 로직을 조합하거나, 여러 상태값을 가공한 새로운 데이터를 만들어낼 수 있다는 장점이 있다.

## 기본 예제1) methods와 computed 속성의 공통/차이점
아래와 같이 methods 속성에 정의하는것과 동일한 함수 형태로 정의하지만, 데이터 취급을 하기 때문에 호출할때에는 변수처럼 접근한다.

- vue2
  ```vue
  <template>
    <div>
        <h2> methods 호출: {{ methodFullName() }}</h2>
        <h2> computed 호출: {{ computedFullName }}</h2>
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        firstName: '유',
        lastName: '혁'
      }
    },
    methods: {
      methodFullName() {
        return `${this.firstName}${this.lastName}`
      }
    }
    computed: {
      computedFullName() {
        return `${this.firstName}${this.lastName}`
      }
    }
  }
  </script>
  ```

- vue3
  ```vue
  <script setup>
  import { ref, computed } from 'vue'
  const firstName = ref('유')
  const lastName = ref('혁')
  const methodFullName = () => `${firstName.value}${lastName.value}`
  const computedFullName = computed(() => `${firstName.value}${lastName.value}`)

  </script>
  <template>
    <div>
        <h2> methods 호출: {{ methodFullName() }}</h2>
        <h2> computed 호출: {{ computedFullName }}</h2>
    </div>
  </template>
  ```


## 기본예제2) 캐싱 기능
아래와 같이 methods와 computed에 각각 로그를 넣어 3회씩 출력해보면, method는 로그가 3회 출력되지만, computed는 1회 출력된다.  
그러나 템플릿에는 동일한 값이 출력되는데, 이는 `캐싱` 처리가 되어 재계산 하지 않고 기억해 둔 값이 반환되었기 때문이다.  
- vue2
  ```vue
  <template>
    <div>
        <h2> methods 호출: {{ methodFullName() }}</h2>
        <h2> methods 호출: {{ methodFullName() }}</h2>
        <h2> methods 호출: {{ methodFullName() }}</h2>
        <h2> computed 호출: {{ computedFullName }}</h2>
        <h2> computed 호출: {{ computedFullName }}</h2>
        <h2> computed 호출: {{ computedFullName }}</h2>
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        firstName: '유',
        lastName: '혁'
      }
    },
    methods: {
      methodFullName() {
        console.log("method 호출")
        return `${this.firstName}${this.lastName}`
      }
    }
    computed: {
      computedFullName() {
        console.log("computed 호출")
        return `${this.firstName}${this.lastName}`
      }
    }
  }
  </script>
  ```

- vue3
  ```vue
  <script setup>
  import { ref, computed } from 'vue'
  const firstName = ref('유')
  const lastName = ref('혁')
  const methodFullName = () => {
    console.log("method 호출")
    return `${firstName.value}${lastName.value}`
  }
  const computedFullName = computed(() => {
    console.log("computed 호출")
    return `${firstName.value}${lastName.value}`
  })

  </script>
  <template>
    <div>
        <h2> methods 호출: {{ methodFullName() }}</h2>
        <h2> methods 호출: {{ methodFullName() }}</h2>
        <h2> methods 호출: {{ methodFullName() }}</h2>
        <h2> computed 호출: {{ computedFullName }}</h2>
        <h2> computed 호출: {{ computedFullName }}</h2>
        <h2> computed 호출: {{ computedFullName }}</h2>
    </div>
  </template>
  ```

- 결과
  ```text/plain
  method 호출
  method 호출
  method 호출
  Computed 호출
  ```


## 기본예제3) 재계산 - 종속된 반응형 데이터 변경
종속된 즉, 반환되는 반응형 변수의 값이 변경될 경우 재계산되기 때문에, 아래와 같은 코드에서는 computed내 로그가 2번 출력된다.
- vue2
  ```vue
  <template>
    <div>
        <h2> computed 호출: {{ computedFullName }}</h2>
        <h2> methods 호출: {{ methodFullName() }}</h2>
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        firstName: '유',
        lastName: '혁'
      }
    },
    methods: {
      methodFullName() {
        console.log("method 호출")
        return `${this.firstName}${this.lastName}`
      }
    },
    computed: {
      computedFullName() {
        console.log("computed 호출")
        return `${this.firstName}${this.lastName}`
      }
    }
  }
  </script>
  ```

- vue3
  ```vue
  <script setup>
  import { ref, computed } from 'vue'
  const firstName = ref('유')
  const lastName = ref('혁')
  const methodFullName = () => {
    console.log("method 호출")
    return `${firstName.value}${lastName.value}`
  }
  const computedFullName = computed(() => {
    console.log("computed 호출")
    return `${firstName.value}${lastName.value}`
  })

  </script>
  <template>
    <div>
        <h2> computed 호출: {{ computedFullName }}</h2>
        <h2> methods 호출: {{ methodFullName() }}</h2>
    </div>
  </template>
  ```

- 결과
  ```text/plain
  computed 호출
  method 호출
  computed 호출
  ```

## 기본예제4) 읽기 전용과 getter/setter
computed는 기본적으로 읽기전용 이기 때문에 직접 접근하여 값을 수정할 수 없지만, 내부 기능에 의해 getter setter를 정의하여 수정할 수 있다.  
computed의 기본 특성인 읽기전용은 내부적으로 getter함수만 가지도록 되어있기 때문에, setter함수와 함께 새롭게 오버라이딩 하여 정의할 경우 읽기, 쓰기 모두 가능하게 된다.  
- vue2
  ```vue
  <template>
    <div>
      <h2> methods 호출: {{ methodFullName() }}</h2>
      <h2> computed 호출: {{ computedFullName }}</h2>
      <h2> methods 호출: {{ methodFullName() }}</h2>
      <h2> computed 호출: {{ computedFullName }}</h2>
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        firstName: '유',
        lastName: '혁'
      }
    },
    methods: {
      methodFullName() {
        console.log("method 호출")
        this.computedFullName = '재혁'
        return `${this.firstName}${this.lastName}`
      }
    },
    computed: {
      computedFullName: {
        get() {
          console.log("computed 호출 - get")
          return `${this.firstName}${this.lastName}`
        },
        set(value) {
          console.log("computed 호출 - set")
          this.lastName = value
        }
      }
    }
  }
  </script>
  ```

- vue3
  ```vue
  <script setup>
  import { ref, computed } from 'vue'
  const firstName = ref('유')
  const lastName = ref('혁')
  const computedFullName = computed({
    get: () => {
      console.log("computed 호출")
      return `${firstName.value}${lastName.value}`
    },
    set: (value) => {
        console.log("computed 호출 - set")
        lastName.value = value // '재혁'을 매개변수 value로 전달받음
    }
  })
  const methodFullName = () => {
    console.log("method 호출")
    computedFullName.value = '재혁' // computed를 수정
    return `${firstName.value}${lastName.value}`
  }

  </script>
  <template>
    <div>
        <h2> computed 호출: {{ computedFullName }}</h2>
        <h2> methods 호출: {{ methodFullName() }}</h2>
        <h2> computed 호출: {{ computedFullName }}</h2>
    </div>
  </template>
  ```
- 렌더링 결과
  ```
  <h2> computed 호출: 유혁</h2>
  <h2> methods 호출: 유재혁</h2>
  <h2> computed 호출: 유재혁</h2>
  ```

### 재계산 되지 않은 이유와 nextTick
추가로 method에 의해 computed값이 변경되면 반응성을 가지므로 `종속된 값의 변화가 발생했을 때 재계산하여 캐싱한 후 데이터를 반환` 되는 원리에 의해   
유혁이 출력된 후 리랜더링되어 유재혁으로 변경되어야 한다고 생각했지만 결과를 보면 그렇지 않다.  
이는 vue의 반응성과 렌더링 순서에 의해 나타나는 현상이다.  
템플릿 표현식에서 호출된 methods는 렌더링 직전에 실행되며, computed는 getter 호출 시점에 종속 값을 반환한다.  
만약 computed 종속값이 setter 또는 다른 코드에서 변경되더라도, 이미 렌더링 중인 템플릿 표현식에는 즉시 반영되지 않게 된다.  
nextTick을 사용할 경우 Dom이 렌더링 된 이후에 실행하므로 정상적으로 출력된다.  

```js
import { nextTick } from 'vue'
const methodFullName = () => {
  console.log("method 호출")
  nextTick(() => computedFullName.value = '재혁') // computed를 수정
  return `${firstName.value}${lastName.value}`
}
```

초기 렌더링은 Vue에서 한번의 사이클로 인식되기 때문에 method에 의해 종속된 값이 변경되더라도 같은 사이클 내에서 우선적으로 렌더링 결과로 연산 되었기 때문에 적용이 되지 않은것이다.  

react에서의 useState의 setter함수와 같은 일종의 비동기 버그 현상과 유사하다.  
예를들어 버튼 이벤트에 의해 변경하였으면, 새로운 이벤트가 트리거되어 새로운 렌더링 사이클이 돌기 때문에 변경이 된다.  
이는 react에서 이벤트 핸들러가 끝난 뒤 같은 state에 대한 여러 setState 호출을 batch 형태로 묶어서 처리하기 때문에 다음 라인의 변경로직에서 변경된 최신값을 기준으로 업데이트 하는것이 아니라, 현재 렌더링 사이클이 가지고 있는 변경되지 않은 가장 마지막값을 기준으로 처리하기 때문이다.  
이러한 비동기적 현상을 react에서는 HOC 즉, 고차함수를 통해 최신값을 불러와서 처리할 수 있도록 지원해준다.  

그리고 Vue에서는 위와같은 상황을 이를 임의로 처리해주는게 nextTick인것이다.
nextTick에 의해 렌더링 사이클이 끝난 뒤 DOM이 최신상태가 되었을때 작업을 수행하기 때문에, method에서 호출되더라도 최초 렌더링이 종료된 후 호출되어 상태값을 변경하여 렌더링을 다시 한번 실행할 수 있게 된다.