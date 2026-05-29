/* eslint-disable @typescript-eslint/consistent-type-imports */
import { z } from "zod";
import { NewPatientSchema } from "./utils.ts";

export const GenderValues = {
  Male: "male",
  Female: "female",
  Other: "other",
} as const;

export type Gender = (typeof GenderValues)[keyof typeof GenderValues];

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export type NewPatientEntry = z.infer<typeof NewPatientSchema>;

export interface Patient extends NewPatientEntry {
  id: string,
}
