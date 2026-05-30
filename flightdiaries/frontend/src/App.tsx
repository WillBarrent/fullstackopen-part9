import { useEffect, useState } from "react";
import type { DiaryEntry } from "./types";
import diariesService from "./services/diaries";
import Header from "./components/Header";
import Diaries from "./components/Diaries";
import NewDiaryForm from "./components/NewDiaryForm";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    diariesService.getAll().then((initialDiaries) => {
      setDiaries(initialDiaries);
    });
  }, []);

  return (
    <div>
      <Header title="Flight Diaries" />
      <Diaries diaries={diaries} />
      <NewDiaryForm diaries={diaries} setDiaries={setDiaries} />
    </div>
  );
};

export default App;
