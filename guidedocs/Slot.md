# [README.md](../README.md)

# Slot

영어사전에서는 자리, 넣다, 홈(오목하고 길게 파인 자리)라는 뜻으로 정리되어 있다.  

## props와 v-html 전달 기본 예제
- [20-Slot.vue]()
  ```vue
  <script>
  import SlotFancyBtn from '@/components/20-SlotFancyBtn.vue'
  export default {
    components: {
      SlotFancyBtn,
    },
  }
  </script>
  <template>
    <SlotFancyBtn buttonName="<strong>PROPS 전달(v-html)</strong>"></SlotFancyBtn>
  </template>
  ```
- [20-SlotFancyBtn.vue]()
  ```vue
  <template>
    <div v-html="buttonName"></div>
  </template>
  ```

위 코드 예제처럼 태그 자체를 문자열 형태로 자식컴포넌트에 보낼 경우 문자열 안에 HTML이 섞여 코드 관리가 어려워지며 Vue의 반응형 데이터 바인딩이 불가능하며, 디렉티브 기능 등을 사용할 수 없다는 단점이 있다.

이에 대한 대응으로 사용하는것이 바로 slot 기능이다.

## 사용 이유
1. 컴포넌트의 재사용성 증가  
  동일한 컴포넌트를 다양한 상황에서 사용하면서도, 그 안에 들어가는 콘텐츠를 부모 컴포넌트에서 쉽게 바꿀 수 있다.  
  예를 들어 버튼 컴포넌트 안에 텍스트, 아이콘, 심지어는 복잡한 HTML 구조를 넣을 수도 있다.  
2. 유연한 레이아웃 구성  
  슬롯을 사용하면 부모 컴포넌트가 자식 컴포넌트의 특정 위치에 내용을 삽입할 수 있어  
  보다 유연한 레이아웃 구성이 가능하여 이를 통해 복잡한 UI를 구성할 때 유용하다.  
3. 명확한 컴포넌트 구조  
  부모 컴포넌트는 자식 컴포넌트의 정의된 영역에 명시적으로 컨텐츠를 삽입할 수 있어서 코드의 가독성과 유지보수성이 향상된다는 장점이 있다.  
  
## 노드 삽입 기본 예제
자식컴포넌트의 template 영역에 `<Slot></slot>` 태그를 선언한 후,  
부모 컴포넌트에서 자식 컴포넌트 태그를 선언하고,  
선언한 위치의 자식 컴포넌트 태그 하위 노드에 노드를 추가할경우  
자식컴포넌트에 전달된 후 선언된 `<Slot></slot>` 영역에 해당 노드가 선언되어 브라우저에 출력된다.
(기본적으로 컴포넌트는 셀프클로징 태그 형태이지만, 여닫는 태그 형태인 pair태그로 구성할경우 사이에 노드를 적용할 경우 해당 노드를 자식 영역의 slot에 주입할 수 있게 된다.)
`<slot></slot>` 영역 사이에 특정 노드를 삽입할 경우, 부모 컴포넌트에서 자식 컴포넌트 태그 사이에 노드를 삽입하지 않을 때 기본적으로 출력된다.

- [20-Slot.vue]()
  ```vue
  <script>
  import SlotFancyBtn from '@/components/20-SlotFancyBtn.vue'
  export default {
    components: {
      SlotFancyBtn,
    },
  }
  </script>
  <template>
    <SlotFancyBtn>
      <strong>pair 태그 삽입(SLOT)</strong>
    </SlotFancyBtn>
  </template>
  ```

- [20-SlotFancyBtn.vue]()
  ```vue
  <template>
    <slot><!-- <strong>pair 태그 삽입(SLOT)</strong> 내용을 전달받아 자식컴포넌트 내에 선언되고 브라우저에 출력됨 -->
      <strong>디폴트문자</strong> <!-- Slot을 적용할 컴포넌트에 아무것도 할당하지 않을경우 출력되는 노드 -->
    </slot>
  </template>
  ```

<br>
<hr>
<br>

### 다중 슬롯과 template 예제
자식 컴포넌트에 다중 `<slot>`이 존재할 경우, 부모 컴포넌트에서 가상DOM인 `<template>` 태그와 v-slot 디렉티브를 사용하여 각 slot에 고유한 이름을 매핑할 수 있다.

