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

## [Slot.md](Slot.md)

## [Event바인드와 Event객체.md](<Event바인드와 Event객체.md>)
## [DefineModel과 update.md](<DefineModel과 update.md>)

## `Router와 동적, 중첩 라우팅`
<details>
<summary>접기/펼치기</summary>
<br>

### 기본 설정
#### router 모듈 스케폴딩
- router/index.js
  ```js
  import { createRouter, createWebHistory } from "vue-router";
  import HomeView from "@/components/HomeView.vue";

  const routes = [
    {
      path: '/',
      component: HomeView
    },
  ]

  const router = createRouter({
    history: createWebHistory('/'),
    routes
  })

  export default router;
  ```
  routes 배열에 route객체를 등록해준다. 객체 형태는 아래와 같다.

#### router vue entrypoint에 등록
- main.js
  ```js
  import { createApp } from 'vue'
  import App from './App.vue'
  import router from '@/router'

  createApp(App).use(router).mount('#app')
  ```

#### route 객체 등록
routes 배열에 route객체를 등록해준다. 객체 형태는 아래와 같다.
```js
{
  path: '/',
  component: HomeView
},
```

path에는 이동할 경로를, component에는 실제 컴포넌트를 import 하여 등록해준다.
- HomeView.vue
  ```vue
  <template>
    <p>Home View</p>
  </template>
  ```

해당 객체를 routes 배열에 등록해줘야한다.
- router/index.js
  ```js
  import { createRouter, createWebHistory } from "vue-router";
  import HomeView from "@/components/HomeView.vue";

  const routes = [
    {
      path: '/',
      component: HomeView
    },
  ]

  const router = createRouter({
    history: createWebHistory('/'),
    routes
  })

  export default router;
  ```

#### RouterView
요청으로 들어온 라우트에 대해 일치하는 컴포넌트를 렌더링 하는 함수형 컴포넌트이다.  
컴포넌트를 route에 등록한 후에는 route 객체의 path에 할당한 주소를 실제 브라우저 주소창에 입력하게 되면 해당 컴포넌트를 RouterView 위치에 렌더링해준다.  
따라서 아래 코드와같이 `router-view` 태그를 컴포넌트에 삽입한다.
```vue
<template>
  <router-view></router-view>
</template>
```
추가로 router-view 내에서 렌더링 된 컴포넌트 내부에도 router-view를 포함할 수 있으며, 이는 중첩 라우트로 렌더링 할 수 있게 된다.  

- HomeView.vue
  ```vue
  <template>
    <p>Home View</p>
    <router-view></router-view>
  </template>
  ```
  '/' path에 의해 router-view에 렌더링 된 Home 컴포넌트에 router-view가 중첩으로 존재할 수 있다.  
  중첩 라우트의 경우, routes에 등록한 객체에서 child 속성으로 등록이 가능하며, 자세한 설명과 예제는 아래 기본 설명이 끝난 후 추가로 다룬다.


#### RouterLink
router-link는 vue-router 에서 지원하는 네비게이션 컴포넌트이다.   
to 속성에 이동할 위치의 주소값을 지정한다.  
```vue
<template>
  <router-link to="/home">Home</router-link>
</template>
```

router-link는 실제로 anchor 태그로 렌더링 된다.  
```js
<a href='이동할 위치의 주소값'>Home</a>
```

achor 태그의 경우 window.location을 통한 페이지 전환이므로 브라우저 자체적으로 로딩이 발생한다.  
router-link의 경우 vue-router를 통해 router-view 영역에 컴포넌트만 동적으로 교체되어 출력하므로 브라우저 자체 로딩은 발생되지 않는다.  

`active-class` 속성을 적용할 경우 일치하는 주소에 해당하는 링크가 활성화 되어 있을 때 css가 적용된다.  
```vue
<template>
  <router-link to="/home" active-class="on">Home</router-link>
</template>
<style scoped>
.on {
  font-weight: bold;
  color: blue;
}
</style>
```
역시 anchor 태그로 렌더링되며, on이라는 class명이 지정된다.
```js
<a href='이동할 위치의 주소값' class="on">Home</a>
```

