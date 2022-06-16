import React, { useState, useRef } from "react";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import "./App.css";

function App() {
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    setData([newItem, ...data]);
  };
  // 일기를 삭제하는 함수를 생성한다.
  // targetId는 DiaryItem를 통해 삭제하기 버튼을 누르면 누른 일기아이템의 id의 값을 받아온다.
  const onDelete = (targetId) => {
    console.log(`${targetId}가 삭제되었습니다.`);
    // 일기를 삭제한 후 새로운 배열을 받아오는 방법 - filter로 삭제한 일기의 Id와 일치하지 않는 것만 뽑아서 배열로 생성
    const newDiaryList = data.filter((it) => it.id !== targetId);
    // data를 삭제가 완료된 데이터로 재렌더링해준다.
    setData(newDiaryList);
  };

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      {/* onDelete 함수를 DiaryList에 전달한다. */}
      <DiaryList onDelete={onDelete} diaryList={data} />
    </div>
  );
}

export default App;
