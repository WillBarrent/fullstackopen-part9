import express from "express";
import diagnosesRouter from "./src/routes/diagnoses.ts";
import patientsRouter from "./src/routes/patients.ts";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/ping", (_req, res) => {
  console.log("Someone pinged here");
  res.send("pong");
});

app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientsRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log("Server is running on PORT", PORT);
});
