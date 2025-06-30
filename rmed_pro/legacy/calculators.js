/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import {
  CM_TO_METER,
  LBS_TO_KG,
  INCH_TO_CM,
  UMOL_L_TO_MG_DL_CREATININE,
  UMOL_L_TO_MG_DL_BILIRUBIN,
  UREA_MMOL_L_TO_BUN_MG_DL_FACTOR,
} from './constants.js';

export const commonUnitConfigs = {
  weight: {
    defaultUnit: 'kg',
    supportedUnits: [
      { value: 'kg', label: 'kg', toBaseFactor: 1 },
      { value: 'lbs', label: 'lbs', toBaseFactor: LBS_TO_KG },
    ],
  },
  height: {
    defaultUnit: 'cm',
    supportedUnits: [
      { value: 'cm', label: 'cm', toBaseFactor: 1 },
      { value: 'in', label: 'in', toBaseFactor: INCH_TO_CM },
    ],
  },
  serumCreatinine: {
    defaultUnit: 'mg/dL',
    supportedUnits: [
      { value: 'mg/dL', label: 'mg/dL', toBaseFactor: 1 },
      { value: 'umol/L', label: 'µmol/L', toBaseFactor: 1 / 88.4 },
    ],
  },
  albumin: {
    defaultUnit: 'g/dL',
    supportedUnits: [
      { value: 'g/dL', label: 'g/dL', toBaseFactor: 1 },
      { value: 'g/L', label: 'g/L', toBaseFactor: 0.1 },
    ],
  },
  bilirubin: {
    defaultUnit: 'mg/dL',
    supportedUnits: [
      { value: 'mg/dL', label: 'mg/dL', toBaseFactor: 1 },
      { value: 'umol/L', label: 'µmol/L', toBaseFactor: 1 / 17.1 },
    ],
  },
  sodiumMeqL: {
    defaultUnit: 'mEq/L',
    supportedUnits: [
      { value: 'mEq/L', label: 'mEq/L', toBaseFactor: 1 },
      { value: 'mmol/L', label: 'mmol/L', toBaseFactor: 1 },
    ],
  },
  bunUrea: {
    defaultUnit: 'mg/dL',
    supportedUnits: [
      { value: 'mg/dL', label: 'mg/dL (BUN)', toBaseFactor: 1 },
      { value: 'mmol/L', label: 'mmol/L (Urea)', toBaseFactor: UREA_MMOL_L_TO_BUN_MG_DL_FACTOR },
    ],
  },
  genericMeqL: {
    defaultUnit: 'mEq/L',
    supportedUnits: [
      { value: 'mEq/L', label: 'mEq/L', toBaseFactor: 1 },
    ],
  },
  platelets: {
    defaultUnit: 'x10^9/L',
    supportedUnits: [
      { value: 'x10^9/L', label: 'x10⁹/L', toBaseFactor: 1 },
      { value: 'x10^3/uL', label: 'x10³/µL', toBaseFactor: 1 },
    ],
  },
  enzymeActivity: {
    defaultUnit: 'U/L',
    supportedUnits: [
      { value: 'U/L', label: 'U/L', toBaseFactor: 1 },
    ],
  },
  hemoglobin: {
    defaultUnit: 'g/dL',
    supportedUnits: [
      { value: 'g/dL', label: 'g/dL', toBaseFactor: 1 },
      { value: 'g/L', label: 'g/L', toBaseFactor: 0.1 },
    ],
  },
  wbcCount: {
    defaultUnit: 'x10^3/uL',
    supportedUnits: [
      { value: 'x10^3/uL', label: 'x10³/µL', toBaseFactor: 1000 },
      { value: 'x10^9/L', label: 'x10⁹/L', toBaseFactor: 1000 },
    ],
  },
  rbcCount: {
    defaultUnit: 'x10^6/uL',
    supportedUnits: [
      { value: 'x10^6/uL', label: 'x10⁶/µL', toBaseFactor: 1000000 },
      { value: 'x10^12/L', label: 'x10¹²/L', toBaseFactor: 1000000 },
    ],
  },
  cholesterol: {
    defaultUnit: 'mg/dL',
    supportedUnits: [
      { value: 'mg/dL', label: 'mg/dL', toBaseFactor: 1 },
      { value: 'mmol/L', label: 'mmol/L', toBaseFactor: 38.67 },
    ],
  },
  triglycerides: {
    defaultUnit: 'mg/dL',
    supportedUnits: [
      { value: 'mg/dL', label: 'mg/dL', toBaseFactor: 1 },
      { value: 'mmol/L', label: 'mmol/L', toBaseFactor: 88.57 },
    ],
  },
  glucose: {
    defaultUnit: 'mg/dL',
    supportedUnits: [
      { value: 'mg/dL', label: 'mg/dL', toBaseFactor: 1 },
      { value: 'mmol/L', label: 'mmol/L', toBaseFactor: 18.018 },
    ],
  },
};

export const getConvertedValue = (
  id,
  inputs,
  units,
  config
) => {
  const value = Number(inputs[id]);
  if (isNaN(value)) return undefined;

  const targetUnit = units[id] || config.defaultUnit;
  if (!targetUnit) {
    console.warn(`No unit specified or default unit for ${id}. Assuming base unit.`);
    return value;
  }

  if (!config.supportedUnits || config.supportedUnits.length === 0) return value;

  const unitConf = config.supportedUnits.find(u => u.value === targetUnit);
  if (!unitConf) {
    console.error(`Unit configuration error for ${id} with unit ${targetUnit}. Supported: ${config.supportedUnits.map(u => u.value).join(', ')}`);
    return undefined;
  }
  return value * unitConf.toBaseFactor;
};

