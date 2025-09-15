# Vue(2/3) 예제 및 활용
## [유투브](https://youtube.com/playlist?list=PLTb3qGCzYjS1lkhdZL1z4uZJ72F7b5gIr&si=hwwLjHA5L2zxzFW4) 참조

## 개발환경 설치
<details>
<summary>접기/펼치기</summary>
<br>

- Vite 기반 Vue 프로젝트 생성 명령어
  ```bash
  > npm create vue@latest .
  ```

- 패키지 설치 확인 (y입력)
  ```bash
  Need to install the following packages:
    create-vite@6.5.0
  Ok to proceed? (y) y
  ```
  
- 프로젝트 이름 입력
  ```bash
  ◆  Package name:
  │  {프로젝트 이름 입력}
  ```
  
- 프로젝트 기능 선택 - [none]
   (방향키 ↑↓로 이동, 스페이스로 선택, a로 전체 선택, 엔터로 완료) 
  ```bash
  ◆  Select features to include in your project:
  │  ◻ TypeScript
  │  ◻ JSX Support
  │  ◻ Router (SPA development)
  │  ◻ Pinia (state management)
  │  ◻ Vitest (unit testing)
  │  ◻ End-to-End Testing
  │  ◻ ESLint (error prevention)
  │  ◻ Prettier (code formatting)
  ```

- 실험적 기능 선택 - [none]
  (방향키 ↑↓로 이동, 스페이스로 선택, a로 전체 선택, 엔터로 완료) 
  ```bash
  ◆  Select experimental features to include in your project:
  │  ◻ Oxlint (experimental)
  │  ◻ rolldown-vite (experimental)
  ```

- 예제 코드 없이 빈 프로젝트로 시작 여부 선택 - [Yes]
  (방향키 ←→로 이동, 스페이스로 선택, 엔터로 완료) 
  ```bash
  ◆  Skip all example code and start with a blank Vue project?
  │  ● Yes / ○ No
  ```

- 프로젝트 의존성 패키지 설치
  ```bash
  npm install
  ```

- Vite 개발 서버를 실행
  ```bash
  npm run dev
  ```

- 전체 내용
  ```bash
  > npm create vue@latest .
  Need to install the following packages:
    create-vue@3.18.0
  Ok to proceed? (y) y

  ◆  Package name:
    v01

  ◆  Select features to include in your project:
    none

  ◆  Select experimental features to include in your project:
    none

  ◆  Skip all example code and start with a blank Vue project?
    Yes

  ✔ Scaffolding project in current directory...
  ✔ Done. Now run:

    npm install
    npm run dev
  ```  
</details>


## 프로젝트 파일 구성
<details>
<summary>접기/펼치기</summary>
<br>

### [package.json](v01/package.json)
애플리케이션 정보, 의존성 모듈(dependencies) 정보, 스크립트 명령어 정보 등을 담고 있다.  
- name: 패키지 정보
- version: 버전 정보
- private: 비공개 여부(npm 패키지 저장소 발행(publish) 여부)
- type: 모듈 타입 - module일 경우 CJS
- script: 스크립트 명령어 정의
- dependencies: 의존성 모듈(개발 및 런타임 모든 환경에서 사용됨)
- devDependencies: 개발 의존성 모듈(런타임을 제외한 개발 환경에서만 사용됨)

