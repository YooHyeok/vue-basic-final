# [README.md](../README.md)

# Mixin
여러 컴포넌트에서 불러와 재사용 할 수 있는 기능을 만들어준다.  
각 컴포넌트에서 똑같은 기능을 하는 것을 한군데에 모아 두었다가, 수정사항이 발생했을 때  
모아놓은 한 군데만 수정하면 해당 기능을 참조하고 있던 수많은 컴포넌트들 모두에 적용된다.
Vue2에서만 사용할 수 있으며, Vue3에서는 CompositionAPI를 활용한 useComposable을 활용해야 한다.  

<details>
<summary>펼치기/접기</summary>
<br>

```js
export const dataPrint = {
  methods: {
    string(message) {
      if(!message) return
      return message
    },
    count(number) {
      if(!number) return
      return number++
    }
  }
}
```
위 코드를 통해 string, count 함수를 포함하는 methods 훅을 내보낸다.  
이후 아래 코드를 통해 해당 모듈 파일을 import하면 코드상에서 참조 없이  
함수를 자유롭게 호출하여 사용이 가능하다.

```vue
<template>
<p>{{ string("메롱") }}</p> <!-- dateFormat 으로부터 호출된 string함수 -->
<p>{{ increase(3) }}</p>
</template>

<script>
import { dataPrint } from "../../mixins/dataPrint"
export default {
  mixins: [dataPrint],
  methods: {
    increase(number) {
      count(number) // dateFormat 으로부터 호출된 count함수
    }
  }
}
</script>
```

```js
export const dataMixin = {
  data() {
    return {
      mixinData: '나는 믹스인이다!'
    }
  },
}
```
```vue
<template>
<p>{{ this.mixinData }}</p> <!-- dataMixin 으로부터 참조하는 mixinData -->
<p>{{ mixinData }}</p> <!-- dataMixin 으로부터 참조하는 mixinData -->
</template>

<script>
import { dataMixin } from "../../mixins/dataMixin"
export default {
  mixins: [dataMixin],
}
</script>
```
### mixin을 통해 컴포넌트 내에 들어간 함수, 데이터 등은 모두 this를 통해 vue 인스턴스 내에서 불러올 수 있다. (this 키워드 생략 가능.)

 ### *`mixin은 컴포넌트와 같은 라이프사이클을 가지기 때문에 mounted(), created(), $router등을 사용할 수 있으며 훅을 import한 모든 vue 파일에서는 사용이 가능하다.`*

 ## Mixin 랜더링 우선순위
만약 Mixin의 methods에 정의한 함수와 컴포넌트의 methods에 정의한 함수 명이 일치한다면,  
어떤 함수가 최종적으로 호출이 될까?

```js
export const priority = {
  methods: {
    func() {
      return "mixin"
    }
  }
}
```

```vue
<script>
import { priority } from "@/priority"
export default {
  mixins: [priority],
  methods: {
    func() {
      return "component"
    }
  }
}
</script>
```
결과는 컴포넌트의 methods에 선언한 func가 호출된다.
컴포넌트의 라이프사이클을 예로 들어보자.

```js
export const priority = {
  created() {
    console.log('Mixin - created')
  }
}
```

```vue
<script>
import { priority } from "@/priority"
export default {
  mixins: [priority],
  created() {
    console.log('Component - created')
  }
}
</script>
```

위 코드를 적용하면 출력되는 순서는 아래와 같다.  
1. Mixin - created  
2. Component - created  

즉, created() 라는 훅이 컴포넌트가 마운트-종료되기 전에 Mixin으로 먼저 정의(호출)되고  
이후 컴포넌트가 종료되면서 created()훅이 덮어 씌워지기는 원리이다.  
이 원리에 의해 컴포넌트와, Mixin 모듈에 정의한 methods훅의 함수명이 동일하다면,  
먼저 Mixin의 methods 훅이 정의된 뒤 최종적으로는 컴포넌트의 methods로 덮어지기 때문에  
실제 함수 호출은 컴포넌트에 소속된 methods 훅의 함수가 호출된다.
</details>

# useComposable(ComposableAPI)
<details>
<summary>접기/펼치기</summary>
<br>

Vue3에서는 Mixin대신 Composable 함수를 사용한다.  
Composable은 단순히 setup함수 안에서 불러와 사용할 수 있는 재사용 가능한 로직 모듈이다.  
React의 CustomHook과 같은 철학을 가지며, 문법도 비슷하다.  

앞서 Mixin에서 구현했던 공통적으로 쓰이는 string, count 함수를 Composable로 구현해본다.

```js
import { ref } from "vue"

export const useDataPrint = () => {
  const string = (message) => {
    if (!message) return
    return message
  }

  const count = (number) => {
    if (!number) return
    return number + 1
  }

  return { string, count }
}
```

```vue
<template>
  <p>{{ string("메롱") }}</p> <!-- useDataPrint로부터 가져온 string -->
  <p>{{ increase(3) }}</p>
</template>

<script setup>
import { useDataPrint } from "@/composables/useDataPrint"

const { string, count } = useDataPrint()

const increase = () => {
  return count(number) // useDataPrint로부터 가져온 count
}
</script>
```

## Composable에서 반응형 데이터 사용하기.

Composable 내부에서 상태를 정의할 때는 ref 또는 reactive를 사용한다.  
```js
import { ref } from "vue"

export const useRefMixin = () => {
  const mixinRef = ref("나는 Composable이다!")
  return { mixinRef }
}
```

```vue
<template>
  <p>{{ mixinRef }}</p> <!-- useRefMixin으로부터 가져온 mixinRef -->
</template>
<script>
import { useRefMixin } from "@/composable/useRefMixin"

const { mixinRef } = useRefMixin()
</script>
```

## Composable과 라이프사이클 훅
Composable은 라이프사이클에 종속된다.
즉, onMounted, onUnmounted, onCreated 등 라이프사이클 훅을 사용할 수 있다.  

```js
import { onMounted } from "vue"
export const usePriority = () => {
  onMounted(() => {
    console.log("Composable - onMounted")
  })
  const func = () => "composable"
  return { func }
}
```

```vue
<script setup>
import { usePriority } from "@/comnposable/usePriority"

const { func } = usePriority()
function func() {
  return "component"
}
<script>
```

</details>