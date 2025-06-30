import 'package:freezed_annotation/freezed_annotation.dart';
import 'package.isar'; // Import Isar

part 'calculator.freezed.dart';
part 'calculator.g.dart';

// --- Annotations for Isar Integration ---
// @Collection: Marks this class as an Isar collection (a database table).
// @Id(): Marks the Isar primary key. We'll use a fast integer hash.
// @Name: Gives the class a specific name in the DB to avoid issues with renaming.
// @Default: Sets a default value for a property.
// @Index: Creates an index on a property for faster queries.

@freezed
@Collection(accessor: 'calculators')
class Calculator with _$Calculator {
  const Calculator._(); // Add private constructor for Isar getters

  const factory Calculator({
    required String id,
    @Index() required String name,
    @Index() required String category,
    required List<CalculatorInput> inputs,
    required CalculatorResult result,
    required String formula,
    required String details,
    @Default(false) bool isFavorite,
  }) = _Calculator;

  // --- Isar Primary Key ---
  // Isar requires an integer Id for its primary key. We create a 'getter'
  // that generates a unique, stable integer from the string 'id'.
  @Id()
  int get isarId => fastHash(id);

  factory Calculator.fromJson(Map<String, dynamic> json) => _$CalculatorFromJson(json);
}

@freezed
@Embedded() // Marks this class to be embedded in another Isar object
class CalculatorInput with _$CalculatorInput {
  const factory CalculatorInput({
    required String id,
    required String label,
    @Enumerated(EnumType.name) required InputType type, // Store enum as string
    required String defaultUnit,
    List<String>? units,
    List<String>? options,
t  }) = _CalculatorInput;

  factory CalculatorInput.fromJson(Map<String, dynamic> json) => _$CalculatorInputFromJson(json);
}

@freezed
@Embedded()
class CalculatorResult with _$CalculatorResult {
  const factory CalculatorResult({
    required String valueLabel,
    required String unit,
    required String interpretation,
  }) = _CalculatorResult;

  factory CalculatorResult.fromJson(Map<String, dynamic> json) => _$CalculatorResultFromJson(json);
}

// Refined Enum for robust JSON parsing and Isar storage
enum InputType {
  @JsonValue('number')
  number,
  @JsonValue('choice')
  choice,
}

// Fowler-Noll-Vo hash function for a fast and consistent string hash
int fastHash(String string) {
  var hash = 0xcbf29ce484222325;
  for (var i = 0; i < string.length; i++) {
    hash ^= string.codeUnitAt(i);
    hash *= 0x100000001b3;
  }
  return hash;
}