- 의존성 버전정보: [레퍼런스](https://mong-blog.tistory.com/entry/npm-packagejson%EC%9D%98-version-%EB%B0%A9%EC%8B%9D-tilde%EC%99%80-caret#google_vignette)
<br>

### [index.html](v01/index.html)
`npm run dev` 명령을 실행했을 때 제일 첫 번째로 참조하는 파일이다.  
index.html 파일에서 모든것이 시작된다.  
```html
<div id="app"></div>
<script type="module" src="/src/main.js"></script>
```
위 script태그를 통해 /src/main.js 파일을 include 하고 있으며, 해당 파일을 실행해서 결과를 #app div 영역에 렌더링을 시켜준다고 보면 된다.  
<br>

### [/src/main.js](v01/src/main.js)
```js
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

```
vue라는 모듈로부터 제공되는 createApp()을 통해 뷰 인스턴스를 생성한다.  
자바스크립트는 객체지향언어다 보니 모듈을 사용할 때 인스턴스를 생성하는 방식으로 사용한다.  
Vue2에서는 생성자 함수를 호출해 Vue인스턴스를 만들었으나, Vue3에서는 팩토리 함수 패턴을 통해 Vue인스턴스를 반환한다.  
App.vue 라는 컴포넌트 파일의 내용을 기준으로 뷰 인스턴스를 생성한 뒤 mount('#app')를 통해 app이라는 id를 갖는 영역에 연결한다.  
즉, Vue 인스턴싱 된 객체가 index.html의 #app div에 마운팅되어 해당 영역에 렌더링이 이루어지게 된다.  
<br>

### [/src/App.vue](v01/src/App.vue)
`npm run dev` 명령을 실행했을 때 메인화면을 구성하는데 사용되는 첫번째 파일이다.  
html 태그로 구성되는 `<template></template>` 영역과 Vue의 문법 기반의 JS 코드를 통해 해당 영역을 제어할 수 있는 `<script></script>`영역, 그리고 `<template></template>` 내의 html 태그를 꾸밀 수 있는`<style></style>` 태그로 구성된다.  
해당 형식의 파일을 뷰에서는 컴포넌트라고 부른다.  

</details>
<br>


## 프로젝트 종류 (vite vue3)

### 1. `v01` : vue 프로젝트 초기화 및 스케폴딩 예제
### 2. `v02` : vue2 options API 예제  
### 3. `todo` : vue2 Options API 기반 todo 앱  
  사용한 npm 의존성 라이브러리: **uuid**
### 4. `v03` : vue3 Composition(Setup) API 예제
### 5. `board` :   vue3 Composition(Setup) API 기반 board 앱  
  사용한 npm 의존성 라이브러리: **json-server**, **axios**, **bootstrap**
### 6. `router` :   vue3 Composition(Setup) API 기반 vue-router 예제  
사용한 npm 의존성 라이브러리: **vue-router**
### 7. `pinia` :   vue3 Composition(Setup) API 기반 pinia 예제  
사용한 npm 의존성 라이브러리: **pinia**

## Slot
<details>
<summary>접기/펼치기</summary>
<br>

</details>
<br>

## Provide/Inject

<details>
<summary>접기/펼치기</summary>
<br>

props의 단점을 개선하기 위해 등장하였다.  
props의 단점으로는 다음과 같다.  
부모 자식 손자 3레벨 관계의 컴포넌트에서 a라는 값을 부모에서 손자컴포넌트까지 전달한다고 가정했을 때,  
props를 통해 중간 컴포넌트인 자식 컴포넌트를 거쳐 전달해야한다.  
컴포넌트 관계의 단계가 많아지면 많아질 수록 전달하는 작업량이 증가하게 된다.  
중간 단계에서 a라는 값을 활용 한다면 의미있는 행위겠으나, 손자 단계에서만 사용한다면 중간 과정은 어찌보면 무의미한 과정일 수도 있다.  
이러한 문제를 props drilling 이라고 하며, provide와 inject를 이용하여 해결할 수 있다.  

사용법을 설명하자면 처음 값을 전달하는 부모 컴포넌트에서 Provide에 정의를 해주고,  
최종적으로 해당 변수나, 함수를 사용하는 자식 컴포넌트에서 inject로 받아 사용하면 된다.  

React의 ContextAPI와 유사한 기능이다.

단점으로는, Vue2에서는 React와 다르게 provide는 반응성을 갖는 데이터가 이니다.  
변경할 수 있는 함수를 전달하더라도, 데이터 유형이 객체형이 아닌 기본형이라면 변경되지 않는다.  
따라서, 변경을 하기 위해서는 객체 형태의 data를 전달하고, 수정시 data를 수정해야한다.
마치 ContextAPI처럼 부모측에서 매개변수를 받아 원본 data를 수정할 수 있는 수정 함수를 provide 해준다.
부모에게 위임하는것이다.
해당 방법은 사실상 provide를 변경하는것이 아닌 data를 변경함으로써 data에 의존해야만 한다.
(Vue3에서는 provide가 ref, reactive같은 반응형 객체를 전달할 경우 반응성을 그대로 유지해서 전달한다.)

또한 위 방법으로 변경하더라도, 어떤 컴포넌트에서 부터 provide 된 것인지 inject되는 코드 안에 명확히 보이지 않아  
복잡한 컴포넌트 개발 시에는 유지보수가 어려울 수 있으며 vue devtools등으로 변경에 대한 명확한 추적도 불가능하다.
provide 초기화용 data를 선언한다고 하더라도 직접적인 추적이 아닌, data에 대한 간접적인 추적만 가능하므로,  
어떤 컴포넌트에서 수정이 발생했는지도 명확히 확인할 수 없다.  

Provide와 Inject도 자식이 부모의 구체적인 함수를 직접 제어하는 형태에 가깝기 때문에,  
Props와 Emit 개념에서 Props와 동일한 특징을 갖는다.  
<details>
<summary>Props와 Emit</summary>
<br>

## 함수 props 방식과 결합도 차이 및 이유
1. 함수 props 방식 (Function Prop)
  - 부모 컴포넌트가 직접 함수(구현체)를 자식에게 전달 → 자식은 구체적인 함수 내용을 알고 있으며, 직접 호출
    - 자식 컴포넌트는 부모 컴포넌트가 어떤 함수를 넘겼는지 구현 세부사항에 의존하게됨.
      - 함수 문법에 맞춰야 하기 때문.
  - 함수 시그니처가 변경되면, 자식 쪽의 코드도 함께 변경되어야 할 수 있음 → 구현과 인터페이스가 강하게 연결
    - 예를들어 함수가 공통으로 다른 기능에서 함께 사용되는 이유로 단순 호출만 하던 방식에서 매개변수를 전달해야하는 방식으로 변경될경우 자식 컴포넌트에서 매개변수를 전달해야 하는 경우 등.
  - 부모 ↔ 자식 간 인터페이스(함수 시그니처)에 대한 명확한 계약이 필요.
      
2. emit 방식
  - 자식은 단순히 특정 이벤트 발생에 대한 이벤트 이름과 데이터만 알림.
  - 부모는 이벤트를 듣고 감지하여, 자체적으로 원하는 동작을 수행 → 이벤트 이름과 전달 데이터만 알면 됨.
  - 자식은 부모의 구체적인 함수나 처리 방식에 대해 전혀 몰라도 됨 → Function prop에 비해 인터페이스가 훨씬 느슨함
    - 이벤트로 한번 씌운 후 함수를 호출하는것이기 때문에 자바로 따지면 확장 가능한 인터페이스라고 보면 된다.
  - 이벤트 이름이나 전달 데이터만 맞으면 되기 때문에 구현과 인터페이스가 분리된다.


### 함수 props도 부모의 처리 방식을 몰라도 되지 않을까?
표면적으로는 몰라도 된다고 볼 수 있다.  
하지만 실제로는 하기 이유로 결합도가 높을 수 밖에 없다.  
1. 호출 타이밍 제어권이 자식에게 있기 때문에 잘못된 시점에 호출될 수 있다.  
2. 함수 호출 형식을 emit 보다 명확하게 알아야 한다.
  - 함수 명을 직접 지정해야 하므로 이벤트명만 알아야 되는 emit에 비해 보다 명확해야 한다.
3. 구조적 종속성에 의해 부모 함수가 변경되면 자식도 수정될 수 있다.

</details>


### vue2 예제코드
<details>
<summary>접기/펼치기</summary>
<br>
- Parent: 최고 조상 컴포넌트
  Parent의 자식인 Child와 그의 자식 즉, Parent의 손자 GrandSon에게 까지 Provide 한다.
  반응성을 잃기 때문에, 변경을 부모에서 하도록 변경용 메소드를 함께 provide한다.
  ```html
  <script>
  import Child from '@/components/Child.vue'
  export default {
    components: {
      Child
    },
    data() {
      return {
        giftProp: '장난감',
        giftData: {
          val: '장난감',
        }
      }
    },
    provide() {
      return {
        giftInjectPrimitive: this.giftProp,
        giftInjectObject: this.giftData,
        onChangeInject: (msg) => {
          this.giftProp = msg
          this.giftData.val = msg
          this.giftInjectPrimitive = msg // 반응성이 없으므로 부모에서 조차 변경할 수 없음
        },
      }
    },
  }
  </script>
  <template>
    <Child/>
  </template>
  ```
- GrandSon.vue: Child의 자식 즉, 손자 컴포넌트
  변경용 메소드를 호출하여 provide에 매핑된 부모의 data를 변경하는 기능을 가진 provide된 함수를 inject하여 호출함으로써 데이터를 변경시킨다.
  ```html
  <script>
  export default {
    props: {
      giftProp: {
        type: String,
        required: false,
        default: ""
      }
    },
    inject: {
      giftInjectPrimitive: {
        type: String,
        required: false,
        default: ""
      },
      giftInjectObject: {
        type: Object,
        required: true
      },
      onChangeInject: {
        type: Function,
        required: true
      }
    },
  }
  </script>
  <template>
    <div>
      <h1>손자 컴포넌트</h1>
      <p>할아버지로 부터 받은 선물(Prop): {{ giftProp }}</p>
      <p>할아버지로 부터 받은 선물(Provide-Primitive): {{ giftInjectPrimitive }}</p>
      <p>할아버지로 부터 받은 선물(Provide-Object): {{ giftInjectObject.value }}</p>
      <button @click="onChangeInject('변경')">Inject 수정</button>
    </div>
  </template>
  ```

<details>

### vue3 예제코드
<details>
<summary>접기/펼치기</summary>
<br>
- Parent: 최고 조상 컴포넌트
  Parent의 자식인 Child와 그의 자식 즉, Parent의 손자 GrandSon에게 까지 Provide 한다.
  ```html
  <script>
  import Child from '@/components/Child.vue'
  import { ref, provide } from 'vue';
  const giftProp = ref('장난감');
  const giftData = ref({
    val: '장난감',
  });
  provide('giftInjectPrimitive', giftProp)
  provide('giftInjectObject', giftData)
  </script>
  <template>
    <Child/>
  </template>
  ```
-  GrandSon.vue: Child의 자식 즉, 손자 컴포넌트
  ```html
  <script>
  import { inject, defineProps } from 'vue';
  const props = defineProps({
    type: String,
    required: false,
    default: ""
  })
  const giftInjectPrimitive = inject('giftInjectPrimitive')
  const giftInjectObject = inject('giftInjectObject')
  const onChangeInject = (msg) => {
    giftInjectPrimitive.value = msg
    giftInjectObject.value.val = msg
  }
  </script>
  <template>
    <div>
      <h1>손자 컴포넌트</h1>
      <p>할아버지로 부터 받은 선물(Prop): {{ giftProp }}</p>
      <p>할아버지로 부터 받은 선물(Provide-Primitive): {{ giftInjectPrimitive }}</p>
      <p>할아버지로 부터 받은 선물(Provide-Object): {{ giftInjectObject.value }}</p>
      <button @click="onChangeInject('변경')">Inject 수정</button>
    </div>
  </template>
  ```

<details>
</details>