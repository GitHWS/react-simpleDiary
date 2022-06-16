import { useState } from "react";

const DiaryEditor = () => {
  // 아래의 State인 author, content는 동일한 구조를 가지고 있다.
  // 동일한 구조의 State들을 하나의 State로 묶을 수 있다.
  // const [author, setAuthor] = useState("");
  // const [content, setContent] = useState("");

  // 중요한점 : 만약 State의 초기값으로 객체 형태를 가진다면 State의 값을 바꾸는 함수 또한 객체 형태여야 한다.
  const [state, setState] = useState({
    author: "",
    content: "",
  });

  const handleChangeState = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
  };

  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input
          name="author"
          value={state.author}
          onChange={(e) => {
            // e.target은 현재 input을 가리킴
            // "...state"의 순서를 바꾸면 어떻게 될까?
            setState({
              ...state, // 전개구문을 통해 반복되는 객체 프로퍼티를 한 단어로 줄일 수 있음, ...state는 원래 content의 값을 가리킴
              author: e.target.value,
            });
          }}
        />
      </div>
      <div>
        <textarea
          value={state.content}
          onChange={(e) => {
            setState({
              ...state, // ...state는 원래 author의 값을 가리킴
              content: e.target.value,
            });
          }}
        ></textarea>
      </div>
    </div>
  );
};

export default DiaryEditor;
