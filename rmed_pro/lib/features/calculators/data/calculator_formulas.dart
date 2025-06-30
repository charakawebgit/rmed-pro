// Example for Body Mass Index (BMI)
// In a real app, this would be a map or a switch statement based on calculator ID.

class CalculationResultData {
  final double value;
  final String interpretation;

  CalculationResultData(this.value, this.interpretation);
}

class BmiCalculator {
  static const id = 'bmi';

  static CalculationResultData calculate({
    required double weight, // in kg
    required double height, // in meters
  }) {
    if (height <= 0) {
        return CalculationResultData(0, 'Height must be positive.');
    }
    
    final bmi = weight / (height * height);
    String interpretation;

    if (bmi < 18.5) {
      interpretation = 'Underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
      interpretation = 'Normal weight';
    } else if (bmi >= 25 && bmi < 30) {
      interpretation = 'Overweight';
    } else {
      interpretation = 'Obesity';
    }
    
    return CalculationResultData(bmi, interpretation);
  }
}
