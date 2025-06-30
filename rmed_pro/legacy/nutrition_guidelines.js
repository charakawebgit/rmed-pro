/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export const nutritionGuidelines = [
  {
    id: 'introduction_nutrition',
    title: 'Introduction to Nutritional Principles',
    content: [
      "Diligent attention to patients' nutritional needs can have a major positive impact on medical outcomes. This is particularly true in GI and liver disease. Nutritional management often involves determining estimated caloric and protein needs, assessing nutritional status, and developing a suitable plan.",
      "This guide provides an overview of nutritional principles, assessment, and support based on common clinical knowledge. It is intended for educational and informational purposes only.",
    ],
    subsections: [],
  },
  {
    id: 'basic_nutritional_concepts',
    title: 'Basic Nutritional Concepts',
    content: [
      "Understanding the fundamentals of energy, macronutrients, and micronutrients is essential for proper nutritional management.",
    ],
    subsections: [
      {
        id: 'energy_stores_metabolism',
        title: 'Energy Stores & Metabolism',
        content: [
          "The body's major fuel reserve is triglyceride (TG) in adipose tissue. Glycogen provides a smaller, more readily available energy source.",
          "Total Daily Energy Expenditure (TEE) has three components:",
          {
            type: 'list',
            items: [
              "Resting Energy Expenditure (REE): ~70% of TEE, energy for basic organ function at rest.",
              "Energy Expenditure of Physical Activity: ~20% of TEE, varies greatly.",
              "Thermic Effect of Feeding (TEF): ~10% of TEE, energy cost of nutrient digestion/absorption.",
            ],
          },
          "In acutely ill, hospitalized patients, physical activity energy is often ignored, and TEF is built into predictive equations.",
          "REE can be estimated using formulas (see 'Energy Estimation Formulas' subsection) or measured by indirect calorimetry (gold standard, but not always practical).",
          "Metabolic stress (illness, injury, inflammation) increases REE. Stress factors (see Table 5.5 summary) are applied to predicted REE for acutely ill patients (excluding Mifflin equation for this purpose). PEM or hypocaloric feeding (without illness) can decrease REE by 10-15%.",
          {
            type: 'list',
            title: "Commonly Used Formulas for Resting Energy Expenditure (REE) - (Table 5.3 Summary):",
            items: [
              "Harris-Benedict (kcal/day):",
              "  Men: 66 + (13.7 * W) + (5 * H) - (6.8 * A)",
              "  Women: 665 + (9.6 * W) + (1.8 * H) - (4.7 * A)",
              "Mifflin-St Jeor (kcal/day) - Often preferred for healthy individuals:",
              "  Men: (10 * W) + (6.25 * H) - (5 * A) + 5",
              "  Women: (10 * W) + (6.25 * H) - (5 * A) - 161",
              "WHO Formulas: Age and sex-specific (complex, refer to source for details).",
              "Penn State Equation (for mechanically ventilated patients): TEE = (REE_Mifflin * 0.96) + (Tmax_Celsius * 167) + (Ve_liters * 31) - 6212",
              "(W = weight in kg, H = height in cm, A = age in years, Tmax = max temp in 24h, Ve = minute ventilation)",
            ],
          },
          {
            type: 'list',
            title: "Metabolic Stress Factors for TEE in Hospitalized Patients (Apply to Harris-Benedict or WHO REE) - (Table 5.5 Summary):",
            items: [
              "Uncomplicated postoperative state: 1.1 x REE",
              "Long bone fracture / Peritonitis: 1.2 x REE",
              "Acute pancreatitis: 1.1-1.2 x REE",
              "Severe infections: 1.3-1.4 x REE",
              "Multiple trauma: 1.5-1.7 x REE",
              "Burns (>40% BSA): 1.6-2.0 x REE",
            ],
          },
          {
            type: 'list',
            title: "Simple Weight-Based Energy Estimation for Adult Inpatients:",
            items: [
              "Unstressed/mildly stressed: 20-25 kcal/kg actual body weight (ABW)/day",
              "Moderately stressed: 25-30 kcal/kg ABW/day",
              "Severely stressed: 30-35 kcal/kg ABW/day",
              "For obese patients (>30% above IBW), use Adjusted IBW: IBW + 0.4 * (ABW - IBW). (See IBW in Assessment section).",
            ],
          },
          {
            type: 'list',
            title: "Estimated Energy Requirements Based on BMI for Hospitalized Patients (Table 5.7 Summary):",
            items: [
              "BMI <15 kg/m²: 35-40 kcal/kg/day*",
              "BMI 15-19 kg/m²: 30-35 kcal/kg/day*",
              "BMI 20-29 kg/m²: 20-25 kcal/kg/day*",
              "BMI ≥30 kg/m²: 15-20 kcal/kg/day*",
              "*Lower end of range for insulin-resistant or critically ill. Add 20% to total for non-critically ill obese.",
            ],
          },
        ],
      },
      {
        id: 'proteins_concepts',
        title: 'Proteins',
        content: [
          "Composed of amino acids (AAs); some are essential (cannot be synthesized by the body).",
          "Roles: Structural components, enzymes, hormones, immune factors.",
          "No storage depot for protein; inadequate intake leads to loss of functioning protein.",
          "Requirements (Table 5.8 Summary):",
          {
            type: 'list',
            items: [
              "Normal adult RDA: 0.8 g/kg Ideal Body Weight (IBW)/day.",
              "Metabolic stress: 1.0-1.6 g/kg IBW/day (can be up to 2.0-2.5 g/kg in severe burns/trauma or specific ICU conditions like CRRT).",
              "Hemodialysis: 1.2-1.4 g/kg IBW/day.",
              "Peritoneal dialysis: 1.3-1.5 g/kg IBW/day.",
              "Additional protein needed for losses (burns, protein-losing enteropathy/nephropathy). Lower intake may be needed for renal insufficiency NOT on dialysis, or severe hepatic encephalopathy unresponsive to therapy (modest restriction ~0.6 g/kg/day).",
            ],
          },
          "Nitrogen Balance: Proxy for protein balance. N balance = (N intake) - (N losses). (N intake = Protein intake (g) / 6.25). (N loss ≈ Urinary Urea N (g) + 4g for insensible losses). Positive balance indicates anabolism; negative indicates catabolism.",
        ],
      },
      {
        id: 'carbohydrates_concepts',
        title: 'Carbohydrates',
        content: [
          "Primary dietary digestible forms: starch, sucrose, lactose; yield monosaccharides (glucose, fructose, galactose).",
          "Glucose is a key energy source, especially for brain and blood cells (~150g/day required for these tissues).",
          "No absolute dietary requirement (can be synthesized via gluconeogenesis), but important for protein-sparing and provides fiber.",
        ],
      },
      {
        id: 'lipids_concepts',
        title: 'Lipids (Fats)',
        content: [
          "Includes triglycerides (TGs), sterols, phospholipids.",
          "Roles: Energy source, precursors for hormones/prostaglandins, cell membrane structure, carrier for fat-soluble vitamins.",
          "Essential Fatty Acids (EFAs): Linoleic acid (omega-6) and alpha-linolenic acid (omega-3) must be obtained from diet (at least 2% and 0.5% of daily calories, respectively). EFAD can occur with long-term TPN lacking lipids or severe fat malabsorption, manifesting as rash, alopecia, poor wound healing.",
        ],
      },
      {
        id: 'micronutrients_overview',
        title: 'Micronutrients (Vitamins and Minerals)',
        content: [
          "Required in small amounts for various physiologic functions, enzyme cofactors, etc. Deficiencies common in GI diseases due to malabsorption, poor intake, or increased losses/requirements.",
          "Categorized as Major Minerals, Trace Minerals, and Vitamins (Fat-soluble and Water-soluble).",
        ],
        subsections: [
          {
            id: 'major_minerals',
            title: 'Major Minerals (>100 mg/day requirement) - (Table 5.9 Summary)',
            content: [
              {
                type: 'list',
                items: [
                  "Calcium (1000-1200 mg): Bone health, muscle contraction. Deficiency: metabolic bone disease, tetany. Assess: urinary Ca, DEXA.",
                  "Magnesium (300-400 mg): Enzyme cofactor, nerve/muscle function. Deficiency: weakness, twitching, arrhythmias, hypocalcemia. Assess: serum/urinary Mg.",
                  "Phosphorus (800-1200 mg): Bone health, energy metabolism (ATP). Deficiency: weakness, fatigue, hemolysis, respiratory failure. Assess: plasma phosphorus.",
                  "Potassium (2-5 g): Nerve/muscle function, fluid balance. Deficiency: weakness, paresthesias, arrhythmias. Assess: serum K.",
                  "Sodium (0.5-5 g): Fluid balance, nerve function. Deficiency: hypovolemia, weakness. Assess: urinary Na, clinical evaluation.",
                ],
              },
            ],
          },
          {
            id: 'vitamins_summary',
            title: 'Vitamins - (Table 5.10 Summary)',
            content: [
              "Fat-Soluble Vitamins:",
              {
                type: 'list',
                items: [
                  "Vitamin A (Retinol): Vision, epithelial integrity, immune function. Deficiency: night blindness, xerosis, keratomalacia. RDA: 700µg (F), 900µg (M).",
                  "Vitamin D: Calcium absorption, bone health, immune function. Deficiency: rickets (children), osteomalacia (adults). RDA: 15-20µg (600-800 IU).",
                  "Vitamin E (Tocopherol): Antioxidant. Deficiency (rare): hemolytic anemia, neuropathy. RDA: 15mg.",
                  "Vitamin K: Blood clotting. Deficiency: hemorrhage. RDA: 90µg (F), 120µg (M).",
                ],
              },
              "Water-Soluble Vitamins:",
              {
                type: 'list',
                items: [
                  "Thiamine (B1): Carbohydrate metabolism. Deficiency: beriberi, Wernicke-Korsakoff. RDA: 1.1mg (F), 1.2mg (M).",
                  "Riboflavin (B2): Energy metabolism. Deficiency: cheilosis, glossitis. RDA: 1.1mg (F), 1.3mg (M).",
                  "Niacin (B3): Energy metabolism. Deficiency: pellagra (dermatitis, diarrhea, dementia). RDA: 14mg (F), 16mg (M).",
                  "Pantothenic Acid (B5): Coenzyme A. Deficiency rare. AI: 5mg.",
                  "Pyridoxine (B6): Amino acid metabolism. Deficiency: stomatitis, neuropathy, anemia. RDA: 1.3-1.7mg.",
                  "Biotin (B7): Carboxylation reactions. Deficiency rare. AI: 30µg.",
                  "Folate (B9): DNA synthesis. Deficiency: megaloblastic anemia, neural tube defects. RDA: 400µg DFE.",
                  "Cobalamin (B12): DNA synthesis, nerve function. Deficiency: megaloblastic anemia, neuropathy. RDA: 2.4µg.",
                  "Vitamin C (Ascorbic Acid): Antioxidant, collagen synthesis. Deficiency: scurvy. RDA: 75mg (F), 90mg (M); +35mg for smokers.",
                ],
              },
            ],
          },
          {
            id: 'trace_minerals',
            title: 'Trace Minerals - (Table 5.11 Summary)',
            content: [
              {
                type: 'list',
                items: [
                  "Chromium: Glucose metabolism. Deficiency (rare, in TPN): hyperglycemia. AI: 25µg (F), 35µg (M).",
                  "Copper: Enzyme cofactor, iron metabolism. Deficiency: anemia, neutropenia, neuropathy. RDA: 900µg.",
                  "Fluoride: Dental health. Optimal intake: 3mg (F), 4mg (M).",
                  "Iodine: Thyroid hormone synthesis. Deficiency: goiter, cretinism. RDA: 150µg.",
                  "Iron: Oxygen transport (hemoglobin). Deficiency: microcytic anemia, fatigue. RDA: 18mg (premeno F), 8mg (postmeno F, M).",
                  "Manganese: Enzyme cofactor. Deficiency rare. AI: 1.8mg (F), 2.3mg (M).",
                  "Molybdenum: Enzyme cofactor. Deficiency rare. RDA: 45µg.",
                  "Selenium: Antioxidant, thyroid function. Deficiency: cardiomyopathy (Keshan), myalgia. RDA: 55µg.",
                  "Zinc: Enzyme cofactor, immune function, wound healing. Deficiency: growth retardation, dermatitis, diarrhea, alopecia, dysgeusia. RDA: 8mg (F), 11mg (M).",
                ],
              },
            ],
          },
          {
            id: 'parenteral_micronutrients',
            title: 'Parenteral Micronutrient Administration (Table 5.12 Summary - General Guidelines)',
            content: [
              "Specific commercial multivitamin and trace element preparations are used for TPN.",
              "Fat-Soluble Vitamins (Adult daily): A: 1000µg (3300 IU), D: 5µg (200 IU), E: 10mg (10 IU), K: 1mg.",
              "Water-Soluble Vitamins (Adult daily): C: 100mg, B6: 4mg, B12: 5µg, Biotin: 60µg, Folate: 400µg, Niacin: 40mg, Pantothenic Acid: 15mg, Riboflavin: 3.6mg, Thiamine: 3mg.",
              "Trace Elements (Adult daily): Chromium: 10-15µg, Copper: 0.5-1.5mg, Iron: 1-2mg (often given separately), Manganese: 0.1mg, Molybdenum: 15µg, Selenium: 100µg, Zinc: 2.5-4.0mg. (Iodine often sufficient from contamination).",
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'starvation_metabolism',
    title: 'Metabolic Adaptations to Starvation',
    content: [
      "During fasting/starvation, the body undergoes adaptations to conserve energy and protein.",
      "Short-term (first 24 hours): Glycogen stores used, then shift to fat oxidation. Gluconeogenesis from amino acids (muscle protein) begins to maintain glucose for brain/RBCs.",
      "Several days: Ketogenesis increases significantly. Ketone bodies become major fuel for brain, reducing reliance on glucose and thus sparing muscle protein. REE may decrease.",
      "Long-term (weeks): Body relies almost entirely on adipose tissue. Protein breakdown minimized. Energy expenditure further decreases.",
    ],
  },
  {
    id: 'protein_energy_malnutrition',
    title: 'Protein-Energy Malnutrition (PEM)',
    content: [
      "PEM results from a sustained imbalance between nutrient availability and requirements, leading to altered metabolism, organ function, and body composition.",
    ],
    subsections: [
      {
        id: 'pem_causes_types',
        title: 'Causes and Types of PEM',
        content: [
          "Primary PEM: Due to inadequate intake of protein, calories, or both.",
          "Secondary PEM: Caused by illness or injury that increases nutrient requirements, impairs digestion/absorption, or causes nutrient losses. Common causes:",
          {
            type: 'list',
            items: [
              "Systemic inflammatory response (increases REE and protein catabolism).",
              "GI diseases (malabsorption, obstruction).",
              "Anorexia associated with illness.",
            ],
          },
        ],
      },
      {
        id: 'pem_body_compartments',
        title: 'Body Compartment Changes (Table 5.14 Concepts)',
        content: [
          "Lean body mass (LBM) is critical for health. It includes somatic (muscle) and visceral (organs) protein compartments.",
          "Simple Starvation (Primary PEM): Adipose tissue is primary energy source; fat mass loss is proportionally greater than LBM loss.",
          "Metabolic Stress (Secondary PEM): Muscle mass loss is proportionally greater and can match or exceed fat mass loss. Visceral protein compartment can also contract with sustained stress.",
        ],
      },
      {
        id: 'pem_physiologic_impairments',
        title: 'Physiologic Impairments Caused by PEM',
        content: [
          "PEM adversely affects almost every organ system. Effects are generally reversible with nutritional restitution.",
          {
            type: 'list',
            items: [
              "Gastrointestinal Tract: Mucosal atrophy, reduced enzyme secretion, altered motility, malabsorption. Lack of enteral stimulation exacerbates this.",
              "Cardiovascular System: Reduced cardiac muscle mass, impaired performance (decreased stroke volume, output), bradycardia, hypotension.",
              "Immune System: Blunted T-lymphocyte function, impaired phagocytosis, decreased complement. Increased susceptibility to infection.",
              "Respiratory System: Respiratory muscle atrophy, reduced vital capacity, blunted ventilatory drive.",
              "Endocrine System: Adaptive changes (e.g., decreased insulin, increased growth hormone, altered thyroid hormones) to conserve energy and protein.",
              "Wound Healing: Impaired collagen synthesis and overall healing.",
              "Skin and Hair: Dry, thin, wrinkled skin; hair becomes thin, sparse, easily pulled out; changes in pigmentation.",
              "Kidneys: Reduced renal mass and GFR in severe malnutrition; impaired ability to concentrate urine and excrete acid/sodium.",
              "Bone Marrow: Suppressed red and white blood cell production (anemia, leukopenia, lymphocytopenia).",
            ],
          },
        ],
      },
      {
        id: 'pem_children_brief',
        title: 'PEM in Children (Brief Overview - Tables 5.16, 5.17 Concepts)',
        content: [
          "Undernutrition in children affects growth and development. Classification often uses Waterlow criteria (weight-for-height for 'wasting', height-for-age for 'stunting').",
          "Kwashiorkor: Characterized by edema, skin/hair changes, often precipitated by stress/infection on underlying malnutrition. Visceral protein depletion (low albumin) is common.",
          "Marasmus: Severe wasting of fat and muscle, 'wizened' appearance. Visceral proteins relatively spared.",
          "Nutritional Dwarfism: Stunted growth, delayed sexual development. May have normal weight-for-height.",
        ],
      },
    ],
  },
  {
    id: 'nutritional_assessment',
    title: 'Nutritional Assessment Techniques',
    content: [
      "The purpose is to identify PEM and other nutritional deficits, even if subtle. A comprehensive assessment includes history, physical exam, anthropometrics, and lab tests.",
    ],
    subsections: [
      {
        id: 'assessment_history',
        title: 'Clinical History',
        content: [
          {
            type: 'list',
            items: [
              "Weight Loss: Quantify unintentional weight loss over time (e.g., % loss in 1, 3, 6 months). >10% unintentional loss in 6 months is severe.",
              "Food Intake: Changes in habitual diet (pattern, quantity, quality), appetite, reasons for altered intake (GI symptoms, mental status, ability to prepare/eat).",
              "Evidence of Malabsorption: Steatorrhea, diarrhea, specific nutrient deficiency symptoms.",
              "Functional Status: Ability to perform daily activities related to food procurement and consumption.",
              "Influence of Disease: Underlying illness increasing needs or losses.",
              "Medications: Review for drug-nutrient interactions (see Table 5.13 below).",
            ],
          },
        ],
      },
      {
        id: 'assessment_physical_exam',
        title: 'Physical Examination',
        content: [
          {
            type: 'list',
            items: [
              "Hydration Status: Signs of dehydration (hypotension, tachycardia, dry mucosa) or fluid overload (edema, ascites).",
              "Tissue Depletion: Loss of subcutaneous fat (loose skin folds, prominent bones), muscle wasting (temporal, interosseous, quadriceps).",
              "Muscle Function: General strength, respiratory muscle function (spirometry).",
              "Specific Nutrient Deficiencies: Look for signs related to vitamin/mineral deficiencies (e.g., skin changes, glossitis, koilonychia, neuropathy - refer to micronutrient tables).",
            ],
          },
        ],
      },
      {
        id: 'assessment_anthropometry',
        title: 'Anthropometry',
        content: [
          "Weight for Height & BMI: Compare patient's weight to standards or calculate BMI.",
          "Body Mass Index (BMI = kg/m²) - (Table 5.18 Classification):",
          {
            type: 'list',
            items: [
              "<16.0: Severely malnourished",
              "16.0-16.9: Moderately malnourished",
              "17.0-18.4: Mildly malnourished",
              "18.5-24.9: Normal",
              "25.0-29.9: Overweight",
              "30.0-34.9: Obese (class I)",
              "35.0-39.9: Obese (class II)",
              "≥40: Obese (class III)",
            ],
          },
          "Ideal Body Weight (IBW) - (e.g., Metropolitan Life Tables - Table 5.6 or Devine formula from Calculators section). Generally, <85% of IBW suggests significant PEM.",
          "Skinfold Thickness (e.g., triceps, subscapular) and Mid-Arm Muscle Circumference (MAMC) / Area (Table 5.20): Estimate subcutaneous fat and muscle mass. Useful for serial measurements. Requires training for accuracy.",
        ],
      },
      {
        id: 'assessment_functional',
        title: 'Functional Measures',
        content: [
          "Hand Grip Strength (Dynamometry): Correlates with total body protein and can predict outcomes in surgical patients. Less than 85% of age/sex standards is significant.",
        ],
      },
      {
        id: 'assessment_biochemical',
        title: 'Biochemical Measures',
        content: [
          "Serum Proteins (Table 5.21 - Synthesized in Liver):",
          {
            type: 'list',
            items: [
              "Albumin (half-life 14-20 days, normal 3.5-5.0 g/dL): Low levels suggest PEM in absence of illness, but is a negative acute-phase reactant (levels drop in inflammation/illness irrespective of nutritional status). Influenced by hydration, liver disease.",
              "Prealbumin (Transthyretin) (half-life 2-3 days, normal 0.2-0.5 g/L or 20-50 mg/dL): More sensitive to acute changes in nutritional status than albumin. Also a negative acute-phase reactant. Affected by renal disease, steroids.",
              "Transferrin (half-life 8-9 days): Influenced by iron status.",
              "Retinol-Binding Protein (RBP) (half-life 0.5 days): Very short half-life. Affected by vitamin A status, renal disease.",
            ],
          },
          "Creatinine-Height Index (CHI) - (Table 5.22 Norms): 24-hour urinary creatinine excretion corrected for height, reflects skeletal muscle mass. Values >20% below normal indicate moderate-severe PEM. Requires complete urine collection and normal renal function.",
        ],
      },
      {
        id: 'assessment_screening_tools',
        title: 'Rapid Screening Tools',
        content: [
          "Subjective Global Assessment (SGA) (Box 5.1 Concept): Uses history and physical exam to categorize patients as A (well-nourished), B (mild/moderate malnutrition), or C (severe malnutrition). Validated predictor of outcomes.",
          "Mini-Nutritional Assessment (MNA): For geriatric populations, combines history, exam, anthropometrics.",
        ],
      },
    ],
  },
  {
    id: 'nutritional_support_hospitalized',
    title: 'Nutritional Support in Hospitalized Patients',
    content: [
      "Aggressive nutritional support (using means necessary to meet patient's needs) can benefit specific patient populations.",
    ],
    subsections: [
      {
        id: 'support_general_principles',
        title: 'General Principles',
        content: [
          "Indications: Moderate-to-severe malnutrition, or well-nourished/mildly malnourished patients unlikely to meet >80% of needs orally for >7-10 days.",
          "Goals: Correct deficits, maintain LBM, support physiologic functions, improve outcomes.",
          "Enteral Nutrition (EN) is preferred over Parenteral Nutrition (PN) if GI tract is functional.",
        ],
      },
      {
        id: 'support_major_surgery',
        title: 'Malnourished Patients Undergoing Major Surgery',
        content: [
          "Preoperative nutritional support (typically 7-14 days if severe malnutrition) can reduce postoperative complications. Both EN and PN can be beneficial.",
        ],
      },
      {
        id: 'support_liver_disease',
        title: 'Patients with Decompensated Alcohol-Associated Liver Disease',
        content: [
          "PEM is highly prevalent. Assume malnutrition. Prompt EN or PN can improve morbidity, mortality, and recovery speed. Protein restriction generally not indicated unless refractory encephalopathy.",
          "Provide adequate calories (25-35 kcal/kg/day) and protein (1.2-1.5 g/kg/day).",
          "Frequent small meals + bedtime snack to prevent overnight catabolism.",
          "Micronutrient deficiencies (thiamine, folate, zinc, fat-soluble vitamins) are common and require repletion.",
        ],
      },
      {
        id: 'support_radiation_therapy',
        title: 'Patients Undergoing Radiation Therapy (especially Head/Neck, Esophageal Cancers)',
        content: [
          "Prophylactic PEG tube placement and supplemental tube feedings can prevent further nutritional deterioration and improve quality of life. May help maintain treatment schedules.",
        ],
      },
      {
        id: 'support_icu_detailed',
        title: 'ICU Nutrition Support (Detailed)',
        content: [
          "This section integrates prior detailed ICU nutrition information, focusing on early EN, indications for PN, specific energy/protein targets, micronutrient considerations, formula choices, monitoring, and management of common challenges in the critically ill.",
          "Key Principles (reiteration from previous more detailed section):",
          {
            type: 'list',
            items: [
              "Goals: Attenuate metabolic stress, prevent oxidative injury, modulate immune response, maintain gut integrity.",
              "Early Enteral Nutrition (EEN): Within 24-48h if hemodynamically stable. Start trophic, advance as tolerated.",
              "Parenteral Nutrition (PN): If EN contraindicated or target not met in 7-10 days (earlier if high-risk).",
              "Energy: 25-30 kcal/kg actual body weight (non-obese). Obese: 11-14 kcal/kg actual (BMI 30-50) or 22-25 kcal/kg IBW (BMI >50). Indirect calorimetry is gold standard.",
              "Protein: 1.2-2.0 g/kg actual body weight (higher in burns, trauma, CRRT). Obese: 2.0 g/kg IBW (BMI 30-40), up to 2.5 g/kg IBW (BMI ≥40).",
              "Avoid overfeeding (hyperglycemia, hypertriglyceridemia, increased CO2).",
              "Hypocaloric, high-protein feeding (permissive underfeeding) may be beneficial initially, especially in obese patients.",
              "Micronutrients: Thiamine (refeeding risk), antioxidants (Vitamin C, E, Se, Zn) - follow specific guidelines.",
              "Monitoring EN: GRV de-emphasized, focus on clinical signs. HOB elevation.",
              "Monitoring PN: Glucose, electrolytes, LFTs, triglycerides. Prevent CRBSI.",
              "Refeeding Syndrome: Identify risk, start slow, supplement thiamine, monitor/replete electrolytes (K, Phos, Mg).",
              "Nutrition in specific states (Sepsis, ARDS, AKI/CRRT, Liver Failure) requires tailored approaches.",
            ],
          },
          "Refer to ASPEN/ESPEN/SCCM guidelines for comprehensive, up-to-date recommendations.",
        ],
      },
    ],
  },
  {
    id: 'factors_affecting_micronutrients',
    title: 'Factors Affecting Micronutrient Requirements',
    content: [],
    subsections: [
      {
        id: 'factors_age',
        title: 'Age',
        content: [
          "Elderly: Increased risk for deficiencies (e.g., Vitamin B12 due to atrophic gastritis, Vitamin D, Calcium). RDAs for some nutrients are higher in older adults.",
        ],
      },
      {
        id: 'factors_malabsorption',
        title: 'Malabsorption and Maldigestion',
        content: [
          "Diffuse mucosal diseases (e.g., Celiac, Crohn's), pancreatic insufficiency, cholestasis, SIBO, or extensive ileal resection can impair absorption of both fat-soluble (A, D, E, K) and water-soluble vitamins, as well as minerals.",
          "Vitamin B12 malabsorption: Common with ileal disease/resection, atrophic gastritis, PPI use, pancreatic insufficiency.",
        ],
      },
      {
        id: 'factors_medications',
        title: 'Medications (Drug-Nutrient Interactions - Table 5.13 Summary)',
        content: [
          {
            type: 'list',
            items: [
              "Cholestyramine: Decreases absorption of Vitamin D, folate.",
              "Dextroamphetamine/Fenfluramine/Levodopa: Can induce anorexia, potentially affecting all micronutrients.",
              "Isoniazid: Impairs Vitamin B6 uptake/metabolism.",
              "NSAIDs: Can cause GI blood loss, leading to iron deficiency.",
              "Penicillamine: Increases renal excretion of zinc.",
              "PPIs/H2RAs: Decrease gastric acid, can impair Vitamin B12 absorption (from food) and potentially iron/calcium.",
              "Sulfasalazine: Impairs folate absorption and inhibits folate-dependent enzymes.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'special_diets_overview',
    title: 'Overview of Common Therapeutic Diets',
    content: [
      "Special diets are often prescribed to manage specific GI conditions or prepare for procedures.",
      {
        type: 'list',
        items: [
          "Clear Liquid Diet: Provides fluids, electrolytes, and some energy in a form that leaves minimal residue. Used short-term (e.g., pre/post-op). Examples: Broth, clear juices, gelatin, tea. Nutritionally inadequate long-term.",
          "Full Liquid Diet: Includes foods liquid at room temperature. Used as a transition. Examples: Milk, cream soups, ice cream, custards. Can be high in simple carbs; caution in diabetes.",
          "Low-Fiber / Low-Residue Diet: Reduces stool bulk and frequency. Used for GI strictures, gastroparesis, pre-procedure bowel prep. Emphasizes refined grains, well-cooked vegetables without skins/seeds, tender meats.",
          "High-Fiber Diet: Increases stool bulk, promotes regularity. Used for diverticulosis, constipation, IBS. Emphasizes whole grains, fruits, vegetables, legumes. Minimum 25-35g/day.",
          "Post-Gastrectomy / Anti-Dumping Diet: Small, frequent meals, high protein/fat, low simple carbohydrates. Liquids separate from solids. To manage dumping syndrome.",
          "Low-Fat Diet: Reduces fat intake to manage malabsorption, steatorrhea (e.g., pancreatic insufficiency, biliary disease). May require fat-soluble vitamin supplementation. MCT oil can be a supplemental calorie source.",
        ],
      },
    ],
  },
  {
    id: 'final_disclaimer_nutrition',
    title: 'Important Disclaimer',
    content: [
      "The information in this Nutrition & Diet Guide is for educational and informational purposes only. It is not intended as a substitute for professional medical advice, diagnosis, or treatment provided by a qualified healthcare professional or registered dietitian.",
      "Nutritional needs are highly individual and depend on specific medical conditions, metabolic state, medications, and other factors. Always consult with appropriate healthcare providers for personalized nutritional plans and management.",
    ],
  },
];