export const calculators = [
  {
    id: 'aaGradient',
    name: 'A-a Gradient (Alveolar-arterial)',
    keywords: ['a-a gradient', 'pao2', 'alveolar', 'arterial', 'oxygen', 'gas exchange', 'hypoxemia'],
    inputs: [
      { id: 'pao2', label: 'PaO2 (from ABG)', type: 'number', min: 0, defaultUnit: 'mmHg' },
      { id: 'paco2', label: 'PaCO2 (from ABG)', type: 'number', min: 0, defaultUnit: 'mmHg' },
      { id: 'fio2', label: 'FiO2', type: 'number', min: 21, max: 100, defaultUnit: '%' },
      { id: 'age', label: 'Patient Age', type: 'number', min: 0, defaultUnit: 'years' },
      { id: 'patm', label: 'Atmospheric Pressure (optional)', type: 'number', min: 0, defaultUnit: 'mmHg', placeholder: '760' },
    ],
    calculate: ({ pao2, paco2, fio2, age, patm }) => {
      if ([pao2, paco2, fio2, age].some(v => v === undefined || String(v).trim() === '')) return null;
      const pao2Val = Number(pao2);
      const paco2Val = Number(paco2);
      const fio2Val = Number(fio2);
      const ageVal = Number(age);
      const patmVal = (patm === undefined || String(patm).trim() === '') ? 760 : Number(patm);
      if ([pao2Val, paco2Val, fio2Val, ageVal, patmVal].some(isNaN) || [pao2Val, paco2Val, fio2Val, ageVal, patmVal].some(v => v < 0)) {
        return "Invalid inputs. Ensure all values are non-negative.";
      }

      // PAO2 = (FiO2 * (Patm - PH2O)) - (PaCO2 / R)
      // PH2O = 47 mmHg, R = 0.8
      const paO2 = (fio2Val / 100 * (patmVal - 47)) - (paco2Val / 0.8);
      const aaGradient = paO2 - pao2Val;
      const normalAaGradient = (ageVal / 4) + 4;

      return {
        aaGradient: aaGradient.toFixed(1),
        normalAaGradient: normalAaGradient.toFixed(1)
      };
    },
    resultLabel: 'A-a Gradient',
    resultUnit: { aaGradient: 'mmHg', normalAaGradient: 'mmHg' },
    details: {
      formula: "PAO2 = (FiO2/100 * (Patm - 47)) - (PaCO2 / 0.8)\nA-a Gradient = PAO2 - PaO2\nNormal A-a Gradient ≈ (Age / 4) + 4",
      description: "The Alveolar-arterial (A-a) gradient measures the difference between the oxygen concentration in the alveoli (PAO2) and arterial blood (PaO2). It is used to evaluate the cause of hypoxemia.",
    },
    interpretResult: (result) => {
      if (typeof result !== 'object' || result.aaGradient === undefined) return null;
      const isElevated = Number(result.aaGradient) > Number(result.normalAaGradient);
      let interpretation = `Calculated A-a Gradient is ${result.aaGradient} mmHg. The estimated normal for this age is ${result.normalAaGradient} mmHg. `;
      if (isElevated) {
        interpretation += "This is an ELEVATED gradient, suggesting a V/Q mismatch, diffusion impairment, or shunt as the cause of hypoxemia.";
      } else {
        interpretation += "This is a NORMAL gradient. If hypoxemia is present, consider causes like hypoventilation or low inspired FiO2.";
      }
      return interpretation;
    },
  },
  {
    id: 'aec',
    name: 'Absolute Eosinophil Count (AEC)',
    keywords: ['aec', 'absolute eosinophil count', 'eosinophilia', 'wbc', 'hematology', 'allergy'],
    inputs: [
      { id: 'wbc', label: 'Total WBC Count', type: 'number', min: 0, ...commonUnitConfigs.wbcCount },
      { id: 'eosinophils', label: 'Eosinophils (%)', type: 'number', min: 0, max: 100, defaultUnit: '%' },
    ],
    calculate: (inputs, currentUnits) => {
      const { wbc, eosinophils } = inputs;
      if (wbc === undefined || String(wbc).trim() === '' || eosinophils === undefined || String(eosinophils).trim() === '') return null;
      const wbcVal = getConvertedValue('wbc', { wbc }, currentUnits, commonUnitConfigs.wbcCount);
      const eosinophilsVal = Number(eosinophils);
      if (wbcVal === undefined || isNaN(eosinophilsVal) || wbcVal < 0 || eosinophilsVal < 0) return "Invalid input.";
      if (eosinophilsVal > 100) return "Eosinophils % cannot exceed 100.";
      const aec = wbcVal * (eosinophilsVal / 100);
      return aec;
    },
    resultLabel: 'AEC',
    resultUnit: 'cells/µL',
    details: {
      formula: "AEC = Total WBC (cells/µL) * (% Eosinophils) / 100",
      description: "Calculates the absolute number of eosinophils, which can be elevated in allergic reactions, parasitic infections, and certain inflammatory conditions.",
    },
    interpretResult: (aec) => {
      if (typeof aec !== 'number') return null;
      if (aec > 5000) return `Hypereosinophilia (>5000 cells/µL). Associated with Hypereosinophilic Syndrome and potential end-organ damage.`;
      if (aec > 1500) return `Marked Eosinophilia (1500-5000 cells/µL).`;
      if (aec >= 500) return `Mild to Moderate Eosinophilia (500-1499 cells/µL).`;
      return `Normal Eosinophil Count (<500 cells/µL).`;
    },
  },
  {
    id: 'alc',
    name: 'Absolute Lymphocyte Count (ALC)',
    keywords: ['alc', 'absolute lymphocyte count', 'lymphocytopenia', 'lymphocytosis', 'wbc', 'hematology'],
    inputs: [
      { id: 'wbc', label: 'Total WBC Count', type: 'number', min: 0, ...commonUnitConfigs.wbcCount },
      { id: 'lymphocytes', label: 'Lymphocytes (%)', type: 'number', min: 0, max: 100, defaultUnit: '%' },
    ],
    calculate: (inputs, currentUnits) => {
      const { wbc, lymphocytes } = inputs;
      if (wbc === undefined || String(wbc).trim() === '' || lymphocytes === undefined || String(lymphocytes).trim() === '') return null;
      const wbcVal = getConvertedValue('wbc', { wbc }, currentUnits, commonUnitConfigs.wbcCount);
      const lymphocytesVal = Number(lymphocytes);
      if (wbcVal === undefined || isNaN(lymphocytesVal) || wbcVal < 0 || lymphocytesVal < 0) return "Invalid input.";
      if (lymphocytesVal > 100) return "Lymphocytes % cannot exceed 100.";
      const alc = wbcVal * (lymphocytesVal / 100);
      return alc;
    },
    resultLabel: 'ALC',
    resultUnit: 'cells/µL',
    details: {
      formula: "ALC = Total WBC (cells/µL) * (% Lymphocytes) / 100",
      description: "Calculates the absolute number of lymphocytes, important for assessing immune status and diagnosing various hematologic and infectious diseases.",
    },
    interpretResult: (alc) => {
      if (typeof alc !== 'number') return null;
      if (alc > 4000) return `Lymphocytosis (>4000 cells/µL in adults). Consider viral infections, CLL, etc.`;
      if (alc < 1000) return `Lymphocytopenia (<1000 cells/µL in adults). Consider immunodeficiencies, steroid use, infections (e.g., HIV), etc.`;
      return `Normal Lymphocyte Count (1000-4000 cells/µL in adults). Range can vary by age.`;
    },
  },
  {
    id: 'anc',
    name: 'Absolute Neutrophil Count (ANC)',
    keywords: ['anc', 'absolute neutrophil count', 'neutropenia', 'wbc', 'hematology'],
    inputs: [
      { id: 'wbc', label: 'Total WBC Count', type: 'number', min: 0, ...commonUnitConfigs.wbcCount },
      { id: 'neutrophils', label: 'Neutrophils (%)', type: 'number', min: 0, max: 100, defaultUnit: '%' },
      { id: 'bands', label: 'Bands (%) (optional)', type: 'number', min: 0, max: 100, defaultUnit: '%', placeholder: '0' },
    ],
    calculate: (inputs, currentUnits) => {
      const { wbc, neutrophils, bands } = inputs;
      if (wbc === undefined || String(wbc).trim() === '' || neutrophils === undefined || String(neutrophils).trim() === '') return null;
      const wbcVal = getConvertedValue('wbc', { wbc }, currentUnits, commonUnitConfigs.wbcCount);
      const neutrophilsVal = Number(neutrophils);
      const bandsVal = (bands === undefined || String(bands).trim() === '') ? 0 : Number(bands);

      if (wbcVal === undefined || isNaN(neutrophilsVal) || isNaN(bandsVal) || wbcVal < 0 || neutrophilsVal < 0 || bandsVal < 0) return "Invalid input.";
      if ((neutrophilsVal + bandsVal) > 100) return "Neutrophils + Bands cannot exceed 100%.";

      const anc = wbcVal * ((neutrophilsVal + bandsVal) / 100);
      return anc;
    },
    resultLabel: 'ANC',
    resultUnit: 'cells/µL',
    details: {
      formula: "ANC = Total WBC (cells/µL) * (% Neutrophils + % Bands) / 100",
      description: "Calculates the absolute number of neutrophils, crucial for assessing infection risk, especially in chemotherapy patients.",
    },
    interpretResult: (anc) => {
      if (typeof anc !== 'number') return null;
      if (anc < 500) return `Severe Neutropenia (<500 cells/µL). High risk of infection.`;
      if (anc < 1000) return `Moderate Neutropenia (500-1000 cells/µL). Moderate risk of infection.`;
      if (anc < 1500) return `Mild Neutropenia (1000-1500 cells/µL). Mild risk of infection.`;
      return `Normal Neutrophil Count (≥1500 cells/µL). Normal risk of infection.`;
    },
  },
  {
    id: 'adamScreener',
    name: 'ADAM Questionnaire for Androgen Deficiency',
    keywords: ['adam', 'androgen deficiency', 'hypogonadism', 'testosterone', 'male health'],
    inputs: [
      { id: 'q1', label: '1. Do you have a decrease in libido (sex drive)?', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes' }] },
      { id: 'q2', label: '2. Do you have a lack of energy?', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes' }] },
      { id: 'q3', label: '3. Do you have a decrease in strength and/or endurance?', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes' }] },
      { id: 'q4', label: '4. Have you lost height?', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes' }] },
      { id: 'q5', label: '5. Have you noticed a decreased enjoyment of life?', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes' }] },
      { id: 'q6', label: '6. Are you sad and/or grumpy?', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes' }] },
      { id: 'q7', label: '7. Are your erections less strong?', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes' }] },
      { id: 'q8', label: '8. Have you noticed a recent deterioration in your ability to play sports?', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes' }] },
      { id: 'q9', label: '9. Are you falling asleep after dinner?', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes' }] },
      { id: 'q10', label: '10. Has there been a recent deterioration in your work performance?', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes' }] },
    ],
    calculate: (inputs) => {
      const q1 = Number(inputs.q1);
      const q7 = Number(inputs.q7);
      if (q1 === undefined || q7 === undefined) return null;

      let otherYesCount = 0;
      const otherQuestions = ['q2', 'q3', 'q4', 'q5', 'q6', 'q8', 'q9', 'q10'];
      for (const key of otherQuestions) {
        if (inputs[key] === undefined) return null;
        if (Number(inputs[key]) === 1) {
          otherYesCount++;
        }
      }

      if (q1 === 1 || q7 === 1 || otherYesCount >= 3) {
        return "Positive";
      }
      return "Negative";
    },
    resultLabel: 'Screening Result',
    resultUnit: '',
    details: {
      description: "The Androgen Deficiency in Aging Males (ADAM) questionnaire is a screening tool for symptoms of low testosterone levels (hypogonadism). It is not a diagnostic tool on its own.",
    },
    interpretResult: (result) => {
      if (typeof result !== 'string') return null;
      if (result === "Positive") {
        return `Positive Screen. This suggests that symptoms consistent with androgen deficiency are present. Further evaluation with a morning total testosterone level is recommended.`;
      }
      return `Negative Screen. Symptoms reported are less likely to be due to androgen deficiency. However, this does not rule it out if clinical suspicion is high.`;
    },
  },
  {
    id: 'adjbw',
    name: 'Adjusted Body Weight (AdjBW)',
    keywords: ['adjbw', 'adjusted body weight', 'dosing weight', 'obesity'],
    inputs: [
      { id: 'actualWeight', label: 'Actual Weight', type: 'number', min: 0, step: "0.1", ...commonUnitConfigs.weight },
      { id: 'height', label: 'Height', type: 'number', min: 0, step: "0.1", ...commonUnitConfigs.height },
      { id: 'gender', label: 'Gender', type: 'select', defaultUnit: 'male', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }] },
    ],
    calculate: ({ actualWeight, height, gender }, currentUnits) => {
      if (actualWeight === undefined || String(actualWeight).trim() === '' || Number(actualWeight) <= 0 || height === undefined || String(height).trim() === '' || Number(height) <= 0 || gender === undefined) return null;

      const actualWeightInKg = getConvertedValue('actualWeight', { actualWeight }, currentUnits, commonUnitConfigs.weight);
      const heightInCm = getConvertedValue('height', { height }, currentUnits, commonUnitConfigs.height);

      if (actualWeightInKg === undefined || heightInCm === undefined) return "Input or Unit error";

      const heightInInches = heightInCm / INCH_TO_CM;

      let ibw = 0;
      if (heightInInches <= 60) {
        return "Height should be > 5 feet for IBW calculation, which is needed for AdjBW.";
      }

      if (gender === 'male') {
        ibw = 50 + 2.3 * (heightInInches - 60);
      } else if (gender === 'female') {
        ibw = 45.5 + 2.3 * (heightInInches - 60);
      }
      ibw = Math.max(0, ibw);

      if (actualWeightInKg > ibw) {
        return ibw + 0.4 * (actualWeightInKg - ibw);
      }
      return actualWeightInKg;
    },
    resultLabel: 'AdjBW',
    resultUnit: 'kg',
    details: {
      formula: "AdjBW = IBW + 0.4 * (Actual Weight - IBW)",
      notes: "If Actual Weight ≤ IBW, then AdjBW = Actual Weight. IBW is calculated using Devine formula.",
    },
  },
  {
    id: 'anionGap',
    name: 'Anion Gap',
    keywords: ['anion gap', 'acidosis', 'metabolic acidosis', 'electrolytes'],
    inputs: [
      { id: 'sodium', label: 'Sodium (Na+)', type: 'number', min: 0, ...commonUnitConfigs.sodiumMeqL },
      { id: 'chloride', label: 'Chloride (Cl-)', type: 'number', min: 0, ...commonUnitConfigs.genericMeqL },
      { id: 'bicarbonate', label: 'Bicarbonate (HCO3-)', type: 'number', min: 0, ...commonUnitConfigs.genericMeqL },
    ],
    calculate: (inputs, currentUnits) => {
      const { sodium, chloride, bicarbonate } = inputs;
      if (sodium === undefined || String(sodium).trim() === '' || chloride === undefined || String(chloride).trim() === '' || bicarbonate === undefined || String(bicarbonate).trim() === '') return null;

      const na = getConvertedValue('sodium', { sodium }, currentUnits, commonUnitConfigs.sodiumMeqL);
      const cl = getConvertedValue('chloride', { chloride }, currentUnits, commonUnitConfigs.genericMeqL);
      const hco3 = getConvertedValue('bicarbonate', { bicarbonate }, currentUnits, commonUnitConfigs.genericMeqL);

      if (na === undefined || cl === undefined || hco3 === undefined) return "Input or Unit error.";
      if (na < 0 || cl < 0 || hco3 < 0) return "Values cannot be negative.";

      return na - (cl + hco3);
    },
    resultLabel: 'Anion Gap',
    resultUnit: 'mEq/L',
    details: {
      formula: "Anion Gap = Na+ - (Cl- + HCO3-)",
      notes: "Normal range is typically 8-12 mEq/L (without K+) or 12-16 mEq/L (if K+ included). This calculator does not use K+.",
    },
    interpretResult: (gap) => {
      if (typeof gap !== 'number') return null;
      if (gap > 12) return `Elevated Anion Gap (${gap.toFixed(1)} mEq/L). Consider MUDPILES: Methanol, Uremia, DKA, Propylene glycol, Isoniazid/Iron, Lactic acidosis, Ethylene glycol, Salicylates. Albumin correction may be needed.`;
      if (gap < 8) return `Low Anion Gap (${gap.toFixed(1)} mEq/L). Consider hypoalbuminemia, paraproteinemia, bromide intoxication, or lab error.`;
      return `Normal Anion Gap (${gap.toFixed(1)} mEq/L). (Reference range typically 8-12 mEq/L).`;
    },
  },
  {
    id: 'apgar',
    name: 'Apgar Score',
    keywords: ['apgar', 'newborn', 'infant', 'obstetrics', 'pediatrics'],
    inputs: [
      { id: 'appearance', label: 'Appearance (Skin Color)', type: 'select', defaultUnit: '2', options: [
        { value: 0, label: 'Blue or pale all over (0 pts)' },
        { value: 1, label: 'Body pink, extremities blue (Acrocyanosis) (1 pt)' },
        { value: 2, label: 'Completely pink (2 pts)' },
      ]},
      { id: 'pulse', label: 'Pulse (Heart Rate)', type: 'select', defaultUnit: '2', options: [
        { value: 0, label: 'Absent (0 pts)' },
        { value: 1, label: '< 100 bpm (1 pt)' },
        { value: 2, label: '≥ 100 bpm (2 pts)' },
      ]},
      { id: 'grimace', label: 'Grimace (Reflex Irritability)', type: 'select', defaultUnit: '2', options: [
        { value: 0, label: 'No response (0 pts)' },
        { value: 1, label: 'Grimace (1 pt)' },
        { value: 2, label: 'Cries, coughs, or sneezes (2 pts)' },
      ]},
      { id: 'activity', label: 'Activity (Muscle Tone)', type: 'select', defaultUnit: '2', options: [
        { value: 0, label: 'Limp (0 pts)' },
        { value: 1, label: 'Some flexion of extremities (1 pt)' },
        { value: 2, label: 'Active motion (2 pts)' },
      ]},
      { id: 'respiration', label: 'Respiration (Breathing Effort)', type: 'select', defaultUnit: '2', options: [
        { value: 0, label: 'Absent (0 pts)' },
        { value: 1, label: 'Slow, irregular, weak cry (1 pt)' },
        { value: 2, label: 'Good, strong cry (2 pts)' },
      ]},
    ],
    calculate: ({ appearance, pulse, grimace, activity, respiration }) => {
      if ([appearance, pulse, grimace, activity, respiration].some(v => v === undefined)) return null;
      return Number(appearance) + Number(pulse) + Number(grimace) + Number(activity) + Number(respiration);
    },
    resultLabel: 'Apgar Score',
    resultUnit: 'points',
    details: {
      description: "The Apgar score is a quick assessment of a newborn's health immediately after birth, based on five criteria. It is typically assessed at 1 and 5 minutes after birth.",
    },
    interpretResult: (score) => {
      if (typeof score !== 'number') return null;
      if (score >= 7) return `Score: ${score}. Normal. Routine care.`;
      if (score >= 4) return `Score: ${score}. Moderately abnormal. Some resuscitation assistance may be needed (e.g., stimulation, oxygen).`;
      return `Score: ${score}. Low. Immediate resuscitation required.`;
    },
  },
  {
    id: 'audit',
    name: 'AUDIT Score (Alcohol Use Disorders Identification Test)',
    keywords: ['audit', 'alcohol', 'screening', 'substance use'],
    inputs: [
      ...[
        { id: 'q1', label: '1. How often do you have a drink containing alcohol?', options: [{ value: 0, label: 'Never' }, { value: 1, label: 'Monthly or less' }, { value: 2, label: '2-4 times a month' }, { value: 3, label: '2-3 times a week' }, { value: 4, label: '4 or more times a week' }] },
        { id: 'q2', label: '2. How many standard drinks containing alcohol do you have on a typical day when you are drinking?', options: [{ value: 0, label: '1 or 2' }, { value: 1, label: '3 or 4' }, { value: 2, label: '5 or 6' }, { value: 3, label: '7 to 9' }, { value: 4, label: '10 or more' }] },
        { id: 'q3', label: '3. How often do you have six or more standard drinks on one occasion?', options: [{ value: 0, label: 'Never' }, { value: 1, label: 'Less than monthly' }, { value: 2, label: 'Monthly' }, { value: 3, label: 'Weekly' }, { value: 4, label: 'Daily or almost daily' }] },
        { id: 'q4', label: '4. How often during the last year have you found that you were not able to stop drinking once you had started?', options: [{ value: 0, label: 'Never' }, { value: 1, label: 'Less than monthly' }, { value: 2, label: 'Monthly' }, { value: 3, label: 'Weekly' }, { value: 4, label: 'Daily or almost daily' }] },
        { id: 'q5', label: '5. How often during the last year have you failed to do what was normally expected from you because of drinking?', options: [{ value: 0, label: 'Never' }, { value: 1, label: 'Less than monthly' }, { value: 2, label: 'Monthly' }, { value: 3, label: 'Weekly' }, { value: 4, label: 'Daily or almost daily' }] },
        { id: 'q6', label: '6. How often during the last year have you needed a first drink in the morning to get yourself going after a heavy drinking session?', options: [{ value: 0, label: 'Never' }, { value: 1, label: 'Less than monthly' }, { value: 2, label: 'Monthly' }, { value: 3, label: 'Weekly' }, { value: 4, label: 'Daily or almost daily' }] },
        { id: 'q7', label: '7. How often during the last year have you had a feeling of guilt or remorse after drinking?', options: [{ value: 0, label: 'Never' }, { value: 1, label: 'Less than monthly' }, { value: 2, label: 'Monthly' }, { value: 3, label: 'Weekly' }, { value: 4, label: 'Daily or almost daily' }] },
        { id: 'q8', label: '8. How often during the last year have you been unable to remember what happened the night before because you had been drinking?', options: [{ value: 0, label: 'Never' }, { value: 1, label: 'Less than monthly' }, { value: 2, label: 'Monthly' }, { value: 3, label: 'Weekly' }, { value: 4, label: 'Daily or almost daily' }] },
        { id: 'q9', label: '9. Have you or someone else been injured as a result of your drinking?', options: [{ value: 0, label: 'No' }, { value: 2, label: 'Yes, but not in the last year' }, { value: 4, label: 'Yes, during the last year' }] },
        { id: 'q10', label: '10. Has a relative or friend or a doctor or another health worker been concerned about your drinking or suggested you cut down?', options: [{ value: 0, label: 'No' }, { value: 2, label: 'Yes, but not in the last year' }, { value: 4, label: 'Yes, during the last year' }] },
      ].map(q => ({ ...q, type: 'select', defaultUnit: '0' }))
    ],
    calculate: (inputs) => {
      let totalScore = 0;
      for (let i = 1; i <= 10; i++) {
        const val = Number(inputs[`q${i}`]);
        if (isNaN(val) || inputs[`q${i}`] === undefined) return null;
        totalScore += val;
      }
      return totalScore;
    },
    resultLabel: 'AUDIT Score',
    resultUnit: 'points',
    details: {
      description: "The Alcohol Use Disorders Identification Test (AUDIT) is a 10-item questionnaire developed by the World Health Organization (WHO) to screen for hazardous and harmful alcohol use, and possible alcohol dependence.",
    },
    interpretResult: (score) => {
      if (typeof score !== 'number') return null;
      if (score <= 7) return `Zone I (0-7 points): Low risk. Alcohol education.`;
      if (score <= 15) return `Zone II (8-15 points): Hazardous use. Simple advice.`;
      if (score <= 19) return `Zone III (16-19 points): Harmful use. Simple advice plus brief counseling and continued monitoring.`;
      return `Zone IV (20-40 points): Likely alcohol dependence. Referral to specialist for diagnostic evaluation and treatment.`;
    },
  },
  {
    id: 'bmi',
    name: 'Body Mass Index (BMI)',
    keywords: ['bmi', 'body mass index', 'obesity', 'weight status'],
    inputs: [
      { id: 'weight', label: 'Weight', type: 'number', min: 0, step: "0.1", ...commonUnitConfigs.weight },
      { id: 'height', label: 'Height', type: 'number', min: 0, step: "0.1", ...commonUnitConfigs.height },
    ],
    calculate: ({ weight, height }, currentUnits) => {
      if (weight === undefined || height === undefined || String(weight).trim() === '' || String(height).trim() === '' || Number(height) <= 0 || Number(weight) <= 0) return null;

      const weightInKg = getConvertedValue('weight', { weight }, currentUnits, commonUnitConfigs.weight);
      const heightInCm = getConvertedValue('height', { height }, currentUnits, commonUnitConfigs.height);

      if (weightInKg === undefined || heightInCm === undefined || heightInCm <= 0) return "Input or Unit error";

      const heightInMeters = heightInCm * CM_TO_METER;
      if (heightInMeters === 0) return null;
      return weightInKg / (heightInMeters * heightInMeters);
    },
    resultLabel: 'BMI',
    resultUnit: 'kg/m²',
    details: {
      formula: "BMI = weight (kg) / (height (m))^2",
      description: "Body Mass Index is a measure of body fat based on an individual's weight and height.",
    },
    interpretResult: (bmi) => {
      if (typeof bmi !== 'number') return null;
      if (bmi < 18.5) return `Underweight (< 18.5 kg/m²)`;
      if (bmi < 25) return `Normal weight (18.5 - 24.9 kg/m²)`;
      if (bmi < 30) return `Overweight (25 - 29.9 kg/m²)`;
      if (bmi < 35) return `Obesity Class I (30 - 34.9 kg/m²)`;
      if (bmi < 40) return `Obesity Class II (35 - 39.9 kg/m²)`;
      return `Obesity Class III (≥ 40 kg/m²)`;
    },
  },
  {
    id: 'bmrTdee',
    name: 'BMR & TDEE (Mifflin-St Jeor)',
    keywords: ['bmr', 'tdee', 'calories', 'energy expenditure', 'mifflin', 'diet', 'nutrition'],
    inputs: [
      { id: 'age', label: 'Age', type: 'number', min: 0, step: "1", defaultUnit: 'years' },
      {
        id: 'gender', label: 'Gender', type: 'select', defaultUnit: 'male', options: [
          { value: 'male', label: 'Male' }, { value: 'female', label: 'Female' },
        ],
      },
      { id: 'height', label: 'Height', type: 'number', min: 0, step: "0.1", ...commonUnitConfigs.height },
      { id: 'weight', label: 'Weight', type: 'number', min: 0, step: "0.1", ...commonUnitConfigs.weight },
      {
        id: 'activityLevel', label: 'Activity Level', type: 'select', defaultUnit: '1.2', options: [
          { value: '1.2', label: 'Sedentary (little or no exercise)' },
          { value: '1.375', label: 'Lightly active (light exercise/sports 1-3 days/week)' },
          { value: '1.55', label: 'Moderately active (moderate exercise/sports 3-5 days/week)' },
          { value: '1.725', label: 'Very active (hard exercise/sports 6-7 days a week)' },
          { value: '1.9', label: 'Super active (very hard exercise/sports & physical job or 2x training)' },
        ],
      },
    ],
    calculate: ({ age, gender, height, weight, activityLevel }, currentUnits) => {
      if ([age, gender, height, weight, activityLevel].some(val => val === undefined || String(val).trim() === '')) return null;

      const ageVal = Number(age);
      const weightInKg = getConvertedValue('weight', { weight }, currentUnits, commonUnitConfigs.weight);
      const heightInCm = getConvertedValue('height', { height }, currentUnits, commonUnitConfigs.height);
      const activityFactor = Number(activityLevel);

      if (isNaN(ageVal) || weightInKg === undefined || heightInCm === undefined || isNaN(activityFactor) || ageVal <= 0 || weightInKg <= 0 || heightInCm <= 0) {
        return "Invalid inputs. Ensure all values are positive and correctly entered.";
      }

      let bmr;
      if (gender === 'male') {
        bmr = (10 * weightInKg) + (6.25 * heightInCm) - (5 * ageVal) + 5;
      } else { // female
        bmr = (10 * weightInKg) + (6.25 * heightInCm) - (5 * ageVal) - 161;
      }
      bmr = Math.max(0, bmr);
      const tdee = bmr * activityFactor;

      return { bmr, tdee };
    },
    resultLabel: 'Caloric Needs',
    resultUnit: { bmr: 'kcal/day', tdee: 'kcal/day' }, // Object for multiple result units
    details: {
      formula: "Mifflin-St Jeor Equation:\nMen: BMR = (10 * W) + (6.25 * H) - (5 * A) + 5\nWomen: BMR = (10 * W) + (6.25 * H) - (5 * A) - 161\n(W=weight in kg, H=height in cm, A=age in years)\nTDEE = BMR * Activity Factor",
      activityLevels: [
        "Sedentary: BMR x 1.2",
        "Lightly active: BMR x 1.375",
        "Moderately active: BMR x 1.55",
        "Very active: BMR x 1.725",
        "Super active: BMR x 1.9",
      ],
      description: "Basal Metabolic Rate (BMR) is the number of calories your body needs to accomplish its most basic (basal) life-sustaining functions. Total Daily Energy Expenditure (TDEE) is an estimation of how many calories you burn per day when exercise is taken into account.",
    },
    interpretResult: (result, inputs) => {
      if (typeof result !== 'object' || !result.tdee) return null;
      const { totalCalories } = inputs;
      return `Your estimated TDEE is ${result.tdee.toFixed(0)} kcal/day. For weight maintenance, aim for this amount. For weight loss (approx. 0.25-0.5 kg/week or 0.5-1 lb/week), consider a deficit of 250-500 kcal/day from TDEE. For weight gain, consider a surplus of 250-500 kcal/day. These are general estimates. Consult a healthcare professional or registered dietitian for personalized advice.`;
    },
  },
  {
    id: 'bristolStool',
    name: 'Bristol Stool Scale',
    keywords: ['bristol stool scale', 'poop chart', 'feces type', 'gastroenterology', 'bowel movement'],
    inputs: [
      {
        id: 'stoolType', label: 'Stool Type', type: 'select', defaultUnit: '4', options: [
          { value: 1, label: 'Type 1: Separate hard lumps, like nuts (hard to pass)' },
          { value: 2, label: 'Type 2: Sausage-shaped, but lumpy' },
          { value: 3, label: 'Type 3: Like a sausage but with cracks on its surface' },
          { value: 4, label: 'Type 4: Like a sausage or snake, smooth and soft' },
          { value: 5, label: 'Type 5: Soft blobs with clear-cut edges (passed easily)' },
          { value: 6, label: 'Type 6: Fluffy pieces with ragged edges, a mushy stool' },
          { value: 7, label: 'Type 7: Watery, no solid pieces (entirely liquid)' },
        ],
      },
    ],
    calculate: ({ stoolType }) => {
      if (stoolType === undefined) return null;
      return Number(stoolType);
    },
    resultLabel: 'Bristol Stool Type',
    resultUnit: '',
    details: {
      description: "The Bristol Stool Form Scale is a diagnostic medical tool designed to classify the form of human faeces into seven categories.",
    },
    interpretResult: (type) => {
      if (typeof type !== 'number') return null;
      let interpretation = `Type ${type}: `;
      if (type === 1) interpretation += "Severe constipation";
      else if (type === 2) interpretation += "Mild constipation";
      else if (type === 3) interpretation += "Normal";
      else if (type === 4) interpretation += "Normal";
      else if (type === 5) interpretation += "Lacking fibre / Mild diarrhea";
      else if (type === 6) interpretation += "Mild diarrhea";
      else if (type === 7) interpretation += "Severe diarrhea";
      else return "Invalid type selected.";
      return interpretation;
    },
  },
  {
    id: 'chadsvasc',
    name: 'CHA₂DS₂-VASc Score for Stroke Risk in AFib',
    keywords: ['chadsvasc', 'stroke risk', 'atrial fibrillation', 'afib', 'anticoagulation'],
    inputs: [
      { id: 'chf', label: 'Congestive Heart Failure history', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes' }] },
      { id: 'htn', label: 'Hypertension history', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes' }] },
      {
        id: 'ageChadsvasc', label: 'Age', type: 'select', defaultUnit: '0', options: [
          { value: 0, label: '< 65 years' }, { value: 1, label: '65-74 years' }, { value: 2, label: '≥ 75 years' },
        ],
      },
      { id: 'diabetes', label: 'Diabetes Mellitus history', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes' }] },
      { id: 'stroke', label: 'Prior Stroke/TIA/Thromboembolism', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 2, label: 'Yes' }] },
      { id: 'vascular', label: 'Vascular Disease (prior MI, PAD, or aortic plaque)', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes' }] },
      { id: 'genderChadsvasc', label: 'Sex Category (Female)', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'Male' }, { value: 1, label: 'Female' }] },
    ],
    calculate: (inputs) => {
      let score = 0;
      const inputKeys = ['chf', 'htn', 'ageChadsvasc', 'diabetes', 'stroke', 'vascular', 'genderChadsvasc'];
      for (const key of inputKeys) {
        const val = Number(inputs[key]);
        if (isNaN(val) || inputs[key] === undefined) return null;
        score += val;
      }
      return score;
    },
    resultLabel: 'CHA₂DS₂-VASc Score',
    resultUnit: 'points',
    details: {
      criteria: "C: CHF(1), H: HTN(1), A₂: Age ≥75(2), D: Diabetes(1), S₂: Stroke/TIA/TE(2), V: Vascular disease(1), A: Age 65-74(1), Sc: Sex category (female)(1).",
      description: "CHA₂DS₂-VASc score estimates stroke risk in patients with non-valvular atrial fibrillation.",
    },
    interpretResult: (score, inputs) => {
      if (typeof score !== 'number' || !inputs) return null;
      let risk = "";
      const isFemale = Number(inputs.genderChadsvasc) === 1;

      if (!isFemale && score === 0) { risk = "Low (Consider no antithrombotic therapy)"; }
      else if (isFemale && score === 1) { risk = "Low (Consider no antithrombotic therapy if sex is the only risk factor)"; }
      else if ((!isFemale && score === 1) || (isFemale && score === 2)) { risk = "Moderate (Consider oral anticoagulant)"; }
      else if (score >= 2 && !isFemale) { risk = "High (Oral anticoagulant recommended)"; }
      else if (score >= 3 && isFemale) { risk = "High (Oral anticoagulant recommended)"; }
      else {
        if (score === 0 && isFemale) risk = "Low risk (if sex is only risk factor, consider none)";
        else if (score === 0) risk = "Low risk";
        else if (score === 1 && !isFemale) risk = "Consider OAC";
        else if (score === 1 && isFemale) risk = "Low risk if sex is sole factor, otherwise consider OAC";
        else risk = "Oral anticoagulant generally recommended";
      }

      const strokeRiskPercent = ["0.2%", "0.6%", "1.3%", "2.2%", "3.2%", "4.8%", "7.2%", "9.6%", "9.8%", "10.0%"]; // Simplified approx values
      let annualRisk = strokeRiskPercent[Math.min(score, strokeRiskPercent.length - 1)];

      return `Score: ${score}. Approx. Annual Stroke Risk: ${annualRisk}. Recommendation: ${risk}. Anticoagulation decisions should be individualized.`;
    },
  },
  {
    id: 'childPugh',
    name: 'Child-Pugh Score for Liver Cirrhosis Severity',
    keywords: ['child pugh', 'liver cirrhosis', 'hepatic function', 'prognosis'],
    inputs: [
      {
        id: 'bilirubin', label: 'Total Bilirubin', type: 'select', defaultUnit: '1', ...commonUnitConfigs.bilirubin,
        options: [
          { value: 1, label: '< 2 mg/dL (< 34 µmol/L)' },
          { value: 2, label: '2-3 mg/dL (34-51 µmol/L)' },
          { value: 3, label: '> 3 mg/dL (> 51 µmol/L)' },
        ],
      },
      {
        id: 'albumin', label: 'Serum Albumin', type: 'select', defaultUnit: '1', ...commonUnitConfigs.albumin,
        options: [
          { value: 1, label: '> 3.5 g/dL (> 35 g/L)' },
          { value: 2, label: '2.8-3.5 g/dL (28-35 g/L)' },
          { value: 3, label: '< 2.8 g/dL (< 28 g/L)' },
        ],
      },
      {
        id: 'inr', label: 'INR', type: 'select', defaultUnit: '1',
        options: [
          { value: 1, label: '< 1.7' },
          { value: 2, label: '1.7-2.3' },
          { value: 3, label: '> 2.3' },
        ],
      },
      {
        id: 'ascites', label: 'Ascites', type: 'select', defaultUnit: '1',
        options: [
          { value: 1, label: 'None' },
          { value: 2, label: 'Slight/Suppressed with Diuretics' },
          { value: 3, label: 'Moderate/Resistant to Diuretics' },
        ],
      },
      {
        id: 'encephalopathy', label: 'Hepatic Encephalopathy', type: 'select', defaultUnit: '1',
        options: [
          { value: 1, label: 'None (Grade 0)' },
          { value: 2, label: 'Grade 1-2 (Mild/Moderate)' },
          { value: 3, label: 'Grade 3-4 (Severe)' },
        ],
      },
    ],
    calculate: ({ bilirubin, albumin, inr, ascites, encephalopathy }) => {
      const totalPoints = Number(bilirubin) + Number(albumin) + Number(inr) + Number(ascites) + Number(encephalopathy);
      if (isNaN(totalPoints) || totalPoints < 5 || [bilirubin, albumin, inr, ascites, encephalopathy].some(v => v === undefined)) return null;
      return totalPoints;
    },
    resultLabel: 'Child-Pugh Score',
    resultUnit: 'points',
    details: {
      description: "The Child-Pugh score (also Child-Turcotte-Pugh score) is used to assess the prognosis of chronic liver disease, mainly cirrhosis. It assigns points based on levels of bilirubin, albumin, INR, and the presence/severity of ascites and hepatic encephalopathy.",
    },
    interpretResult: (score) => {
      if (typeof score !== 'number') return null;
      if (score <= 6) return `Class A (5-6 points): Well-compensated disease. 1-year survival: 100%, 2-year survival: 85%.`;
      if (score <= 9) return `Class B (7-9 points): Significant functional compromise. 1-year survival: 81%, 2-year survival: 57%.`;
      return `Class C (10-15 points): Decompensated disease. 1-year survival: 45%, 2-year survival: 35%.`;
    },
  },
  {
    id: 'correctedAnionGap',
    name: 'Corrected Anion Gap for Albumin',
    keywords: ['anion gap', 'albumin correction', 'acidosis', 'hypoalbuminemia'],
    inputs: [
      { id: 'measuredAG', label: 'Measured Anion Gap', type: 'number', min: 0, defaultUnit: 'mEq/L' },
      { id: 'serumAlbumin', label: 'Serum Albumin', type: 'number', min: 0, ...commonUnitConfigs.albumin },
    ],
    calculate: (inputs, currentUnits) => {
      const { measuredAG, serumAlbumin } = inputs;
      if (measuredAG === undefined || String(measuredAG).trim() === '' || serumAlbumin === undefined || String(serumAlbumin).trim() === '') return null;
      const ag = Number(measuredAG);
      const alb = getConvertedValue('serumAlbumin', { serumAlbumin }, currentUnits, commonUnitConfigs.albumin);
      if (isNaN(ag) || alb === undefined || ag < 0 || alb < 0) return "Invalid input or unit error.";
      const correctedAG = ag + 2.5 * (4 - alb);
      return correctedAG;
    },
    resultLabel: 'Corrected Anion Gap',
    resultUnit: 'mEq/L',
    details: {
      formula: "Corrected AG = Measured AG + 2.5 * (Normal Albumin [~4.0 g/dL] - Measured Albumin [g/dL])",
      description: "Adjusts the anion gap for variations in serum albumin concentration, as hypoalbuminemia can falsely lower the anion gap.",
    },
    interpretResult: (gap) => {
      if (typeof gap !== 'number') return null;
      if (gap > 12) return `Corrected AG is ${gap.toFixed(1)} mEq/L. This is an ELEVATED anion gap, suggesting an underlying metabolic acidosis (MUDPILES).`;
      return `Corrected AG is ${gap.toFixed(1)} mEq/L. This is a NORMAL anion gap.`;
    },
  },
  {
    id: 'crcl',
    name: 'Creatinine Clearance (CrCl) - Cockcroft-Gault',
    keywords: ['crcl', 'creatinine clearance', 'cockcroft gault', 'renal function', 'gfr', 'kidney'],
    inputs: [
      { id: 'age', label: 'Age', type: 'number', min: 0, step: "1", defaultUnit: 'years' },
      { id: 'weight', label: 'Weight', type: 'number', min: 0, step: "0.1", ...commonUnitConfigs.weight },
      { id: 'serumCreatinine', label: 'Serum Creatinine', type: 'number', min: 0, step: "0.01", ...commonUnitConfigs.serumCreatinine },
      {
        id: 'gender',
        label: 'Gender',
        type: 'select',
        defaultUnit: 'male',
        options: [
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
        ],
      },
    ],
    calculate: ({ age, weight, serumCreatinine, gender }, currentUnits) => {
      const ageVal = Number(age);
      if (age === undefined || String(age).trim() === '' || weight === undefined || String(weight).trim() === '' || serumCreatinine === undefined || String(serumCreatinine).trim() === '' || gender === undefined ||
        ageVal <= 0) return null;

      const weightInKg = getConvertedValue('weight', { weight }, currentUnits, commonUnitConfigs.weight);
      const serumCrInMgDl = getConvertedValue('serumCreatinine', { serumCreatinine }, currentUnits, commonUnitConfigs.serumCreatinine);

      if (weightInKg === undefined || serumCrInMgDl === undefined) return "Input or Unit error";
      if (weightInKg <= 0 || serumCrInMgDl <= 0) return "Weight and Serum Creatinine must be positive.";

      let crCl = ((140 - ageVal) * weightInKg) / (72 * serumCrInMgDl);
      if (gender === 'female') {
        crCl *= 0.85;
      }
      return Math.max(0, crCl);
    },
    resultLabel: 'CrCl',
    resultUnit: 'mL/min',
    details: {
      formula: "CrCl (mL/min) = [(140 - Age) * Weight (kg) * (0.85 if Female)] / (72 * Serum Creatinine (mg/dL))",
      notes: "Cockcroft-Gault formula for estimating Creatinine Clearance. Ensure inputs are positive.",
    },
  },
  {
    id: 'curb65',
    name: 'CURB-65 Score for Pneumonia Severity',
    keywords: ['curb65', 'pneumonia', 'cap', 'community acquired pneumonia', 'severity'],
    inputs: [
      { id: 'confusion', label: 'Confusion (new disorientation)', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes' }] },
      { id: 'bun', label: 'Blood Urea Nitrogen/Urea', type: 'number', min: 0, ...commonUnitConfigs.bunUrea },
      { id: 'respiratoryRate', label: 'Respiratory Rate ≥ 30/min', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No (<30)' }, { value: 1, label: 'Yes (≥30)' }] },
      { id: 'bp', label: 'Low Blood Pressure (SBP <90 or DBP ≤60)', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes' }] },
      { id: 'ageCurb', label: 'Age ≥ 65 years', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No (<65)' }, { value: 1, label: 'Yes (≥65)' }] },
    ],
    calculate: (inputs, currentUnits) => {
      let score = 0;
      const { confusion, bun, respiratoryRate, bp, ageCurb } = inputs;
      if (confusion === undefined || bun === undefined || String(bun).trim() === '' || respiratoryRate === undefined || bp === undefined || ageCurb === undefined) return null;

      score += Number(inputs.confusion);

      const bunValueInMgDl = getConvertedValue('bun', { bun }, currentUnits, commonUnitConfigs.bunUrea);
      if (bunValueInMgDl === undefined) return "BUN/Urea input error";
      if (Number(bun) < 0) return "BUN/Urea cannot be negative";

      if (bunValueInMgDl > 19) { // BUN > 19 mg/dL or Urea > 7 mmol/L
        score += 1;
      }
      score += Number(inputs.respiratoryRate);
      score += Number(inputs.bp);
      score += Number(inputs.ageCurb);
      return score;
    },
    resultLabel: 'CURB-65 Score',
    resultUnit: 'points',
    details: {
      criteria: "C: Confusion(1), U: BUN >19 mg/dL or Urea >7 mmol/L (1), R: Resp Rate ≥30(1), B: SBP<90 or DBP≤60(1), Age ≥65(1).",
      description: "CURB-65 estimates mortality of community-acquired pneumonia to help determine inpatient vs. outpatient treatment.",
    },
    interpretResult: (score) => {
      if (typeof score !== 'number') return null;
      let recommendation = "";
      let mortality = "";
      if (score === 0) { recommendation = "Low severity. Consider home treatment."; mortality = "0.6-0.7%"; }
      else if (score === 1) { recommendation = "Low severity. Consider home treatment."; mortality = "2.7-3.2%"; }
      else if (score === 2) { recommendation = "Moderate severity. Consider hospital admission."; mortality = "6.8-13.0%"; }
      else if (score === 3) { recommendation = "Severe pneumonia. Hospitalize; consider ICU if score 4-5."; mortality = "14.0-17.0%"; }
      else if (score >= 4) { recommendation = "Severe pneumonia. Urgent hospitalization; consider ICU."; mortality = "27.8-40.0% (score 4), 57% (score 5)"; }
      return `Score: ${score}. ${recommendation} Approx. 30-day Mortality: ${mortality}.`;
    },
  },
  {
    id: 'fib4',
    name: 'FIB-4 Index for Liver Fibrosis',
    keywords: ['fib-4', 'fib4', 'liver fibrosis', 'nafld', 'fatty liver', 'cirrhosis'],
    inputs: [
      { id: 'ageFib4', label: 'Age', type: 'number', min: 0, defaultUnit: 'years' },
      { id: 'ast', label: 'AST', type: 'number', min: 0, ...commonUnitConfigs.enzymeActivity },
      { id: 'plateletsFib4', label: 'Platelets', type: 'number', min: 0, ...commonUnitConfigs.platelets },
      { id: 'alt', label: 'ALT', type: 'number', min: 0, ...commonUnitConfigs.enzymeActivity },
    ],
    calculate: (inputs, currentUnits) => {
      const { ageFib4, ast, plateletsFib4, alt } = inputs;
      if ([ageFib4, ast, plateletsFib4, alt].some(val => val === undefined || String(val).trim() === '' || Number(val) < 0)) return null;

      const age = Number(ageFib4);
      const astVal = getConvertedValue('ast', { ast }, currentUnits, commonUnitConfigs.enzymeActivity);
      const pltVal = getConvertedValue('plateletsFib4', { plateletsFib4 }, currentUnits, commonUnitConfigs.platelets);
      const altVal = getConvertedValue('alt', { alt }, currentUnits, commonUnitConfigs.enzymeActivity);

      if (astVal === undefined || pltVal === undefined || altVal === undefined || pltVal <= 0 || altVal <= 0) return "Input or Unit error; Platelets and ALT must be > 0.";

      return (age * astVal) / (pltVal * Math.sqrt(altVal));
    },
    resultLabel: 'FIB-4 Index',
    resultUnit: '',
    details: {
      formula: "FIB-4 Index = (Age [years] * AST [U/L]) / (Platelets [10^9/L] * √ALT [U/L])",
      description: "Used to estimate liver fibrosis in chronic liver diseases.",
    },
    interpretResult: (score) => {
      if (typeof score !== 'number') return null;
      let interpretation = `FIB-4 Score: ${score.toFixed(2)}. `;
      if (score < 1.30) interpretation += "Low risk for advanced fibrosis (NPV ~90% for F3-F4). Consider repeating in 1-2 years.";
      else if (score > 2.67) interpretation += "High risk for advanced fibrosis (PPV ~80% for F3-F4). Refer to specialist. ";
      else interpretation += "Indeterminate risk. Further evaluation (e.g., elastography, biopsy) may be needed.";
      return interpretation;
    },
  },
  {
    id: 'gcs',
    name: 'Glasgow Coma Scale (GCS)',
    keywords: ['gcs', 'glasgow coma scale', 'consciousness', 'neurology', 'trauma'],
    inputs: [
      {
        id: 'eyeResponse', label: 'Eye Opening Response', type: 'select', defaultUnit: '4', options: [
          { value: 4, label: 'Eyes open spontaneously (4 pts)' }, { value: 3, label: 'Eyes open to verbal command (3 pts)' },
          { value: 2, label: 'Eyes open to pain (2 pts)' }, { value: 1, label: 'No eye opening (1 pt)' },
        ],
      },
      {
        id: 'verbalResponse', label: 'Verbal Response', type: 'select', defaultUnit: '5', options: [
          { value: 5, label: 'Oriented (5 pts)' }, { value: 4, label: 'Confused (4 pts)' },
          { value: 3, label: 'Inappropriate words (3 pts)' }, { value: 2, label: 'Incomprehensible sounds (2 pts)' },
          { value: 1, label: 'No verbal response (1 pt)' },
        ],
      },
      {
        id: 'motorResponse', label: 'Motor Response', type: 'select', defaultUnit: '6', options: [
          { value: 6, label: 'Obeys commands (6 pts)' }, { value: 5, label: 'Localizes pain (5 pts)' },
          { value: 4, label: 'Withdraws from pain (4 pts)' }, { value: 3, label: 'Flexion to pain (decorticate) (3 pts)' },
          { value: 2, label: 'Extension to pain (decerebrate) (2 pts)' }, { value: 1, label: 'No motor response (1 pt)' },
        ],
      },
    ],
    calculate: ({ eyeResponse, verbalResponse, motorResponse }) => {
      if (eyeResponse === undefined || verbalResponse === undefined || motorResponse === undefined) return null;
      return Number(eyeResponse) + Number(verbalResponse) + Number(motorResponse);
    },
    resultLabel: 'GCS Score',
    resultUnit: 'points',
    details: {
      description: "The Glasgow Coma Scale is used to objectively describe the extent of impaired consciousness in all types of acute medical and trauma patients. Sum of points from Eye, Verbal, and Motor responses.",
    },
    interpretResult: (score) => {
      if (typeof score !== 'number') return null;
      if (score <= 8) return `Score: ${score}. Severe head injury. (Typically ≤8)`;
      if (score <= 12) return `Score: ${score}. Moderate head injury. (Typically 9-12)`;
      return `Score: ${score}. Mild head injury. (Typically 13-15)`;
    },
  },
  {
    id: 'ibw',
    name: 'Ideal Body Weight (IBW) - Devine',
    keywords: ['ibw', 'ideal body weight', 'devine', 'weight'],
    inputs: [
      { id: 'height', label: 'Height', type: 'number', min: 0, step: "0.1", ...commonUnitConfigs.height },
      {
        id: 'gender',
        label: 'Gender',
        type: 'select',
        defaultUnit: 'male',
        options: [
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
        ],
      },
    ],
    calculate: ({ height, gender }, currentUnits) => {
      if (height === undefined || String(height).trim() === '' || Number(height) <= 0 || gender === undefined) return null;

      const heightInCm = getConvertedValue('height', { height }, currentUnits, commonUnitConfigs.height);
      if (heightInCm === undefined) return "Input or Unit error";

      const heightInInches = heightInCm / INCH_TO_CM;

      if (heightInInches <= 60) {
        return "Height should be > 5 feet (152.4 cm) for Devine formula.";
      }

      let ibw = 0;
      if (gender === 'male') {
        ibw = 50 + 2.3 * (heightInInches - 60);
      } else if (gender === 'female') {
        ibw = 45.5 + 2.3 * (heightInInches - 60);
      }
      return Math.max(0, ibw);
    },
    resultLabel: 'IBW',
    resultUnit: 'kg',
    details: {
      formula: "Male: 50kg + 2.3kg for each inch over 5 feet.\nFemale: 45.5kg + 2.3kg for each inch over 5 feet.",
      notes: "Ideal Body Weight using the Devine formula. This formula is most accurate for heights above 5 feet (152.4 cm).",
    },
  },
  {
    id: 'laEsophagitis',
    name: 'Los Angeles (LA) Classification of Esophagitis',
    keywords: ['la classification', 'esophagitis', 'gerd', 'endoscopy', 'gastroenterology'],
    inputs: [
      {
        id: 'laGrade', label: 'LA Grade', type: 'select', defaultUnit: 'A', options: [
          { value: 'A', label: 'Grade A' }, { value: 'B', label: 'Grade B' },
          { value: 'C', label: 'Grade C' }, { value: 'D', label: 'Grade D' },
          { value: 'N', label: 'Normal (No breaks)' },
        ],
      },
    ],
    calculate: ({ laGrade }) => {
      if (laGrade === undefined) return null;
      return String(laGrade);
    },
    resultLabel: "Prague Classification",
    resultUnit: "",
    details: {
      description: "The Los Angeles (LA) classification system is widely used for grading reflux esophagitis based on endoscopic findings.",
    },
    interpretResult: (grade) => {
      if (typeof grade !== 'string') return null;
      switch (grade) {
        case 'A': return "Grade A: One or more mucosal breaks no longer than 5 mm, that do not extend between the tops of two mucosal folds.";
        case 'B': return "Grade B: One or more mucosal breaks longer than 5 mm, that do not extend between the tops of two mucosal folds.";
        case 'C': return "Grade C: One or more mucosal breaks that are continuous between the tops of two or more mucosal folds but which involve less than 75% of the circumference.";
        case 'D': return "Grade D: One or more mucosal breaks which involve at least 75% of the esophageal circumference.";
        case 'N': return "Normal: No mucosal breaks observed.";
        default: return "Select a grade to see interpretation.";
      }
    },
  },
  {
    id: 'lille',
    name: 'Lille Model for Alcoholic Hepatitis',
    keywords: ['lille', 'alcoholic hepatitis', 'corticosteroids', 'liver'],
    inputs: [
      { id: 'ageLille', label: 'Age (years)', type: 'number', min: 0, defaultUnit: 'years' },
      { id: 'albuminDay0', label: 'Albumin Day 0', type: 'number', min: 0, ...commonUnitConfigs.albumin },
      { id: 'bilirubinDay0', label: 'Bilirubin Day 0', type: 'number', min: 0, ...commonUnitConfigs.bilirubin },
      { id: 'bilirubinDay7', label: 'Bilirubin Day 7', type: 'number', min: 0, ...commonUnitConfigs.bilirubin },
      { id: 'prothrombinTime', label: 'Prothrombin Time (seconds)', type: 'number', min: 0, defaultUnit: 'seconds' },
      { id: 'creatinineLille', label: 'Renal Insufficiency (Creatinine)', type: 'number', min: 0, ...commonUnitConfigs.serumCreatinine },
    ],
    calculate: (inputs, currentUnits) => {
      const { ageLille, albuminDay0, bilirubinDay0, bilirubinDay7, prothrombinTime, creatinineLille } = inputs;
      if ([ageLille, albuminDay0, bilirubinDay0, bilirubinDay7, prothrombinTime, creatinineLille].some(val => val === undefined || String(val).trim() === '' || Number(val) < 0)) return null;

      const age = Number(ageLille);
      const pt = Number(prothrombinTime);

      const albuminDay0_base_g_dL = getConvertedValue('albuminDay0', { albuminDay0 }, currentUnits, commonUnitConfigs.albumin);
      const bilirubinDay0_base_mg_dL = getConvertedValue('bilirubinDay0', { bilirubinDay0 }, currentUnits, commonUnitConfigs.bilirubin);
      const bilirubinDay7_base_mg_dL = getConvertedValue('bilirubinDay7', { bilirubinDay7 }, currentUnits, commonUnitConfigs.bilirubin);
      const creatinine_base_mg_dL = getConvertedValue('creatinineLille', { creatinineLille }, currentUnits, commonUnitConfigs.serumCreatinine);

      if ([albuminDay0_base_g_dL, bilirubinDay0_base_mg_dL, bilirubinDay7_base_mg_dL, creatinine_base_mg_dL].some(v => v === undefined)) return "Input or Unit Error";

      const albuminDay0_gL_val = albuminDay0_base_g_dL * 10;
      const bilirubinDay0_umolL_val = bilirubinDay0_base_mg_dL / UMOL_L_TO_MG_DL_BILIRUBIN;
      const bilirubinDay7_umolL_val = bilirubinDay7_base_mg_dL / UMOL_L_TO_MG_DL_BILIRUBIN;
      const creatinine_umolL_val = creatinine_base_mg_dL / UMOL_L_TO_MG_DL_CREATININE;

      const renalInsufficiency = creatinine_umolL_val > 115 ? 1 : 0; // Creatinine > 1.3 mg/dL or 115 umol/L

      const R = 3.19 -
        (0.101 * age) +
        (0.147 * albuminDay0_gL_val) +
        (0.0165 * (bilirubinDay0_umolL_val - bilirubinDay7_umolL_val)) -
        (0.206 * renalInsufficiency) -
        (0.0065 * bilirubinDay0_umolL_val) -
        (0.0096 * pt);

      const lilleScore = Math.exp(-R) / (1 + Math.exp(-R));
      if (isNaN(lilleScore)) return "Calculation error, check inputs.";
      return lilleScore;
    },
    resultLabel: 'Lille Score',
    resultUnit: '',
    details: {
      formula: "R = 3.19 - (0.101*Age) + (0.147*Alb_d0_g/L) + (0.0165*(Bili_d0_µmol/L - Bili_d7_µmol/L)) - (0.206*RenalInsuff) - (0.0065*Bili_d0_µmol/L) - (0.0096*PT_sec)\nLille score = e^(-R) / (1 + e^(-R))",
      notes: "Renal insufficiency: Cr > 1.3 mg/dL (~115 µmol/L) = 1 point. Predicts 6-month mortality in severe alcoholic hepatitis treated with corticosteroids.",
    },
    interpretResult: (score) => {
      if (typeof score !== 'number') return null;
      if (score > 0.45) return `Score: ${score.toFixed(3)}. High risk of 6-month mortality (~75%). Corticosteroids considered ineffective. Consider stopping.`;
      if (score > 0.16 && score <= 0.45) return `Score: ${score.toFixed(3)}. Intermediate response. 6-month mortality ~25-50%.`;
      if (score <= 0.16) return `Score: ${score.toFixed(3)}. Complete response. Low risk of 6-month mortality (~15%). Continue corticosteroids.`;
      return `Score: ${score.toFixed(3)}. Evaluate based on clinical context. Thresholds: <=0.16 (good/complete), 0.16-0.45 (intermediate), >0.45 (poor/null).`;
    },
  },
  {
    id: 'macroRatio',
    name: 'Macronutrient Ratio Calculator',
    keywords: ['macros', 'macronutrients', 'protein', 'carbs', 'fats', 'diet', 'nutrition'],
    inputs: [
      { id: 'totalCalories', label: 'Total Daily Calories', type: 'number', min: 0, defaultUnit: 'kcal', placeholder: 'e.g., 2000' },
      {
        id: 'ratioProfile', label: 'Desired Ratio Profile (C/P/F)', type: 'select', defaultUnit: 'balanced', options: [
          { value: 'balanced', label: 'Balanced (40/30/30)' },
          { value: 'lowcarb', label: 'Lower Carb (30/40/30)' },
          { value: 'highprotein', label: 'Higher Protein (30/40/30)' },
          { value: 'keto', label: 'Ketogenic-Like (5/25/70)' },
          { value: 'custom', label: 'Custom Input Below' },
        ],
      },
      { id: 'customCarbPct', label: 'Custom Carb %', type: 'number', min: 0, max: 100, defaultUnit: '%', placeholder: 'e.g., 40' },
      { id: 'customProteinPct', label: 'Custom Protein %', type: 'number', min: 0, max: 100, defaultUnit: '%', placeholder: 'e.g., 30' },
      { id: 'customFatPct', label: 'Custom Fat %', type: 'number', min: 0, max: 100, defaultUnit: '%', placeholder: 'e.g., 30' },
    ],
    calculate: ({ totalCalories, ratioProfile, customCarbPct, customProteinPct, customFatPct }) => {
      const calories = Number(totalCalories);
      if (isNaN(calories) || calories <= 0 || String(totalCalories).trim() === '') return "Please enter valid total daily calories > 0.";

      let carbPct, proteinPct, fatPct;

      if (ratioProfile === 'custom') {
        const c = Number(customCarbPct);
        const p = Number(customProteinPct);
        const f = Number(customFatPct);
        if (isNaN(c) || isNaN(p) || isNaN(f) || String(customCarbPct).trim() === '' || String(customProteinPct).trim() === '' || String(customFatPct).trim() === '' || c < 0 || p < 0 || f < 0) {
          return "Please fill all custom percentage fields with non-negative values.";
        }
        if (Math.round(c + p + f) !== 100) {
          return "Custom percentages must sum to 100.";
        }
        carbPct = c / 100; proteinPct = p / 100; fatPct = f / 100;
      } else {
        const profiles = {
          balanced: { c: 0.40, p: 0.30, f: 0.30 },
          lowcarb: { c: 0.30, p: 0.40, f: 0.30 }, // Adjusted lowcarb to be less extreme
          highprotein: { c: 0.30, p: 0.40, f: 0.30 },
          keto: { c: 0.05, p: 0.25, f: 0.70 },
        };
        carbPct = profiles[ratioProfile].c;
        proteinPct = profiles[ratioProfile].p;
        fatPct = profiles[ratioProfile].f;
      }

      const carbsGrams = (calories * carbPct) / 4;
      const proteinGrams = (calories * proteinPct) / 4;
      const fatGrams = (calories * fatPct) / 9;

      return { carbohydrates: carbsGrams, protein: proteinGrams, fat: fatGrams };
    },
    resultLabel: 'Macronutrient Targets',
    resultUnit: { carbohydrates: 'g/day', protein: 'g/day', fat: 'g/day' },
    details: {
      calorieValues: "Carbohydrates: 4 kcal/gram\nProtein: 4 kcal/gram\nFat: 9 kcal/gram",
      description: "Calculates target grams for carbohydrates, protein, and fat based on total daily calorie intake and desired distribution. These are general targets. Adjust based on individual needs, goals, dietary preferences, and consult a professional.",
      customInputNote: "If 'Custom Input' is selected, ensure the sum of carbohydrate, protein, and fat percentages equals 100.",
    },
    interpretResult: (result, inputs) => {
      if (typeof result !== 'object') return null;
      const { totalCalories } = inputs;
      return `For a daily intake of ${totalCalories || 'your target'} kcal, your macronutrient targets are approximately: Carbohydrates ${result.carbohydrates.toFixed(0)}g, Protein ${result.protein.toFixed(0)}g, Fat ${result.fat.toFixed(0)}g. Individual needs may vary.`;
    },
  },
  {
    id: 'map',
    name: 'Mean Arterial Pressure (MAP)',
    keywords: ['map', 'mean arterial pressure', 'blood pressure', 'hemodynamics'],
    inputs: [
      { id: 'sbp', label: 'Systolic Blood Pressure (SBP)', type: 'number', min: 0, defaultUnit: 'mmHg' },
      { id: 'dbp', label: 'Diastolic Blood Pressure (DBP)', type: 'number', min: 0, defaultUnit: 'mmHg' },
    ],
    calculate: ({ sbp, dbp }) => {
      const sbpVal = Number(sbp);
      const dbpVal = Number(dbp);
      if (isNaN(sbpVal) || isNaN(dbpVal) || sbpVal < 0 || dbpVal < 0 || String(sbp).trim() === '' || String(dbp).trim() === '') return null;
      if (sbpVal < dbpVal) return "SBP should be greater than or equal to DBP.";
      return ((2 * dbpVal) + sbpVal) / 3;
    },
    resultLabel: 'MAP',
    resultUnit: 'mmHg',
    details: {
      formula: "MAP = ( (2 * Diastolic BP) + Systolic BP ) / 3",
      notes: "Normal MAP is typically 70-100 mmHg.",
    },
    interpretResult: (map) => {
      if (typeof map !== 'number') return null;
      if (map < 65) return `MAP: ${map.toFixed(1)} mmHg. Potentially low, indicating decreased organ perfusion. Target MAP is often >65 mmHg in critically ill patients.`;
      if (map > 100) return `MAP: ${map.toFixed(1)} mmHg. Potentially high, could indicate increased cardiac workload or risk of hypertensive damage.`;
      return `MAP: ${map.toFixed(1)} mmHg. Generally within normal limits (70-100 mmHg).`;
    },
  },
  {
    id: 'meldNa',
    name: 'MELD-Na Score',
    keywords: ['meld-na', 'meld na', 'liver transplant', 'end stage liver disease', 'prognosis'],
    inputs: [
      { id: 'bilirubinMeld', label: 'Bilirubin', type: 'number', min: 0, ...commonUnitConfigs.bilirubin },
      { id: 'creatinineMeld', label: 'Creatinine', type: 'number', min: 0, ...commonUnitConfigs.serumCreatinine },
      { id: 'inrMeld', label: 'INR', type: 'number', min: 0, defaultUnit: 'inr' },
      { id: 'sodiumMeld', label: 'Sodium', type: 'number', min: 0, ...commonUnitConfigs.sodiumMeqL },
      { id: 'dialysis', label: 'Dialysis at least twice in past week?', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes' }] },
    ],
    calculate: (inputs, currentUnits) => {
      const { bilirubinMeld, creatinineMeld, inrMeld, sodiumMeld, dialysis } = inputs;

      if ([bilirubinMeld, creatinineMeld, inrMeld, sodiumMeld, dialysis].some(val => val === undefined || String(val).trim() === '')) return null;

      let bili_val = getConvertedValue('bilirubinMeld', { bilirubinMeld }, currentUnits, commonUnitConfigs.bilirubin);
      let creat_val = getConvertedValue('creatinineMeld', { creatinineMeld }, currentUnits, commonUnitConfigs.serumCreatinine);
      let inr_val = Number(inputs.inrMeld);
      let na_val = getConvertedValue('sodiumMeld', { sodiumMeld }, currentUnits, commonUnitConfigs.sodiumMeqL);

      if ([bili_val, creat_val, na_val].some(v => v === undefined) || isNaN(inr_val)) return "Input or Unit error.";
      if (bili_val < 0 || creat_val < 0 || inr_val < 0 || na_val < 0) return "Values cannot be negative.";

      bili_val = Math.max(1, bili_val);
      creat_val = Math.max(1, creat_val);
      inr_val = Math.max(1, inr_val);

      if (Number(dialysis) === 1 || creat_val > 4.0) {
        creat_val = 4.0;
      } else {
        creat_val = Math.min(4.0, creat_val);
      }

      let meldScore = (0.957 * Math.log(creat_val)) +
        (0.378 * Math.log(bili_val)) +
        (1.120 * Math.log(inr_val)) + 0.643;
      meldScore = meldScore * 10;

      if (meldScore > 11) {
        const naBounded = Math.max(125, Math.min(137, na_val));
        meldScore = meldScore + (1.32 * (137 - naBounded)) - (0.033 * meldScore * (137 - naBounded));
      }

      meldScore = Math.round(meldScore);
      meldScore = Math.max(6, Math.min(40, meldScore));

      if (isNaN(meldScore)) return "Calculation error.";
      return meldScore;
    },
    resultLabel: 'MELD-Na Score',
    resultUnit: 'points',
    details: {
      formula: "MELD_initial = (0.957*ln(Cr) + 0.378*ln(Bili) + 1.120*ln(INR) + 0.643)*10\nMELD-Na (if MELD_initial > 11) = MELD_initial + 1.32*(137-Na) - [0.033*MELD_initial*(137-Na)]",
      notes: "Na bounded 125-137 mEq/L for adjustment. Cr capped at 4.0 mg/dL (or set to 4.0 if dialysis/Cr>4). Bili/INR floored at 1.0. Final score 6-40.",
    },
    interpretResult: (score) => {
      if (typeof score !== 'number') return null;
      let mortality = "";
      if (score >= 40) mortality = "~71.3%";
      else if (score >= 30 && score <= 39) mortality = "~52.6%";
      else if (score >= 20 && score <= 29) mortality = "~19.6%";
      else if (score >= 10 && score <= 19) mortality = "~6.0%";
      else if (score <= 9) mortality = "~1.9%";
      return `Score: ${score}. Approximate 3-month mortality: ${mortality}.`;
    },
  },
  {
    id: 'mme',
    name: 'Oral Morphine Milligram Equivalents (MME) Calculator',
    keywords: ['mme', 'morphine equivalents', 'opioid', 'pain management', 'conversion'],
    inputs: [
      {
        id: 'opioidType', label: 'Opioid (Oral)', type: 'select', defaultUnit: 'morphine', options: [
          { value: 'morphine', label: 'Morphine' }, { value: 'oxycodone', label: 'Oxycodone' },
          { value: 'hydrocodone', label: 'Hydrocodone' }, { value: 'hydromorphone', label: 'Hydromorphone (Oral)' },
          { value: 'codeine', label: 'Codeine' }, { value: 'tramadol', label: 'Tramadol' },
        ],
      },
      { id: 'dosePerAdmin', label: 'Dose per Administration', type: 'number', min: 0, defaultUnit: 'mg', placeholder: 'e.g., 5' },
      { id: 'frequencyPerDay', label: 'Administrations per Day', type: 'number', min: 0, defaultUnit: 'times/day', placeholder: 'e.g., 4 (for q6h)' },
    ],
    calculate: ({ opioidType, dosePerAdmin, frequencyPerDay }) => {
      const dose = Number(dosePerAdmin);
      const freq = Number(frequencyPerDay);

      if (isNaN(dose) || isNaN(freq) || dose < 0 || freq < 0 || String(dosePerAdmin).trim() === '' || String(frequencyPerDay).trim() === '' || opioidType === undefined) return null;

      const conversionFactors = {
        morphine: 1, oxycodone: 1.5, hydrocodone: 1, hydromorphone: 4,
        codeine: 0.15, tramadol: 0.1,
      };
      const factor = conversionFactors[opioidType];
      if (factor === undefined) return "Unknown opioid type for conversion.";

      return dose * freq * factor;
    },
    resultLabel: 'Total Daily MME',
    resultUnit: 'MME/day',
    details: {
      description: "Calculates total daily Morphine Milligram Equivalents (MME) for common ORAL opioids. This tool is for estimation and general guidance. Clinical judgment is paramount.",
      conversionFactorsUsed: [
        "Morphine: 1", "Oxycodone: 1.5", "Hydrocodone: 1", "Hydromorphone (Oral): 4", "Codeine: 0.15", "Tramadol: 0.1",
      ],
      importantNote: "Conversion factors are based on typical equianalgesic tables; individual responses vary. Does not cover IV, transdermal, or other routes directly.",
    },
    interpretResult: (mme) => {
      if (typeof mme !== 'number') return null;
      if (mme >= 90) return `Total: ${mme.toFixed(1)} MME/day. High risk. Exercise extreme caution, consider specialist consultation, naloxone. Avoid concurrent benzodiazepines.`;
      if (mme >= 50) return `Total: ${mme.toFixed(1)} MME/day. Increased risk of overdose. Use caution, reassess pain and function, consider non-opioid therapies. Avoid dose escalation above this level without careful reassessment.`;
      if (mme >= 20) return `Total: ${mme.toFixed(1)} MME/day. Use caution when increasing dosage.`;
      return `Total: ${mme.toFixed(1)} MME/day. Lower risk, but still monitor for adverse effects and therapeutic benefit.`;
    },
  },
  {
    id: 'montrealIBD',
    name: 'Montreal Classification for IBD',
    keywords: ['montreal classification', 'ibd', 'crohns', 'ulcerative colitis', 'gastroenterology'],
    inputs: [
      {
        id: 'ibdType', label: 'IBD Type', type: 'select', defaultUnit: 'crohns', options: [
          { value: 'crohns', label: "Crohn's Disease" }, { value: 'uc', label: 'Ulcerative Colitis' },
        ],
      },
      {
        id: 'crohnsAge', label: "Age at Diagnosis (Crohn's)", type: 'select', defaultUnit: 'A1', options: [
          { value: 'A1', label: 'A1 (≤16 years)' }, { value: 'A2', label: 'A2 (17-40 years)' }, { value: 'A3', label: 'A3 (>40 years)' },
        ],
      },
      {
        id: 'crohnsLocation', label: "Location (Crohn's)", type: 'select', defaultUnit: 'L1', options: [
          { value: 'L1', label: 'L1 (Ileal)' }, { value: 'L2', label: 'L2 (Colonic)' },
          { value: 'L3', label: 'L3 (Ileocolonic)' }, { value: 'L4', label: 'L4 (Upper GI)' },
        ],
      },
      {
        id: 'crohnsBehavior', label: "Behavior (Crohn's)", type: 'select', defaultUnit: 'B1', options: [
          { value: 'B1', label: 'B1 (Non-stricturing, Non-penetrating)' }, { value: 'B2', label: 'B2 (Stricturing)' },
          { value: 'B3', label: 'B3 (Penetrating)' }, { value: 'B1p', label: 'B1p (Non-stricturing, Non-penetrating, Perianal)' },
          { value: 'B2p', label: 'B2p (Stricturing, Perianal)' },
          { value: 'B3p', label: 'B3p (Penetrating, Perianal)' },
        ],
      },
      {
        id: 'crohnsPerianal', label: "Perianal Disease Modifier (Crohn's)", type: 'select', defaultUnit: 'no_p', options: [
          { value: 'no_p', label: 'No Perianal Disease ("p" not added)' }, { value: 'p', label: 'Perianal Disease Present (add "p" to B1/B2/B3)' },
        ],
      },
      {
        id: 'ucExtent', label: 'Extent (Ulcerative Colitis)', type: 'select', defaultUnit: 'E1', options: [
          { value: 'E1', label: 'E1 (Proctitis)' }, { value: 'E2', label: 'E2 (Left-sided/Distal)' }, { value: 'E3', label: 'E3 (Extensive/Pancolitis)' },
        ],
      },
    ],
    calculate: (inputs) => {
      const { ibdType, crohnsAge, crohnsLocation, crohnsBehavior, crohnsPerianal, ucExtent } = inputs;
      if (ibdType === undefined) return null;

      if (ibdType === 'crohns') {
        if (!crohnsAge || !crohnsLocation || !crohnsBehavior || !crohnsPerianal) return "Please select all Crohn's parameters.";
        let finalBehavior = String(crohnsBehavior);
        if (crohnsPerianal === 'p' && ['B1', 'B2', 'B3'].includes(finalBehavior)) {
          finalBehavior = `${finalBehavior}p`;
        }
        return `Crohn's: ${crohnsAge}${crohnsLocation}${finalBehavior}`;
      } else if (ibdType === 'uc') {
        if (!ucExtent) return "Please select Ulcerative Colitis extent.";
        return `UC: ${ucExtent}`;
      }
      return null;
    },
    resultLabel: 'Montreal Classification',
    resultUnit: '',
    details: {
      description: "Montreal classification for IBD. Select IBD type first. For Crohn's Disease: A=Age at diagnosis, L=Location, B=Behavior (p=perianal modifier; if B1/B2/B3 selected and 'Perianal Disease Present' is chosen, 'p' is appended. Or select B1p/B2p/B3p directly). For Ulcerative Colitis: E=Extent. Ensure all relevant fields for the selected IBD type are chosen.",
    },
    interpretResult: (result) => {
      if (typeof result !== 'string') return null;
      return `Classification: ${result}. This string summarizes the disease characteristics based on the Montreal classification system.`;
    },
  },
  {
    id: 'oaklandScore',
    name: 'Oakland Score (Acute Lower GI Bleeding)',
    keywords: ['oakland score', 'lgib', 'lower gi bleed', 'gastrointestinal bleeding', 'prognosis'],
    inputs: [
      { id: 'ageOakland', label: 'Age', type: 'number', min: 0, defaultUnit: 'years' },
      { id: 'sexOakland', label: 'Sex', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'Female' }, { value: 1, label: 'Male' }] },
      { id: 'prevLgibOakland', label: 'Previous Lower GI Bleed', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes' }] },
      { id: 'dreBloodOakland', label: 'Digital Rectal Exam: Blood', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No blood / Not performed' }, { value: 1, label: 'Blood on DRE' }] },
      { id: 'hrOakland', label: 'Heart Rate (bpm)', type: 'number', min: 0, defaultUnit: 'bpm' },
      { id: 'sbpOakland', label: 'Systolic Blood Pressure (mmHg)', type: 'number', min: 0, defaultUnit: 'mmHg' },
      { id: 'hbOakland', label: 'Hemoglobin', type: 'number', min: 0, ...commonUnitConfigs.hemoglobin },
    ],
    calculate: (inputs, currentUnits) => {
      const { ageOakland, sexOakland, prevLgibOakland, dreBloodOakland, hrOakland, sbpOakland, hbOakland } = inputs;
      if ([ageOakland, sexOakland, prevLgibOakland, dreBloodOakland, hrOakland, sbpOakland, hbOakland].some(val => val === undefined || String(val).trim() === '')) return null;

      let score = 0;
      const age = Number(ageOakland);
      const hr = Number(hrOakland);
      const sbp = Number(sbpOakland);
      const hb_g_dl = getConvertedValue('hbOakland', { hbOakland }, currentUnits, commonUnitConfigs.hemoglobin);

      if (isNaN(age) || isNaN(hr) || isNaN(sbp) || hb_g_dl === undefined || age < 0 || hr < 0 || sbp < 0 || hb_g_dl < 0) return "Input or Unit error.";

      if (age < 60) score += 0;
      else if (age <= 64) score += 1;
      else if (age <= 69) score += 2;
      else if (age <= 74) score += 3;
      else if (age <= 79) score += 4;
      else score += 5;

      score += Number(sexOakland);
      score += Number(prevLgibOakland);
      score += Number(dreBloodOakland);
      if (hr >= 100) score += 1;
      if (sbp < 100) score += 2;

      if (hb_g_dl < 10.0) score += 3;
      else if (hb_g_dl < 12.0) score += 2;
      else if (hb_g_dl < 13.0) score += 1;

      return score;
    },
    resultLabel: 'Oakland Score',
    resultUnit: 'points',
    details: {
      criteria: "Points: Age (<60:0, 60-64:1, 65-69:2, 70-74:3, 75-79:4, ≥80:5), Sex (Male:+1), Prev LGIB (+1), DRE Blood (+1), HR ≥100bpm (+1), SBP <100mmHg (+2), Hb_g/dL (<10.0:3, 10.0-11.9:2, 12.0-12.9:1, ≥13.0:0).",
      description: "Oakland Score assesses risk in acute lower GI bleeding for safe discharge.",
    },
    interpretResult: (score) => {
      if (typeof score !== 'number') return null;
      let interpretation = `Oakland Score: ${score}. `;
      if (score <= 8) {
        interpretation += "Low risk of adverse outcome. Safe hospital discharge for outpatient management may be considered if clinically appropriate (Probability of safe discharge >95% if score ≤ 8).";
      } else {
        interpretation += "Higher risk of adverse outcome. Inpatient management and further investigation typically indicated.";
      }
      return interpretation;
    },
  },
  {
    id: 'pledScore',
    name: 'PLED Score for PSC',
    keywords: ['pled score', 'psc', 'primary sclerosing cholangitis', 'liver events', 'prognosis'],
    inputs: [
      { id: 'agePled', label: 'Age', type: 'number', min: 0, defaultUnit: 'years' },
      { id: 'bilirubinPled', label: 'Total Bilirubin', type: 'number', min: 0, ...commonUnitConfigs.bilirubin },
      { id: 'albuminPled', label: 'Serum Albumin', type: 'number', min: 0, ...commonUnitConfigs.albumin },
      { id: 'plateletsPled', label: 'Platelets', type: 'number', min: 0, ...commonUnitConfigs.platelets },
      { id: 'varicealBleedPled', label: 'History of Variceal Bleeding', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes' }] },
    ],
    calculate: (inputs, currentUnits) => {
      const { agePled, bilirubinPled, albuminPled, plateletsPled, varicealBleedPled } = inputs;
      if ([agePled, bilirubinPled, albuminPled, plateletsPled, varicealBleedPled].some(val => val === undefined || String(val).trim() === '')) return null;

      const age = Number(agePled);
      const bili_mg_dl = getConvertedValue('bilirubinPled', { bilirubinPled }, currentUnits, commonUnitConfigs.bilirubin);
      const alb_g_dl = getConvertedValue('albuminPled', { albuminPled }, currentUnits, commonUnitConfigs.albumin);
      const plt_10_9_L = getConvertedValue('plateletsPled', { plateletsPled }, currentUnits, commonUnitConfigs.platelets);
      const bleed = Number(varicealBleedPled);

      if (bili_mg_dl === undefined || alb_g_dl === undefined || plt_10_9_L === undefined || age < 0 || bili_mg_dl <= 0 || alb_g_dl <= 0 || plt_10_9_L <= 0) {
        return "Input or Unit Error. Ensure Age is non-negative and Bilirubin, Albumin, Platelets are positive.";
      }

      let score = (0.03 * age) +
        (0.71 * Math.log(bili_mg_dl)) -
        (1.16 * Math.log(alb_g_dl)) -
        (0.29 * Math.log(plt_10_9_L));
      if (bleed === 1) {
        score += 0.87;
      }
      if (isNaN(score)) return "Calculation error, check inputs (e.g., non-positive values for log).";
      return score;
    },
    resultLabel: 'PLED Score',
    resultUnit: '',
    details: {
      formula: "PLED Score = 0.03*Age + 0.71*ln(Bili_mg/dL) - 1.16*ln(Alb_g/dL) - 0.29*ln(Plt_x10⁹/L) + 0.87(if variceal bleed history)",
      notes: "Predicts liver events in Primary Sclerosing Cholangitis. Ensure values for log are positive.",
    },
    interpretResult: (score) => {
      if (typeof score !== 'number') return null;
      let riskCategory = "";
      if (score < -1.5) riskCategory = "Low risk";
      else if (score <= 0.5) riskCategory = "Medium risk";
      else riskCategory = "High risk";
      return `PLED Score: ${score.toFixed(2)}. Risk Category: ${riskCategory}. This score estimates the risk of liver-related events (e.g., variceal hemorrhage, ascites, encephalopathy, liver transplantation, or liver-related death).`;
    },
  },
  {
    id: 'pragueBarretts',
    name: "Prague C&M Classification for Barrett's Esophagus",
    keywords: ["prague c&m", "barrett's esophagus", "endoscopy", "gastroenterology", "gerd"],
    inputs: [
      { id: 'pragueC', label: 'Circumferential Extent (C)', type: 'number', min: 0, step: '0.1', defaultUnit: 'cm', placeholder: 'cm' },
      { id: 'pragueM', label: 'Maximal Extent (M)', type: 'number', min: 0, step: '0.1', defaultUnit: 'cm', placeholder: 'cm' },
    ],
    calculate: ({ pragueC, pragueM }) => {
      const cVal = Number(pragueC);
      const mVal = Number(pragueM);
      if (String(pragueC).trim() === '' || String(pragueM).trim() === '' || isNaN(cVal) || isNaN(mVal) || cVal < 0 || mVal < 0) return null;
      if (cVal > mVal) return "C value cannot be greater than M value.";
      return `C${cVal}M${mVal}`;
    },
    resultLabel: "Prague Classification",
    resultUnit: "",
    details: {
      description: "The Prague C&M criteria are used for endoscopic classification of Barrett's esophagus. 'C' refers to the circumferential extent of metaplasia in cm. 'M' refers to the maximal extent (length of the longest tongue) of metaplasia in cm.",
    },
    interpretResult: (result) => {
      if (typeof result !== 'string' || !result.startsWith('C')) return null;
      return `Classification: ${result}. This indicates the extent of Barrett's esophagus. For example, C2M5 means 2 cm of circumferential involvement and a maximal extent of 5 cm.`;
    },
  },
  {
    id: 'saag',
    name: 'Serum-Ascites Albumin Gradient (SAAG)',
    keywords: ['saag', 'ascites', 'serum ascites albumin gradient', 'portal hypertension', 'liver'],
    inputs: [
      { id: 'serumAlbumin', label: 'Serum Albumin', type: 'number', min: 0, ...commonUnitConfigs.albumin },
      { id: 'ascitesAlbumin', label: 'Ascites Fluid Albumin', type: 'number', min: 0, ...commonUnitConfigs.albumin },
    ],
    calculate: (inputs, currentUnits) => {
      const { serumAlbumin, ascitesAlbumin } = inputs;
      if (serumAlbumin === undefined || String(serumAlbumin).trim() === '' || ascitesAlbumin === undefined || String(ascitesAlbumin).trim() === '') return null;
      const serumAlb = getConvertedValue('serumAlbumin', { serumAlbumin }, currentUnits, commonUnitConfigs.albumin);
      const ascitesAlb = getConvertedValue('ascitesAlbumin', { ascitesAlbumin }, currentUnits, commonUnitConfigs.albumin);
      if (serumAlb === undefined || ascitesAlb === undefined || serumAlb < 0 || ascitesAlb < 0) return "Invalid input or unit error.";
      return serumAlb - ascitesAlb;
    },
    resultLabel: 'SAAG',
    resultUnit: 'g/dL',
    details: {
      formula: "SAAG = Serum Albumin - Ascites Fluid Albumin",
      description: "The Serum-Ascites Albumin Gradient is used to determine the cause of ascites.",
    },
    interpretResult: (saag) => {
      if (typeof saag !== 'number') return null;
      if (saag >= 1.1) return `High Gradient (≥1.1 g/dL). Suggests portal hypertension is the cause. Common etiologies: cirrhosis, alcoholic hepatitis, heart failure, massive liver metastases.`;
      return `Low Gradient (<1.1 g/dL). Suggests non-portal hypertensive cause. Common etiologies: peritoneal carcinomatosis, peritoneal tuberculosis, pancreatitis, nephrotic syndrome.`;
    },
  },
  {
    id: 'sofa',
    name: 'SOFA Score (Sequential Organ Failure Assessment)',
    keywords: ['sofa', 'sepsis', 'organ failure', 'icu', 'critical care'],
    inputs: [
      {
        id: 'pao2fio2', label: 'PaO2/FiO2 ratio (mmHg)', type: 'select', defaultUnit: '0', options: [
          { value: 0, label: '≥400' }, { value: 1, label: '<400' }, { value: 2, label: '<300' },
          { value: 3, label: '<200 with respiratory support' }, { value: 4, label: '<100 with respiratory support' },
        ],
      },
      {
        id: 'plateletsSofa', label: 'Platelets (x10^3/µL)', type: 'select', defaultUnit: '0', options: [
          { value: 0, label: '≥150' }, { value: 1, label: '<150' }, { value: 2, label: '<100' },
          { value: 3, label: '<50' }, { value: 4, label: '<20' },
        ],
      },
      {
        id: 'bilirubinSofa', label: 'Bilirubin (mg/dL)', type: 'select', defaultUnit: '0', ...commonUnitConfigs.bilirubin, options: [
          { value: 0, label: '<1.2 (<20 µmol/L)' }, { value: 1, label: '1.2-1.9 (20-32 µmol/L)' }, { value: 2, label: '2.0-5.9 (33-101 µmol/L)' },
          { value: 3, label: '6.0-11.9 (102-204 µmol/L)' }, { value: 4, label: '>12.0 (>204 µmol/L)' },
        ],
      },
      {
        id: 'mapSofa', label: 'Mean Arterial Pressure (MAP) or Vasopressors', type: 'select', defaultUnit: '0', options: [
          { value: 0, label: 'MAP ≥70 mmHg' }, { value: 1, label: 'MAP <70 mmHg' },
          { value: 2, label: 'Dopamine ≤5 µg/kg/min or Dobutamine (any dose)' },
          { value: 3, label: 'Dopamine >5 µg/kg/min OR Epinephrine ≤0.1 µg/kg/min OR Norepinephrine ≤0.1 µg/kg/min' },
          { value: 4, label: 'Dopamine >15 µg/kg/min OR Epinephrine >0.1 µg/kg/min OR Norepinephrine >0.1 µg/kg/min' },
        ],
      },
      {
        id: 'gcsSofa', label: 'Glasgow Coma Scale (GCS)', type: 'select', defaultUnit: '0', options: [
          { value: 0, label: '15' }, { value: 1, label: '13-14' }, { value: 2, label: '10-12' },
          { value: 3, label: '6-9' }, { value: 4, label: ' <6' },
        ],
      },
      {
        id: 'creatinineSofa', label: 'Creatinine (mg/dL) or Urine Output', type: 'select', defaultUnit: '0', ...commonUnitConfigs.serumCreatinine, options: [
          { value: 0, label: '<1.2 (<110 µmol/L)' }, { value: 1, label: '1.2-1.9 (110-170 µmol/L)' }, { value: 2, label: '2.0-3.4 (171-299 µmol/L)' },
          { value: 3, label: '3.5-4.9 (300-440 µmol/L) OR <500 mL/day' }, { value: 4, label: '>5.0 (>440 µmol/L) OR <200 mL/day' },
        ],
      },
    ],
    calculate: (inputs) => {
      let totalScore = 0;
      const inputKeys = ['pao2fio2', 'plateletsSofa', 'bilirubinSofa', 'mapSofa', 'gcsSofa', 'creatinineSofa'];
      for (const key of inputKeys) {
        const val = Number(inputs[key]);
        if (isNaN(val) || inputs[key] === undefined) return null;
        totalScore += val;
      }
      return totalScore;
    },
    resultLabel: 'SOFA Score',
    resultUnit: 'points',
    details: {
      description: "The Sequential Organ Failure Assessment (SOFA) score is used to track a patient's status during their stay in an ICU. It assesses the function of six organ systems. A higher SOFA score is associated with increased mortality.",
    },
    interpretResult: (score) => {
      if (typeof score !== 'number') return null;
      return `Total SOFA score: ${score}. A score increase during the first 24-48h in ICU predicts a mortality rate of at least 50%. Baseline score of <9 predicts 33% mortality. Score >11 predicts 95% mortality.`;
    },
  },
  {
    id: 'wellsDvt',
    name: 'Wells Score for DVT Probability',
    keywords: ['wells dvt', 'deep vein thrombosis', 'dvt', 'pulmonary embolism', 'vte'],
    inputs: [
      { id: 'activeCancer', label: 'Active cancer (treatment within 6 months, or palliative)', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes' }] },
      { id: 'paralysis', label: 'Paralysis, paresis, or recent plaster immobilization of LE', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes' }] },
      { id: 'bedridden', label: 'Recently bedridden >3 days or major surgery within 12 weeks', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes' }] },
      { id: 'tenderness', label: 'Localized tenderness along deep venous system', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes' }] },
      { id: 'legSwelling', label: 'Entire leg swollen', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes' }] },
      { id: 'calfSwelling', label: 'Calf swelling >3 cm compared to asymptomatic leg (measured 10cm below tibial tuberosity)', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes' }] },
      { id: 'pittingEdema', label: 'Pitting edema (confined to symptomatic leg)', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes' }] },
      { id: 'collateralVeins', label: 'Collateral superficial veins (nonvaricose)', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes' }] },
      { id: 'previousDvt', label: 'Previously documented DVT', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes' }] },
      { id: 'alternativeDiagnosis', label: 'Alternative diagnosis as likely or greater than DVT', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No (+0 points)' }, { value: -2, label: 'Yes (-2 points)' }] },
    ],
    calculate: (inputs) => {
      let score = 0;
      const inputKeys = ['activeCancer', 'paralysis', 'bedridden', 'tenderness', 'legSwelling', 'calfSwelling', 'pittingEdema', 'collateralVeins', 'previousDvt', 'alternativeDiagnosis'];
      for (const key of inputKeys) {
        const val = Number(inputs[key]);
        if (isNaN(val) || inputs[key] === undefined) return null;
        score += val;
      }
      return score;
    },
    resultLabel: 'Wells Score for DVT',
    resultUnit: 'points',
    details: {
      description: "Wells criteria for DVT. Each positive finding typically adds 1 point, unless specified (Alternative diagnosis: -2 points).",
    },
    interpretResult: (score) => {
      if (typeof score !== 'number') return null;
      let risk = "";
      if (score >= 3) risk = "High probability (~75% with 2-level, ~53% with 3-level)";
      else if (score >= 1) risk = "Moderate probability (~17% with 2-level, ~17% with 3-level for score 1-2)";
      else risk = "Low probability (~3% with 2-level, ~5% with 3-level for score <=0)";
      return `Score: ${score}. DVT Probability: ${risk}. Interpretation varies slightly by 2-level vs 3-level model. For low/moderate scores, D-dimer testing is often recommended.`;
    },
  },
];

export const getDefaultInputs = (calculator) => {
  const defaults = {};
  if (!calculator || !calculator.inputs || !Array.isArray(calculator.inputs)) {
    console.error("getDefaultInputs called with invalid calculator or calculator.inputs not an array:", calculator);
    return defaults;
  }
  calculator.inputs.forEach(input => {
    if (input.type === 'number') {
      defaults[input.id] = '';
    } else if (input.type === 'select') {
      const optionExists = input.options?.find(opt => String(opt.value) === String(input.defaultUnit));
      if (optionExists) {
        defaults[input.id] = input.defaultUnit;
      } else if (input.options && input.options.length > 0) {
        defaults[input.id] = input.options[0].value;
      } else {
        defaults[input.id] = '';
      }
    } else {
      defaults[input.id] = '';
    }
  });
  return defaults;
};

export const getDefaultInputUnits = (calculator) => {
  const defaultUnits = {};
  if (!calculator || !calculator.inputs || !Array.isArray(calculator.inputs)) {
    console.error("getDefaultInputUnits called with invalid calculator or calculator.inputs not an array:", calculator);
    return defaultUnits;
  }
  calculator.inputs.forEach(input => {
    if (input.defaultUnit && input.supportedUnits) {
      defaultUnits[input.id] = input.defaultUnit;
    } else if (input.supportedUnits && input.supportedUnits.length > 0) {
      defaultUnits[input.id] = input.supportedUnits[0].value;
    }
    else if (input.defaultUnit && !input.supportedUnits) {
      defaultUnits[input.id] = input.defaultUnit;
    }
  });
  return defaultUnits;
};