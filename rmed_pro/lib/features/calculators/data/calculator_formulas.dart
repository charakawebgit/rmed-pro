// Example for Body Mass Index (BMI)
// In a real app, this would be a map or a switch statement based on calculator ID.

class CalculationResultData {
  final double value;
  final String interpretation;

  CalculationResultData(this.value, this.interpretation);
}

// lib/features/calculators/data/calculator_formulas.dart (New Code)
class BmiCalculator {
  static const id = 'bmi'; // Matches the ID in your JSON data

  static CalculationResultData calculate({
    required double weight, // in kg
    required double height, // in cm
  }) {
    if (height <= 0) {
      return CalculationResultData(0, 'Height must be positive.');
    }
    
    final heightInMeters = height / 100;
    final bmi = weight / (heightInMeters * heightInMeters);
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

// Helper class for return type
class CalculationResultData {
  final double value;
  final String interpretation;

  CalculationResultData(this.value, this.interpretation);
}
