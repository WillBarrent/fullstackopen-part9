import express from "express";
import calculateBmi from "./bmiCalculator.ts";
import exerciseCalculator, { parseParamters } from "./exerciseCalculator.ts";
const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  try {
    const bmi = calculateBmi(Number(height), Number(weight));
    res.json({
      weight: Number(weight),
      height: Number(height),
      bmi,
    });
  } catch {
    res.status(400).json({
      error: "malformatted parameters",
    });
  }
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  try {
    const { target: targetHours, hours } = parseParamters([
      target,
      daily_exercises,
    ]);
    const calculation = exerciseCalculator(Number(targetHours), hours);

    res.json(calculation);
  } catch (error) {
    if (error instanceof Error) {
      res.json({
        error: error.message,
      });
    }
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
