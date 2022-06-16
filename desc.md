# 백업 기록 (가장 최신의 결과는 DiaryEditor.jsx를 참고)

## DiaryEditor_1 부분의 기록

1. React Hook, `useState`의 사용

```js
// Syntax

// useState는 Hook이기 때문에 반드시 가져오기를 해야한다. ★
import {useState} from "react";

[State, State의 값을 변경할 수 있는 유일한 함수] = useState(State의 초기값)
```

```js
const [state, setState] = useState({
  author: "",
  content: "",
});
```

- 만약 `State`의 구조가 동일하다면 `하나의 State`로 묶는 것이 가능하다.

```js
const [author, setAuthor] = useState("");
const [content, setContent] = useState("");
```

위의 `State`를 아래처럼 묶을 수 있다.

```js
const [state, setState] = useState({
  author: "",
  content: "",
});
```

- 만약 `State`의 초기값으로 객체 형태를 가진다면 `State의 값을 바꾸는 함수` 또한 객체 형태여야 한다.

```js
const [state, setState] = useState({
  author: "",
  content: "",
});
```

현재 `state`는 객체 형태이므로 함수인 `setState` 또한 객체 형태로 값을 설정해야한다.

```js
// author의 입력을 받는 input의 OnChange이벤트
onChange={(e) => {
            setState({
              author: e.target.value,
              content: state.content
            });
          }}

// content의 입력을 받는 input의 OnChange이벤트
onChange={(e) => {
            setState({
              author: state.author,
              content: e.target.value,
            });
          }}
```

2. 스프레드 연산자 `...` 사용

- 만약 객체로 생성된 `State`의 프로퍼티가 많고 함수에서 사용될 때 변경되는 값을 제외하고 같은 값으로 중복되는 것이 많을 때 스프레드 연산자 `...`를 사용하여 입력량을 줄일 수 있다.

```js
// author의 입력을 받는 input의 OnChange이벤트
onChange={(e) => {
            setState({
              ...state,
              author: e.target.value,
            });
          }}
```

```js
// content의 입력을 받는 input의 OnChange이벤트
onChange={(e) => {
            setState({
              ...state,
              content: e.target.value,
            });
          }}
```

이것을 풀어서 보면 아래와 같다.

```js
// author의 입력을 받는 input의 OnChange이벤트
onChange={(e) => {
            setState({
              author: state.author,
              content: state.content,
              author: e.target.value, // 위에 있는 author:state.author를 오버라이드하게 된다.
            });
          }}
```

```js
// content의 입력을 받는 input의 OnChange이벤트
onChange={(e) => {
            setState({
              author: state.author,
              content: state.content,
              content: e.target.value, // 위에 있는 content:state.content를 오버라이드하게 된다.
            });
          }}
```

- 여기서 `...state`가 아래에 있으면 결과는 달라진다.

```js
// author의 입력을 받는 input의 OnChange이벤트
onChange={(e) => {
            setState({
              author: e.target.value,
              ...state,
            });
          }}
```

이를 풀어서 살펴보면 아래와 같다.

```js
onChange={(e) => {
            setState({
              author: e.target.value,
              author: state.author, // 위에 있는 author:e.target.value를 오버라이드하게 된다.
              content: state.content,
            });
          }}
```

즉, `e.target.value`로 입력하는대로 author의 값으로 저장을 했지만 `state.author`인 초기값 `""`로 값을 오버라이드하게 되어 값이 바뀌지 않는 문제가 발생한다.

## DiaryEditor_2 부분의 기록

1. 이벤트 병합

- 이벤트를 합쳐서 한번에 주는 방법도 있다.

```js
// 각 input에 onChange = { handleChangeState }을 준 상태

const handleChangeState = {
  ...state,
  [e.target.name]: e.target.value,
  // 값이 변한 input의 name : 값이 변한 input의 value
};
```

만약 `author`에 입력을 하면 아래처럼 프로퍼티가 계산된다.

```js
[e.target.name]: e.target.value,

author : (사용자가 입력한 값)
```

## DiaryEditor_3 부분의 기록

1. React Hook, `useRef` 사용

- React에서 DOM 요소에 접근해야할 때 사용하는 Hook이 있는데 그것이 `useRef`이다.

아래처럼 사용하면 된다.

```js
// Syntax

// useRef는 Hook이기 때문에 반드시 가져오기를 해야한다. ★
import {useRef} from "react";

[const/let] 변수명 = useRef();

...

<element ref={변수명}> {/* HTML 해당하는 태그에 ref 속성을 사용하여 변수명과 연결 */}
```

`<input>`, `<textarea>`을 선택하고 싶을 때는 아래처럼 작성하면 된다.

```js
import {useRef} from "react";

// 변수에 Hook인 useRef()를 할당하기
const authorInput = useRef();
const cotentInput = useRef();

...

// 각 태그에 ref로 맵핑하기
<input ref={authorInput}>
<textarea ref={cotentInput}>

console.log(authorInput) // {current: input}
console.log(cotentInput) // {current: textarea}
```