- [20-SlotMainLayout.vue]()  
  먼저 자식 컴포넌트에 삽입한 slot태그에 name속성을 활용하여 `name="{별칭}"` 형태로 부모 컴포넌트에서 매핑시 식별할 수 있는 별칭을 지정해준다.  
  ```vue
  <template>
    <!-- 이름을 부여하여 slot을 식별한다. (이름을 부여하지 않을 경우 default를 부여한다 - ex: 부모 컴포넌트에서 v-slot:default 혹은 #default로 식별)-->
    <slot name="header"></slot>
    <slot></slot>
    <slot name="footer"></slot>
  </template>
  ```
- [20-Slot.vue]()  
  부모 컴포넌트에서 가상 DOM인 template 태그에서 v-slot 디렉티브를 활용하여 `v-slot:{별칭}` 형태로 자식 컴포넌트에 삽입된 slot의 name 별칭과 매핑해준다.  
  v-slot은 `#` 문자를 `#{별칭}` 형태로 축약하여 사용할 수 있다.
  ```vue
  <script>
  import SlotMainLayout from '@/components/20-SlotMainLayout.vue'
  export default {
    components: {
      SlotMainLayout,
    },
  }
  </script>
  <template>
    <SlotMainLayout>
      <!-- 3개의 slot에 전달해야 하므로 template 태그를 활용하여 전달한다. -->
      <template v-slot:header><!-- v-slot 디렉티브에 SlotMainLayout의 slot에 부여한 name을 할당한다. (v-slot:{name}) -->
        <h2>Header</h2>
      </template>
      <template #contents><!-- v-slot의 축약형으로 #키워드를 사용할 수 있다. (#{name}) -->
        <h2>contents</h2>
      </template>
      <template #default><!-- 자식컴포넌트의 slot에 name을 부여하지 않은 경우 default로 접근한다. -->
        <h2>footer</h2>
      </template>
    </SlotMainLayout>
  </template>
  ```

<br>
<hr>

## 자식 컴포넌트의 Slot으로 부터 부모 컴포넌트로 역방향 Props 전달
자식 컴포넌트의 `<slot></slot>` 태그에 `<slot v-bind:child="child"></slot>` 형태와 같이 v-bind 디렉티브를 활용할 경우 부모 컴포넌트로 props를 전달할 수 있게 된다.  
부모 컴포넌트에서는 `v-slot="props"` 형태로 props를 전달받을 수 있다.  
렌더링 책임을 부모에게 위임하여 자식 컴포넌트의 데이터를 부모 컴포넌트에서 출력할때 사용한다.
조금 더 상세히 설명하자면 자식이 재사용 가능한 컴포넌트일 때 사용하는데, 주로 데이터는 변하지 않지만 데이터를 출력하는 UI 구조가 다를 경우 데이터 조회를 자식에서 진행하고
부모 컴포넌트로 전송하여 부모 컴포넌트가 해당 데이터를 활용하여 데이터를 출력할 때 사용한다.

<br>

### 렌더링 책임을 부모에게 위임
- [20-SlotChildProp.vue]()  
  ```vue
  <script>
  export default {
    data() {
      return {
        child: '자식prop',
      }
    }
  }
  </script>
  <template>
    <button>
      <slot :child>부모 컴포넌트로 props 전달</slot><!-- 부모에게 props 전달 -->
    </button>
  </template>
  ```
- [20-Slot.vue]()  
  ```vue
  <script>
  import SlotChildProp from '@/components/20-SlotChildProp.vue'
  export default {
    components: {
      SlotChildProp,
    },
  }
  </script>
  <template>
    <SlotChildProp v-slot="props"> <!-- 자식 props를 전달 받을 수 있다. -->
      {{ props.child }}
    </SlotChildProp>
    <br/>
    <SlotChildProp v-slot="{child}"> <!-- 자식 props 구조분해 가능 -->
      구조분해: {{ child }}
    </SlotChildProp>
  </template>
  ```

<br>
<hr>

### 출력에 대한 책임을 부모에게 전가하지 않고 자식에서 그대로 출력
부모에 전달받은 props 값을 자식 컴포넌트 태그 영역에 텍스트보간법을 활용해 다시 자식컴포넌트의 `<slot></slot>` 영역에 렌더링 할 수도 있다.
출력에 대한 책임을 부모에게 전가하지 않고 자식에서 그대로 출력하는 경우이다.
부모 컴포넌트상에서 UI 구조가 동일한 내용이 반복 출력이 돼야하고, 반복되는 각 영역별로 조건에 따라 데이터 조회 조건이 분기처리 되거나, 부모에서 재가공 처리하여 자식에서 다시 출력시켜야 할 경우 사용한다.

