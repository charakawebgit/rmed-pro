import 'package:freezed_annotation/freezed_annotation.dart';

part 'calculator.freezed.dart';
part 'calculator.g.dart';

// Run `dart run build_runner build` to generate the files

@freezed
class Calculator with _$Calculator {
  // The @JsonSerializable annotation is not needed here as freezed handles it
  const factory Calculator({
    required String id,
    required String name,
    required String category,
    required List<CalculatorInput> inputs,
    required CalculatorResult result,
    required String formula,
    required String details,
    @Default(false) bool isFavorite,
  }) = _Calculator;

  factory Calculator.fromJson(Map<String, dynamic> json) => _$CalculatorFromJson(json);
}

@freezed
class CalculatorInput with _$CalculatorInput {
  const factory CalculatorInput({
    required String id,
    required String label,
    required InputType type, // e.g., 'number', 'enum'
    required String defaultUnit,
    List<String>? units, // For unit conversion
    List<String>? options, // For enum/dropdown inputs
  }) = _CalculatorInput;

  factory CalculatorInput.fromJson(Map<String, dynamic> json) => _$CalculatorInputFromJson(json);
}

@freezed
class CalculatorResult with _$CalculatorResult {
  const factory CalculatorResult({
    required String valueLabel,
    required String unit,
    required String interpretation,
  }) = _CalculatorResult;

  factory CalculatorResult.fromJson(Map<String, dynamic> json) => _$CalculatorResultFromJson(json);
}

enum InputType {
  number,
  choice,
}
