/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export const normalLabValues = [
  {
    "id": "lab_15anhydroglucitol",
    "testName": "1,5-Anhydroglucitol",
    "shortName": "1,5-AG",
    "category": "Metabolic",
    "unit": "μg/mL",
    "description": "A marker for short-term glycemic control, reflecting glucose levels over the prior 1-2 weeks. Lower levels indicate poorer control.",
    "normal": {
      "low": 8.75,
      "high": 30.65
    },
    "critical": {
      "low": null,
      "high": null
    },
    "notes": "Reference range varies by sex (Female: 6.8-29.3, Male: 10.7-32.0)."
  },
  {
    "id": "lab_17_hydroxycorticosteroids",
    "testName": "17-Hydroxycorticosteroids, Urine",
    "shortName": "17-OHCS",
    "category": "Endocrinology",
    "unit": "mg/24 hr",
    "description": "Metabolites of corticosteroids measured in urine to assess adrenal function, particularly cortisol production.",
    "normal": {
      "low": 2.5,
      "high": 9
    },
    "critical": {
      "low": null,
      "high": null
    },
    "notes": "Range varies by sex (Female: 2-8, Male: 3-10). Largely replaced by more specific plasma/salivary cortisol tests."
  },
  {
    "id": "lab_17_hydroxyprogesterone",
    "testName": "17-Hydroxyprogesterone, Serum",
    "shortName": "17-OHP",
    "category": "Endocrinology",
    "unit": "ng/dL",
    "description": "A steroid hormone used to screen for and monitor congenital adrenal hyperplasia (CAH).",
    "normal": {
      "low": null,
      "high": 285
    },
    "critical": {
      "low": null,
      "high": null
    },
    "notes": "Levels vary by sex and menstrual phase. Follicular: <80, Luteal: <285, Postmenopausal: <51, Adult Male: <220."
  },
  {
    "id": "lab_5hiaa",
    "testName": "5-Hydroxyindoleacetic acid, Urine",
    "shortName": "5-HIAA",
    "category": "Oncology",
    "unit": "mg/24 hr",
    "description": "The main metabolite of serotonin. Used to diagnose and monitor carcinoid tumors.",
    "normal": {
      "low": 2,
      "high": 9
    },
    "critical": {
      "low": null,
      "high": null
    },
    "notes": "Certain foods and medications can interfere with results."
  },
  {
    "id": "lab_5_nucleotidase",
    "testName": "5'-Nucleotidase, Serum",
    "shortName": "5'-NT",
    "category": "Liver Function",
    "unit": "U/L",
    "description": "An enzyme specific to the liver. Used to determine if an elevated Alkaline Phosphatase (ALP) is from the liver or bone.",
    "normal": {
      "low": 0,
      "high": 15
    },
    "critical": {
      "low": null,
      "high": null
    },
    "notes": "If both ALP and 5'-NT are high, liver pathology is likely."
  },
  {
    "id": "lab_absolute_neutrophil_count",
    "testName": "Absolute Neutrophil Count",
    "shortName": "ANC",
    "category": "Hematology",
    "unit": "/μL",
    "description": "The actual number of neutrophils, a type of white blood cell crucial for fighting infection, especially bacteria.",
    "normal": {
      "low": 2000,
      "high": 8250
    },
    "critical": {
      "low": 500,
      "high": null
    },
    "notes": "An ANC below 500 indicates severe neutropenia and a high risk of infection."
  },
  {
    "id": "lab_acth",
    "testName": "Adrenocorticotropic Hormone",
    "shortName": "ACTH",
    "category": "Endocrinology",
    "unit": "pg/mL",
    "description": "A hormone from the pituitary gland that stimulates the adrenal glands to produce cortisol.",
    "normal": {
      "low": 10,
      "high": 60
    },
    "critical": {
      "low": null,
      "high": null
    },
    "notes": "Used to diagnose pituitary and adrenal disorders like Cushing's syndrome and Addison's disease."
  },
  {
    "id": "lab_aptt",
    "testName": "Activated Partial Thromboplastin Time",
    "shortName": "aPTT",
    "category": "Coagulation",
    "unit": "seconds",
    "description": "Measures the time it takes for blood to clot, evaluating the intrinsic and common coagulation pathways.",
    "normal": {
      "low": 25,
      "high": 35
    },
    "critical": {
      "low": null,
      "high": 70
    },
    "notes": "Commonly used to monitor heparin therapy."
  },
  {
    "id": "lab_albumin",
    "testName": "Albumin, Serum",
    "shortName": "Alb",
    "category": "Liver Function",
    "unit": "g/dL",
    "description": "The most abundant protein in the blood, made by the liver. It helps maintain oncotic pressure and transports various substances.",
    "normal": {
      "low": 3.5,
      "high": 5.5
    },
    "critical": {
      "low": 1.5,
      "high": null
    },
    "notes": "Low levels can indicate liver disease, kidney disease (nephrotic syndrome), or malnutrition."
  },
  {
    "id": "lab_aldosterone",
    "testName": "Aldosterone, Plasma",
    "shortName": "Aldo",
    "category": "Endocrinology",
    "unit": "ng/dL",
    "description": "A hormone from the adrenal glands that regulates salt and water balance, affecting blood pressure.",
    "normal": {
      "low": null,
      "high": 21
    },
    "critical": {
      "low": null,
      "high": null
    },
    "notes": "Levels vary with posture (Supine: ≤10, Standing: <21). Used to diagnose primary aldosteronism."
  },
  {
    "id": "lab_alp",
    "testName": "Alkaline Phosphatase",
    "shortName": "ALP",
    "category": "Liver Function",
    "unit": "U/L",
    "description": "An enzyme found in the liver, bile ducts, and bone. Elevated levels can indicate liver disease or bone disorders.",
    "normal": {
      "low": 30,
      "high": 120
    },
    "critical": {
      "low": null,
      "high": null
    },
    "notes": "Significantly high levels often point towards cholestatic liver disease or Paget's disease of bone."
  },
  {
    "id": "lab_alt",
    "testName": "Alanine Aminotransferase",
    "shortName": "ALT/SGPT",
    "category": "Liver Function",
    "unit": "U/L",
    "description": "An enzyme found mostly in the liver. A more specific marker of liver injury than AST.",
    "normal": {
      "low": 10,
      "high": 40
    },
    "critical": {
      "low": null,
      "high": null
    },
    "notes": "Formerly known as SGPT. The AST/ALT ratio can help determine the cause of liver damage."
  },
  {
    "id": "lab_ammonia",
    "testName": "Ammonia, Plasma",
    "shortName": "Ammonia",
    "category": "Metabolic",
    "unit": "µg/dL",
    "description": "A waste product from protein digestion, converted to urea by the liver. High levels are toxic, especially to the brain.",
    "normal": {
      "low": 40,
      "high": 70
    },
    "critical": {
      "low": null,
      "high": null
    },
    "notes": "Elevated levels are seen in severe liver disease (hepatic encephalopathy) and certain metabolic disorders."
  },
  {
    "id": "lab_amylase",
    "testName": "Amylase, Serum",
    "shortName": "Amylase",
    "category": "Pancreatic Function",
    "unit": "U/L",
    "description": "An enzyme produced by the pancreas and salivary glands that helps digest carbohydrates.",
    "normal": {
      "low": 25,
      "high": 125
    },
    "critical": {
      "low": null,
      "high": null
    },
    "notes": "Elevated levels are a key indicator of acute pancreatitis."
  },
  {
    "id": "lab_anion_gap",
    "testName": "Anion Gap",
    "shortName": "AG",
    "category": "Metabolic",
    "unit": "mEq/L",
    "description": "A calculated value from an electrolyte panel, used to help differentiate causes of metabolic acidosis.",
    "normal": {
      "low": 7,
      "high": 13
    },
    "critical": {
      "low": null,
      "high": null
    },
    "notes": "Calculated as: Na+ - (Cl- + HCO3-). A high anion gap suggests certain types of metabolic acidosis (e.g., DKA, lactic acidosis)."
  },
  {
    "id": "lab_ast",
    "testName": "Aspartate Aminotransferase",
    "shortName": "AST/SGOT",
    "category": "Liver Function",
    "unit": "U/L",
    "description": "An enzyme found in the liver, heart, and other muscles. Released into the blood when these tissues are damaged.",
    "normal": {
      "low": 10,
      "high": 40
    },
    "critical": {
      "low": null,
      "high": null
    },
    "notes": "Formerly known as SGOT. High levels are a marker of hepatocellular injury."
  },
  {
    "id": "lab_bicarbonate",
    "testName": "Bicarbonate",
    "shortName": "HCO3-",
    "category": "Electrolytes",
    "unit": "mEq/L",
    "description": "A key component of the body's acid-base buffering system, managed by the kidneys and lungs.",
    "normal": {
      "low": 23,
      "high": 28
    },
    "critical": {
      "low": 10,
      "high": 40
    },
    "notes": "Often measured as 'Total CO2' (range 23-30). Critical for assessing metabolic acidosis or alkalosis."
  },
  {
    "id": "lab_total_bilirubin",
    "testName": "Total Bilirubin",
    "shortName": "T. Bili",
    "category": "Liver Function",
    "unit": "mg/dL",
    "description": "A yellowish pigment made during the normal breakdown of red blood cells. It passes through the liver and is eventually excreted.",
    "normal": {
      "low": 0.3,
      "high": 1.0
    },
    "critical": {
      "low": null,
      "high": 15.0
    },
    "notes": "High levels (jaundice) can indicate liver damage, bile duct obstruction, or hemolysis."
  },
  {
    "id": "lab_bun",
    "testName": "Blood Urea Nitrogen",
    "shortName": "BUN",
    "category": "Renal Function",
    "unit": "mg/dL",
    "description": "A waste product formed in the liver and excreted by the kidneys. It is a primary indicator of kidney function.",
    "normal": {
      "low": 8,
      "high": 20
    },
    "critical": {
      "low": null,
      "high": 100
    },
    "notes": "High values can indicate kidney injury or dehydration. The BUN-to-creatinine ratio is also a key diagnostic marker."
  },
  {
    "id": "lab_calcium",
    "testName": "Calcium, Serum",
    "shortName": "Ca",
    "category": "Metabolic",
    "unit": "mg/dL",
    "description": "Essential for bone health, blood clotting, muscle contraction, and nerve function.",
    "normal": {
      "low": 8.6,
      "high": 10.2
    },
    "critical": {
      "low": 6.0,
      "high": 13.0
    },
    "notes": "This represents total calcium. Levels are regulated by parathyroid hormone (PTH) and vitamin D."
  },
  {
    "id": "lab_chloride",
    "testName": "Chloride",
    "shortName": "Cl-",
    "category": "Electrolytes",
    "unit": "mEq/L",
    "description": "Helps maintain fluid balance, blood volume, blood pressure, and body fluid pH.",
    "normal": {
      "low": 98,
      "high": 106
    },
    "critical": {
      "low": 80,
      "high": 115
    },
    "notes": "Abnormal levels often point to a problem with acid-base balance or hydration."
  },
  {
    "id": "lab_total_cholesterol",
    "testName": "Cholesterol, Total",
    "shortName": "Chol",
    "category": "Lipids",
    "unit": "mg/dL",
    "description": "A measure of all the cholesterol in your blood, including LDL and HDL.",
    "normal": {
      "low": null,
      "high": 200
    },
    "critical": {
      "low": null,
      "high": null
    },
    "notes": "Desirable: <200 mg/dL. Borderline-high: 200-239 mg/dL. High: >239 mg/dL."
  },
  {
    "id": "lab_cortisol",
    "testName": "Cortisol, Plasma (8 AM)",
    "shortName": "Cortisol",
    "category": "Endocrinology",
    "unit": "µg/dL",
    "description": "A steroid hormone produced by the adrenal glands, often called the 'stress hormone'.",
    "normal": {
      "low": 5,
      "high": 25
    },
    "critical": {
      "low": null,
      "high": null
    },
    "notes": "Levels follow a diurnal rhythm, highest in the morning (8 AM) and lowest around midnight. An overnight suppression test (<1.8) is used to screen for Cushing's syndrome."
  },
  {
    "id": "lab_crp",
    "testName": "C-Reactive Protein",
    "shortName": "CRP",
    "category": "Inflammatory Markers",
    "unit": "mg/dL",
    "description": "A protein made by the liver that is a marker of inflammation in the body.",
    "normal": {
      "low": null,
      "high": 0.8
    },
    "critical": {
      "low": null,
      "high": null
    },
    "notes": "High-sensitivity CRP (hs-CRP) is used for cardiovascular risk assessment (<1.0 Low, 1.0-3.0 Average, >3.0 High risk)."
  },
  {
    "id": "lab_creatine_kinase",
    "testName": "Creatine Kinase, Serum",
    "shortName": "CK / CPK",
    "category": "Enzymes",
    "unit": "U/L",
    "description": "An enzyme found in the heart, brain, and skeletal muscle. Released into the blood when there is muscle damage.",
    "normal": {
      "low": 42.5,
      "high": 152.5
    },
    "critical": {
      "low": null,
      "high": null
    },
    "notes": "Range varies by sex (Female: 30-135, Male: 55-170). The MB isoenzyme (<5%) is specific for heart muscle damage (myocardial infarction)."
  },
  {
    "id": "lab_creatinine",
    "testName": "Creatinine, Serum",
    "shortName": "Cr",
    "category": "Renal Function",
    "unit": "mg/dL",
    "description": "A waste product from muscle metabolism that is filtered by the kidneys. It is a more specific indicator of kidney function than BUN.",
    "normal": {
      "low": 0.6,
      "high": 1.2
    },
    "critical": {
      "low": null,
      "high": 7.4
    },
    "notes": "Reference range varies by sex (Female: 0.50-1.10, Male: 0.70-1.30). A high value indicates impaired kidney function."
  },
  {
    "id": "lab_d_dimer",
    "testName": "D-dimer",
    "shortName": "D-dimer",
    "category": "Coagulation",
    "unit": "μg/mL",
    "description": "A protein fragment produced when a blood clot dissolves. Used to help rule out the presence of a serious blood clot (thrombosis).",
    "normal": {
      "low": null,
      "high": 0.5
    },
    "critical": {
      "low": null,
      "high": null
    },
    "notes": "A negative result makes a clot unlikely, but a positive result can be due to many conditions and requires further investigation."
  },
  {
    "id": "lab_ferritin",
    "testName": "Ferritin, Serum",
    "shortName": "Ferritin",
    "category": "Hematology",
    "unit": "ng/mL",
    "description": "A blood protein that contains iron. It reflects the body's total iron stores.",
    "normal": {
      "low": 24,
      "high": 321.5
    },
    "critical": {
      "low": null,
      "high": null
    },
    "notes": "Range varies by sex (Female: 24-307, Male: 24-336). Low levels indicate iron deficiency. It is also an acute-phase reactant and can be elevated in inflammation."
  },
  {
    "id": "lab_fibrinogen",
    "testName": "Fibrinogen",
    "shortName": "Factor I",
    "category": "Coagulation",
    "unit": "mg/dL",
    "description": "A protein produced by the liver that is converted into fibrin to form a blood clot.",
    "normal": {
      "low": 200,
      "high": 400
    },
    "critical": {
      "low": 100,
      "high": null
    },
    "notes": "Also known as Coagulation Factor I."
  },
  {
    "id": "lab_folate",
    "testName": "Folate, Serum",
    "shortName": "Folic Acid",
    "category": "Vitamins",
    "unit": "ng/mL",
    "description": "A B-vitamin essential for red blood cell formation and for healthy cell growth and function.",
    "normal": {
      "low": 1.8,
      "high": 9.0
    },
    "critical": {
      "low": null,
      "high": null
    },
    "notes": "Deficiency can cause megaloblastic anemia."
  },
  {
    "id": "lab_fsh",
    "testName": "Follicle-Stimulating Hormone",
    "shortName": "FSH",
    "category": "Endocrinology",
    "unit": "mIU/mL",
    "description": "A pituitary hormone that is crucial for pubertal development and the function of the ovaries and testes.",
    "normal": {
      "low": 1,
      "high": 30
    },
    "critical": {
      "low": null,
      "high": null
    },
    "notes": "Levels vary by sex, age, and menstrual cycle. Postmenopausal female range is >30 mIU/mL."
  },
  {
    "id": "lab_glucose",
    "testName": "Glucose, Plasma (Fasting)",
    "shortName": "Glu",
    "category": "Metabolic",
    "unit": "mg/dL",
    "description": "The main source of energy for the body's cells. Levels are regulated by insulin.",
    "normal": {
      "low": 70,
      "high": 99
    },
    "critical": {
      "low": 50,
      "high": 400
    },
    "notes": "This is a fasting range. Used to diagnose and monitor diabetes mellitus."
  },
  {
    "id": "lab_ggt",
    "testName": "Gamma-Glutamyltransferase",
    "shortName": "GGT",
    "category": "Liver Function",
    "unit": "U/L",
    "description": "An enzyme found in many organs, but primarily the liver. Elevated levels are sensitive for cholestatic disease and alcohol-induced liver damage.",
    "normal": {
      "low": 8.5,
      "high": 45
    },
    "critical": {
      "low": null,
      "high": null
    },
    "notes": "Range varies by sex (Female: 8-40, Male: 9-50)."
  },
  {
    "id": "lab_hgba1c",
    "testName": "Hemoglobin A1c",
    "shortName": "HbA1c",
    "category": "Metabolic",
    "unit": "%",
    "description": "Measures the average blood glucose level over the past 2-3 months by assessing the percentage of glycated hemoglobin.",
    "normal": {
      "low": 4.0,
      "high": 5.6
    },
    "critical": {
      "low": null,
      "high": null
    },
    "notes": "Key diagnostic and monitoring tool for diabetes. Prediabetes: 5.7%-6.4%. Diabetes: ≥6.5%."
  },
  {
    "id": "lab_hdl_cholesterol",
    "testName": "High-Density Lipoprotein Cholesterol",
    "shortName": "HDL",
    "category": "Lipids",
    "unit": "mg/dL",
    "description": "Often called 'good' cholesterol, it helps remove excess cholesterol from the body.",
    "normal": {
      "low": 45,
      "high": null
    },
    "critical": {
      "low": null,
      "high": null
    },
    "notes": "Optimal levels are higher. Low levels are a risk factor for heart disease (Female: <50, Male: <40)."
  },
  {
    "id": "lab_hemoglobin",
    "testName": "Hemoglobin",
    "shortName": "Hgb",
    "category": "Hematology",
    "unit": "g/dL",
    "description": "The protein in red blood cells that carries oxygen from the lungs to the body's tissues.",
    "normal": {
      "low": 13.0,
      "high": 17.0
    },
    "critical": {
      "low": 7.0,
      "high": 20.0
    },
    "notes": "Reference range varies by sex (Female: 12-16, Male: 14-18). Low levels define anemia."
  },
  {
    "id": "lab_hematocrit",
    "testName": "Hematocrit",
    "shortName": "Hct",
    "category": "Hematology",
    "unit": "%",
    "description": "The percentage of blood volume occupied by red blood cells.",
    "normal": {
      "low": 39.5,
      "high": 48.5
    },
    "critical": {
      "low": 20,
      "high": 60
    },
    "notes": "Reference range varies by sex (Female: 37%-47%, Male: 42%-50%). Generally about 3 times the hemoglobin value."
  },
  {
    "id": "lab_homocysteine",
    "testName": "Homocysteine, Plasma",
    "shortName": "Homocysteine",
    "category": "Cardiovascular",
    "unit": "µmol/L",
    "description": "An amino acid in the blood. Elevated levels are linked to an increased risk of cardiovascular disease.",
    "normal": {
      "low": 5,
      "high": 15
    },
    "critical": {
      "low": null,
      "high": null
    },
    "notes": "Levels can be lowered with B-vitamin supplementation (folate, B6, B12)."
  },
  {
    "id": "lab_igf1",
    "testName": "Insulin-like Growth Factor 1",
    "shortName": "IGF-1",
    "category": "Endocrinology",
    "unit": "ng/mL",
    "description": "A hormone that mediates the effects of growth hormone (GH). Used to diagnose GH deficiency and acromegaly.",
    "normal": {
      "low": 71,
      "high": 780
    },
    "critical": {
      "low": null,
      "high": null
    },
    "notes": "Levels vary significantly with age. (e.g., Ages 16-24: 182-780, Ages 55+: 71-290)."
  },
  {
    "id": "lab_inr",
    "testName": "International Normalized Ratio",
    "shortName": "INR",
    "category": "Coagulation",
    "unit": "ratio",
    "description": "A standardized calculation based on PT results, used to monitor the effectiveness of anticoagulant medications like warfarin.",
    "normal": {
      "low": 0.8,
      "high": 1.1
    },
    "critical": {
      "low": null,
      "high": 5.0
    },
    "notes": "In healthy people. Therapeutic range on warfarin is typically 2.0-3.0."
  },
  {
    "id": "lab_iron",
    "testName": "Iron, Serum",
    "shortName": "Fe",
    "category": "Hematology",
    "unit": "µg/dL",
    "description": "Measures the amount of circulating iron that is bound to transferrin.",
    "normal": {
      "low": 50,
      "high": 150
    },
    "critical": {
      "low": null,
      "high": null
    },
    "notes": "Levels fluctuate during the day and are just one part of an iron panel."
  },
  {
    "id": "lab_tibc",
    "testName": "Iron-Binding Capacity, Total",
    "shortName": "TIBC",
    "category": "Hematology",
    "unit": "µg/dL",
    "description": "A measure of the blood's capacity to bind iron with transferrin.",
    "normal": {
      "low": 250,
      "high": 310
    },
    "critical": {
      "low": null,
      "high": null
    },
    "notes": "High TIBC often suggests iron deficiency."
  },
  {
    "id": "lab_lactate",
    "testName": "Lactate, Arterial Blood",
    "shortName": "Lactate",
    "category": "Metabolic",
    "unit": "mmol/L",
    "description": "A product of anaerobic cellular metabolism. High levels indicate tissue hypoperfusion or hypoxia.",
    "normal": {
      "low": null,
      "high": 1.3
    },
    "critical": {
      "low": null,
      "high": 4.0
    },
    "notes": "A key marker in sepsis and shock states. Venous lactate range is 0.7-2.1 mmol/L."
  },
  {
    "id": "lab_ldh",
    "testName": "Lactate Dehydrogenase",
    "shortName": "LDH",
    "category": "Enzymes",
    "unit": "U/L",
    "description": "An enzyme found in almost all body tissues. Released during tissue damage.",
    "normal": {
      "low": 80,
      "high": 225
    },
    "critical": {
      "low": null,
      "high": null
    },
    "notes": "A non-specific marker of cellular injury."
  },
  {
    "id": "lab_ldl_cholesterol",
    "testName": "Low-Density Lipoprotein Cholesterol",
    "shortName": "LDL",
    "category": "Lipids",
    "unit": "mg/dL",
    "description": "Often called 'bad' cholesterol. High levels can lead to plaque buildup in arteries.",
    "normal": {
      "low": null,
      "high": 100
    },
    "critical": {
      "low": null,
      "high": null
    },
    "notes": "Optimal: <100 mg/dL. Near-optimal: 100-129. Borderline-high: 130-159. High: 160-189. Very high: >189."
  },
  {
    "id": "lab_lipase",
    "testName": "Lipase, Serum",
    "shortName": "Lipase",
    "category": "Pancreatic Function",
    "unit": "U/L",
    "description": "An enzyme produced by the pancreas that helps digest fats.",
    "normal": {
      "low": 10,
      "high": 140
    },
    "critical": {
      "low": null,
      "high": null
    },
    "notes": "A more specific marker for acute pancreatitis than amylase."
  },
  {
    "id": "lab_lh",
    "testName": "Luteinizing Hormone",
    "shortName": "LH",
    "category": "Endocrinology",
    "unit": "mIU/mL",
    "description": "A pituitary hormone that triggers ovulation in women and stimulates testosterone production in men.",
    "normal": {
      "low": 1,
      "high": 80
    },
    "critical": {
      "low": null,
      "high": null
    },
    "notes": "Levels vary by sex, age, and menstrual cycle. Mid-cycle peak in women is 9-80."
  },
  {
    "id": "lab_magnesium",
    "testName": "Magnesium, Serum",
    "shortName": "Mg",
    "category": "Electrolytes",
    "unit": "mg/dL",
    "description": "An electrolyte crucial for muscle and nerve function, heart rhythm, immune system health, and bone strength.",
    "normal": {
      "low": 1.6,
      "high": 2.6
    },
    "critical": {
      "low": 1.0,
      "high": 4.9
    },
    "notes": "Abnormal levels can cause neuromuscular or cardiac issues."
  },
  {
    "id": "lab_osmolality",
    "testName": "Osmolality, Serum",
    "shortName": "Osm",
    "category": "Metabolic",
    "unit": "mOsm/kg H₂O",
    "description": "Measures the concentration of dissolved particles in the blood. Reflects hydration status.",
    "normal": {
      "low": 275,
      "high": 295
    },
    "critical": {
      "low": 240,
      "high": 320
    },
    "notes": "Used to investigate hyponatremia and disorders of water balance."
  },
  {
    "id": "lab_pth",
    "testName": "Parathyroid Hormone, Intact",
    "shortName": "PTH",
    "category": "Endocrinology",
    "unit": "pg/mL",
    "description": "A hormone from the parathyroid glands that regulates calcium levels in the blood.",
    "normal": {
      "low": 10,
      "high": 65
    },
    "critical": {
      "low": null,
      "high": null
    },
    "notes": "Measured to diagnose causes of abnormal calcium levels."
  },
  {
    "id": "lab_phosphorus",
    "testName": "Phosphorus, Serum",
    "shortName": "Phos",
    "category": "Metabolic",
    "unit": "mg/dL",
    "description": "A mineral essential for bone formation, energy production (ATP), and cell membrane structure.",
    "normal": {
      "low": 3.0,
      "high": 4.5
    },
    "critical": {
      "low": 1.0,
      "high": null
    },
    "notes": "Closely regulated with calcium by the kidneys, parathyroid hormone, and vitamin D."
  },
  {
    "id": "lab_platelets",
    "testName": "Platelet Count",
    "shortName": "Plt",
    "category": "Hematology",
    "unit": "x10³/μL",
    "description": "Small blood cells that help the body form clots to stop bleeding.",
    "normal": {
      "low": 150,
      "high": 450
    },
    "critical": {
      "low": 20,
      "high": 1000
    },
    "notes": "Low count (thrombocytopenia) increases bleeding risk. High count (thrombocytosis) increases clotting risk."
  },
  {
    "id": "lab_potassium",
    "testName": "Potassium",
    "shortName": "K+",
    "category": "Electrolytes",
    "unit": "mEq/L",
    "description": "An essential electrolyte for heart function, muscle contraction, and nerve signaling.",
    "normal": {
      "low": 3.5,
      "high": 5.0
    },
    "critical": {
      "low": 2.5,
      "high": 6.5
    },
    "notes": "Critical values can lead to life-threatening cardiac arrhythmias."
  },
  {
    "id": "lab_prolactin",
    "testName": "Prolactin, Serum",
    "shortName": "PRL",
    "category": "Endocrinology",
    "unit": "ng/mL",
    "description": "A hormone from the pituitary gland that stimulates milk production after childbirth.",
    "normal": {
      "low": null,
      "high": 20
    },
    "critical": {
      "low": null,
      "high": null
    },
    "notes": "High levels can cause menstrual problems, infertility, and can be a sign of a pituitary tumor (prolactinoma)."
  },
  {
    "id": "lab_psa",
    "testName": "Prostate-Specific Antigen",
    "shortName": "PSA",
    "category": "Oncology",
    "unit": "ng/mL",
    "description": "A protein produced by the prostate gland. Used as a screening tool for prostate cancer.",
    "normal": {
      "low": null,
      "high": 4.0
    },
    "critical": {
      "low": null,
      "high": null
    },
    "notes": "There is no specific normal level; values are interpreted based on age, race, and rate of change. Higher levels increase suspicion for cancer but can also be caused by BPH or prostatitis."
  },
  {
    "id": "lab_protein_total",
    "testName": "Protein, Total, Serum",
    "shortName": "TP",
    "category": "Metabolic",
    "unit": "g/dL",
    "description": "Measures the total amount of protein in the blood, primarily albumin and globulin.",
    "normal": {
      "low": 5.5,
      "high": 9.0
    },
    "critical": {
      "low": null,
      "high": null
    },
    "notes": "Used to evaluate nutritional status, liver, and kidney disease."
  },
  {
    "id": "lab_prothrombin_time",
    "testName": "Prothrombin Time",
    "shortName": "PT",
    "category": "Coagulation",
    "unit": "seconds",
    "description": "Measures how long it takes for a clot to form in a blood sample, evaluating the extrinsic and common coagulation pathways.",
    "normal": {
      "low": 11,
      "high": 13
    },
    "critical": {
      "low": null,
      "high": null
    },
    "notes": "Results are often standardized as the International Normalized Ratio (INR), especially for monitoring warfarin therapy."
  },
  {
    "id": "lab_reticulocyte_count",
    "testName": "Reticulocyte Count",
    "shortName": "Retic",
    "category": "Hematology",
    "unit": "%",
    "description": "Measures the percentage of young, immature red blood cells in circulation. Reflects bone marrow activity.",
    "normal": {
      "low": 0.5,
      "high": 1.5
    },
    "critical": {
      "low": null,
      "high": null
    },
    "notes": "A high count indicates the bone marrow is producing many red blood cells (e.g., after bleeding). A low count in anemia suggests impaired bone marrow production."
  },
  {
    "id": "lab_sodium",
    "testName": "Sodium",
    "shortName": "Na+",
    "category": "Electrolytes",
    "unit": "mEq/L",
    "description": "A vital electrolyte that helps regulate the body's fluid balance, and is crucial for normal nerve and muscle function.",
    "normal": {
      "low": 136,
      "high": 145
    },
    "critical": {
      "low": 120,
      "high": 160
    },
    "notes": "Values outside the critical range require immediate attention due to risk of neurological symptoms, seizures, or coma."
  },
  {
    "id": "lab_testosterone",
    "testName": "Testosterone, Serum",
    "shortName": "Test",
    "category": "Endocrinology",
    "unit": "ng/dL",
    "description": "The primary male sex hormone, also present in smaller amounts in females. Important for libido, muscle mass, and bone density.",
    "normal": {
      "low": 155,
      "high": 577
    },
    "critical": {
      "low": null,
      "high": null
    },
    "notes": "Range varies by sex (Female: 18-54, Male: 291-1100)."
  },
  {
    "id": "lab_free_t4",
    "testName": "Thyroxine, Free (Free T4)",
    "shortName": "fT4",
    "category": "Endocrinology",
    "unit": "ng/dL",
    "description": "Measures the unbound, active form of thyroxine, the main hormone produced by the thyroid gland.",
    "normal": {
      "low": 0.8,
      "high": 1.8
    },
    "critical": {
      "low": null,
      "high": null
    },
    "notes": "Often measured along with TSH to diagnose and monitor thyroid disorders."
  },
  {
    "id": "lab_total_t4",
    "testName": "Thyroxine, Total (Total T4)",
    "shortName": "T4",
    "category": "Endocrinology",
    "unit": "µg/dL",
    "description": "Measures the total amount of thyroxine (bound and unbound) in the blood.",
    "normal": {
      "low": 5,
      "high": 12
    },
    "critical": {
      "low": null,
      "high": null
    },
    "notes": "Less commonly used now than free T4, as it can be affected by protein levels in the blood."
  },
  {
    "id": "lab_total_t3",
    "testName": "Triiodothyronine, Total (Total T3)",
    "shortName": "T3",
    "category": "Endocrinology",
    "unit": "ng/dL",
    "description": "Measures the total amount of T3, the more active thyroid hormone.",
    "normal": {
      "low": 80,
      "high": 180
    },
    "critical": {
      "low": null,
      "high": null
    },
    "notes": "Primarily used to diagnose hyperthyroidism, as it often rises earlier and more dramatically than T4."
  },
  {
    "id": "lab_transferrin_saturation",
    "testName": "Transferrin Saturation",
    "shortName": "TSAT",
    "category": "Hematology",
    "unit": "%",
    "description": "The percentage of transferrin (the main iron-transport protein) that is saturated with iron.",
    "normal": {
      "low": 20,
      "high": 50
    },
    "critical": {
      "low": null,
      "high": null
    },
    "notes": "Calculated from serum iron and TIBC. Low in iron deficiency, high in iron overload (hemochromatosis)."
  },
  {
    "id": "lab_triglycerides",
    "testName": "Triglycerides",
    "shortName": "Trig",
    "category": "Lipids",
    "unit": "mg/dL",
    "description": "A type of fat found in the blood. High levels are associated with an increased risk of heart disease.",
    "normal": {
      "low": null,
      "high": 150
    },
    "critical": {
      "low": null,
      "high": 1000
    },
    "notes": "Fasting sample preferred. Optimal: <100. Normal: <150. Borderline-high: 150-199. High: 200-499. Very high: >499 (risk for pancreatitis)."
  },
  {
    "id": "lab_troponin_i",
    "testName": "Troponin I, Cardiac",
    "shortName": "cTnI",
    "category": "Cardiac Markers",
    "unit": "ng/mL",
    "description": "A protein specific to heart muscle, released into the blood during a heart attack.",
    "normal": {
      "low": null,
      "high": 0.04
    },
    "critical": {
      "low": null,
      "high": null
    },
    "notes": "A highly sensitive and specific marker for myocardial infarction. Levels rise within hours of injury and remain elevated for days."
  },
  {
    "id": "lab_tsh",
    "testName": "Thyroid-Stimulating Hormone",
    "shortName": "TSH",
    "category": "Endocrinology",
    "unit": "μU/mL",
    "description": "A pituitary hormone that stimulates the thyroid gland to produce thyroxine (T4) and triiodothyronine (T3).",
    "normal": {
      "low": 0.5,
      "high": 4.0
    },
    "critical": {
      "low": null,
      "high": null
    },
    "notes": "The primary screening test for thyroid dysfunction. High TSH suggests hypothyroidism; low TSH suggests hyperthyroidism."
  },
  {
    "id": "lab_uric_acid",
    "testName": "Uric Acid, Serum",
    "shortName": "Uric Acid",
    "category": "Metabolic",
    "unit": "mg/dL",
    "description": "A waste product from the breakdown of purines. High levels can cause gout or kidney stones.",
    "normal": {
      "low": 3.0,
      "high": 7.0
    },
    "critical": {
      "low": null,
      "high": null
    },
    "notes": "Normal ranges can vary slightly by lab and sex."
  },
  {
    "id": "lab_vitamin_b12",
    "testName": "Vitamin B12",
    "shortName": "B12",
    "category": "Vitamins",
    "unit": "pg/mL",
    "description": "An essential vitamin for nerve function and the formation of DNA and red blood cells.",
    "normal": {
      "low": 200,
      "high": 800
    },
    "critical": {
      "low": null,
      "high": null
    },
    "notes": "Deficiency can cause megaloblastic anemia and neurological problems."
  },
  {
    "id": "lab_vitamin_d",
    "testName": "25-Hydroxyvitamin D",
    "shortName": "Vit D, 25-OH",
    "category": "Vitamins",
    "unit": "ng/mL",
    "description": "The main storage form of vitamin D in the body. Reflects vitamin D status from diet and sun exposure.",
    "normal": {
      "low": 30,
      "high": 60
    },
    "critical": {
      "low": null,
      "high": null
    },
    "notes": "Essential for calcium absorption and bone health. Deficiency is common."
  },
  {
    "id": "lab_wbc",
    "testName": "White Blood Cell Count",
    "shortName": "WBC",
    "category": "Hematology",
    "unit": "x10³/μL",
    "description": "The total count of all white blood cells, which are the body's primary defense against infection.",
    "normal": {
      "low": 4.0,
      "high": 11.0
    },
    "critical": {
      "low": 2.0,
      "high": 30.0
    },
    "notes": "High count (leukocytosis) suggests infection. Low count (leukopenia) increases infection risk."
  },
   {
    "id": "lab_17_hydroxycorticosteroids",
    "testName": "17-Hydroxycorticosteroids, Urine",
    "shortName": "17-OHCS",
    "category": "Endocrinology",
    "unit": "mg/24 hr",
    "description": "Metabolites of corticosteroids measured in urine to assess adrenal function, particularly cortisol production.",
    "normal": {
      "low": 2.5,
      "high": 9
    },
    "critical": {
      "low": null,
      "high": null
    },
    "notes": "Range varies by sex (Female: 2-8, Male: 3-10). Largely replaced by more specific plasma/salivary cortisol tests."
  },
  {
    "id": "lab_17_hydroxyprogesterone",
    "testName": "17-Hydroxyprogesterone, Serum",
    "shortName": "17-OHP",
    "category": "Endocrinology",
    "unit": "ng/dL",
    "description": "A steroid hormone used to screen for and monitor congenital adrenal hyperplasia (CAH).",
    "normal": {
      "low": null,
      "high": 285
    },
    "critical": {
      "low": null,
      "high": null
    },
    "notes": "Levels vary by sex and menstrual phase. Follicular: <80, Luteal: <285, Postmenopausal: <51, Adult Male: <220."
  },
  {
    "id": "lab_5hiaa",
    "testName": "5-Hydroxyindoleacetic acid, Urine",
    "shortName": "5-HIAA",
    "category": "Oncology",
    "unit": "mg/24 hr",
    "description": "The main metabolite of serotonin. Used to diagnose and monitor carcinoid tumors.",
    "normal": {
      "low": 2,
      "high": 9
    },
    "critical": {
      "low": null,
      "high": null
    },
    "notes": "Certain foods and medications can interfere with results."
  },
  {
    "id": "lab_5_nucleotidase",
    "testName": "5'-Nucleotidase, Serum",
    "shortName": "5'-NT",
    "category": "Liver Function",
    "unit": "U/L",
    "description": "An enzyme specific to the liver. Used to determine if an elevated Alkaline Phosphatase (ALP) is from the liver or bone.",
    "normal": {
      "low": 0,
      "high": 15
    },
    "critical": {
      "low": null,
      "high": null
    },
    "notes": "If both ALP and 5'-NT are high, liver pathology is likely."
  },
  {
    "id": "lab_6_thioguanine",
    "testName": "6-Thioguanine, Whole Blood",
    "shortName": "6-TG",
    "category": "Pharmacology",
    "unit": "pmol/8x10⁸ RBCs",
    "description": "Measures levels of a metabolite of azathioprine and mercaptopurine to guide dosing for inflammatory bowel disease.",
    "normal": {
        "low": 230,
        "high": 400
    },
    "critical": {
        "low": null,
        "high": null
    },
    "notes": "This is a therapeutic range, not a normal physiological value."
  },
  {
    "id": "lab_absolute_basophil_count",
    "testName": "Absolute Basophil Count",
    "shortName": "ABC",
    "category": "Hematology",
    "unit": "/μL",
    "description": "The actual number of basophils, a type of white blood cell involved in allergic and inflammatory reactions.",
    "normal": {
        "low": 0,
        "high": 110
    },
    "critical": {
        "low": null,
        "high": null
    },
    "notes": "Part of the white blood cell differential."
  },
  {
    "id": "lab_absolute_eosinophil_count",
    "testName": "Absolute Eosinophil Count",
    "shortName": "AEC",
    "category": "Hematology",
    "unit": "/μL",
    "description": "The actual number of eosinophils, a type of white blood cell involved in allergic reactions and fighting parasitic infections.",
    "normal": {
        "low": 0,
        "high": 330
    },
    "critical": {
        "low": null,
        "high": null
    },
    "notes": "Elevated in conditions like asthma, allergies, and parasitic infections."
  },
  {
    "id": "lab_absolute_lymphocyte_count",
    "testName": "Absolute Lymphocyte Count",
    "shortName": "ALC",
    "category": "Hematology",
    "unit": "/μL",
    "description": "The actual number of lymphocytes (T-cells, B-cells, NK cells), crucial for the adaptive immune response.",
    "normal": {
        "low": 1200,
        "high": 4950
    },
    "critical": {
        "low": 500,
        "high": null
    },
    "notes": "Low levels (lymphopenia) can indicate immunodeficiency."
  },
  {
    "id": "lab_absolute_monocyte_count",
    "testName": "Absolute Monocyte Count",
    "shortName": "AMC",
    "category": "Hematology",
    "unit": "/μL",
    "description": "The actual number of monocytes, a type of white blood cell that differentiates into macrophages to engulf pathogens.",
    "normal": {
        "low": 0,
        "high": 660
    },
    "critical": {
        "low": null,
        "high": null
    },
    "notes": "Elevated in chronic infections and inflammatory conditions."
  },
  {
    "id": "lab_acid_phosphatase",
    "testName": "Acid Phosphatase, Serum",
    "shortName": "ACP",
    "category": "Enzymes",
    "unit": "unit/mL",
    "description": "An enzyme primarily from the prostate gland. Formerly used as a tumor marker for prostate cancer.",
    "normal": {
        "low": 0.5,
        "high": 2.0
    },
    "critical": {
        "low": null,
        "high": null
    },
    "notes": "Largely replaced by PSA test. Prostatic fraction range is 0.1-0.4 unit/mL."
  },
  {
    "id": "lab_adamts13_activity",
    "testName": "ADAMTS13 Activity",
    "shortName": "ADAMTS13",
    "category": "Coagulation",
    "unit": "%",
    "description": "Measures the activity of an enzyme that cleaves von Willebrand factor. Deficiency causes thrombotic thrombocytopenic purpura (TTP).",
    "normal": {
        "low": 60,
        "high": null
    },
    "critical": {
        "low": 10,
        "high": null
    },
    "notes": "A value >60% is considered normal. Severe deficiency (<10%) is diagnostic for TTP."
  },
  {
    "id": "lab_albumin_urine",
    "testName": "Albumin, Urine",
    "shortName": "uAlb",
    "category": "Renal Function",
    "unit": "mg/24 hr",
    "description": "Measures the amount of albumin excreted in the urine over 24 hours. A key marker for kidney damage.",
    "normal": {
        "low": null,
        "high": 25
    },
    "critical": {
        "low": null,
        "high": null
    },
    "notes": "Persistent elevated levels (microalbuminuria or macroalbuminuria) indicate diabetic nephropathy or other renal diseases."
  },
  {
    "id": "lab_albumin_creatinine_ratio",
    "testName": "Albumin-to-Creatinine Ratio, Urine",
    "shortName": "ACR",
    "category": "Renal Function",
    "unit": "mg/g",
    "description": "A preferred screening test for kidney damage that measures the ratio of albumin to creatinine in a spot urine sample.",
    "normal": {
        "low": null,
        "high": 30
    },
    "critical": {
        "low": null,
        "high": null
    },
    "notes": "A value <30 mg/g is normal. 30-300 is microalbuminuria. >300 is macroalbuminuria."
  },
  {
    "id": "lab_aldolase",
    "testName": "Aldolase, Serum",
    "shortName": "Aldolase",
    "category": "Enzymes",
    "unit": "IU/mL",
    "description": "An enzyme involved in glycolysis. Used to diagnose and monitor muscle diseases, such as muscular dystrophy.",
    "normal": {
        "low": 0.8,
        "high": 3.0
    },
    "critical": {
        "low": null,
        "high": null
    },
    "notes": "Elevated in muscle damage."
  },
  {
    "id": "lab_aldosterone_urine",
    "testName": "Aldosterone, Urine",
    "shortName": "uAldo",
    "category": "Endocrinology",
    "unit": "µg/24 hr",
    "description": "Measures the 24-hour excretion of aldosterone, which can help in the diagnosis of primary aldosteronism.",
    "normal": {
        "low": 5,
        "high": 19
    },
    "critical": {
        "low": null,
        "high": null
    },
    "notes": "Assumes a normal sodium diet."
  },
  {
    "id": "lab_alpha_antitrypsin",
    "testName": "Alpha-Antitrypsin (AAT), Serum",
    "shortName": "AAT",
    "category": "Proteins",
    "unit": "mg/dL",
    "description": "A protein that protects the lungs from damage. Deficiency can lead to early-onset emphysema and liver disease.",
    "normal": {
        "low": 150,
        "high": 350
    },
    "critical": {
        "low": null,
        "high": null
    },
    "notes": "An acute-phase reactant, so levels can be elevated during inflammation."
  },
  {
    "id": "lab_alpha_fetoprotein",
    "testName": "Alpha-Fetoprotein, Serum",
    "shortName": "AFP",
    "category": "Oncology",
    "unit": "ng/mL",
    "description": "A protein produced by the fetal liver. Used as a tumor marker for hepatocellular carcinoma and certain germ cell tumors.",
    "normal": {
        "low": null,
        "high": 10
    },
    "critical": {
        "low": null,
        "high": null
    },
    "notes": "Also used in prenatal screening for neural tube defects."
  },
  {
    "id": "lab_amylase_urine",
    "testName": "Amylase, Urine",
    "shortName": "uAmylase",
    "category": "Pancreatic Function",
    "unit": "U/hr",
    "description": "Measures the amount of amylase excreted in the urine. Can remain elevated longer than serum amylase in pancreatitis.",
    "normal": {
        "low": 1,
        "high": 17
    },
    "critical": {
        "low": null,
        "high": null
    },
    "notes": "Useful when serum amylase levels have returned to normal but suspicion for pancreatitis remains."
  },
  {
    "id": "lab_androstenedione",
    "testName": "Androstenedione, Serum",
    "shortName": "Andro",
    "category": "Endocrinology",
    "unit": "ng/dL",
    "description": "An androgenic steroid hormone, a precursor to testosterone and estrogen. Used to evaluate adrenal and gonadal function.",
    "normal": {
        "low": 35,
        "high": 175
    },
    "critical": {
        "low": null,
        "high": null
    },
    "notes": "Range varies by sex (Female: 30-200, Male: 40-150)."
  },
  {
    "id": "lab_angiotensin_converting_enzyme",
    "testName": "Angiotensin-Converting Enzyme, Serum",
    "shortName": "ACE",
    "category": "Enzymes",
    "unit": "U/L",
    "description": "An enzyme involved in blood pressure regulation. Elevated levels are classically associated with sarcoidosis.",
    "normal": {
        "low": 8,
        "high": 53
    },
    "critical": {
        "low": null,
        "high": null
    },
    "notes": "ACE inhibitor medications will affect the results."
  },
  {
    "id": "lab_anti_ccp",
    "testName": "Anti-Cyclic Citrullinated Peptide Antibodies",
    "shortName": "Anti-CCP",
    "category": "Rheumatology",
    "unit": "units",
    "description": "An antibody test used in the diagnosis of rheumatoid arthritis (RA). It is highly specific for RA.",
    "normal": {
        "low": null,
        "high": 20
    },
    "critical": {
        "low": null,
        "high": null
    },
    "notes": "A positive result strongly supports a diagnosis of RA."
  },
  {
    "id": "lab_anti_dsdna",
    "testName": "Antibodies to Double-Stranded DNA",
    "shortName": "Anti-dsDNA",
    "category": "Rheumatology",
    "unit": "IU/mL",
    "description": "An antibody test highly specific for systemic lupus erythematosus (SLE).",
    "normal": {
        "low": 0,
        "high": 7
    },
    "critical": {
        "low": null,
        "high": null
    },
    "notes": "Levels can fluctuate with disease activity, especially lupus nephritis."
  },
  {
    "id": "lab_antimitochondrial_antibodies",
    "testName": "Antimitochondrial Antibodies",
    "shortName": "AMA",
    "category": "Gastroenterology",
    "unit": "titer",
    "description": "An antibody test used in the diagnosis of primary biliary cholangitis (PBC).",
    "normal": {
        "low": null,
        "high": 5
    },
    "critical": {
        "low": null,
        "high": null
    },
    "notes": "A titer of ≤1:5 is considered negative."
  },
  {
    "id": "lab_anti_smooth_muscle_antibodies",
    "testName": "Anti-Smooth Muscle Antibodies",
    "shortName": "ASMA",
    "category": "Gastroenterology",
    "unit": "titer",
    "description": "An antibody test used in the diagnosis of autoimmune hepatitis.",
    "normal": {
        "low": null,
        "high": 80
    },
    "critical": {
        "low": null,
        "high": null
    },
    "notes": "A titer of ≤1:80 is considered normal."
  },
  {
    "id": "lab_antithrombin_activity",
    "testName": "Antithrombin Activity",
    "shortName": "AT",
    "category": "Coagulation",
    "unit": "%",
    "description": "Measures the activity of antithrombin, a protein that helps prevent blood from clotting too much.",
    "normal": {
        "low": 80,
        "high": 120
    },
    "critical": {
        "low": null,
        "high": null
    },
    "notes": "Deficiency is a risk factor for thrombosis."
  },
  {
    "id": "lab_apolipoprotein_a1",
    "testName": "Apolipoprotein A-1, Serum",
    "shortName": "Apo A-1",
    "category": "Lipids",
    "unit": "mg/dL",
    "description": "The main protein component of high-density lipoprotein (HDL). Higher levels are associated with lower cardiovascular risk.",
    "normal": {
        "low": 130,
        "high": null
    },
    "critical": {
        "low": null,
        "high": null
    },
    "notes": "Desirable levels: Female ≥140, Male ≥120."
  },
  {
    "id": "lab_apolipoprotein_b",
    "testName": "Apolipoprotein B, Serum",
    "shortName": "Apo B",
    "category": "Lipids",
    "unit": "mg/dL",
    "description": "The main protein component of low-density lipoprotein (LDL). It reflects the number of atherogenic particles.",
    "normal": {
        "low": null,
        "high": 90
    },
    "critical": {
        "low": null,
        "high": null
    },
    "notes": "Desirable: <90. Borderline high: 90-119. High: 120-139. Very High: ≥140."
  },
  {
    "id": "lab_arterial_blood_gas",
    "testName": "Arterial Blood Gas",
    "shortName": "ABG",
    "category": "Pulmonology",
    "unit": "various",
    "description": "A test of an arterial blood sample to measure levels of oxygen, carbon dioxide, and acid-base balance.",
    "normal": {
        "low": null,
        "high": null
    },
    "critical": {
        "low": null,
        "high": null
    },
    "notes": "pH: 7.38-7.44; PaCO₂: 38-42 mmHg; PaO₂: 75-100 mmHg; Bicarbonate: 23-26 mEq/L; O₂ Saturation: ≥95%."
  },
  {
    "id": "lab_bnp",
    "testName": "B-type Natriuretic Peptide, Plasma",
    "shortName": "BNP",
    "category": "Cardiac Markers",
    "unit": "pg/mL",
    "description": "A hormone secreted by cardiac muscle cells in response to stretching. Used to diagnose and assess the severity of heart failure.",
    "normal": {
        "low": null,
        "high": 100
    },
    "critical": {
        "low": null,
        "high": null
    },
    "notes": "A value <100 pg/mL makes heart failure unlikely."
  },
  {
    "id": "lab_c_peptide",
    "testName": "C-Peptide, Serum",
    "shortName": "C-Peptide",
    "category": "Endocrinology",
    "unit": "ng/mL",
    "description": "A substance released from the pancreas along with insulin. It is a marker of endogenous insulin production.",
    "normal": {
        "low": 0.8,
        "high": 3.1
    },
    "critical": {
        "low": null,
        "high": null
    },
    "notes": "Used to differentiate between type 1 and type 2 diabetes and to evaluate for insulinoma."
  },
  {
    "id": "lab_ca125",
    "testName": "Carbohydrate Antigen 125",
    "shortName": "CA 125",
    "category": "Oncology",
    "unit": "U/mL",
    "description": "A tumor marker primarily used to monitor response to treatment and recurrence of ovarian cancer.",
    "normal": {
        "low": null,
        "high": 35
    },
    "critical": {
        "low": null,
        "high": null
    },
    "notes": "Not recommended for screening as it can be elevated in many benign conditions."
  },
  {
    "id": "lab_calcitonin",
    "testName": "Calcitonin, Serum",
    "shortName": "Calcitonin",
    "category": "Endocrinology",
    "unit": "pg/mL",
    "description": "A hormone produced by the C-cells of the thyroid. Used as a tumor marker for medullary thyroid cancer.",
    "normal": {
        "low": null,
        "high": 7.5
    },
    "critical": {
        "low": null,
        "high": null
    },
    "notes": "Range varies by sex (Female: ≤5, Male: ≤10)."
  },
  {
    "id": "lab_cea",
    "testName": "Carcinoembryonic Antigen, Plasma",
    "shortName": "CEA",
    "category": "Oncology",
    "unit": "ng/mL",
    "description": "A tumor marker used to monitor colorectal cancer, especially for recurrence after treatment.",
    "normal": {
        "low": null,
        "high": 2.5
    },
    "critical": {
        "low": null,
        "high": null
    },
    "notes": "Can be elevated in smokers and in other cancers and inflammatory conditions."
  },
  {
    "id": "lab_ceruloplasmin",
    "testName": "Ceruloplasmin, Serum",
    "shortName": "Ceruloplasmin",
    "category": "Proteins",
    "unit": "mg/dL",
    "description": "The major copper-carrying protein in the blood. Used in the diagnosis of Wilson's disease.",
    "normal": {
        "low": 25,
        "high": 43
    },
    "critical": {
        "low": null,
        "high": null
    },
    "notes": "Levels are typically low in Wilson's disease."
  },
  {
    "id": "lab_complement_c3",
    "testName": "Complement C3, Serum",
    "shortName": "C3",
    "category": "Immunology",
    "unit": "mg/dL",
    "description": "A key protein of the complement system, part of the innate immune response. Levels are measured to evaluate autoimmune diseases.",
    "normal": {
        "low": 100,
        "high": 233
    },
    "critical": {
        "low": null,
        "high": null
    },
    "notes": "Low levels can be seen in conditions like lupus and glomerulonephritis."
  },
  {
    "id": "lab_complement_c4",
    "testName": "Complement C4, Serum",
    "shortName": "C4",
    "category": "Immunology",
    "unit": "mg/dL",
    "description": "A protein of the classical complement pathway. Levels are measured to evaluate autoimmune diseases.",
    "normal": {
        "low": 14,
        "high": 48
    },
    "critical": {
        "low": null,
        "high": null
    },
    "notes": "Low levels can be seen in conditions like lupus and hereditary angioedema."
  },
  {
    "id": "lab_copper",
    "testName": "Copper, Serum",
    "shortName": "Cu",
    "category": "Trace Metals",
    "unit": "µg/dL",
    "description": "An essential trace mineral. Measured to diagnose Wilson's disease (low serum copper) and copper deficiency or toxicity.",
    "normal": {
        "low": 100,
        "high": 200
    },
    "critical": {
        "low": null,
        "high": null
    },
    "notes": "In Wilson's disease, serum copper is low, but free copper is high and urine copper is high."
  },
  {
    "id": "lab_creatinine_clearance",
    "testName": "Creatinine Clearance, Urine",
    "shortName": "CrCl",
    "category": "Renal Function",
    "unit": "mL/min/1.73 m²",
    "description": "A measure of kidney function that estimates the glomerular filtration rate (GFR) by measuring creatinine levels in blood and a 24-hour urine sample.",
    "normal": {
        "low": 90,
        "high": 140
    },
    "critical": {
        "low": null,
        "high": null
    },
    "notes": "Largely replaced by estimated GFR (eGFR) calculations from serum creatinine, which do not require urine collection."
  },
  {
    "id": "lab_dhea_s",
    "testName": "Dehydroepiandrosterone Sulfate, Serum",
    "shortName": "DHEA-S",
    "category": "Endocrinology",
    "unit": "µg/dL",
    "description": "An androgenic steroid hormone produced almost exclusively by the adrenal glands. A marker of adrenal androgen production.",
    "normal": {
        "low": 66.5,
        "high": 394.5
    },
    "critical": {
        "low": null,
        "high": null
    },
    "notes": "Range varies by sex (Female: 44-332, Male: 89-457)."
  },
  {
    "id": "lab_estradiol",
    "testName": "Estradiol, Serum",
    "shortName": "E2",
    "category": "Endocrinology",
    "unit": "pg/mL",
    "description": "The primary female sex hormone. Used to evaluate ovarian function, menstrual irregularities, and feminization in males.",
    "normal": {
        "low": 10,
        "high": 300
    },
    "critical": {
        "low": null,
        "high": null
    },
    "notes": "Levels vary by sex and menstrual phase. Male: 20-50, Follicular: 10-180, Mid-cycle peak: 100-300, Postmenopausal: <10."
  },
  {
    "id": "lab_erythrocyte_sedimentation_rate",
    "testName": "Erythrocyte Sedimentation Rate",
    "shortName": "ESR",
    "category": "Inflammatory Markers",
    "unit": "mm/hr",
    "description": "A non-specific measure of inflammation. It measures the rate at which red blood cells settle in a tube of blood.",
    "normal": {
        "low": 0,
        "high": 17.5
    },
    "critical": {
        "low": null,
        "high": null
    },
    "notes": "Method is Westergren. Range varies by sex (Female: 0-20, Male: 0-15). Elevated in many inflammatory, infectious, and malignant conditions."
  },
  {
    "id": "lab_erythropoietin",
    "testName": "Erythropoietin, Serum",
    "shortName": "EPO",
    "category": "Hematology",
    "unit": "mU/mL",
    "description": "A hormone produced by the kidneys that stimulates red blood cell production. Used to evaluate causes of anemia.",
    "normal": {
        "low": 4,
        "high": 26
    },
    "critical": {
        "low": null,
        "high": null
    },
    "notes": "Levels are high in most anemias but inappropriately low in the anemia of chronic kidney disease."
  },
  {
    "id": "lab_free_light_chains",
    "testName": "Immunoglobulin Free Light Chains, Serum",
    "shortName": "FLC",
    "category": "Hematology",
    "unit": "mg/L",
    "description": "Measures kappa and lambda free light chains produced by plasma cells. Used to diagnose and monitor plasma cell disorders like multiple myeloma.",
    "normal": {
        "low": null,
        "high": null
    },
    "critical": {
        "low": null,
        "high": null
    },
    "notes": "Key diagnostic is the Kappa/Lambda ratio (Normal: 0.26-1.65). Kappa range: 3.3-19.4. Lambda range: 5.7-26.3."
  },
  {
    "id": "lab_gastrin",
    "testName": "Gastrin, Serum",
    "shortName": "Gastrin",
    "category": "Gastroenterology",
    "unit": "pg/mL",
    "description": "A hormone that stimulates secretion of gastric acid. Used to diagnose Zollinger-Ellison syndrome (gastrinoma).",
    "normal": {
        "low": null,
        "high": 100
    },
    "critical": {
        "low": null,
        "high": null
    },
    "notes": "Patient should be fasting. Proton pump inhibitors can cause falsely high levels."
  },
  {
    "id": "lab_growth_hormone",
    "testName": "Growth Hormone, Serum",
    "shortName": "GH",
    "category": "Endocrinology",
    "unit": "ng/mL",
    "description": "A pituitary hormone that stimulates growth. Measured to diagnose GH deficiency or excess (acromegaly/gigantism).",
    "normal": {
        "low": null,
        "high": 5
    },
    "critical": {
        "low": null,
        "high": null
    },
    "notes": "Random levels are not very useful due to pulsatile secretion. Provocative stimuli tests are often required (response should be >7 ng/mL)."
  },
  {
    "id": "lab_haptoglobin",
    "testName": "Haptoglobin, Serum",
    "shortName": "Haptoglobin",
    "category": "Hematology",
    "unit": "mg/dL",
    "description": "A protein that binds to free hemoglobin released from red blood cells. A marker for intravascular hemolysis.",
    "normal": {
        "low": 83,
        "high": 267
    },
    "critical": {
        "low": null,
        "high": null
    },
    "notes": "Levels are low or undetectable during active intravascular hemolysis. It is also an acute-phase reactant."
  },
  {
    "id": "lab_immunoglobulin_a",
    "testName": "Immunoglobulin A, Serum",
    "shortName": "IgA",
    "category": "Immunology",
    "unit": "mg/dL",
    "description": "A class of antibody found primarily in mucous secretions. Measured to evaluate for immunodeficiency or certain plasma cell disorders.",
    "normal": {
        "low": 90,
        "high": 325
    },
    "critical": {
        "low": null,
        "high": null
    },
    "notes": "Selective IgA deficiency is the most common primary immunodeficiency."
  },
  {
    "id": "lab_immunoglobulin_g",
    "testName": "Immunoglobulin G, Serum",
    "shortName": "IgG",
    "category": "Immunology",
    "unit": "mg/dL",
    "description": "The most abundant class of antibody in the blood, providing the majority of antibody-based immunity.",
    "normal": {
        "low": 800,
        "high": 1500
    },
    "critical": {
        "low": null,
        "high": null
    },
    "notes": "Measured to evaluate for immunodeficiency or gammopathies."
  },
  {
    "id": "lab_immunoglobulin_m",
    "testName": "Immunoglobulin M, Serum",
    "shortName": "IgM",
    "category": "Immunology",
    "unit": "mg/dL",
    "description": "The first antibody produced in response to a new infection. Measured to evaluate immunodeficiency or gammopathies.",
    "normal": {
        "low": 45,
        "high": 150
    },
    "critical": {
        "low": null,
        "high": null
    },
    "notes": "High levels can be seen in Waldenström's macroglobulinemia."
  },
  {
    "id": "lab_insulin",
    "testName": "Insulin, Serum (Fasting)",
    "shortName": "Insulin",
    "category": "Endocrinology",
    "unit": "μU/mL",
    "description": "A hormone produced by the pancreas that regulates blood glucose levels.",
    "normal": {
        "low": null,
        "high": 20
    },
    "critical": {
        "low": null,
        "high": null
    },
    "notes": "Measured to evaluate hypoglycemia and insulin resistance."
  },
  {
    "id": "lab_lipoprotein_a",
    "testName": "Lipoprotein(a), Serum",
    "shortName": "Lp(a)",
    "category": "Lipids",
    "unit": "mg/dL",
    "description": "A type of lipoprotein whose level is genetically determined. High levels are an independent risk factor for cardiovascular disease.",
    "normal": {
        "low": null,
        "high": 30
    },
    "critical": {
        "low": null,
        "high": null
    },
    "notes": "A desirable level is <30 mg/dL."
  },
  {
    "id": "lab_mcv",
    "testName": "Mean Corpuscular Volume",
    "shortName": "MCV",
    "category": "Hematology",
    "unit": "fL",
    "description": "A measure of the average size of red blood cells. Used to classify anemias.",
    "normal": {
        "low": 80,
        "high": 98
    },
    "critical": {
        "low": null,
        "high": null
    },
    "notes": "Low MCV is microcytic (e.g., iron deficiency). Normal MCV is normocytic. High MCV is macrocytic (e.g., B12/folate deficiency)."
  },
  {
    "id": "lab_procalcitonin",
    "testName": "Procalcitonin, Serum",
    "shortName": "PCT",
    "category": "Inflammatory Markers",
    "unit": "ng/mL",
    "description": "A substance that is produced in response to bacterial infections. A marker used to guide antibiotic therapy in respiratory infections and sepsis.",
    "normal": {
        "low": null,
        "high": 0.10
    },
    "critical": {
        "low": null,
        "high": null
    },
    "notes": "Levels >0.5 ng/mL suggest a likely bacterial infection, while levels >2.0 ng/mL strongly suggest bacterial sepsis."
  },
  {
    "id": "lab_protein_c",
    "testName": "Protein C Activity, Plasma",
    "shortName": "Protein C",
    "category": "Coagulation",
    "unit": "%",
    "description": "A vitamin K-dependent protein that acts as a natural anticoagulant.",
    "normal": {
        "low": 65,
        "high": 150
    },
    "critical": {
        "low": null,
        "high": null
    },
    "notes": "Deficiency is a risk factor for thrombosis."
  },
  {
    "id": "lab_protein_s",
    "testName": "Protein S Activity, Plasma",
    "shortName": "Protein S",
    "category": "Coagulation",
    "unit": "%",
    "description": "A vitamin K-dependent protein that is a cofactor for Protein C, acting as a natural anticoagulant.",
    "normal": {
        "low": 57,
        "high": 131
    },
    "critical": {
        "low": null,
        "high": null
    },
    "notes": "Deficiency is a risk factor for thrombosis."
  },
  {
    "id": "lab_renin_activity",
    "testName": "Renin Activity, Plasma",
    "shortName": "PRA",
    "category": "Endocrinology",
    "unit": "ng/mL/hr",
    "description": "Measures the ability of renin to generate angiotensin I. Used to evaluate causes of hypertension and aldosteronism.",
    "normal": {
        "low": 0.2,
        "high": 3.6
    },
    "critical": {
        "low": null,
        "high": null
    },
    "notes": "Levels vary with diet and posture. Supine: 0.3-2.5. Upright: 0.2-3.6."
  },
  {
    "id": "lab_rheumatoid_factor",
    "testName": "Rheumatoid Factor",
    "shortName": "RF",
    "category": "Rheumatology",
    "unit": "IU/mL",
    "description": "An antibody that is present in the blood of many people with rheumatoid arthritis.",
    "normal": {
        "low": null,
        "high": 24
    },
    "critical": {
        "low": null,
        "high": null
    },
    "notes": "Can also be positive in other autoimmune diseases, infections, and in some healthy individuals."
  },
  {
    "id": "lab_thyroglobulin",
    "testName": "Thyroglobulin, Serum",
    "shortName": "Tg",
    "category": "Oncology",
    "unit": "ng/mL",
    "description": "A protein made by thyroid cells. Used as a tumor marker to monitor for recurrence of differentiated thyroid cancer after thyroidectomy.",
    "normal": {
        "low": null,
        "high": 20
    },
    "critical": {
        "low": null,
        "high": null
    },
    "notes": "An undetectable level is the goal after total thyroidectomy and ablation."
  },
  {
    "id": "lab_tissue_transglutaminase_antibody_iga",
    "testName": "Tissue Transglutaminase Antibody, IgA",
    "shortName": "tTG-IgA",
    "category": "Gastroenterology",
    "unit": "U/mL",
    "description": "The primary screening test for celiac disease.",
    "normal": {
        "low": null,
        "high": 4.0
    },
    "critical": {
        "low": null,
        "high": null
    },
    "notes": "Test is by ELISA method. A positive result warrants further investigation, often with duodenal biopsy."
  },
  {
    "id": "lab_transferrin",
    "testName": "Transferrin, Serum",
    "shortName": "Transferrin",
    "category": "Hematology",
    "unit": "mg/dL",
    "description": "The main protein in the blood that binds to iron and transports it throughout the body.",
    "normal": {
        "low": 200,
        "high": 400
    },
    "critical": {
        "low": null,
        "high": null
    },
    "notes": "Levels increase in iron deficiency."
  },
  {
    "id": "lab_troponin_t",
    "testName": "Troponin T, Cardiac, Serum",
    "shortName": "cTnT",
    "category": "Cardiac Markers",
    "unit": "ng/mL",
    "description": "A protein specific to heart muscle, released into the blood during a heart attack.",
    "normal": {
        "low": null,
        "high": 0.01
    },
    "critical": {
        "low": null,
        "high": null
    },
    "notes": "A sensitive and specific marker for myocardial infarction."
  },
  {
    "id": "lab_viscosity",
    "testName": "Viscosity, Serum",
    "shortName": "Viscosity",
    "category": "Hematology",
    "unit": "cp",
    "description": "Measures the thickness of blood serum. Used to evaluate for hyperviscosity syndrome.",
    "normal": {
        "low": 1.4,
        "high": 1.8
    },
    "critical": {
        "low": null,
        "high": null
    },
    "notes": "Typically caused by high levels of paraproteins, such as in Waldenström's macroglobulinemia or multiple myeloma."
  },
  {
    "id": "lab_vitamin_a",
    "testName": "Vitamin A, Serum",
    "shortName": "Vit A",
    "category": "Vitamins",
    "unit": "µg/dL",
    "description": "A fat-soluble vitamin important for vision, immune function, and cell growth.",
    "normal": {
        "low": 2.5,
        "high": 78.0
    },
    "critical": {
        "low": null,
        "high": null
    },
    "notes": "Measured to assess for deficiency or toxicity."
  },
  {
    "id": "lab_von_willebrand_factor_antigen",
    "testName": "von Willebrand Factor Antigen, Plasma",
    "shortName": "vWF:Ag",
    "category": "Coagulation",
    "unit": "%",
    "description": "Measures the amount of von Willebrand factor protein in the blood.",
    "normal": {
        "low": 50,
        "high": 150
    },
    "critical": {
        "low": null,
        "high": null
    },
    "notes": "Part of the workup for von Willebrand disease, the most common inherited bleeding disorder."
  },
  {
    "id": "lab_alpha2_antiplasmin",
    "testName": "Alpha2-Antiplasmin Activity, Plasma",
    "shortName": "α2-Antiplasmin",
    "category": "Coagulation",
    "unit": "%",
    "description": "Measures the activity of alpha-2-antiplasmin, the primary inhibitor of plasmin, which is responsible for breaking down blood clots.",
    "normal": { "low": 75, "high": 115 },
    "critical": { "low": null, "high": null },
    "notes": "Deficiency can lead to a severe bleeding disorder."
  },
  {
    "id": "lab_alpha_amino_nitrogen_urine",
    "testName": "Alpha-Amino Nitrogen, Urine",
    "shortName": "AAN",
    "category": "Metabolic",
    "unit": "mg/24 hr",
    "description": "Measures the amount of amino acids excreted in the urine.",
    "normal": { "low": 100, "high": 290 },
    "critical": { "low": null, "high": null },
    "notes": "Elevated levels can be seen in liver disease and certain metabolic disorders."
  },
  {
    "id": "lab_amino_acids_urine",
    "testName": "Amino Acids, Urine",
    "shortName": "Urine AAs",
    "category": "Metabolic",
    "unit": "mg/24 hr",
    "description": "A comprehensive measure of amino acid excretion, used to screen for inborn errors of metabolism.",
    "normal": { "low": 200, "high": 400 },
    "critical": { "low": null, "high": null },
    "notes": "Interpreted in the context of specific amino acid patterns."
  },
  {
    "id": "lab_anticardiolipin_ab",
    "testName": "Anticardiolipin Antibodies",
    "shortName": "aCL",
    "category": "Rheumatology",
    "unit": "GPL/MPL",
    "description": "Autoantibodies directed against cardiolipin. A key diagnostic criterion for antiphospholipid syndrome (APS).",
    "normal": { "low": null, "high": 20 },
    "critical": { "low": null, "high": null },
    "notes": "Measured as IgG (<20 GPL) and IgM (<20 MPL) units."
  },
  {
    "id": "lab_antideoxyribonuclease_b",
    "testName": "Antideoxyribonuclease B",
    "shortName": "Anti-DNase B",
    "category": "Immunology",
    "unit": "units",
    "description": "Measures antibodies to an enzyme produced by Group A Streptococcus. Indicates a recent streptococcal infection.",
    "normal": { "low": null, "high": 280 },
    "critical": { "low": null, "high": null },
    "notes": "Often tested along with ASO titer."
  },
  {
    "id": "lab_anti_f_actin_ab",
    "testName": "Anti-F-Actin Antibodies, Serum",
    "shortName": "Anti-F-Actin",
    "category": "Gastroenterology",
    "unit": "titer",
    "description": "A type of anti-smooth muscle antibody (ASMA) that is more specific for type 1 autoimmune hepatitis.",
    "normal": { "low": null, "high": 80 },
    "critical": { "low": null, "high": null },
    "notes": "A titer of ≤1:80 is considered normal."
  },
  {
    "id": "lab_antihistone_ab",
    "testName": "Antihistone Antibodies",
    "shortName": "AHA",
    "category": "Rheumatology",
    "unit": "titer",
    "description": "Autoantibodies against histone proteins. Classically associated with drug-induced lupus erythematosus.",
    "normal": { "low": null, "high": 16 },
    "critical": { "low": null, "high": null },
    "notes": "A titer of <1:16 is considered negative."
  },
  {
    "id": "lab_anti_lkm_ab",
    "testName": "Anti-Liver-Kidney Microsomal Antibodies",
    "shortName": "Anti-LKM",
    "category": "Gastroenterology",
    "unit": "titer",
    "description": "Autoantibodies used in the diagnosis of type 2 autoimmune hepatitis.",
    "normal": { "low": null, "high": 20 },
    "critical": { "low": null, "high": null },
    "notes": "A titer of <1:20 is considered negative."
  },
  {
    "id": "lab_anti_mag_ab",
    "testName": "Anti-Myelin Associated Glycoprotein Antibody",
    "shortName": "Anti-MAG",
    "category": "Neurology",
    "unit": "titer",
    "description": "Antibodies associated with a specific type of peripheral neuropathy characterized by demyelination.",
    "normal": { "low": null, "high": 1600 },
    "critical": { "low": null, "high": null },
    "notes": "A titer of <1:1600 is considered negative."
  },
  {
    "id": "lab_antimyeloperoxidase_ab",
    "testName": "Antimyeloperoxidase Antibodies",
    "shortName": "MPO-ANCA",
    "category": "Rheumatology",
    "unit": "U",
    "description": "A type of ANCA (p-ANCA pattern) associated with vasculitides like microscopic polyangiitis and eosinophilic granulomatosis with polyangiitis (Churg-Strauss).",
    "normal": { "low": null, "high": 1.0 },
    "critical": { "low": null, "high": null },
    "notes": "A value of <1.0 U is negative."
  },
  {
    "id": "lab_ana",
    "testName": "Antinuclear Antibodies",
    "shortName": "ANA",
    "category": "Rheumatology",
    "unit": "titer",
    "description": "A screening test for autoantibodies that target the nuclei of cells. A hallmark of systemic autoimmune disease.",
    "normal": { "low": null, "high": 40 },
    "critical": { "low": null, "high": null },
    "notes": "A negative result (titer ≤1:40) makes systemic lupus erythematosus (SLE) unlikely. Positive results require further specific antibody testing."
  },
  {
    "id": "lab_anti_pla2r_ab",
    "testName": "Anti-Phospholipase A2 Receptor Antibodies",
    "shortName": "Anti-PLA2R",
    "category": "Nephrology",
    "unit": "RU/mL",
    "description": "Autoantibodies that are a specific marker for primary membranous nephropathy.",
    "normal": { "low": null, "high": 14 },
    "critical": { "low": null, "high": null },
    "notes": "Negative: <14 RU/mL, Borderline: 14-<20 RU/mL, Positive: ≥20 RU/mL."
  },
  {
    "id": "lab_anti_rnp_ab",
    "testName": "Anti-RNP Antibodies",
    "shortName": "Anti-RNP",
    "category": "Rheumatology",
    "unit": "Al/CU",
    "description": "Autoantibodies against ribonucleoprotein. A key diagnostic marker for mixed connective tissue disease (MCTD).",
    "normal": { "low": null, "high": 1.0 },
    "critical": { "low": null, "high": null },
    "notes": "Can also be seen in lupus and scleroderma. Different units exist (<1.0 Al or <20 CU)."
  },
  {
    "id": "lab_anti_scl70_ab",
    "testName": "Anti-Scl-70 Antibodies",
    "shortName": "Anti-Scl-70",
    "category": "Rheumatology",
    "unit": "U",
    "description": "Autoantibodies against topoisomerase I. A specific marker for diffuse systemic sclerosis (scleroderma).",
    "normal": { "low": null, "high": 1.0 },
    "critical": { "low": null, "high": null },
    "notes": "A value <1.0 U is negative. Associated with a higher risk of interstitial lung disease."
  },
  {
    "id": "lab_anti_ssa_ro_ssb_la_ab",
    "testName": "Anti-SSA/Ro & Anti-SSB/La Antibodies",
    "shortName": "Anti-Ro/La",
    "category": "Rheumatology",
    "unit": "Al/CU",
    "description": "Autoantibodies commonly found in Sjögren's syndrome and systemic lupus erythematosus.",
    "normal": { "low": null, "high": 1.0 },
    "critical": { "low": null, "high": null },
    "notes": "Anti-Ro is associated with neonatal lupus. Different units exist (<1.0 Al or <20 CU)."
  },
  {
    "id": "lab_aso_titer",
    "testName": "Antistreptolysin O Titer",
    "shortName": "ASO",
    "category": "Immunology",
    "unit": "Todd units",
    "description": "Measures antibodies against streptolysin O, a toxin produced by Group A Streptococcus. Evidence of recent strep infection.",
    "normal": { "low": null, "high": 200 },
    "critical": { "low": null, "high": null },
    "notes": "Used in the workup for post-streptococcal complications like rheumatic fever and glomerulonephritis."
  },
  {
    "id": "lab_antithyroglobulin_ab",
    "testName": "Antithyroglobulin Antibodies",
    "shortName": "TgAb",
    "category": "Endocrinology",
    "unit": "U/mL",
    "description": "Antibodies against thyroglobulin. A marker for autoimmune thyroid disease, particularly Hashimoto's thyroiditis.",
    "normal": { "low": null, "high": 20 },
    "critical": { "low": null, "high": null },
    "notes": "Also used to check for interference in thyroglobulin tumor marker testing."
  },
  {
    "id": "lab_antithyroid_peroxidase_ab",
    "testName": "Antithyroid Peroxidase Antibodies",
    "shortName": "TPOAb",
    "category": "Endocrinology",
    "unit": "U/mL",
    "description": "Antibodies against thyroid peroxidase, an enzyme involved in thyroid hormone production. The primary marker for Hashimoto's thyroiditis.",
    "normal": { "low": null, "high": 2.0 },
    "critical": { "low": null, "high": null },
    "notes": "Also frequently elevated in Graves' disease."
  },
  {
    "id": "lab_ascorbic_acid_blood",
    "testName": "Ascorbic Acid (Vitamin C), Blood",
    "shortName": "Vitamin C",
    "category": "Vitamins",
    "unit": "mg/dL",
    "description": "Measures the level of vitamin C in the blood. Used to diagnose scurvy.",
    "normal": { "low": 0.4, "high": 1.5 },
    "critical": { "low": null, "high": null },
    "notes": "Low levels indicate deficiency."
  },
  {
    "id": "lab_beta_d_glucan",
    "testName": "(1,3)-Beta-D-Glucan, Serum",
    "shortName": "BDG",
    "category": "Infectious Disease",
    "unit": "pg/mL",
    "description": "A component of the cell wall of many fungi. A marker for invasive fungal infections.",
    "normal": { "low": null, "high": 60 },
    "critical": { "low": null, "high": null },
    "notes": "A value <60 pg/mL is negative. Can have false positives."
  },
  {
    "id": "lab_beta_hcg",
    "testName": "Beta-Human Chorionic Gonadotropin, Serum",
    "shortName": "β-hCG",
    "category": "Endocrinology",
    "unit": "U/L",
    "description": "A hormone produced during pregnancy. Also used as a tumor marker for certain cancers.",
    "normal": { "low": null, "high": 1.0 },
    "critical": { "low": null, "high": null },
    "notes": "Premenopausal nonpregnant: <1.0; Postmenopausal: <7.0; Male: <1.4. Levels double approximately every 48 hours in early pregnancy."
  },
  {
    "id": "lab_beta_glycoprotein_i_ab",
    "testName": "Beta-Glycoprotein I Antibodies",
    "shortName": "Anti-β2GPI",
    "category": "Rheumatology",
    "unit": "SGU/SMU",
    "description": "Autoantibodies that are a key diagnostic criterion for antiphospholipid syndrome (APS).",
    "normal": { "low": null, "high": 21 },
    "critical": { "low": null, "high": null },
    "notes": "Measured as IgG (<21 SGU) and IgM (<21 SMU) units."
  },
  {
    "id": "lab_beta_hydroxybutyrate",
    "testName": "Beta-Hydroxybutyrate, Serum",
    "shortName": "β-OHB",
    "category": "Metabolic",
    "unit": "mmol/L",
    "description": "The primary ketone body produced during states of ketosis. Used to diagnose and monitor diabetic ketoacidosis (DKA).",
    "normal": { "low": null, "high": 0.4 },
    "critical": { "low": null, "high": null },
    "notes": "More specific for DKA than urine ketones."
  },
  {
    "id": "lab_beta2_microglobulin",
    "testName": "Beta2-Microglobulin, Serum",
    "shortName": "β2M",
    "category": "Oncology",
    "unit": "mg/L",
    "description": "A protein found on the surface of most cells. Used as a prognostic tumor marker in multiple myeloma and some lymphomas.",
    "normal": { "low": 0.54, "high": 2.75 },
    "critical": { "low": null, "high": null },
    "notes": "Also elevated in kidney disease and inflammatory conditions."
  },
  {
    "id": "lab_bleeding_time",
    "testName": "Bleeding Time (Template)",
    "shortName": "Bleeding Time",
    "category": "Coagulation",
    "unit": "minutes",
    "description": "An older test that measures the time it takes for a standardized small cut to stop bleeding. Assesses platelet function.",
    "normal": { "low": null, "high": 8 },
    "critical": { "low": null, "high": null },
    "notes": "Largely replaced by platelet function analyzers (e.g., PFA-100)."
  },
  {
    "id": "lab_bone_specific_alp",
    "testName": "Bone-Specific Alkaline Phosphatase, Serum",
    "shortName": "BSAP",
    "category": "Metabolic",
    "unit": "µg/L",
    "description": "An isoenzyme of ALP that is specific to bone. A marker of bone formation used to monitor diseases like Paget's disease and osteoporosis.",
    "normal": { "low": 4.5, "high": 22.4 },
    "critical": { "low": null, "high": null },
    "notes": "Ranges vary by age and sex."
  },
  {
    "id": "lab_ca19_9",
    "testName": "Carbohydrate Antigen 19-9",
    "shortName": "CA 19-9",
    "category": "Oncology",
    "unit": "U/mL",
    "description": "A tumor marker used to monitor pancreatic and biliary tract cancers.",
    "normal": { "low": 0, "high": 37 },
    "critical": { "low": null, "high": null },
    "notes": "Can be elevated in benign conditions like pancreatitis or bile duct obstruction."
  },
  {
    "id": "lab_ca27_29",
    "testName": "Carbohydrate Antigen 27-29",
    "shortName": "CA 27-29",
    "category": "Oncology",
    "unit": "U/mL",
    "description": "A tumor marker used to monitor for recurrence of breast cancer.",
    "normal": { "low": null, "high": 38.0 },
    "critical": { "low": null, "high": null },
    "notes": "Often used in conjunction with other markers and imaging."
  },
  {
    "id": "lab_carboxyhemoglobin",
    "testName": "Carboxyhemoglobin, Blood",
    "shortName": "COHb",
    "category": "Toxicology",
    "unit": "%",
    "description": "A stable complex of carbon monoxide and hemoglobin. Measured to diagnose carbon monoxide poisoning.",
    "normal": { "low": null, "high": 5 },
    "critical": { "low": null, "high": 25 },
    "notes": "Levels are higher in smokers. Levels >25% are considered severe poisoning."
  },
  {
    "id": "lab_carotene",
    "testName": "Carotene, Serum",
    "shortName": "Carotene",
    "category": "Vitamins",
    "unit": "µg/dL",
    "description": "A precursor to vitamin A. Measured to evaluate nutritional status and fat malabsorption.",
    "normal": { "low": 75, "high": 300 },
    "critical": { "low": null, "high": null },
    "notes": "High levels (carotenemia) can cause yellowing of the skin but are harmless."
  },
  {
    "id": "lab_catecholamines_plasma",
    "testName": "Catecholamines, Plasma",
    "shortName": "Plasma Catecholamines",
    "category": "Endocrinology",
    "unit": "pg/mL",
    "description": "Measures circulating levels of dopamine, epinephrine, and norepinephrine. Used to diagnose pheochromocytoma.",
    "normal": { "low": null, "high": null },
    "critical": { "low": null, "high": null },
    "notes": "Ranges vary by specific catecholamine and patient posture. Largely replaced by plasma or urine metanephrines."
  },
  {
    "id": "lab_catecholamines_urine",
    "testName": "Catecholamines, Urine",
    "shortName": "Urine Catecholamines",
    "category": "Endocrinology",
    "unit": "µg/24 hr",
    "description": "Measures the 24-hour excretion of dopamine, epinephrine, and norepinephrine.",
    "normal": { "low": null, "high": null },
    "critical": { "low": null, "high": null },
    "notes": "Dopamine: 65-400. Epinephrine: 2-24. Norepinephrine: 15-100. Total: 26-121."
  },
  {
    "id": "lab_cd4_count",
    "testName": "CD4 T-Lymphocyte Count",
    "shortName": "CD4",
    "category": "Immunology",
    "unit": "/μL",
    "description": "Measures the number of CD4 T-helper cells. Crucial for monitoring immune status in HIV infection.",
    "normal": { "low": 530, "high": 1570 },
    "critical": { "low": 200, "high": null },
    "notes": "A CD4 count <200 cells/μL in an HIV-positive person defines AIDS."
  },
  {
    "id": "lab_csf_cell_count",
    "testName": "Cell Count, CSF",
    "shortName": "CSF Cells",
    "category": "Neurology",
    "unit": "cells/µL",
    "description": "Measures the number of white and red blood cells in cerebrospinal fluid. Key for diagnosing meningitis.",
    "normal": { "low": 0, "high": 5 },
    "critical": { "low": null, "high": null },
    "notes": "Normal is 0-5 white blood cells (WBCs) and 0 red blood cells (RBCs). Elevated WBCs indicate infection or inflammation."
  },
  {
    "id": "lab_csf_chloride",
    "testName": "Chloride, CSF",
    "shortName": "CSF Cl-",
    "category": "Neurology",
    "unit": "mEq/L",
    "description": "Measures chloride levels in cerebrospinal fluid.",
    "normal": { "low": 120, "high": 130 },
    "critical": { "low": null, "high": null },
    "notes": "Low levels are sometimes seen in bacterial meningitis."
  },
  {
    "id": "lab_cholinesterase",
    "testName": "Cholinesterase, Serum (Pseudocholinesterase)",
    "shortName": "Cholinesterase",
    "category": "Enzymes",
    "unit": "pH unit/hr",
    "description": "An enzyme that breaks down certain anesthetic drugs. Measured to screen for deficiency before surgery.",
    "normal": { "low": null, "high": null },
    "critical": { "low": null, "high": null },
    "notes": "Deficiency can lead to prolonged paralysis after receiving drugs like succinylcholine."
  },
  {
    "id": "lab_chromogranin_a",
    "testName": "Chromogranin A, Serum",
    "shortName": "CgA",
    "category": "Oncology",
    "unit": "ng/mL",
    "description": "A protein released from neuroendocrine cells. A sensitive marker for neuroendocrine tumors (NETs), including carcinoid tumors and pheochromocytoma.",
    "normal": { "low": null, "high": 93 },
    "critical": { "low": null, "high": null },
    "notes": "Proton pump inhibitor use can cause falsely elevated levels."
  },
  {
    "id": "lab_citrate_urine",
    "testName": "Citrate, Urine",
    "shortName": "Urine Citrate",
    "category": "Nephrology",
    "unit": "mg/24 hr",
    "description": "Citrate in the urine inhibits the formation of calcium kidney stones.",
    "normal": { "low": 250, "high": 1000 },
    "critical": { "low": null, "high": null },
    "notes": "Low levels (hypocitraturia) are a risk factor for kidney stones."
  },
  {
    "id": "lab_coagulation_factors",
    "testName": "Coagulation Factors, Plasma",
    "shortName": "Factor Assays",
    "category": "Coagulation",
    "unit": "%",
    "description": "Measures the activity of individual clotting factors (e.g., Factor VIII, IX). Used to diagnose specific factor deficiencies like hemophilia.",
    "normal": { "low": 50, "high": 150 },
    "critical": { "low": null, "high": null },
    "notes": "Normal range for most factors is approximately 50-150% of normal activity."
  },
  {
    "id": "lab_cold_agglutinin_titer",
    "testName": "Cold Agglutinin Titer",
    "shortName": "Cold Agglutinins",
    "category": "Hematology",
    "unit": "titer",
    "description": "Measures antibodies that cause red blood cells to clump together at cold temperatures. Used to diagnose cold agglutinin disease.",
    "normal": { "low": null, "high": 64 },
    "critical": { "low": null, "high": null },
    "notes": "A titer >1:64 is considered positive. Can be associated with Mycoplasma pneumonia and certain lymphomas."
  },
  {
    "id": "lab_complement_ch50",
    "testName": "Complement CH50, Serum",
    "shortName": "CH50",
    "category": "Immunology",
    "unit": "units/mL",
    "description": "A screening test that measures the total activity of the classical complement pathway.",
    "normal": { "low": 110, "high": 190 },
    "critical": { "low": null, "high": null },
    "notes": "Low levels suggest complement consumption (e.g., lupus) or deficiency of a complement component."
  },
  {
    "id": "lab_copper_urine",
    "testName": "Copper, Urine",
    "shortName": "Urine Cu",
    "category": "Trace Metals",
    "unit": "µg/24 hr",
    "description": "Measures the 24-hour excretion of copper. A key test for Wilson's disease.",
    "normal": { "low": 0, "high": 100 },
    "critical": { "low": null, "high": null },
    "notes": "Levels are high in Wilson's disease."
  },
  {
    "id": "lab_coproporphyrin_urine",
    "testName": "Coproporphyrin, Urine",
    "shortName": "Urine Coproporphyrin",
    "category": "Metabolic",
    "unit": "µg/24 hr",
    "description": "Measures a type of porphyrin. Used in the diagnosis of certain porphyrias and lead poisoning.",
    "normal": { "low": 50, "high": 250 },
    "critical": { "low": null, "high": null },
    "notes": ""
  },
  {
    "id": "lab_cortisol_free_urine",
    "testName": "Cortisol, Free, Urine",
    "shortName": "UFC",
    "category": "Endocrinology",
    "unit": "µg/24 hr",
    "description": "Measures the amount of unbound cortisol excreted in the urine over 24 hours. A key screening test for Cushing's syndrome.",
    "normal": { "low": 4, "high": 50 },
    "critical": { "low": null, "high": null },
    "notes": "Elevated levels indicate cortisol excess."
  },
  {
    "id": "lab_cortisol_saliva",
    "testName": "Cortisol, Saliva, 11 PM-Midnight",
    "shortName": "Salivary Cortisol",
    "category": "Endocrinology",
    "unit": "µg/dL",
    "description": "Measures cortisol levels in saliva during its natural low point. A sensitive screening test for Cushing's syndrome.",
    "normal": { "low": null, "high": 0.09 },
    "critical": { "low": null, "high": null },
    "notes": "An elevated late-night salivary cortisol indicates loss of diurnal rhythm and cortisol excess."
  },
  {
    "id": "lab_creatine_urine",
    "testName": "Creatine, Urine",
    "shortName": "Urine Creatine",
    "category": "Metabolic",
    "unit": "mg/24 hr",
    "description": "Measures creatine excretion. Can be elevated in muscle diseases.",
    "normal": { "low": 0, "high": 70 },
    "critical": { "low": null, "high": null },
    "notes": "Range varies by sex (Female: 0-100, Male: 0-40)."
  },
  {
    "id": "lab_creatinine_urine_24hr",
    "testName": "Creatinine, Urine (24-hour)",
    "shortName": "Urine Cr",
    "category": "Renal Function",
    "unit": "mg/kg/24 hr",
    "description": "Measures total creatinine excretion over 24 hours to assess the completeness of the urine collection.",
    "normal": { "low": 15, "high": 25 },
    "critical": { "low": null, "high": null },
    "notes": "Used to validate 24-hour urine collection for other tests."
  },
  {
    "id": "lab_delta_aminolevulinic_acid",
    "testName": "Delta-Aminolevulinic Acid, Serum",
    "shortName": "δ-ALA",
    "category": "Metabolic",
    "unit": "µg/dL",
    "description": "A porphyrin precursor. Elevated levels are seen in acute intermittent porphyria and lead poisoning.",
    "normal": { "low": null, "high": 20 },
    "critical": { "low": null, "high": null },
    "notes": ""
  },
  {
    "id": "lab_dihydrotestosterone",
    "testName": "Dihydrotestosterone, Serum",
    "shortName": "DHT",
    "category": "Endocrinology",
    "unit": "ng/dL",
    "description": "A potent androgen derived from testosterone. Important for male sexual development.",
    "normal": { "low": 25, "high": 80 },
    "critical": { "low": null, "high": null },
    "notes": "Measured to investigate conditions like 5-alpha-reductase deficiency."
  },
  {
    "id": "lab_d_xylose_absorption",
    "testName": "D-Xylose Absorption",
    "shortName": "D-Xylose Test",
    "category": "Gastroenterology",
    "unit": "g/5-hr period",
    "description": "A test to assess for malabsorption by measuring the urinary excretion of D-xylose after an oral dose.",
    "normal": { "low": 4.5, "high": 7.5 },
    "critical": { "low": null, "high": null },
    "notes": "An abnormal result suggests small bowel mucosal disease (e.g., celiac disease). Serum levels can also be checked."
  },
  {
    "id": "lab_epinephrine_plasma",
    "testName": "Epinephrine, Plasma",
    "shortName": "Epi",
    "category": "Endocrinology",
    "unit": "pg/mL",
    "description": "A catecholamine hormone (adrenaline) from the adrenal medulla.",
    "normal": { "low": null, "high": 140 },
    "critical": { "low": null, "high": null },
    "notes": "Levels vary with posture (Supine: <110, Standing: <140)."
  },
  {
    "id": "lab_erythrocyte_count",
    "testName": "Erythrocyte Count",
    "shortName": "RBC Count",
    "category": "Hematology",
    "unit": "million/µL",
    "description": "The number of red blood cells in a volume of blood.",
    "normal": { "low": 4.2, "high": 5.9 },
    "critical": { "low": null, "high": null },
    "notes": "Part of a complete blood count (CBC)."
  },
  {
    "id": "lab_erythrocyte_survival_rate",
    "testName": "Erythrocyte Survival Rate (⁵¹Cr)",
    "shortName": "RBC Survival",
    "category": "Hematology",
    "unit": "days",
    "description": "A nuclear medicine test that measures the lifespan of red blood cells. Used to investigate hemolytic anemias.",
    "normal": { "low": null, "high": null },
    "critical": { "low": null, "high": null },
    "notes": "A half-life (T½) of 28 days is normal. Shortened lifespan indicates hemolysis."
  },
  {
    "id": "lab_estriol_urine",
    "testName": "Estriol, Urine",
    "shortName": "uE3",
    "category": "Obstetrics",
    "unit": "mg/24 hr",
    "description": "An estrogen produced by the placenta during pregnancy. Formerly used to assess fetal well-being.",
    "normal": { "low": 12, "high": null },
    "critical": { "low": null, "high": null },
    "notes": "A value >12 mg/24 hr is expected in late pregnancy. Largely replaced by other monitoring methods."
  },
  {
    "id": "lab_estrogen_receptor_protein",
    "testName": "Estrogen Receptor Protein",
    "shortName": "ER",
    "category": "Oncology",
    "unit": "fmol/mg protein",
    "description": "Measures the presence of estrogen receptors on breast cancer cells. A key prognostic and predictive marker.",
    "normal": { "low": null, "high": 10 },
    "critical": { "low": null, "high": null },
    "notes": "ER-positive tumors are likely to respond to hormone therapy. A value <10 fmol/mg is negative."
  },
  {
    "id": "lab_estrone",
    "testName": "Estrone, Serum",
    "shortName": "E1",
    "category": "Endocrinology",
    "unit": "pg/mL",
    "description": "A weaker estrogen, the primary estrogen after menopause.",
    "normal": { "low": 10, "high": 60 },
    "critical": { "low": null, "high": null },
    "notes": ""
  },
  {
    "id": "lab_ethanol_blood",
    "testName": "Ethanol, Blood",
    "shortName": "ETOH",
    "category": "Toxicology",
    "unit": "mg/dL",
    "description": "Measures the level of alcohol in the blood.",
    "normal": { "low": null, "high": 5 },
    "critical": { "low": null, "high": null },
    "notes": "Legal intoxication is typically defined as ≥80-100 mg/dL (0.08%-0.1%). Coma level >500 mg/dL."
  },
  {
    "id": "lab_euglobulin_clot_lysis_time",
    "testName": "Euglobulin Clot Lysis Time",
    "shortName": "ECLT",
    "category": "Coagulation",
    "unit": "hours",
    "description": "A test for fibrinolytic activity. A shortened time indicates excessive fibrinolysis.",
    "normal": { "low": 2, "high": 4 },
    "critical": { "low": null, "high": null },
    "notes": ""
  },
  {
    "id": "lab_fecal_ph",
    "testName": "Fecal pH",
    "shortName": "Stool pH",
    "category": "Gastroenterology",
    "unit": "pH",
    "description": "Measures the acidity of the stool. Can be used to evaluate for carbohydrate malabsorption.",
    "normal": { "low": 7.0, "high": 7.5 },
    "critical": { "low": null, "high": null },
    "notes": "An acidic stool pH (<6.0) can suggest carbohydrate malabsorption."
  },
  {
    "id": "lab_fibrin_degradation_products",
    "testName": "Fibrin(ogen) Degradation Products",
    "shortName": "FDP",
    "category": "Coagulation",
    "unit": "µg/mL",
    "description": "Substances left behind when clots dissolve. An older test for conditions like disseminated intravascular coagulation (DIC).",
    "normal": { "low": null, "high": 10 },
    "critical": { "low": null, "high": null },
    "notes": "Largely replaced by the more specific D-dimer test."
  },
  {
    "id": "lab_fibroblast_growth_factor_23",
    "testName": "Fibroblast Growth Factor-23, Serum",
    "shortName": "FGF-23",
    "category": "Endocrinology",
    "unit": "RU/mL",
    "description": "A hormone that regulates phosphate and vitamin D metabolism.",
    "normal": { "low": 30, "high": 80 },
    "critical": { "low": null, "high": null },
    "notes": "Elevated in chronic kidney disease and certain rare phosphate-wasting disorders."
  },
  {
    "id": "lab_gamma_globulin_csf",
    "testName": "Gamma Globulin, CSF",
    "shortName": "CSF IgG",
    "category": "Neurology",
    "unit": "mg/dL",
    "description": "Measures immunoglobulin G levels in the cerebrospinal fluid. Used to evaluate for central nervous system inflammation.",
    "normal": { "low": 6.1, "high": 8.3 },
    "critical": { "low": null, "high": null },
    "notes": "Often used to calculate the IgG Index, which is elevated in multiple sclerosis."
  },
  {
    "id": "lab_glycoprotein_a_subunit",
    "testName": "Glycoprotein α-Subunit, Serum",
    "shortName": "α-Subunit",
    "category": "Endocrinology",
    "unit": "ng/mL",
    "description": "A common subunit of pituitary hormones (TSH, LH, FSH, hCG). Can be secreted by pituitary adenomas.",
    "normal": { "low": null, "high": 1 },
    "critical": { "low": null, "high": null },
    "notes": ""
  },
  {
    "id": "lab_hepatic_copper",
    "testName": "Hepatic Copper",
    "shortName": "Liver Cu",
    "category": "Trace Metals",
    "unit": "µg/g dry weight",
    "description": "Measures the copper concentration in a liver biopsy sample. The gold standard for diagnosing Wilson's disease.",
    "normal": { "low": 25, "high": 40 },
    "critical": { "low": null, "high": null },
    "notes": "Levels are significantly elevated in Wilson's disease."
  },
  {
    "id": "lab_hepatic_iron_index",
    "testName": "Hepatic Iron Index",
    "shortName": "HII",
    "category": "Hematology",
    "unit": "index",
    "description": "A calculation based on liver iron concentration and age. Used to diagnose hereditary hemochromatosis.",
    "normal": { "low": null, "high": 1.0 },
    "critical": { "low": null, "high": null },
    "notes": "An index >1.9 is strongly suggestive of homozygous hemochromatosis."
  },
  {
    "id": "lab_histamine_urine",
    "testName": "Histamine Excretion, Urine",
    "shortName": "Urine Histamine",
    "category": "Immunology",
    "unit": "µg/24 hr",
    "description": "Measures the excretion of histamine, a key mediator of allergic reactions. Can be elevated in mastocytosis.",
    "normal": { "low": 20, "high": 50 },
    "critical": { "low": null, "high": null },
    "notes": ""
  },
  {
    "id": "lab_hydroxyproline_urine",
    "testName": "Hydroxyproline, Urine",
    "shortName": "Urine Hydroxyproline",
    "category": "Metabolic",
    "unit": "mg/m²/24 hr",
    "description": "An amino acid that is a major component of collagen. An older marker of bone turnover.",
    "normal": { "low": 10, "high": 30 },
    "critical": { "low": null, "high": null },
    "notes": "Largely replaced by more specific markers like N-telopeptide."
  },
  {
    "id": "lab_immature_platelet_fraction",
    "testName": "Immature Platelet Fraction",
    "shortName": "IPF",
    "category": "Hematology",
    "unit": "%",
    "description": "Measures the percentage of young, large platelets in circulation. Reflects the rate of platelet production.",
    "normal": { "low": 1, "high": 5 },
    "critical": { "low": null, "high": null },
    "notes": "Analogous to the reticulocyte count for red blood cells. High IPF suggests the bone marrow is actively producing platelets."
  },
  {
    "id": "lab_immune_complexes",
    "testName": "Immune Complexes, Serum",
    "shortName": "CIC",
    "category": "Immunology",
    "unit": "µg/dL",
    "description": "Measures circulating antigen-antibody complexes. Can be elevated in autoimmune diseases, infections, and malignancies.",
    "normal": { "low": 0, "high": 50 },
    "critical": { "low": null, "high": null },
    "notes": "Non-specific test."
  },
  {
    "id": "lab_iodine_urine",
    "testName": "Iodine, Urine",
    "shortName": "Urine Iodine",
    "category": "Endocrinology",
    "unit": "µg/L",
    "description": "Measures iodine excretion, reflecting recent iodine intake. Used to assess nutritional iodine status.",
    "normal": { "low": null, "high": null },
    "critical": { "low": null, "high": null },
    "notes": "Value varies. The WHO recommends a median urinary iodine concentration of 100-199 µg/L for a population to be considered iodine sufficient."
  },
  {
    "id": "lab_lactose_tolerance_test",
    "testName": "Lactose Tolerance Test, Oral",
    "shortName": "LTT",
    "category": "Gastroenterology",
    "unit": "mg/dL",
    "description": "Measures the rise in blood glucose after ingesting a lactose load. Used to diagnose lactose intolerance.",
    "normal": { "low": 15, "high": null },
    "critical": { "low": null, "high": null },
    "notes": "A rise in plasma glucose of >15 mg/dL is a normal response. A smaller rise suggests lactose malabsorption."
  },
  {
    "id": "lab_lead_blood",
    "testName": "Lead, Blood",
    "shortName": "Pb",
    "category": "Toxicology",
    "unit": "µg/dL",
    "description": "Measures the level of lead in the blood. Used to screen for and diagnose lead poisoning.",
    "normal": { "low": null, "high": 5.0 },
    "critical": { "low": null, "high": null },
    "notes": "There is no safe level of lead. A value <5.0 µg/dL is the reference range, but any detectable level may warrant action, especially in children."
  },
  {
    "id": "lab_leukocyte_differential",
    "testName": "Leukocyte Differential",
    "shortName": "Diff",
    "category": "Hematology",
    "unit": "%",
    "description": "The percentage of each type of white blood cell in a blood sample.",
    "normal": { "low": null, "high": null },
    "critical": { "low": null, "high": null },
    "notes": "Segmented Neutrophils: 50-70%. Band Forms: 0-5%. Lymphocytes: 30-45%. Monocytes: 0-6%. Basophils: 0-1%. Eosinophils: 0-3%."
  },
  {
    "id": "lab_lymphocyte_subsets",
    "testName": "Lymphocyte Subsets",
    "shortName": "Lymph Panels",
    "category": "Immunology",
    "unit": "/μL",
    "description": "Measures the counts of different types of lymphocytes (e.g., T cells, B cells, NK cells).",
    "normal": { "low": null, "high": null },
    "critical": { "low": null, "high": null },
    "notes": "CD3: 900-3245. CD4: 530-1570. CD8: 430-1060. CD19 (B-cells): 208-590. CD56 (NK-cells): 40-500."
  },
  {
    "id": "lab_magnesium_urine",
    "testName": "Magnesium, Urine",
    "shortName": "Urine Mg",
    "category": "Nephrology",
    "unit": "mg/24 hr",
    "description": "Measures magnesium excretion. Used to evaluate the cause of magnesium deficiency.",
    "normal": { "low": 14, "high": 290 },
    "critical": { "low": null, "high": null },
    "notes": "Low urine magnesium in the setting of deficiency suggests poor intake; high urine magnesium suggests renal wasting."
  },
  {
    "id": "lab_n_telopeptide_urine",
    "testName": "N-Telopeptide, Urine",
    "shortName": "NTx",
    "category": "Metabolic",
    "unit": "nmol BCE/mmol creatinine",
    "description": "A marker of bone resorption (breakdown). Used to monitor response to antiresorptive therapy for osteoporosis.",
    "normal": { "low": 7, "high": 58 },
    "critical": { "low": null, "high": null },
    "notes": "Range varies by sex (Female: 11-48, Male: 7-68)."
  },
  {
    "id": "lab_norepinephrine_plasma",
    "testName": "Norepinephrine, Plasma",
    "shortName": "Norepi",
    "category": "Endocrinology",
    "unit": "pg/mL",
    "description": "A catecholamine hormone and neurotransmitter.",
    "normal": { "low": 70, "high": 1700 },
    "critical": { "low": null, "high": null },
    "notes": "Levels vary with posture (Supine: 70-750, Standing: 200-1700)."
  },
  {
    "id": "lab_osteocalcin",
    "testName": "Osteocalcin, Serum",
    "shortName": "Osteocalcin",
    "category": "Metabolic",
    "unit": "ng/mL",
    "description": "A protein produced by osteoblasts. A marker of bone formation.",
    "normal": { "low": 7.2, "high": 35.4 },
    "critical": { "low": null, "high": null },
    "notes": "Range varies by sex (Female: 7.2-27.9, Male: 11.3-35.4)."
  },
  {
    "id": "lab_oxalate_urine",
    "testName": "Oxalate, Urine",
    "shortName": "Urine Oxalate",
    "category": "Nephrology",
    "unit": "mg/24 hr",
    "description": "Measures oxalate excretion. High levels (hyperoxaluria) are a major risk factor for calcium oxalate kidney stones.",
    "normal": { "low": null, "high": 40 },
    "critical": { "low": null, "high": null },
    "notes": ""
  },
  {
    "id": "lab_parathyroid_hormone_related_protein",
    "testName": "Parathyroid Hormone-Related Protein, Serum",
    "shortName": "PTHrP",
    "category": "Oncology",
    "unit": "pmol/L",
    "description": "A protein that can mimic PTH. Measured to investigate hypercalcemia of malignancy.",
    "normal": { "low": null, "high": 1.5 },
    "critical": { "low": null, "high": null },
    "notes": "Elevated levels are the cause of high calcium in many cancers, particularly squamous cell carcinomas."
  },
  {
    "id": "lab_csf_ph",
    "testName": "pH, Urine",
    "shortName": "Urine pH",
    "category": "Urinalysis",
    "unit": "pH",
    "description": "Measures the acidity or alkalinity of urine.",
    "normal": { "low": 4.5, "high": 8.0 },
    "critical": { "low": null, "high": null },
    "notes": "Can provide clues about kidney stone type and renal tubular acidosis."
  },
  {
    "id": "lab_phospholipids",
    "testName": "Phospholipids, Serum (Total)",
    "shortName": "Phospholipids",
    "category": "Lipids",
    "unit": "mg/dL",
    "description": "A class of lipids that are a major component of all cell membranes.",
    "normal": { "low": 200, "high": 300 },
    "critical": { "low": null, "high": null },
    "notes": "Not a commonly ordered clinical test."
  },
  {
    "id": "lab_phosphorus_urine",
    "testName": "Phosphorus, Urine",
    "shortName": "Urine Phos",
    "category": "Nephrology",
    "unit": "mg/24 hr",
    "description": "Measures phosphorus excretion. Used to evaluate disorders of phosphate metabolism.",
    "normal": { "low": 500, "high": 1200 },
    "critical": { "low": null, "high": null },
    "notes": ""
  },
  {
    "id": "lab_pfa_100",
    "testName": "Platelet Function Analysis (PFA-100)",
    "shortName": "PFA-100",
    "category": "Coagulation",
    "unit": "seconds",
    "description": "An in vitro test of platelet function that measures the time it takes for a platelet plug to form.",
    "normal": { "low": null, "high": null },
    "critical": { "low": null, "high": null },
    "notes": "Collagen/epinephrine closure time: 60-143 seconds. Collagen/ADP closure time: 58-123 seconds. Replaced the bleeding time test."
  },
  {
    "id": "lab_pregnanetriol_urine",
    "testName": "Pregnanetriol, Urine",
    "shortName": "Urine Pregnanetriol",
    "category": "Endocrinology",
    "unit": "mg/24 hr",
    "description": "A metabolite of 17-hydroxyprogesterone. Elevated in certain forms of congenital adrenal hyperplasia (CAH).",
    "normal": { "low": 0.2, "high": 3.5 },
    "critical": { "low": null, "high": null },
    "notes": ""
  },
  {
    "id": "lab_csf_pressure",
    "testName": "Pressure (Opening), CSF",
    "shortName": "Opening Pressure",
    "category": "Neurology",
    "unit": "mm H₂O",
    "description": "The pressure of the cerebrospinal fluid measured during a lumbar puncture.",
    "normal": { "low": 70, "high": 180 },
    "critical": { "low": null, "high": null },
    "notes": "High pressure can be seen in meningitis, intracranial hemorrhage, and idiopathic intracranial hypertension."
  },
  {
    "id": "lab_proinsulin",
    "testName": "Proinsulin, Serum",
    "shortName": "Proinsulin",
    "category": "Endocrinology",
    "unit": "pmol/L",
    "description": "The precursor to insulin. Measured to evaluate hypoglycemia, particularly to diagnose insulinoma.",
    "normal": { "low": 3, "high": 20 },
    "critical": { "low": null, "high": null },
    "notes": "An elevated proinsulin-to-insulin ratio is suggestive of an insulinoma."
  },
  {
    "id": "lab_csf_protein",
    "testName": "Proteins, CSF (Total)",
    "shortName": "CSF Protein",
    "category": "Neurology",
    "unit": "mg/dL",
    "description": "Measures the total protein concentration in cerebrospinal fluid.",
    "normal": { "low": 15, "high": 45 },
    "critical": { "low": null, "high": null },
    "notes": "Elevated levels can indicate infection, inflammation, or tumors. Very high levels are seen in Guillain-Barré syndrome."
  },
  {
    "id": "lab_protein_electrophoresis",
    "testName": "Proteins, Serum (Electrophoresis)",
    "shortName": "SPEP",
    "category": "Hematology",
    "unit": "g/dL",
    "description": "Separates blood proteins into fractions (albumin, alpha, beta, gamma globulins) to identify abnormal proteins.",
    "normal": { "low": null, "high": null },
    "critical": { "low": null, "high": null },
    "notes": "Globulin: 2.0-3.5. Alpha1: 0.2-0.4. Alpha2: 0.5-0.9. Beta: 0.6-1.1. Gamma: 0.7-1.7. Used to detect monoclonal gammopathies like multiple myeloma."
  },
  {
    "id": "lab_protein_creatinine_ratio_urine",
    "testName": "Protein-to-Creatinine Ratio, Urine",
    "shortName": "UPCR",
    "category": "Renal Function",
    "unit": "mg/mg",
    "description": "A spot urine test to estimate 24-hour protein excretion. A key test for proteinuria.",
    "normal": { "low": null, "high": 0.2 },
    "critical": { "low": null, "high": null },
    "notes": "A value <0.2 mg/mg is normal. Higher values indicate significant protein loss via the kidneys."
  },
  {
    "id": "lab_pyruvic_acid_blood",
    "testName": "Pyruvic Acid, Blood",
    "shortName": "Pyruvate",
    "category": "Metabolic",
    "unit": "mmol/L",
    "description": "An intermediate in carbohydrate metabolism.",
    "normal": { "low": 0.08, "high": 0.16 },
    "critical": { "low": null, "high": null },
    "notes": "The lactate-to-pyruvate ratio can be useful in evaluating metabolic disorders."
  },
  {
    "id": "lab_red_cell_mass",
    "testName": "Red Cell Mass",
    "shortName": "RCM",
    "category": "Hematology",
    "unit": "mL/kg",
    "description": "A nuclear medicine test that measures the total volume of red blood cells in the body. The gold standard for diagnosing polycythemia vera.",
    "normal": { "low": 22.7, "high": 32.5 },
    "critical": { "low": null, "high": null },
    "notes": "Range varies by sex (Female: 22.7-27.9, Male: 24.9-32.5)."
  },
  {
    "id": "lab_reptilase_time",
    "testName": "Reptilase Time",
    "shortName": "Reptilase",
    "category": "Coagulation",
    "unit": "seconds",
    "description": "Similar to thrombin time, but is not inhibited by heparin. Used to investigate a prolonged thrombin time.",
    "normal": { "low": 10, "high": 12 },
    "critical": { "low": null, "high": null },
    "notes": ""
  },
  {
    "id": "lab_russell_viper_venom_time",
    "testName": "Russell Viper Venom Time, Dilute",
    "shortName": "dRVVT",
    "category": "Coagulation",
    "unit": "seconds",
    "description": "A laboratory test used to detect lupus anticoagulants.",
    "normal": { "low": 33, "high": 44 },
    "critical": { "low": null, "high": null },
    "notes": "A key test for diagnosing antiphospholipid syndrome (APS)."
  },
  {
    "id": "lab_sperm_density",
    "testName": "Sperm Density",
    "shortName": "Sperm Count",
    "category": "Reproductive",
    "unit": "million/mL",
    "description": "Measures the concentration of sperm in semen. A part of semen analysis for infertility workup.",
    "normal": { "low": 10, "high": 150 },
    "critical": { "low": null, "high": null },
    "notes": "The lower limit of normal by WHO criteria is 15 million/mL."
  },
  {
    "id": "lab_testosterone_bioavailable",
    "testName": "Testosterone, Bioavailable, Serum",
    "shortName": "Bioavailable Test",
    "category": "Endocrinology",
    "unit": "ng/dL",
    "description": "Measures the fraction of testosterone that is not tightly bound to SHBG and is available to tissues.",
    "normal": { "low": 0.5, "high": 8.5 },
    "critical": { "low": null, "high": null },
    "notes": "Considered by some to be a better measure of androgen status than total testosterone."
  },
  {
    "id": "lab_testosterone_free",
    "testName": "Testosterone, Free, Serum",
    "shortName": "Free Test",
    "category": "Endocrinology",
    "unit": "pg/mL",
    "description": "Measures the fraction of testosterone that is not bound to any protein and is fully active.",
    "normal": { "low": 70, "high": 300 },
    "critical": { "low": null, "high": null },
    "notes": "A very small percentage of total testosterone."
  },
  {
    "id": "lab_thyroxine_binding_globulin",
    "testName": "Thyroxine-Binding Globulin, Serum",
    "shortName": "TBG",
    "category": "Endocrinology",
    "unit": "µg/mL",
    "description": "The main protein that binds and transports thyroid hormones in the blood.",
    "normal": { "low": 12, "high": 27 },
    "critical": { "low": null, "high": null },
    "notes": "Levels can be altered by pregnancy, liver disease, and certain medications, affecting total T4 levels."
  },
  {
    "id": "lab_thyroxine_index_free",
    "testName": "Thyroxine Index, Free (Estimate)",
    "shortName": "FTI",
    "category": "Endocrinology",
    "unit": "index",
    "description": "An older calculated estimate of free thyroxine, derived from total T4 and T3 uptake.",
    "normal": { "low": 5, "high": 12 },
    "critical": { "low": null, "high": null },
    "notes": "Largely replaced by direct free T4 immunoassays."
  },
  {
    "id": "lab_triiodothyronine_reverse",
    "testName": "Triiodothyronine, Reverse (Reverse T3)",
    "shortName": "rT3",
    "category": "Endocrinology",
    "unit": "ng/dL",
    "description": "An inactive isomer of T3. Measured to evaluate euthyroid sick syndrome.",
    "normal": { "low": 20, "high": 40 },
    "critical": { "low": null, "high": null },
    "notes": "Levels are elevated in non-thyroidal illness (euthyroid sick syndrome) as the body shunts T4 conversion away from active T3."
  },
  {
    "id": "lab_triiodothyronine_free",
    "testName": "Triiodothyronine, Free (Free T3)",
    "shortName": "fT3",
    "category": "Endocrinology",
    "unit": "pg/mL",
    "description": "Measures the unbound, active form of triiodothyronine.",
    "normal": { "low": 2.3, "high": 4.2 },
    "critical": { "low": null, "high": null },
    "notes": "Can be useful in the diagnosis of hyperthyroidism."
  },
  {
    "id": "lab_troponin_hs",
    "testName": "Troponin, High-Sensitivity, Plasma",
    "shortName": "hs-cTn",
    "category": "Cardiac Markers",
    "unit": "ng/L",
    "description": "A more sensitive version of the troponin test, allowing for earlier detection of myocardial injury.",
    "normal": { "low": null, "high": 17.5 },
    "critical": { "low": null, "high": null },
    "notes": "Ranges vary by specific assay and sex. Example Troponin I: Female ≤15, Male ≤20. Example Troponin T: Female ≤10, Male ≤15."
  },
  {
    "id": "lab_tryptase",
    "testName": "Tryptase, Serum",
    "shortName": "Tryptase",
    "category": "Immunology",
    "unit": "ng/mL",
    "description": "An enzyme released from mast cells. A marker for mast cell activation, used to support a diagnosis of anaphylaxis and to screen for mastocytosis.",
    "normal": { "low": null, "high": 11.5 },
    "critical": { "low": null, "high": null },
    "notes": "Levels peak within a few hours of an anaphylactic event."
  },
  {
    "id": "lab_urea_clearance",
    "testName": "Urea Clearance, Urine",
    "shortName": "Urea Clearance",
    "category": "Renal Function",
    "unit": "mL/min",
    "description": "An older test of kidney function that measures how efficiently urea is cleared from the blood.",
    "normal": { "low": 40, "high": 100 },
    "critical": { "low": null, "high": null },
    "notes": "Largely replaced by creatinine clearance and eGFR."
  },
  {
    "id": "lab_urea_nitrogen_urine",
    "testName": "Urea Nitrogen, Urine",
    "shortName": "UUN",
    "category": "Renal Function",
    "unit": "g/24 hr",
    "description": "Measures the amount of urea excreted in the urine over 24 hours. Used to assess dietary protein intake and nitrogen balance.",
    "normal": { "low": 12, "high": 20 },
    "critical": { "low": null, "high": null },
    "notes": ""
  },
  {
    "id": "lab_uric_acid_urine",
    "testName": "Uric Acid, Urine",
    "shortName": "Urine Uric Acid",
    "category": "Nephrology",
    "unit": "mg/24 hr",
    "description": "Measures uric acid excretion. Used to classify gout patients as overproducers or underexcreters of uric acid.",
    "normal": { "low": 250, "high": 750 },
    "critical": { "low": null, "high": null },
    "notes": "Assumes a normal diet."
  },
  {
    "id": "lab_uroporphyrin_urine",
    "testName": "Uroporphyrin, Urine",
    "shortName": "Urine Uroporphyrin",
    "category": "Metabolic",
    "unit": "µg/24 hr",
    "description": "Measures a type of porphyrin. Used in the diagnosis of porphyria cutanea tarda.",
    "normal": { "low": 10, "high": 30 },
    "critical": { "low": null, "high": null },
    "notes": ""
  },
  {
    "id": "lab_venous_blood_gas",
    "testName": "Venous Studies, Mixed, Blood",
    "shortName": "VBG",
    "category": "Pulmonology",
    "unit": "various",
    "description": "A test of mixed venous blood (from a pulmonary artery catheter) to assess oxygen delivery and consumption.",
    "normal": { "low": null, "high": null },
    "critical": { "low": null, "high": null },
    "notes": "pH: 7.32-7.41; PCO₂: 42-53 mmHg; PO₂: 35-42 mmHg; SvO₂: 65%-75%."
  },
  {
    "id": "lab_vitamin_e",
    "testName": "Vitamin E, Serum",
    "shortName": "Vit E",
    "category": "Vitamins",
    "unit": "mg/L",
    "description": "A fat-soluble vitamin that acts as an antioxidant.",
    "normal": { "low": 5.5, "high": 17.0 },
    "critical": { "low": null, "high": null },
    "notes": "Measured to assess for deficiency or toxicity."
  },
  {
    "id": "lab_blood_volume",
    "testName": "Volume, Blood",
    "shortName": "Blood Volume",
    "category": "Hematology",
    "unit": "mL/kg",
    "description": "A nuclear medicine test that measures the total volume of blood, separated into plasma and red cell volumes.",
    "normal": { "low": null, "high": null },
    "critical": { "low": null, "high": null },
    "notes": "Plasma Volume (Female: 43, Male: 44). Red Cell Volume (Female: 20-30, Male: 25-35)."
  },
  {
    "id": "lab_von_willebrand_factor_activity",
    "testName": "von Willebrand Factor Activity (Ristocetin Cofactor)",
    "shortName": "vWF:RCo",
    "category": "Coagulation",
    "unit": "%",
    "description": "Measures the functional activity of von Willebrand factor, specifically its ability to bind to platelets.",
    "normal": { "low": 50, "high": 150 },
    "critical": { "low": null, "high": null },
    "notes": "A key test for diagnosing and subtyping von Willebrand disease."
  }
];