import type React from "react";
import { Visibility, Weather, type DiaryEntry } from "../types";
import diariesService from "../services/diaries";
import { useState } from "react";
import axios from "axios";

const NewDiaryForm = ({
  diaries,
  setDiaries,
}: {
  diaries: DiaryEntry[];
  setDiaries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
}) => {
  const [error, setError] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [weather, setWeather] = useState<Weather>("sunny");
  const [visibility, setVisibility] = useState<Visibility>("great");
  const weatherValues: Weather[] = Object.values(Weather);
  const visibilityValues: Visibility[] = Object.values(Visibility);

  const addNewDiary = (event: React.SyntheticEvent) => {
    event.preventDefault();

    diariesService
      .addNew({
        date: date,
        visibility: visibility,
        weather: weather,
        comment: comment,
      })
      .then((newEntry) => {
        setDiaries(diaries.concat(newEntry));
      })
      .catch((error: unknown) => {
        if (axios.isAxiosError(error)) {
          const errorMessage = error.response?.data.error;
          setError(`Error: ${errorMessage[0].code}: ${errorMessage[0].format}`);
        }
      });
  };

  return (
    <div>
      <h1>Add new diary</h1>
      {error ? <div style={{ color: "red" }}>{error}</div> : null}
      <form onSubmit={addNewDiary}>
        <div>
          <label>
            weather
            <select
              name="weather"
              value={weather}
              onChange={(event) => {
                const selectedWeather = event.target.value;
                if ((weatherValues as string[]).includes(selectedWeather)) {
                  setWeather(event.target.value as Weather);
                }
              }}
            >
              {weatherValues.map((value) => {
                return (
                  <option key={value} value={value}>
                    {value}
                  </option>
                );
              })}
            </select>
          </label>
        </div>
        <div>
          <label>
            visibility
            <select
              name="visibility"
              value={visibility}
              onChange={(event) => {
                const selectedVisibility = event.target.value;
                if (
                  (visibilityValues as string[]).includes(selectedVisibility)
                ) {
                  setVisibility(selectedVisibility as Visibility);
                }
              }}
            >
              {visibilityValues.map((value) => {
                return (
                  <option key={value} value={value}>
                    {value}
                  </option>
                );
              })}
            </select>
          </label>
        </div>
        <div>
          <label>
            date
            <input
              value={date}
              onChange={(event) => {
                setDate(event.target.value);
              }}
              type="date"
              name="date"
              placeholder="2026-05-28"
            />
          </label>
        </div>
        <div>
          <label>
            comment
            <input
              value={comment}
              onChange={(event) => {
                setComment(event.target.value);
              }}
              type="text"
              name="comment"
              placeholder="completely optional"
            />
          </label>
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default NewDiaryForm;
