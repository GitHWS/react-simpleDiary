const DiaryItem = ({ author, content, emotion, created_date }) => {
  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          작성자 : {author} | 감정점수 : {emotion}
        </span>
        {/* toLocaleString : 사람이 알아보기 좋은 숫자로 바꿔준다.  */}
        <br />
        <span className="date">{new Date(created_date).toLocaleString()}</span>
      </div>
      <div className="content">{content}</div>
    </div>
  );
};

export default DiaryItem;