### 동적 라우트와 Route, Router 객체

#### router 모듈에서 동적 파라미터 설정
Router 모듈에 동적 파라미터 Param을 적용하는 예제이다.
```js
const routes = [
  {
    path: '/',
    component: HomeView
  },
  {
    path: '/product/:id', /* 동적 파라미터 */
    component: ProductView
  },
]
```
#### RouterLink to속성에 동적 파라미터 path 적용
```vue
<template>
  <router-link to="/product/babo" active-class="on">Product</router-link>
</template>
```

#### useRoute와 Route객체
위와 같이 `/product/:id`로 설정할 경우 `/product/babo` 주소값으로 router-link의 to 속성 등록 하거나 혹은 브라우저 주소창에 의해 요청이 올 경우 Route 객체에 접근하여 해당 값을 꺼낼 수 있다.  
useRoute는 vue-router의 훅으로 import하여 변수로 추출후 접근 가능하며, script영역 뿐만 아니라 template 영역 에서도 해당 변수 접근이 가능해진다.  
또한 template 영역 전용으로 텍스트 보간법 혹은 v-bind 사용시 `$route.params.id` 형태로 $ 표기법을 통해 Route 객체 접근이 가능하다.
- ProductView.vue
  ```vue
  <template>
    <div>
      Product: {{ route.params.id }}
      Product: {{ $route.params.id }}
    </div>
  </template>
  <script setup>
  import { useRoute } from 'vue-router';
  const route = useRoute();
  console.log(route.params)
  </script>
  ```

#### 동적 파라미터 Query
앞서 `/product/:id` 형태의 동적 파라미터를 설정했던 예시의 경우 Param이라는 문법이며, Query라는 문법도 존재한다.  
Query는 `/product?변수명=값` 형태로 적용 할 수 있으며, 브라우저의 일반적인 웹브라우저의 Query String과 같으며 Router 모듈에 따로 전용 설정을 할 필요가 없다.  

```vue
<template>
  <router-link to="/product?lang=kr" active-class="on">ProductA01</router-link> |
</template>
```

주소창 혹은 router-link에 의한 요청을 통해 인입되는 Query의 경우 Route객체의 query 속성으로 접근이 가능하다.
- ProductView.vue
  ```vue
  <template>
    <div>
      Lang: {{ route.query.lang }}
      Lang: {{ $route.query.lang }}
    </div>
  </template>
  <script setup>
  import { useRoute } from 'vue-router';

  const route = useRoute();
  console.log(route.query)
  </script>
  ```

#### useRouter와 Router객체
Router 객체는 useRoute와 마찬가지로 useRouter 훅을 import한 뒤 변수에 할당하여 사용할 수도 있으며, 해당 문법은 script, template 모두 사용 가능하다.
template 영역 전용으로 event 속성에서 직접 사용시 `$router.push('/product/pk')` 형태로 $ 표기법을 통해 Router 객체 접근이 가능하다.
(push()의 경우 vue-router에서 지원하는 프로그램이 방식 네비게이션 이다.)
```vue
<template>
  <div>
    Product: {{ route.params.id }}
    Product: {{ $route.params.id }}
  </div>
  <button @click="router.push('home')">home 페이지로 이동</button>
  <button @click="$router.push('home')">home 페이지로 이동</button>
</template>
<script setup>
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

</script>
```

#### name 속성
만약 router-link에서 name기반 라우팅을 적용했을 경우 path가 변경되더라도 작동된다.

