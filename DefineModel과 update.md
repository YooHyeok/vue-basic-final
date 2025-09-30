# [README.md](README.md)

# DefineModel과 update

vue3.4부터 사용을 권장하는 CompositionAPI Helper(편의 매크로)이다.  
컴포넌트 간의 양방향 데이터 바인딩을 더 쉽게 구현할 수 있다.  
props와 emits 방식을 v-model로 사용할 수 있게 확장된 기능이다. 

## 기존 props와 emit
```vue
<script setup>
import { ref } from 'vue';
import  Child from '@/components/09-DmChild.vue'

const subject1 = ref('subject1')
const subject2 = ref('subject2')
</script>

<template>
  <h3>subject1: {{ subject1 }}</h3>
  <h3>subject2: {{ subject2 }}</h3>
  <Child 
    :subject1 
    @changeSubject1="(value) => subject1 = value" 
  />
  <Child 
    :subject2 
    @changeSubject2="(event) => subject2 = event.target.value" 
  />
</template>
```

```vue
<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  subject1: {
    type: String,
    default: ''
  },
  subject2: {
    type: String,
    default: ''
  },
})

const emit = defineEmits(['changeSubject1', 'changeSubject2'])

</script>
<template>
  <input type="text" @input="(e)=> emit('changeSubject1', e.target.value)" :value="subject1">
  <input type="text" @input="$emit('changeSubject2', $event)" :value="subject2">
</template>
```

## defineModel과 v-model
부모에서 v-model에 할당한 ref 반응형 변수의 값을 자식에서 제어할 수 있게 된다.  
.value 속성을 통해 값에 접근하여 수정할 수 있으며 부모의 값에 반영이 된다.  
부모의 ref 변수를 직접 참조하는것은 아니며, 내부적으로 props로 전달받은 후 emit을 호출하는 원리로 작동된다.  

```vue
<script setup>
import { ref } from 'vue';
import  Child from '@/components/09-DmChild.vue'

const subject1 = ref('subject1')
</script>

<template>
  <h3>subject3: {{ subject3 }}</h3>
  <Child 
    v-model="subject3"
  />
</template>
```

```vue
<script setup>
import { defineProps, defineEmits } from 'vue';

const model = defineModel()

</script>
<template>
  
  <input type="text" v-model="model">
  
</template>
```

defineModel 객체는 내부적으로 defineProps에 의해 ref로 다시 랩핑되기 때문에 .value로 변경할 경우 부모 값이 변경되지만 사실상 직접 변경되는것이 아니며, 역시 변경되는 기능 또한 내부적으로 emit을 호출하여 변경한다.

이때 사용되는것이 update라는 이벤트인데, update 이벤트는 고유 식별자를 갖게된다.
update 이벤트에 매핑되는 고유 식별자는 props의 이름이며, v-model에 `v-model:{key}="변수명"` 형태로 매핑가능하다.  
만약 `v-model="변수명"` 형태로만 적용할 경우 props의 이름은 `modelValue`가 된다
```vue
<script setup>
import { ref } from 'vue';
import  Child from '@/components/09-DmChild.vue'

const subject3 = ref('subject3')
</script>

<template>
  <h3>subject3: {{ subject3 }}</h3>
  <Child
  :modelValue="subject3"
  @update:modelValue="$event => (subject3 = $event)"
/>
</template>
```

```vue
<script setup>
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="props.modelValue"
    @input="emit('update:modelValue', $event.target.value)"
  />
</template>
```

위와같은 원리로 defineModel에는 key 이름을 붙혀줄 수 있다.  
해당 key 이름은 자식에서 부모를 향해 쏘는 emit의 key로 사용될 수 있으며, key 앞에는 `update:key값` 형태로 구분자 : 앞에 update 키워드를 붙혀준다.
부모에서는 자식에서 defineModel에 정의한 key를 기준으로 자식 컴포넌트 태그에 `v-model:key값="변수명"` 형태로 할당하여 사용하거나, 
emit함수에 정의한 `update:key값` 형태의 키값과 동일하게 자식 컴포넌트 태그에 emit이벤트를 할당 하여 사용한다.

```vue
<script setup>
import { ref } from 'vue';
import  Child from '@/components/09-DmChild.vue'

const subject1 = ref('subject1')
</script>

<template>
  <h3>subject3: {{ subject3 }}</h3>
  <Child 
    v-model:keyModel1="subject3"
  />
  <Child 
    v-model:keyModel2="subject3"
  />
</template>
```

```vue
<script setup>
const keyModel1 = defineModel('keyModel1')
const keyModel2 = defineModel('keyModel2')

</script>
<template>
  <input type="text" v-model="keyModel1">
  <input type="text" @input="$emit('update:keyModel2', $event.terget.value)" :value="subject3">
</template>
```
</details>
<br>