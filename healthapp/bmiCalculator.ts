function calculateBmi(height: number, weight: number): string {
  const heightInMeters = height / 100;
  const calculation = weight / (heightInMeters * heightInMeters);

  switch (true) {
    case calculation < 18.5:
      return "Underweight range";
    case calculation > 18.5 && calculation < 24.9:
      return "Normal range";
    case calculation > 25 && calculation < 29.9:
      return "Overweight range";
    case calculation > 30:
      return "Obese range";
    default:
      throw new Error("Height and weight parameters must be of number type");
  }
}

if (process.argv[1] === import.meta.filename) {
  const height = Number(process.argv[2]);
  const weight = Number(process.argv[3]);

  console.log(calculateBmi(height, weight));
}


export default calculateBmi;