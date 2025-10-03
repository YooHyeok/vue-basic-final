# [README.md](README.md)

# EventBus
Vue2에서만 사용할수 있는 기능으로 Vue3에서는 지원하지 않는다.  
복잡한 형제 컴포넌트간 통신할때 사용한다.  
예를들어 Root 컴포넌트 하위로 A와 B 컴포넌트가 존재한다고 가정해 보자.  
이때 데이터를 A에서 B로 보내는 방법은 Emit과 Props를 사용하여 부모 컴포넌트를 통해 간접적으로 통신해야 한다.  
A컴포넌트와 B컴포넌트간 공유할 데이터를 먼저 Root컴포넌트의 state로 지정해둔 뒤, Root컴포넌트에서는 변경된 값을 Props로 미리 B컴포넌트에게 전달하도록 구성하고, 실제로 A컴포넌트에서 에서 Root로 Emit을 통헤 값을 변경하게 되면 한다.  
반대로 B컴포넌트 에서도 동일하게 구성하게되면, 데이터 공유가 가능해지는데, 만약 데이터를 전달받게 될 컴포넌트의 위치가 각 형제 컴포넌트상에서 depth가 깊어져 복잡해진다면, 버그가 발생할 위험도가 크며, 관리 포인트가 어려워진다.  
이때 쉽게 사용할 수 있는것이 EventBus이다.  
단순히 중앙 제어를 하지않고, 이벤트를 수신하고 있는 렌더링 된 모든 컴포넌트에게 데이터를 전달할 수 있는 기능이기 때문이다.  

- ## EventBus.js
    전역으로 eventBus라는 상수값 내보낸다.
    여기서 new Vue()란 새로운 vue인스턴스를 생성하는것.
    ```javascript
    /* 생략 */
    export const eventBus = new Vue()
    /* 생략 */
    ```
  - `발행 $emit`   
    eventBus에 $emit을 통해 신호를 송신   
    즉, eventBus라는 새로운 vue인스턴스가 부모 역할을 한다는 것으로 추론 가능하다.  
    해당 인스턴스를 참조하는 모든 컴포넌트에서는 해당 신호를 수신할 수 있게 된다.  
    첫번째 매개변수로 발행할 event명을, 두번째 매개변수로 매개변수 전달이 가능하다.  
    event명을 수신하고 있는 모든 컴포넌트에 전송하게된다.  
    (단, 수신은 렌더링 되어있는 컴포넌트만 해당한다.)
    ```vue
    <script>
    import { eventBus } from './EventBus';
    export default {
      methods: {
        changeUser () {
          eventBus.$emit('userWasEdited', new Date())
        }
      }
    }
    </script>
    ```
  - `구독/취소 $on/$off`  
    eventBus에 $on을 통해 신호를 수신  
    eventBus로 부터 발행된 이벤트명을 등록함으로써 구독(수신) 하게 된다.  
    컴포넌트의 mounted 혹은 created 훅에서 수신하도록 처리하고,  
    컴포넌트가 해제될때 구독을 취소하여 리소스를 관리한다.  
    ```vue
    <script>
    import { eventBus } from './EventBus';
    export default {
      created () {
        eventBus.$on('userWasEdited', (date) => {
          this.editedDate = date
        })
      },
      beforeDestroyed() {
        eventBus.$off('userWasEdited')
      }
    }
    </script>
    ```
