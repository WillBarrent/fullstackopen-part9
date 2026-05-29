import patientsData from "../data/patients.ts";
import type { NewPatientEntry, Patient } from "../types.ts";
import { v4 as uuid } from "uuid";

const patients: Patient[] = patientsData;

const getEntries = (): Omit<Patient, "ssn">[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addEntry = (entry: NewPatientEntry): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...entry,
  };
  patients.push(newPatient);

  return newPatient;
};

export default { getEntries, addEntry };
