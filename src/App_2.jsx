import React, { useState, useRef } from "react";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import "./App.css";

function App() {
  // DiaryEditor 컴포넌트와 DiaryList 컴포넌트를 위해 만든 state이다.
  // DiaryEditor에서 작성한 데이터를 받아오기 위해 setData()를 사용하고
  // DiaryList는 setData()가 받아온 데이터를 찍어주는 역할을 한다.
  // useState()의 초기값으로 []을 주는데 일기가 없는 상태를 의미한다.
  const [data, setData] = useState([]);

  // useRef()를 할당하고 초기값을 0으로 설정한다.
  const dataId = useRef(0);

  // 배열 data에 새로운 일기를 추가하는 함수를 생성한다.
  // DiaryEditor 안에 있는 값들은 모르기 때문에 파라미터로 가져온다.
  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      // id를 useRef()를 통해 생성
      // dataId.currnet는 useRef(0)의 "0"을 가리킨다.
      id: dataId.current,
    };
    // 고유한 id이기 때문에 newItem을 하나씩 생성할 때마다 1씩 증가하도록 한다.
    // 1씩 더해주지 않으면 계속해서 모든 일기 아이템들의 id는 0으로 생성이되서 고유한 값이 아니게 된다.
    dataId.current += 1;
    // setData를 통해 초기값 빈 배열에 원래 가지고 있던 데이터와 새로 생성될 아이템을 추가한다.
    setData([newItem, ...data]);
  };

  return (
    <div className="App">
      {/* onCreate 함수를 DiaryEditor로 전달하여 state의 데이터를 받아온다. */}
      <DiaryEditor onCreate={onCreate} />
      {/* 아무것도 작성하지 않았을 경우 state의 초기값인 []가 들어간다. */}
      <DiaryList diaryList={data} />
    </div>
  );
}

export default App;
