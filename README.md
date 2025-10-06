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

<br>
<hr>
<br>

# 주요 개념 정리

## [Mixin과 useComposable.md](<guidedocs/Mixin과 useComposable.md>)
## [Computed.md](guidedocs/Computed.md)
## [Slot.md](guidedocs/Slot.md)
## [Event바인드와 Event객체.md](<guidedocs/Event바인드와 Event객체.md>)
## [DefineModel과 update.md](<guidedocs/DefineModel과 update.md>)
## [Router와 동적, 중첩 라우팅](<guidedocs/Router와 동적, 중첩 라우팅.md>)
## [EventBus](guidedocs/EventBus.md)
## [Provide & Inject](guidedocs/Provide&Inject.md)