2. 버튼을 클릭 시 사용자가 정확히 입력했는지 확인하고 그렇지 않으면 `alert`을 띄우고 `focus` 해주기

useRef()를 통해 선택한 DOM을 출력해보면 `{current:input}`, `{current:textarea}`로 출력이 되는데 여기서 `current`는 현재 가리키고 있는 DOM을 의미한다.

그래서 사용할 때 `변수명.current`로 하면 선택할 수 있다.

```js
if (authorInput.current.value < 1) {
  // alert창 띄우기
  alert("작성자는 최소 1글자 이상 입력해주세요.");
  // focus 하기
  authorInput.current.focus();
}
```

# DiaryEditor_4 부분의 기록 (DiaryItem_1, DiaryList_1, App_1.jsx와 함께 보기)

배열을 이용하여 React에서 List를 렌더링(화면에 표시)해보고 개별적인 컴포넌트 만들기
실제로 배열은 List/Feed를 표시하는데 유용하게 사용되고 있다.

- Props를 전달할 때는 항상 해당 컴포넌트에서 정상적으로 받았는지 확인해볼 것!

```js
// App.jsx
function App() {
  return (
    <div className="App">
      <DiaryEditor />
      {/* 이 부분에서 Props인 diaryList를 컴포넌트의 DiaryList에 전달 */}
      <DiaryList diaryList={dummyList} />
    </div>
  );
}

// DiaryList_1.jsx
// 비구조화할당을 통해 원하는 Props를 선택하여 컴포넌트 함수에 전달하고 확인해본다.
const DiaryList = ({ diaryList }) => {
  console.log(diaryList);
  ...
}
```

- 배열 메서드 `map()`을 통해 리스트를 나열하는 방법 ★

```js
// DiaryList_1.jsx
// Props인 diaryList는 값으로 App.jsx의 배열 데이터인 "dummyList"를 받고 있다.
const DiaryList = ({ diaryList }) => {
  return (
    <div className="DiaryList">
      <h2>일기 리스트</h2>
      <h4>{diaryList.length}개의 일기가 있습니다.</h4>
      <div>
        {/* map() 메서드를 통해 배열 데이터인 diaryList의 요소를 순환하여 데이터의 수만큼 생성해준다. ★ */}
        {/* it은 diaryList의 요소를 각각 들고있다. */}
        {diaryList.map((it) => (
          <DiaryItem key={it.id} {...it} />
        ))}
      </div>
    </div>
  );
};
```

- list에서 undefined가 나올 가능성이 있기 때문에 defaultProps를 통해 기본값을 "[]"로 설정해주고 undefined를 방지

```js
// App.jsx
function App() {
  return (
    <div className="App">
      <DiaryEditor />
      {/* undefined이 나오면 에러가 발생하기 때문에 DiaryList_1.jsx에서 defaultProps를 통해 기본값을 설정해서 undefined로 인한 에러를 방지할 수 있다. */}
      <DiaryList diaryList={undefined} />
    </div>
  );
}

// DiaryList_1.jsx
DiaryList.defaultProps = {
  diaryList: [],
};
```

- list에는 고유한 'key'라는 Props가 필요한데 현재 `id`라는 고유한 값이 있지만 없다면 `map()` 메서드의 두번째 파라미터 "index"를 사용해도 된다.

```js
// DiaryList_1.jsx
const DiaryList = ({ diaryList }) => {
  return (
    <div className="DiaryList">
      <h2>일기 리스트</h2>
      <h4>{diaryList.length}개의 일기가 있습니다.</h4>
      <div>
        {diaryList.map((it) => (
          {/* 현재 배열 데이터인 diaryList는 list인데 리액트에서는 list는 고유한 "key" 값이 필요하다. */}
          {/* "key"가 없으면 경고가 콘솔에 출력된다. */}
          {/* 그래서 미리 저장한 id 프로퍼티를 사용하여 고유한 key 값을 할당했다. */}
          {/* key 값으로는 id값이 반드시 들어가야하기 때문에 명시해주었고 나머지는 같은 값이 들어가면 되기 때문에 스프레드 연산자를 사용했다. */}
          <DiaryItem key={it.id} {...it} />
        ))}
      </div>
    </div>
  );
};
```

만약 고유한 `key`의 값이 없다면, 아래처럼 `map()`의 두번째 파라미터인 `index`를 사용할 수 있다.

```js
<div>
  {diaryList.map((it) => (
    {diaryList.map((it, index) => (
    {/* 여기에 key의 값으로 index를 사용했다. */}
    <DiaryItem key={index} {...it} />

    // 현재 <DiaryItem />의 형태는 아래와 같다.
    // <div key={index}>
    //   <div>작성자 : {it.author}</div>
    //   <div>일기 : {it.content}</div>
    //   <div>감정점수 : {it.emotion}</div>
    //   <div>작성시간(ms) : {it.created_date}</div>
    // </div>
  ))}
</div>
```

