# 이슈 트래킹

## TypeError: crypto.hash is not a function
<details>
<summary>접기/펼치기</summary>
<br>

- 오류 로그
  ```
  error when starting dev server:
  TypeError: crypto.hash is not a function
      at getHash (file:///C:/Programming/workspace_vs/vue-basic-todo-app/v01/node_modules/vite/dist/node/chunks/dep-BHkUv4Z8.js:2788:21)
      at getLockfileHash (file:///C:/Programming/workspace_vs/vue-basic-todo-app/v01/node_modules/vite/dist/node/chunks/dep-BHkUv4Z8.js:11673:9)
      at getDepHash (file:///C:/Programming/workspace_vs/vue-basic-todo-app/v01/node_modules/vite/dist/node/chunks/dep-BHkUv4Z8.js:11676:23)
      at initDepsOptimizerMetadata (file:///C:/Programming/workspace_vs/vue-basic-todo-app/v01/node_modules/vite/dist/node/chunks/dep-BHkUv4Z8.js:11137:53)
      at createDepsOptimizer (file:///C:/Programming/workspace_vs/vue-basic-todo-app/v01/node_modules/vite/dist/node/chunks/dep-BHkUv4Z8.js:34611:17)
      at new DevEnvironment (file:///C:/Programming/workspace_vs/vue-basic-todo-app/v01/node_modules/vite/dist/node/chunks/dep-BHkUv4Z8.js:35375:109)
      at Object.defaultCreateClientDevEnvironment [as createEnvironment] (file:///C:/Programming/workspace_vs/vue-basic-todo-app/v01/node_modules/vite/dist/node/chunks/dep-BHkUv4Z8.js:35794:9)
      at _createServer (file:///C:/Programming/workspace_vs/vue-basic-todo-app/v01/node_modules/vite/dist/node/chunks/dep-BHkUv4Z8.js:28373:132)
      at async CAC.<anonymous> (file:///C:/Programming/workspace_vs/vue-basic-todo-app/v01/node_modules/vite/dist/node/cli.js:573:18)
  ```

### 발생 원인
2025년 06월 24일 vite가 7.0버전으로 업그레이드 되면서 Node.js의 최소 버전이 상향되었기 때문이다.  
vite 7.0버전에서는 Node.js 18 버전에 대한 지원이 완전히 종료되었고, 필요한 최소 버전도 20.19 또는 22.12버전 이상으로 상향되었다.  
vite 7.0버전을 사용하기 위해서는 Node.js 버전을 높이거나 vite버전을 낮춰야 한다.  
(가급적 Node.js 버전을 높이는것을 추천)

### vite 6.3.5 다운그레이드
<details>
<summary>접기/펼치기</summary>
<br>

- 기존 설치 패키지 정리
  ```bash
  rm -rf node_modules package-lock.json
  ```

- Vite 6.3.5 설치
  ```bash
  npm install vite@6.3.5 --save-dev
  ```

- @vitejs/plugin-vue 5.2.3 설치
  ```bash
  npm install @vitejs/plugin-vue@5.2.3 --save-dev
  ```

- 의존성 설치
  ```bash
  npm install
  ```

- dev 서버 실행
  ```bash
  npm run dev
  ```

</details>

### 강의와 동일한 버전
- vue: ^3.4.29
- @vitejs/plugin-vue: ^5.0.5
- vite: ^5.3.1

더 간단하게 강의 기준인 위 버전을 맞추기 위해서는 3.10.4 버전으로 설치해야 한다.
```bash
npm create vue@3.10.4 .
```
</details>
<br>

## 템플릿
<details>
<summary>접기/펼치기</summary>
<br>

</details>
<br>

## tailwindcss3이상 npx tailwindcss init -p 오류
```bash
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
```
위 명령을 통해 설치할 경우 25년 09워 14일 기준으로 tailwindcss 버전 4.1.13d이 설치된다.

이후 tailwindcss 설정파일 구성을 위해 아래 명령을 입력했다.
```bash
npx tailwindcss init -p
```
위 명령을 실행할 경우 아래 오류가 발생한다.
```text/plain
npm ERR! could not determine executable to run

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\yjou7\AppData\Local\npm-cache\_logs\2025-09-14T08_17_34_116Z-debug-0.log
```
tailwindcss가 4버전으로 버전업 되면서 더이상 해당 설정을 사용하지 않기 때문에 발생한다.  

1. 최신 4버전에 대한 설정 적용
2. 3버전 다운그레이드 후 설정파일 적용

2번째 방법을 적용하기 위해 tailwindcss버전을 3으로 변경했다.

```bash
npm install -D tailwindcss@3
```

```bash
npx tailwindcss init -p
```

잘 설치되는 것을 확인할 수 있다.