```js
const routes = [
  {
    path: '/',
    component: HomeView
  },
  {
    path: '/product/:id', /* 동적 파라미터 */
    name: 'ProductPage'
    component: ProductView
  },
]
```
```vue
<template>
    <router-link :to="{ name: 'ProductPage', params: {id: 'A01'}}" active-class="on">Product1</router-link>
    <router-link :to="{ name: 'ProductPage', params: {id: 'A02'}, query: {lang: 'en'} }" active-class="on">Product2</router-link>
</template>
```

또한 주로 path가 /:id 와 같이 동적파라미터(필수)로 되어있을 경우 Router객체의 push를 호출할 때 name을 사용하면 편하다.  
Router 객체의 `push({name:'ProductPage', params{id: 'pk'}})` 형태로 호출 가능하다.

```vue
<template>
  <button @click="router.push({name:'ProductPage', params{id: 'pk'}})">product 페이지로 이동</button>
  <button @click="$router.push({name:'ProductPage', params{id: 'pk'}, query: {lang: 'us'}})">product 페이지로 이동</button>
</template>
<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
</script>
```

#### 동적 경로 매칭
routes의 path에 동적 파라미터를 설정할 경우 필수값으로 적용되므로, 동적 파라미터가 적용되지 않은 요청을 하게 될 경우 해당 컴포넌트를 찾을 수 없어 렌더링 자체를 할수 없게 된다.  
이 경우 동적 경로 매칭을 사용하면 해당 문제를 해결할 수 있다.  

path의 동적 파라미터 끝에 ?를 붙힐 경우 /product로 요청이 올 경우 ''로 값을 받게 된다.
```js
const routes = [
  {
    path: '/',
    component: HomeView
  },
  {
    path: '/product/:id?', /* 동적 경로 매칭 (?를 붙힐 경우 /product로 요청이 올 경우 ''로 값을 받게 된다.)  */
    component: ProductView
  },
]
```

### 중첩 라우팅
Rotuer에 의해 router-view 졍역에 렌더링 된 컴포넌트 내부에 중첩으로 rotuer-view를 정의하여 중첩으로 라우팅을 할 수 있다.  
Router 모듈에 등록한 rotue객체의 children 속성에 컴포넌트를 추가로 적용하면 된다.
```js
const routes = [
  {
    path: '/home',
    name: 'HomePage',
    component: HomeView
  },
  /* 중첩 라우팅 시작 */
  {
    path: '/company', /* route.params.pathMatch: 모든 경로/404 Not found 라우트 */
    name: 'CompanyPage',
    component: () => import('@/components/company/CompanyView'),
    children: [
      {
        path: 'intro',
        name: 'company-intro',
        components: {
          header: () => import('@/components/company/HeaderView.vue'),
          default: () => import('@/components/company/IntroView.vue'),
          footer: () => import('@/components/company/FooterView.vue'),
        }
      },
      {
        path: 'map',
        name: 'company-map',
        components: {
          header: () => import('@/components/company/HeaderView.vue'),
          default: () => import('@/components/company/MapView.vue'),
          footer: () => import('@/components/company/FooterView.vue'),
        }
      },
      {
        path: 'history',
        name: 'company-history',
        components: {
          header: () => import('@/components/company/HeaderView.vue'),
          default: () => import('@/components/company/HistoryView.vue'),
          footer: () => import('@/components/company/FooterView.vue'),
        }
      },
    ]
  },
]
```
주의할 점은 children 배열내 객체에는 path 속성에 기입되는 값이 상대경로 즉, prefix로 `/` 를 붙히면 안된다는 점이다.

- App.vue
  ```vue
  <template>
      <router-link to="/home" active-class="on">Home</router-link> 
      <router-link to="/company" active-class="on">Company</router-link> <!-- 중첩 라우팅 -->
      <router-view></router-view> <!-- CompanyView 컴포넌트가 렌더링됨. -->
  </template>
  ```