하지만 `key`로 `index`를 사용하면 데이터를 수정/삭제/추가했을 때 인덱스의 순서가 바뀌기 때문에 리액트에서 문제가 발생할 수 있으므로 되도록 고유한 `id`를 가지고 있다면 `index`를 사용하지 않는 것을 권장한다.

- 날짜 데이터 객체인 `new Date()`의 `getTime()`을 통해 밀리초로 데이터를 가져왔는데 사람이 보기는 힘들다. 그래서 `toLocaleString()`이라는 메서드를 사용하여 사람이 보기 쉬운 숫자로 만들어준다.

```js
const DiaryItem = ({ author, content, emotion, created_date }) => {
  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          작성자 : {author} | 감정점수 : {emotion}
        </span>
        <br />
        {/* new Date()의 인자로 아무것도 넣지 않으면 현재시각이 출력된다. */}
        {/* 그런데 new Date().getTime 시 사람이 보기 힘든 밀리초로 연산되서 반환한다. */}
        {/* 그래서 new Date()의 인자로 밀리초를 넣으면 밀리초가 가지고 있는 시간을 기준으로 Date객체가 생성된다. */}
        {/* 생성된 Date 객체를 사용하여 toLocaleString() 메서드를 사용 시 사람이 보기 편한 숫자(날짜)로 변환해준다. */}
        <span className="date">{new Date(created_date).toLocaleString()}</span>
      </div>
      <div className="content">{content}</div>
    </div>
  );
};
```

# DiaryEditor_5 부분의 기록 (App_2.jsx와 함께 보기)

배열을 이용한 React의 List에 아이템을 동적으로 추가해보기
React처럼 생각하기

- 리액트는 단방향 데이터 흐름을 가진다. 절대 같은 레벨(Depth)의 컴포넌트와는 데이터를 주고 받을 수 없다. 하지만 공통 부모(<App/>)의 공통 State를 통해 데이터를 전달할 수 있다.

- App.jsx에서 공통으로 사용할 State를 생성한다. 초기값으로 데이터를 받아와야하기 때문에 빈배열로 설정한다.

```js
const [data, setData] = useState([]);
```

- 배열 data에 새로운 일기를 추가하는 함수 `onCreate`를 생성한다.

```js
// App_2.jsx
// useRef()를 할당하고 초기값을 0으로 설정한다.
const dataId = useRef(0);

// DiaryEditor 안에 있는 값들은 모르기 때문에 파라미터로 가져온다.
const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      // id를 useRef()를 통해 생성
      // dataId의 프로퍼티인 currnet를 통해 현재 값인 useRef(0)의 "0"을 가리킨다.
      id: dataId.current,
    };
    // 고유한 id이기 때문에 newItem을 하나씩 생성할 때마다 1씩 증가하도록 한다.
    // 1씩 더해주지 않으면 계속해서 모든 일기 아이템들의 id는 0으로 생성이되서 고유한 값이 아니게 된다.
    dataId.current += 1;
    // setData를 통해 초기값 빈 배열에 원래 가지고 있던 데이터와 새로 생성될 아이템을 추가한다.
    setData([newItem, ...data]);
```

그리고 각 컴포넌트에 사용할 데이터를 DiaryList에 적용할 `data`와 데이터를 가져올 함수 `onCreate`을 할당한다.

```js
return (
  <div className="App">
    {/* onCreate 함수를 DiaryEditor로 전달하여 state의 데이터를 받아온다. */}
    <DiaryEditor onCreate={onCreate} />
    {/* 아무것도 작성하지 않았을 경우 state의 초기값인 []가 들어간다. */}
    {/* State인 data는 onCreate가 가져온 데이터를 받아 DiaryList의 DiaryItem 안에 데이터를 넣어준다. */}
    <DiaryList diaryList={data} />
  </div>
);
```

- 만약 사용자가 input에 작성 후 제출 버튼을 클릭할 경우 onCreate 함수에 state의 author, content, emotion 값이 onCreate의 파라미터로 전달되게 되고 `newItem`에 들어가게 된다.

```js
// DiaryEditor_5.jsx

// 새로운 아이템을 생성하는 onCreate 함수의 인자로 아래처럼 작성해서 제출 버튼을 클릭 시 onCreate 함수의 newItem에 저장이 된다.
onCreate(state.author, state.content, state.emotion);
alert("저장 성공");
// 저장이 성공하면 input, button의 값을 다시 리셋시켜준다.
setState({
  author: "",
  content: "",
  emotion: 1,
});
```

# DiaryEditor_6 부분의 기록 (App_3.jsx, DiaryList_2.jsx, DiaryItem_2.jsx 참고)

DiaryItem에 삭제버튼을 추가하고 삭제버튼을 클릭하면 해당 일기 데이터를 삭제하는 기능 구현하기