#### 반복 출력 및 영역별 조건에 따른 데이터 조회 파라미터 동적 적용
- [20-SlotChildProp.vue]()  
  ```vue
  <script>
  export default {
    props: ['calc'], /* 해당 값을 axios 등에 파라미터로 전달 */
    data() {
      return {
        child: 1,
      }
    }
  }
  </script>
  <template>
    <button>
      <slot :child>부모 컴포넌트로 props 전달</slot><!-- 부모에게 props 전달 -->
    </button>
  </template>
  ```
- [20-Slot.vue]()  
  ```vue
  <script>
  import SlotChildProp from '@/components/20-SlotChildProp.vue'
  export default {
    components: {
      SlotChildProp,
    },
  }
  </script>
  <template>
    <SlotChildProp v-slot="props" :calc="props.child % 2 ? '홀수' : '짝수'" />
    <SlotChildProp v-slot="props" :calc="props.child typeof 'number' ? '정수' : '문자'" />
    <SlotChildProp v-slot="props" :calc="'기본값'" />
  </template>
  ```

#### 부모에서 재가공 처리하여 자식에서 다시 출력
- [20-SlotChildProp.vue]()  
  ```vue
  <script>
  export default {
    data() {
      return {
        child: 1,
      }
    }
  }
  </script>
  <template>
    <button>
      <slot :child>부모 컴포넌트로 props 전달</slot><!-- 부모에게 props 전달후 부모에서 계산되어 홀수, 짝수가 이곳에 다시 출력된다. -->
    </button>
  </template>
  ```
- [20-Slot.vue]()  
  ```vue
  <script>
  import SlotChildProp from '@/components/20-SlotChildProp.vue'
  export default {
    components: {
      SlotChildProp,
    },
  }
  </script>
  <template>
    <SlotChildProp v-slot="props">
      {{ props.child % 2 ? '홀수' : '짝수' }} /* 텍스트 보간법을 활용하여 props에 대한 데이터를 가공한 뒤 렌더링 책임을 그대로 자식에게 위임 */
    </SlotChildProp>
  </template>
  ```
<br>
<hr>

### 구조분해 
부모 컴포넌트에 전송될때 v-bind에 할당한 변수는 props라는 이름의 객체에 한번 랩핑되었다.
`v-slot={속성명}` 형태로 작성할 경우 props객체로 부터 구조 분해도 가능하다.
- [20-SlotChildProp.vue]()  
  ```vue
  <script>
  export default {
    data() {
      return {
        child: '자식prop',
      }
    }
  }
  </script>
  <template>
    <button>
      <slot :child>부모 컴포넌트로 props 전달</slot><!-- 부모에게 props 전달 -->
    </button>
  </template>
  ```
- [20-Slot.vue]()  
  ```vue
  <script>
  import SlotChildProp from '@/components/20-SlotChildProp.vue'
  export default {
    components: {
      SlotChildProp,
    },
  }
  </script>
  <template>
    <SlotChildProp v-slot="{child}"> <!-- 자식 props 구조분해 가능 -->
      구조분해: {{ child }}
    </SlotChildProp>
  </template>
  ```
<br>
<hr>

### 다중슬롯과 props
- [20-SlotMainLayout.vue]()  
  ```vue
  <script>
  export default {
    data() {
      return {
        // slot에 전달할 예시 데이터
        child: 0,
      }
    }
  }
  </script>
  <template>
    <!-- slot에 name 속성을 부여하고 child라는 props 전달 -->
    <slot name="header" :child="1"></slot>
    <slot name="contents" :child="2"></slot>
    <slot :child="3"></slot> <!-- name이 없으면 default slot -->
  </template>
  ```
- [20-Slot.vue]()  
  ```vue
  <script>
  import SlotMainLayout from '@/components/20-SlotMainLayout.vue'

  export default {
    components: {
      SlotMainLayout,
    },
  }
  </script>
  <template>
    <SlotMainLayout>
      <template v-slot:header="props"><!-- header slot에 전달된 props를 받아서 다시 header slot에 출력 -->
        {{ props.child }}
      </template>
      <template #contents="props"><!-- contents slot에 전달된 props를 받아서 다시 header slot에 출력 -->
        {{ props.child }}
      </template>
      <template #default="props"> <!-- default slot에 전달된 props를 받아서 다시 header slot에 출력 -->
        {{ props.child }}
      </template>
    </SlotMainLayout>
  </template>
  ```
