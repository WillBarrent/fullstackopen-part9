import { GenderValues } from "./types.ts";
import { z } from "zod";

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  occupation: z.string(),
  gender: z.enum(GenderValues),
});