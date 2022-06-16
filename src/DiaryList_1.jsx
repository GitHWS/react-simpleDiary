import DiaryItem from "./DiaryItem";

const DiaryList = ({ diaryList }) => {
  // console.log(diaryList);
  return (
    <div className="DiaryList">
      <h2>일기 리스트</h2>
      <h4>{diaryList.length}개의 일기가 있습니다.</h4>
      <div>
        {/* it은 diaryList의 요소를 각각 들고있음 */}
        {diaryList.map((it) => (
          // list에는 key라는 Props를 반드시 줘야한다. 아니면 콘솔창에 경고가 뜨기 때문이다.

          // {diaryList.map((it, index) => (
          // <div key={index}>

          // 여기선 diaryList에서 id라는 고유한 값을 설정했지만 없으면 위처럼 map 메서드의 두번째 파라미터인 "index"를 사용하면 된다.
          // 하지만 key로 "index"를 사용하면 데이터를 수정/삭제/추가했을 때 인덱스의 순서가 바뀌기 때문에 리액트에서 문제가 발생할 수 있으므로 되도록 고유한 id를 가지고 있다면 인덱스를 사용하지 않는 것을 권장한다.
          // <div key={it.id}>
          //   <div>작성자 : {it.author}</div>
          //   <div>일기 : {it.content}</div>
          //   <div>감정점수 : {it.emotion}</div>
          //   <div>작성시간(ms) : {it.created_date}</div>
          // </div>

          // key의 값을 id로 명시해주고 나머지는 같기 때문에 스프레드 연산자를 통해 Props로 전개한다.
          <DiaryItem key={it.id} {...it} />
        ))}
      </div>
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
