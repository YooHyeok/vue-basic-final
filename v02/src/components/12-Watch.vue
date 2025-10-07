<script>
export default {
  data: function() {
    return {
      count: 0,
      y: "",
      onceCount: 0,
      onceY: ""
    }
  },
  /**
   * 반응형 속성이 변경될 때마다 함수를 트리거(호출) 할 수 있다.
   * vue3에서는 watcher를 함수내에서 선언하여 감시를 시작할 수 있다.
   * 또한 stop을 지원해 추적 중단이 가능하다.
   * 이에, 함수 호출등을 통한 트리거로 추적을 실행하고, stop으로 추적을 중단할 수 있다.
   * 추가로 value의 3번째 매개변수로 cleanup 콜백함수도 지원해준다. 
   */
  watch: {
    count(newVal, oldVal) {
      if(newVal % 2 == 0) {
        this.y = "짝수"
        return;
      }
      this.y = "홀수"
    },
    onceCount: {
      handler(newVal, oldVal) {
        if(newVal % 2 == 0) {
          this.onceY = "짝수"
          return;
        }
        this.onceY = "홀수"
      },
      once: true // 1회만 감시한다. - vue 3.4 이상에서만 동작한다.
    }
  },
  methods: {
    increment() {
      this.count ++
      this.onceCount ++
    }
  }
}
</script>
<template>
  <hr/>
  <a target="_blank" href="https://github.com/YooHyeok/vue-basic-todo-app/blob/main/v02/src/components/12-Watch.vue" style="text-decoration: none; color: blue;">
    <h1 style="cursor: pointer;">코드 보러 가기</h1>
  </a>
  <hr/>
  <h1>Watcher 감시지</h1>
  <hr/>
  <div class="container">
    <!-- 좌측 영역 -->
    <div class="left">
      <h2></h2>
      <p>[Count]: {{ count }}</p>
      <p>[홀짝]: {{ y }}</p>
      <button @click="increment">Increment</button>
      <h2>한번만 감시</h2>
      <p>[Count]: {{ onceCount }}</p>
      <p>[홀짝]: {{ onceY }}</p>
      <button @click="increment">Increment</button>

      <br>
      
      <h2></h2>
      <br>
    </div>
    <!-- 중앙 선 -->
    <div class="divider"></div>
     <!-- 우측 영역 -->
    <div class="right">
    </div>
  </div>
</template>
<style>
.demo {
  width: 100px;
  height: 100px;
  background-color: blueviolet;
}
.container {
  display: grid;
  grid-template-columns: 1fr 2px 1fr;
  max-width: 1980px;
  max-height: 650px;
  align-items: start;
  gap: 0;
}

.left, .right {
  padding: 20px;
  overflow: auto;
}

.divider {
  background-color: black;
  width: 2px;
  height: 100%;
}
</style>