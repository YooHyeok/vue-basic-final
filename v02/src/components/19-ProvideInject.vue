<script>
import Child from '@/components/19-ProvideInjectChild.vue'
export default {
  components: {
    Child
  },
  data() {
    return {
      giftProp: '장난감',
      giftData: {
        value: '장난감',
      }
    }
  },
  provide() {
    return {
      giftInjectPrimitive: this.giftProp,
      giftInjectObject: this.giftData,
      onChangeInject: () => {
        this.giftProp = "변경"
        // this.giftInjectPrimitive = "변경"
        this.giftData.value = "변경"
      },
    }
  },
}
</script>
<!-- 
Provide와 Inject  
props의 단점을 개선하기 위해 등장하였다.  
props의 단점으로는 다음과 같다.  
부모 자식 손자 3레벨 관계의 컴포넌트에서 a라는 값을 부모에서 손자컴포넌트까지 전달한다고 가정했을 때,  
props를 통해 중간 컴포넌트인 자식 컴포넌트를 거쳐 전달해야한다.  
컴포넌트 관계의 단계가 많아지면 많아질 수록 전달하는 작업량이 증가하게 된다.  
중간 단계에서 a라는 값을 활용 한다면 의미있는 행위겠으나, 손자 단계에서만 사용한다면 중간 과정은 어찌보면 무의미한 과정일 수도 있다.  
이러한 문제를 provide와 inject를 이용하여 해결할 수 있다.  

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

-->
<template>
  <hr/>
  <a target="_blank" href="https://github.com/YooHyeok/vue-basic-todo-app/blob/main/v02/src/components/19-ProvideInject.vue" style="text-decoration: none; color: blue;">
    <h1 style="cursor: pointer;">코드 보러 가기</h1>
  </a>
  <hr/>
  <h1>Provide & Inject</h1>
  <hr/>
  <div class="container">
    <!-- 좌측 영역 -->
    <div class="left">
      <h1>최상위 부모 컴포넌트</h1>
      <Child :giftProp/>
    </div>
    <!-- 중앙 선 -->
    <!-- <div class="divider"></div> -->
    <!-- 우측 영역 -->
  </div>
</template>
<style scoped>
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
.left > h1 {
  color: red
}
</style>