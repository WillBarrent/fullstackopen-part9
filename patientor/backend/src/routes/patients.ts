import express, { type Response } from "express";
import patientsService from "../services/patients.ts";
import type { Patient } from "../types.ts";
import parseNewPatientEntry from "../utils.ts";

const router = express.Router();

router.get("/", (_req, res: Response<Omit<Patient, "ssn">[]>) => {
  const data = patientsService.getEntries();
  res.send(data);
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = parseNewPatientEntry(req.body);
    const addedPatient = patientsService.addEntry(newPatientEntry);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong: ";
    if (error instanceof Error) {
      errorMessage += "Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