- CompanyView.vue
  ```vue
  <template>
    <h1>Company</h1>
    <p>
      <router-link :to="{ name: 'company-intro'}" active-class="on">회사 소개</router-link> |
      <router-link :to="{ name: 'company-map'}" active-class="on">오시는 길</router-link> |
      <router-link :to="{ name: 'company-history'}" active-class="on">회사 연혁</router-link>
    </p>
    
    <router-view></router-view> <!-- children에 등록된 컴포넌트가 렌더링됨 -->
  </template>
  ```
`/company` 경로로 요청이 들어올 경우 CompanyView.vue 컴포넌트가 App.vue컴포넌트에 렌더링되고 `/company/~` 경로로 들어올 경우
children에 등록된 path와 매핑되는 컴포넌트를 렌더링한다.


### named view
여러 view를 동시에 표시해야할 때 사용한다.    
예를들어 header, body, footer와 같이 레이아웃을 구성할때, 사용할 수 있다.

- router/index.js
  ```js
  const routes = [
    {
      path: '/',
      components: {        
        header: HeaderView,
        footer: FooterView,
        default: BodyView        // 부모 default
      },
      children: [
        { path: '', component: DefaultView }, // children default
        { path: 'about', component: AboutPage }
      ]
    }
  ]
  ```
  라우터에는 component가 아닌 components 속성에 name속성으로 매핑할 고유한 이름과, 컴포넌트를 할당한다.

- App.vue
  ```vue
  <template>
    <router-view name="header"></router-view>  <!-- HeaderView -->
    <router-view></router-view>               <!-- 부모 default: BodyView -->
    <router-view name="footer"></router-view> <!-- FooterView -->
  </template>
  ```
  router-view의 name속성에 라우터 모듈의 named views 설정(components)에 등록한 이름을 각각 부여해준다.  
  name을 지정하지 않을 경우 default가 매핑된다.

- BodyView.vue
  ```vue
  <template>
    <div>
      <!-- 부모 default 영역 -->
      <router-view></router-view> <!-- children이 이 안에 렌더링됨 -->
    </div>
  </template>
  ```
  children에 해당하는컴포넌트가 렌더링된다.  


위 예시는 중첩라우트 구조와 named view 를 활용한 레이아웃 구현이므로 기본 개념으로 이해하기는 어려울 수 있다.  
조금 더 쉬운 사례로는, 단순히 아래와 같이 하나의 컴포넌트 내에 여러개의 router-view를 구성할 경우이다.
```js
const routes = [
  {
    path: '/dashboard',
    components: {
      header: DashboardHeader,
      default: DashboardMain,
      footer: DashboardFooter
    }
  }
]
```
```vue
<template>
  <router-view name="header"></router-view>
  <router-view></router-view>      <!-- default -->
  <router-view name="footer"></router-view>
</template>
```

### alias와 기본 path
라우터에서 하나의 컴포넌트를 여러 URL 경로로 접근할 수 있게 해주는 기능이 alias이다.  
예를들어, 네비게이션 사이드바의 router-link에 /home이라는 경로를 지정했지만, 브라우저에서 / 경로로 접속했을 때도 동일한 컴포넌트를 보여주고 싶을 수 있다.  
이때 / 경로를 /home 의 alias(별칭)으로 등록하면, 실제 내부적으로는 /home으로 라우팅되지만 사용자 브라우저 주소창에는 /경로로 접근한것 처럼 동작한다.  

```js
const routes = [
  {
    path: '/home', // 혹은 '/'
    component: HomeView,
    alias: '/' // 혹은 '/home'
  }
]
```
네비게이션 사이드바에서 첫번째 메뉴를 선택했을 때와 동일한 컴포넌트를 페이지 첫 진입시(/ 경로)에도 보여주고 싶을때 사용하면 좋다.

문자열 배열을 사용하면 여러개의 alias를 등록할 수도 있다.

```js
const routes = [
  {
    path: '/home',
    component: HomeView,
    alias: ['/', 'index', '/main']
  }
]
```

