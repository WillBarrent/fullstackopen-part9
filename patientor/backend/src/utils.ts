import type { Gender, NewPatientEntry } from "./types.ts";
import { GenderValues } from "./types.ts";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: string): gender is Gender => {
  return (Object.values(GenderValues) as string[]).includes(gender);
};

const parseStringProp = (prop: unknown, propName: string): string => {
  if (!isString(prop)) {
    throw new Error("Incorrect or missing field: " + propName);
  }

  return prop;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }

  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }

  return gender;
};

const parseNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Object should be instance of object");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "occupation" in object &&
    "gender" in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parseStringProp(object.name, "name"),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseStringProp(object.ssn, "ssn"),
      gender: parseGender(object.gender),
      occupation: parseStringProp(object.occupation, "occupation"),
    };

    return newEntry;
  }

  throw new Error("Incorrect data passed: some fields are missing");
};

export default parseNewPatientEntry;
