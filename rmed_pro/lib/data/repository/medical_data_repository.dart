import 'dart:convert';
import 'package:flutter/services.dart' show rootBundle;
import 'package:isar/isar.dart';
import 'package:rmed_pro/data/local_db/isar_service.dart';
import 'package:rmed_pro/data/models/calculator.dart';
// import other models...

class MedicalDataRepository {
  final IsarService _isarService;

  MedicalDataRepository(this._isarService);

  Future<void> initializeDatabase() async {
    final isar = await _isarService.db;
    
    // Seed data only if the database is empty
    if (await isar.calculators.count() == 0) {
      await _seedData(isar);
    }
  }

  Future<void> _seedData(Isar isar) async {
    // Load and parse calculators from JSON asset
    final calculatorsJsonString = await rootBundle.loadString('assets/json/calculators.json');
    final List<dynamic> calculatorListJson = json.decode(calculatorsJsonString);
    final calculators = calculatorListJson.map((json) => Calculator.fromJson(json)).toList();

    // TODO: Load other JSON files (abbreviations, etc.)

    // Write to the database in a single transaction
    await isar.writeTxn(() async {
      await isar.calculators.putAll(calculators);
      // await isar.referenceItems.putAll(...);
    });
  }

  // --- Data Access Methods ---

  Future<List<Calculator>> getAllCalculators() async {
    final isar = await _isarService.db;
    return isar.calculators.where().findAll();
  }

  // Add methods for searching, fetching favorites, history, etc.
  Future<List<dynamic>> searchAll(String query) async {
      // Implement Isar full-text search here
      // ...
      return [];
  }
}