### redirect
네비게이션 사이드바에서 첫번째 메뉴를 선택했을 때와 동일한 컴포넌트를 페이지 첫 진입시(/ 경로)에도 보여주고 싶을때 alias를 사용하면 좋다고 설명했는데, 해당 기능은 redirect를 사용해서도 비슷하게 구현이 가능하다.  
```js
const routes = [
  {
    path: '/home',
    component: HomeView
  },
  {
    path: '/',
    redirect: '/home'
  }
]
```
alias와의 차이점은 주소창에 path가 redirect에 할당한 path로 변경되므로 실제 입력한 path가 유지되지는 않는다는 점이다.

### Navigation Guard

매개변수로 to, from, next를 받는다.  
- `to`: 이동하려는 라우트 정보 객체
- `from`: 현재 라우트 정보 객체
- `next`: 라우트 이동을 진행하는 콜백 함수로 조건에 따라 허용/차단이 가능

#### 전역 가드 - beforeEach
라우터 인스턴스 전체에서 적용 가능하며, 라우트 이동이 시작될 때 항상 호출된다.  
앱 내 모든 라우트 이동을 감지할 수 있으며, 인증 체크, 권한 확인, 로그 기록 등 공통처리에 적합하다.
```js
const router = createRouter({
  history: createWebHistory('/'),
  routes
})
router.beforeEach((to, from, next) => {
  console.log("[G]beforeEach-to: ", to)
  console.log("[G]beforeEach-from: ", from)
  if (to.fullPath !== '/company') next();
})
```
#### 라우트 내 가드 beforeEnter
특정 라우트 설정 안에서만 정의 가능하며, 해당 라우트로 이동할 때만 호출된다.  
컴포넌트와 독립적으로 동작되며, 라우트 설저 시점에서 정의된다.
```js
const routes = [
  {
    path: '/about',
    name: 'AboutPage', /* /about/:id일 경우 push('/about/pk') 혹은 push({name:'AboutPage', params{id: 'pk'}}) 형태로 호출 */
    component: AboutView,
    beforeEnter: (to, from, next) => {
      console.log("[R]beforeEnter-to: ", to)
      console.log("[R]beforeEnter-from: ", from)
      next();
    }
  },
]
```

#### 컴포넌트 내 가드 - onBeforeRouteLeave
컴포넌트 내부에서 정의되며, 현재 컴포넌트를 떠나 다른 라우트로 이동할 때 호출된다.  
컴포넌트 상태를 기반으로 이동을 막거나 확인할 수 있다.  
예를들어 form 작성중일 때 "저장하지 않고 이동하시겠습니까?" 라는 alert을 출력할때 사용할 수 있다.
```vue
<script setup>
import { onBeforeRouteLeave } from 'vue-router';

onBeforeRouteLeave((to, from, next) => {
  console.log("[C]onBeforeRouteLeave - to: ", to)
  console.log("[C]onBeforeRouteLeave - from: ", from)
  if (to.fullPath !== '/about') next();
})
</script>
```

### 모든 경로/404 Not found 라우트 잡기

#### `/:pathMatch(.*)*`
정규 패턴을 사용하여 모든 경로에 대해 해당 라우트에 매칭하고 
만약 등록되지 않은 라우트라면 등록된 컴포넌트를 출력한다.
```js
const routes = [
  {
    path: '/:pathMatch(.*)*', /* route.params.pathMatch: 모든 경로/404 Not found 라우트 */
    name: 'NotFoundPage',
    component: NotFoundView
  },
]
```
추가로 등록되지 않은 라우트 route.params.pathMatch 속성에 해당 경로를 저장한다.  
route.params.pathMatch는 아래와같이 컴포넌트에서 활용 가능하다.
- NotFoundView.vue
```vue
<template>
  <div>
    <h1>404 Not Found</h1>
    <p>잘못된 경로: {{ $route.params.pathMatch }}</p>
  </div>
</template>
```
</details>
<br>

## [Provide & Inject](Provide&Inject.md)