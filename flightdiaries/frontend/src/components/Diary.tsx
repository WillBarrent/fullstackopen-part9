import type { DiaryEntry } from "../types";

const Diary = ({ diary }: { diary: DiaryEntry }) => {
  return (
    <div>
      <b>Diary {diary.id}</b>
      <div>Weather: {diary.weather}</div>
      <div>Visibility: {diary.visibility}</div>
      <div>Date: {diary.date}</div>
      <div>
        Comment:{" "}
        {diary.comment
          ? diary.comment
          : "no comment"}
      </div>
    </div>
  );
};

export default Diary;
