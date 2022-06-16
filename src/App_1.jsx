import React, { useState, useEffect } from "react";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import "./App.css";

function App() {
  return (
    <div className="App">
      <DiaryEditor />
      {/* undefined이 나오면 에러가 발생하기 때문에 DiaryList.jsx에서 defaultProps를 통해 기본값을 설정해서 undefined로 인한 에러를 방지할 수 있다. */}
      {/* <DiaryList diaryList={undefined} /> */}
      <DiaryList diaryList={undefined} />
    </div>
  );
}

export default App;
