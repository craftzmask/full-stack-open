const calculateBmi = (height: number, weight: number) => {
  const heightInMeter = height / 100;
  const bmi = weight / (height * height)

  if (bmi < 25) {
    return "Normal (healthy weight)";
  } else if (bmi < 30) {
    return "Overweight";
  } else {
    return "Obese (unhealthy weight)";
  }
}

console.log(calculateBmi(180, 74))