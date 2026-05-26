interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface CalculatorValues {
  target: number;
  hours: number[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isNotNumber(argument: any): boolean {
  return isNaN(Number(argument));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function arrayContainsNumbers(array: any[]): boolean {
  for (let i = 0; i < array.length; i++) {
    if (isNaN(Number(array[i]))) {
      return false;
    }
  }

  return true;
}

function parseArguments(args: string[]): CalculatorValues {
  if (args.length < 4) throw new Error("Not enough arguments");

  const [target, ...hours] = args.slice(2);

  console.log(hours);

  if (isNotNumber(target) || !arrayContainsNumbers(hours)) {
    throw new Error("values should be numbers");
  }

  return {
    target: Number(target),
    hours: hours.map((hour) => Number(hour)),
  };
}

// Created specifically for index.ts: POST "/exercises" route
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseParamters(params: any[]): CalculatorValues {
  if (params.length < 2 || params.includes(undefined)) throw new Error("parameters missing");

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [target, ...hours] = params;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (isNotNumber(target) || !arrayContainsNumbers(hours[0])) {
    throw new Error("malformatted parameters");
  }

  return {
    target: Number(target),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    hours: hours[0].map((hour: any) => Number(hour)),
  };
}

function exerciseCalculator(target: number, hours: number[]): Result {
  const trainingDays = hours.filter((hour) => hour !== 0).length;
  let rating;
  let count = 0;

  for (let i = 0; i < hours.length; i++) {
    const hour = hours[i];

    if (hour >= target) {
      count += 1;
    }
  }

  if (count == trainingDays) {
    rating = 3;
  } else if (count >= trainingDays / 2) {
    rating = 2;
  } else {
    rating = 1;
  }

  return {
    periodLength: hours.length,
    trainingDays: trainingDays,
    success: trainingDays === hours.length ? true : false,
    rating: rating,
    ratingDescription:
      rating === 3
        ? "very good of you"
        : rating === 2
          ? "not too bad but could be better"
          : "very bad you need to try better",
    target: target,
    average: hours.reduce((acc, current) => acc + current, 0) / hours.length,
  };
}

if (process.argv[1] === import.meta.filename) {
  try {
    const { target, hours } = parseArguments(process.argv);
    console.log(exerciseCalculator(Number(target), hours));
  } catch (error) {
    let errorMessage = "An error has occured.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }

    console.log(errorMessage);
  }
}

export default exerciseCalculator;
