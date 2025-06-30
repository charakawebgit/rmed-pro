import 'package:flutter_test/flutter_test.dart';
import 'package:rmed_pro/features/calculators/data/calculator_formulas.dart';

void main() {
  group('BMI Calculator', () {
    test('Calculates normal weight correctly', () {
      final result = BmiCalculator.calculate(weight: 70, height: 1.75); // kg, m
      expect(result.value, closeTo(22.86, 0.01));
      expect(result.interpretation, 'Normal weight');
    });

    test('Identifies underweight correctly', () {
        final result = BmiCalculator.calculate(weight: 50, height: 1.75);
        expect(result.value, closeTo(16.33, 0.01));
        expect(result.interpretation, 'Underweight');
    });
    
    test('Handles zero height to prevent division by zero', () {
        final result = BmiCalculator.calculate(weight: 70, height: 0);
        expect(result.value, 0);
        expect(result.interpretation, 'Height must be positive.');
    });
  });
}
