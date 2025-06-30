/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { commonUnitConfigs, getConvertedValue } from './calculators.js';

export const calculators = [
  // Absolute Reticulocyte Count
  {
    id: 'absReticulocyteCount',
    name: 'Absolute Reticulocyte Count',
    keywords: ['reticulocyte', 'absolute', 'count', 'arc', 'anemia', 'hematology', 'rbc'],
    inputs: [
      { id: 'reticulocytePct', label: 'Reticulocyte Count', type: 'number', min: 0, max: 100, defaultUnit: '%' },
      { id: 'rbcCount', label: 'Red Blood Cell (RBC) Count', type: 'number', min: 0, ...commonUnitConfigs.rbcCount },
    ],
    calculate: (inputs, currentUnits) => {
      const { reticulocytePct, rbcCount } = inputs;
      if (reticulocytePct === undefined || String(reticulocytePct).trim() === '' || rbcCount === undefined || String(rbcCount).trim() === '') return null;

      const reticulocytePctVal = Number(reticulocytePct);
      const rbcCountVal = getConvertedValue('rbcCount', { rbcCount }, currentUnits, commonUnitConfigs.rbcCount);

      if (rbcCountVal === undefined || isNaN(reticulocytePctVal) || rbcCountVal < 0 || reticulocytePctVal < 0) return "Invalid input or unit error.";
      if (reticulocytePctVal > 100) return "Reticulocyte % cannot be > 100.";

      const arc = (reticulocytePctVal / 100) * rbcCountVal;
      return arc;
    },
    resultLabel: 'Absolute Reticulocyte Count',
    resultUnit: 'cells/µL',
    details: {
      formula: "ARC (cells/µL) = (Reticulocyte % / 100) * RBC Count (cells/µL)",
      description: "Calculates the absolute number of reticulocytes in the blood, which is a better measure of red blood cell production than the percentage alone.",
    },
    interpretResult: (arc) => {
      if (typeof arc !== 'number') return null;
      // Normal range is typically 25,000 to 75,000 cells/µL
      if (arc > 100000) return `High ARC (${arc.toFixed(0)} cells/µL). Suggests bone marrow is responding to anemia (e.g., due to hemolysis or blood loss).`;
      if (arc < 25000) return `Low ARC (${arc.toFixed(0)} cells/µL). Suggests inadequate bone marrow response to anemia (e.g., aplastic anemia, bone marrow suppression, nutritional deficiency).`;
      return `Normal ARC (${arc.toFixed(0)} cells/µL). (Normal range approx. 25,000-75,000 cells/µL).`;
    },
  },
  // Delta-Delta Gap
  {
    id: 'deltaDeltaGap',
    name: 'Delta-Delta Gap',
    keywords: ['delta gap', 'delta delta', 'anion gap', 'metabolic acidosis', 'mixed disorder'],
    inputs: [
      { id: 'sodium', label: 'Sodium (Na+)', type: 'number', min: 0, ...commonUnitConfigs.sodiumMeqL },
      { id: 'chloride', label: 'Chloride (Cl-)', type: 'number', min: 0, ...commonUnitConfigs.genericMeqL },
      { id: 'bicarbonate', label: 'Bicarbonate (HCO3-)', type: 'number', min: 0, ...commonUnitConfigs.genericMeqL },
      { id: 'albumin', label: 'Albumin (optional, for correction)', type: 'number', min: 0, ...commonUnitConfigs.albumin, placeholder: "e.g., 4.0" },
    ],
    calculate: (inputs, currentUnits) => {
      const { sodium, chloride, bicarbonate, albumin } = inputs;
      if ([sodium, chloride, bicarbonate].some(v => v === undefined || String(v).trim() === '')) return null;

      const na = getConvertedValue('sodium', { sodium }, currentUnits, commonUnitConfigs.sodiumMeqL);
      const cl = getConvertedValue('chloride', { chloride }, currentUnits, commonUnitConfigs.genericMeqL);
      const hco3 = getConvertedValue('bicarbonate', { bicarbonate }, currentUnits, commonUnitConfigs.genericMeqL);
      
      if ([na, cl, hco3].some(v => v === undefined || v < 0)) return "Invalid electrolyte values.";

      let measuredAG = na - (cl + hco3);
      let correctedAG = measuredAG;

      const hasAlbumin = albumin !== undefined && String(albumin).trim() !== '';
      if (hasAlbumin) {
          const alb = getConvertedValue('albumin', { albumin }, currentUnits, commonUnitConfigs.albumin);
          if (alb === undefined || alb < 0) return "Invalid albumin value.";
          correctedAG = measuredAG + 2.5 * (4.0 - alb);
      }
      
      const deltaAG = correctedAG - 12; // Normal AG is ~12
      const deltaDelta = deltaAG + hco3;

      return {
          anionGap: measuredAG,
          correctedAnionGap: hasAlbumin ? correctedAG : null,
          deltaDelta: deltaDelta,
      };
    },
    resultLabel: 'Delta-Delta Gap Calculation',
    resultUnit: { anionGap: 'mEq/L', correctedAnionGap: 'mEq/L', deltaDelta: 'mEq/L' },
    details: {
      formula: "1. Anion Gap = Na+ - (Cl- + HCO3-)\n2. Corrected AG = AG + 2.5 * (4 - Albumin)\n3. Delta AG = Corrected AG - 12\n4. Delta-Delta = Delta AG + Measured HCO3-",
      description: "The Delta-Delta gap is used in the setting of a high anion gap metabolic acidosis to determine if another acid-base disorder is present.",
    },
    interpretResult: (result) => {
        if (typeof result !== 'object' || result.deltaDelta === undefined) return null;
        const dd = result.deltaDelta;
        let interpretation = `Calculated Delta-Delta is ${dd.toFixed(1)}. `;
        if (dd > 28) {
            interpretation += "This suggests a concurrent metabolic alkalosis.";
        } else if (dd < 23) {
            interpretation += "This suggests a concurrent non-anion gap metabolic acidosis.";
        } else {
            interpretation += "This is consistent with a pure high anion gap metabolic acidosis.";
        }
        return interpretation;
    },
  },
  // Autoimmune Hepatitis Score
  {
    id: 'aihScore',
    name: 'Autoimmune Hepatitis Score (Simplified)',
    keywords: ['aih', 'autoimmune hepatitis', 'liver', 'hepatology', 'autoantibody'],
    inputs: [
        { id: 'titers', label: 'ANA, SMA, or LKM-1 Titers', type: 'select', defaultUnit: '0', options: [
            { value: 0, label: '< 1:40' },
            { value: 1, label: '≥ 1:40' },
            { value: 2, label: '≥ 1:80' },
        ]},
        { id: 'igg', label: 'IgG Level', type: 'select', defaultUnit: '0', options: [
            { value: 0, label: 'Normal' },
            { value: 1, label: '> Upper Limit of Normal' },
            { value: 2, label: '> 1.10 x Upper Limit of Normal' },
        ]},
        { id: 'histology', label: 'Liver Histology', type: 'select', defaultUnit: '0', options: [
            { value: 0, label: 'Atypical / Normal' },
            { value: 1, label: 'Compatible with AIH (e.g., interface hepatitis)' },
            { value: 2, label: 'Typical of AIH (e.g., + plasma cells)' },
        ]},
        { id: 'viral', label: 'Absence of Viral Hepatitis', type: 'select', defaultUnit: '0', options: [
            { value: 0, label: 'No (Viral markers present)' },
            { value: 2, label: 'Yes (Viral markers absent)' },
        ]},
    ],
    calculate: (inputs) => {
        const { titers, igg, histology, viral } = inputs;
        if ([titers, igg, histology, viral].some(v => v === undefined)) return null;
        return Number(titers) + Number(igg) + Number(histology) + Number(viral);
    },
    resultLabel: 'Simplified AIH Score',
    resultUnit: 'points',
    details: {
      description: "The simplified scoring system for the diagnosis of autoimmune hepatitis (AIH), proposed by the International Autoimmune Hepatitis Group (IAIHG). This score helps in diagnosing AIH but should be interpreted in the full clinical context.",
      reference: "Hennes et al. Hepatology. 2008 Nov;48(5):1696. Simplified criteria for the diagnosis of autoimmune hepatitis."
    },
    interpretResult: (score) => {
        if (typeof score !== 'number') return null;
        if (score >= 7) return `Score: ${score}. Definite Autoimmune Hepatitis.`;
        if (score >= 6) return `Score: ${score}. Probable Autoimmune Hepatitis.`;
        return `Score: ${score}. AIH is unlikely based on this score.`;
    }
  },
  {
    id: 'bisapScore',
    name: 'BISAP Score for Pancreatitis Mortality',
    keywords: ['bisap', 'pancreatitis', 'acute pancreatitis', 'severity', 'mortality'],
    inputs: [
        { id: 'bun', label: 'BUN > 25 mg/dL (or Urea > 8.9 mmol/L)', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes' }] },
        { id: 'mentalStatus', label: 'Impaired Mental Status (e.g., GCS < 15)', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes' }] },
        { id: 'sirs', label: 'SIRS criteria met (≥2)', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes' }] },
        { id: 'age', label: 'Age > 60 years', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes' }] },
        { id: 'pleuralEffusion', label: 'Pleural Effusion on imaging', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes' }] },
    ],
    calculate: (inputs) => {
        const { bun, mentalStatus, sirs, age, pleuralEffusion } = inputs;
        if ([bun, mentalStatus, sirs, age, pleuralEffusion].some(v => v === undefined)) return null;
        return Number(bun) + Number(mentalStatus) + Number(sirs) + Number(age) + Number(pleuralEffusion);
    },
    resultLabel: 'BISAP Score',
    resultUnit: 'points',
    details: {
        description: "The Bedside Index of Severity in Acute Pancreatitis (BISAP) score is a simple tool to predict mortality risk in patients with acute pancreatitis within the first 24 hours of admission.",
        criteria: "B: BUN > 25 mg/dL\nI: Impaired Mental Status\nS: SIRS (≥2 criteria)\nA: Age > 60 years\nP: Pleural Effusion on imaging\nEach criterion present scores 1 point.",
        sirsCriteria: "SIRS is defined by having 2 or more of the following: Temp <36°C or >38°C; Heart Rate >90 bpm; Respiratory Rate >20/min or PaCO2 <32 mmHg; WBC <4,000/mm³, >12,000/mm³, or >10% bands.",
    },
    interpretResult: (score) => {
        if (typeof score !== 'number') return null;
        let mortality = "";
        if (score === 0) mortality = "<1%";
        else if (score === 1) mortality = "1.9%";
        else if (score === 2) mortality = "3.6%";
        else if (score === 3) mortality = "6.4%";
        else if (score === 4) mortality = "9.5%";
        else if (score === 5) mortality = "22%";
        return `Score: ${score}. This corresponds to an approximate in-hospital mortality risk of ${mortality}. A score ≥3 is associated with increased risk of severe pancreatitis and death.`;
    }
  },
  {
    id: 'bodeIndex',
    name: 'BODE Index for COPD Survival',
    keywords: ['bode', 'copd', 'survival', 'pulmonology', 'fev1', 'dyspnea'],
    inputs: [
        { id: 'bmiBode', label: 'BMI', type: 'select', defaultUnit: '0', options: [
            { value: 0, label: '> 21 kg/m²' },
            { value: 1, label: '≤ 21 kg/m²' },
        ]},
        { id: 'fev1', label: 'Post-Bronchodilator FEV1 (% predicted)', type: 'select', defaultUnit: '0', options: [
            { value: 0, label: '≥ 65%' },
            { value: 1, label: '50% - 64%' },
            { value: 2, label: '36% - 49%' },
            { value: 3, label: '≤ 35%' },
        ]},
        { id: 'mmrc', label: 'MMRC Dyspnea Scale', type: 'select', defaultUnit: '0', options: [
            { value: 0, label: 'Grade 0-1 (Only breathless with strenuous exercise)' },
            { value: 1, label: 'Grade 2 (Short of breath when hurrying or walking up a slight hill)' },
            { value: 2, label: 'Grade 3 (Walks slower than people of the same age due to breathlessness or has to stop for breath when walking at own pace)' },
            { value: 3, label: 'Grade 4 (Too breathless to leave the house or breathless when dressing)' },
        ]},
        { id: 'walkDist', label: '6-Minute Walk Distance', type: 'select', defaultUnit: '0', options: [
            { value: 0, label: '≥ 350 meters' },
            { value: 1, label: '250 - 349 meters' },
            { value: 2, label: '150 - 249 meters' },
            { value: 3, label: '≤ 149 meters' },
        ]},
    ],
    calculate: (inputs) => {
        const { bmiBode, fev1, mmrc, walkDist } = inputs;
        if ([bmiBode, fev1, mmrc, walkDist].some(v => v === undefined)) return null;
        return Number(bmiBode) + Number(fev1) + Number(mmrc) + Number(walkDist);
    },
    resultLabel: 'BODE Index Score',
    resultUnit: 'points',
    details: {
        description: "The BODE index is a multidimensional scoring system used to predict the risk of death from any cause in patients with Chronic Obstructive Pulmonary Disease (COPD).",
        criteria: "B: Body-mass index (BMI ≤21 = 1 pt)\nO: Airflow Obstruction (FEV1 % predicted)\nD: Dyspnea (MMRC scale)\nE: Exercise capacity (6-min walk distance)",
    },
    interpretResult: (score) => {
        if (typeof score !== 'number') return null;
        let survival = "";
        if (score >= 0 && score <= 2) survival = "80%";
        else if (score >= 3 && score <= 4) survival = "67%";
        else if (score >= 5 && score <= 6) survival = "57%";
        else if (score >= 7 && score <= 10) survival = "18%";
        return `Score: ${score} points (Range 0-10). Approximate 4-year survival is ${survival}.`;
    }
  },
  {
    id: 'bsaDuBois',
    name: 'Body Surface Area (BSA) - Du Bois',
    keywords: ['bsa', 'body surface area', 'du bois', 'chemotherapy', 'dosing'],
    inputs: [
        { id: 'weight', label: 'Weight', type: 'number', min: 0, ...commonUnitConfigs.weight },
        { id: 'height', label: 'Height', type: 'number', min: 0, ...commonUnitConfigs.height },
    ],
    calculate: (inputs, currentUnits) => {
        const { weight, height } = inputs;
        if (weight === undefined || String(weight).trim() === '' || height === undefined || String(height).trim() === '') return null;
        
        const weightInKg = getConvertedValue('weight', { weight }, currentUnits, commonUnitConfigs.weight);
        const heightInCm = getConvertedValue('height', { height }, currentUnits, commonUnitConfigs.height);

        if (weightInKg === undefined || heightInCm === undefined || weightInKg <= 0 || heightInCm <= 0) return "Invalid input. Weight and Height must be positive.";
        
        const bsa = 0.007184 * Math.pow(weightInKg, 0.425) * Math.pow(heightInCm, 0.725);
        return bsa;
    },
    resultLabel: 'Body Surface Area',
    resultUnit: 'm²',
    details: {
        formula: "BSA (m²) = 0.007184 × Weight(kg)^0.425 × Height(cm)^0.725",
        description: "Calculates the Body Surface Area (BSA) using the Du Bois formula. BSA is commonly used for chemotherapy dosing and other medication calculations.",
    },
    interpretResult: (bsa) => {
        if (typeof bsa !== 'number') return null;
        return `Calculated Body Surface Area is ${bsa.toFixed(2)} m². Average BSA for an adult is typically 1.7-1.9 m².`;
    }
  },
  {
    id: 'parklandFormula',
    name: 'Parkland Formula for Burn Resuscitation',
    keywords: ['parkland', 'burns', 'fluid resuscitation', 'emergency', 'trauma'],
    inputs: [
        { id: 'weight', label: 'Patient Weight', type: 'number', min: 0, ...commonUnitConfigs.weight },
        { id: 'tbsa', label: 'Total Body Surface Area (TBSA) of Burn', type: 'number', min: 0, max: 100, defaultUnit: '%' },
    ],
    calculate: (inputs, currentUnits) => {
        const { weight, tbsa } = inputs;
        if (weight === undefined || String(weight).trim() === '' || tbsa === undefined || String(tbsa).trim() === '') return null;

        const weightInKg = getConvertedValue('weight', { weight }, currentUnits, commonUnitConfigs.weight);
        const tbsaPct = Number(tbsa);

        if (weightInKg === undefined || isNaN(tbsaPct) || weightInKg <= 0 || tbsaPct < 0) return "Invalid input. Weight must be positive and TBSA must be non-negative.";
        if (tbsaPct > 100) return "TBSA cannot be greater than 100%.";

        const totalFluidMl = 4 * weightInKg * tbsaPct;
        const first8hFluid = totalFluidMl / 2;
        const next16hFluid = totalFluidMl / 2;
        const first8hRate = first8hFluid / 8;
        const next16hRate = next16hFluid / 16;
        
        return {
            totalFluid24h: totalFluidMl,
            first8hTotal: first8hFluid,
            first8hRate: first8hRate,
            next16hTotal: next16hFluid,
            next16hRate: next16hRate
        };
    },
    resultLabel: 'Fluid Resuscitation Plan (Lactated Ringers)',
    resultUnit: {
        totalFluid24h: 'mL',
        first8hTotal: 'mL',
        first8hRate: 'mL/hr',
        next16hTotal: 'mL',
        next16hRate: 'mL/hr'
    },
    details: {
        formula: "Total Fluid (24h) = 4 mL × Weight(kg) × TBSA(%)",
        description: "The Parkland formula is used to estimate the amount of intravenous fluid (typically Lactated Ringers) required for the resuscitation of a burn patient over the first 24 hours.",
        administrationPlan: "1. Give the first half of the total fluid over the first 8 hours from the time of the burn.\n2. Give the second half of the total fluid over the next 16 hours.",
    },
    interpretResult: (result) => {
        if (typeof result !== 'object' || result.totalFluid24h === undefined) return null;
        return `Total fluid in first 24h: ${result.totalFluid24h.toFixed(0)} mL.
First 8 hours: Infuse ${result.first8hTotal.toFixed(0)} mL at a rate of ${result.first8hRate.toFixed(0)} mL/hr.
Next 16 hours: Infuse ${result.next16hTotal.toFixed(0)} mL at a rate of ${result.next16hRate.toFixed(0)} mL/hr.
This is a guideline; resuscitation must be titrated to clinical endpoints (e.g., urine output).`;
    }
  },
  {
    id: 'correctedCalcium',
    name: 'Corrected Calcium for Hypoalbuminemia',
    keywords: ['calcium', 'corrected', 'albumin', 'hypoalbuminemia', 'electrolytes'],
    inputs: [
        { id: 'measuredCa', label: 'Measured Serum Calcium', type: 'number', min: 0, 
            defaultUnit: 'mg/dL',
            supportedUnits: [
                { value: 'mg/dL', label: 'mg/dL', toBaseFactor: 1 },
                { value: 'mmol/L', label: 'mmol/L', toBaseFactor: 1/0.25 },
            ],
        },
        { id: 'albumin', label: 'Serum Albumin', type: 'number', min: 0, ...commonUnitConfigs.albumin },
    ],
    calculate: (inputs, currentUnits) => {
        const { measuredCa, albumin } = inputs;
        if ([measuredCa, albumin].some(v => v === undefined || String(v).trim() === '')) return null;

        const measuredCaVal = Number(measuredCa);
        const albumin_g_dl = getConvertedValue('albumin', { albumin }, currentUnits, commonUnitConfigs.albumin);
        
        if (isNaN(measuredCaVal) || albumin_g_dl === undefined || measuredCaVal < 0 || albumin_g_dl < 0) return "Invalid input.";
        
        const unit = currentUnits.measuredCa || 'mg/dL';
        if (unit === 'mg/dL') {
            return measuredCaVal + 0.8 * (4.0 - albumin_g_dl);
        } else { // mmol/L
            const albumin_g_L = albumin_g_dl * 10;
            return measuredCaVal + 0.02 * (40 - albumin_g_L);
        }
    },
    resultLabel: 'Corrected Calcium',
    resultUnit: '', // Unit is dynamic based on input
    details: {
        formula: "Conventional units (mg/dL): Corrected Ca = Measured Ca + 0.8 * (4.0 - Albumin g/dL)\nSI units (mmol/L): Corrected Ca = Measured Ca + 0.02 * (40 - Albumin g/L)",
        description: "This formula adjusts the total serum calcium concentration for abnormal levels of serum albumin. For every 1 g/dL decrease in serum albumin below 4.0 g/dL, the total serum calcium is adjusted upwards by 0.8 mg/dL.",
    },
    interpretResult: (result, inputs, units) => {
        if (typeof result !== 'number') return null;
        const unit = units.measuredCa || 'mg/dL';
        let normalRange, interpretation;
        if (unit === 'mg/dL') {
            normalRange = "8.5-10.2 mg/dL";
            interpretation = `Corrected Calcium: ${result.toFixed(2)} mg/dL.`;
        } else {
            normalRange = "2.1-2.6 mmol/L";
            interpretation = `Corrected Calcium: ${result.toFixed(2)} mmol/L.`;
        }
        return `${interpretation} Normal range is approximately ${normalRange}. Clinical context is essential.`;
    }
  },
  {
    id: 'centorScore',
    name: 'Centor Score for Strep Pharyngitis',
    keywords: ['centor', 'mcisaac', 'strep', 'pharyngitis', 'sore throat', 'tonsillitis'],
    inputs: [
        { id: 'exudate', label: 'Tonsillar exudate or swelling', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes' }] },
        { id: 'nodes', label: 'Swollen, tender anterior cervical nodes', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes' }] },
        { id: 'fever', label: 'Temperature > 38°C (100.4°F)', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes' }] },
        { id: 'cough', label: 'Absence of cough', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No (Cough present)' }, { value: 1, label: 'Yes (Cough absent)' }] },
        { id: 'age', label: 'Age (McIsaac modification)', type: 'select', defaultUnit: '0', options: [
            { value: 1, label: '3-14 years' },
            { value: 0, label: '15-44 years' },
            { value: -1, label: '≥ 45 years' },
        ]},
    ],
    calculate: (inputs) => {
        const { exudate, nodes, fever, cough, age } = inputs;
        if ([exudate, nodes, fever, cough, age].some(v => v === undefined)) return null;
        return Number(exudate) + Number(nodes) + Number(fever) + Number(cough) + Number(age);
    },
    resultLabel: 'Centor Score',
    resultUnit: 'points',
    details: {
        description: "The Centor score (with McIsaac age-based modification) is a clinical decision rule for predicting the probability of Group A Streptococcus infection in patients with pharyngitis.",
        criteria: "C: Tonsillar exudates (+1)\nE: Swollen tender anterior cervical nodes (+1)\nN: No cough (+1)\nT: Temperature > 38°C (+1)\nOR: Age Modifier (3-14: +1, 15-44: 0, ≥45: -1)",
    },
    interpretResult: (score) => {
        if (typeof score !== 'number') return null;
        let risk, recommendation;
        if (score <= 0) {
            risk = "1-2.5%";
            recommendation = "No antibiotic or throat culture necessary. Risk of strep is very low.";
        } else if (score === 1) {
            risk = "5-10%";
            recommendation = "Throat culture or Rapid Antigen Detection Test (RADT) may be considered.";
        } else if (score === 2) {
            risk = "11-17%";
            recommendation = "Perform throat culture or RADT. Treat with antibiotics if positive.";
        } else if (score === 3) {
            risk = "28-35%";
            recommendation = "Perform throat culture or RADT. Treat with antibiotics if positive. Some guidelines suggest empirical treatment.";
        } else { // score >= 4
            risk = "51-53%";
            recommendation = "Empiric antibiotics may be justified. RADT can still be useful.";
        }
        return `Score: ${score}. Risk of Group A Strep: ${risk}. Recommendation: ${recommendation}`;
    }
  },
  {
    id: 'ciwaAr',
    name: 'CIWA-Ar for Alcohol Withdrawal',
    keywords: ['ciwa', 'alcohol withdrawal', 'delirium tremens', 'detox', 'addiction'],
    inputs: [
        { id: 'nausea', label: 'Nausea and Vomiting', type: 'select', defaultUnit: '0', options: [
            { value: 0, label: '0 - None' }, { value: 1, label: '1 - Mild nausea with no vomiting' }, { value: 4, label: '4 - Intermittent nausea with dry heaves' }, { value: 7, label: '7 - Constant nausea, frequent dry heaves/vomiting' }
        ]},
        { id: 'tremor', label: 'Tremor', type: 'select', defaultUnit: '0', options: [
            { value: 0, label: '0 - No tremor' }, { value: 1, label: '1 - Not visible, but can be felt' }, { value: 4, label: '4 - Moderate, with arms extended' }, { value: 7, label: '7 - Severe, even with arms not extended' }
        ]},
        { id: 'sweats', label: 'Paroxysmal Sweats', type: 'select', defaultUnit: '0', options: [
            { value: 0, label: '0 - No sweat' }, { value: 1, label: '1 - Barely perceptible sweating' }, { value: 4, label: '4 - Beads of sweat obvious on forehead' }, { value: 7, label: '7 - Drenching sweats' }
        ]},
        { id: 'anxiety', label: 'Anxiety', type: 'select', defaultUnit: '0', options: [
            { value: 0, label: '0 - No anxiety' }, { value: 1, label: '1 - Mildly anxious' }, { value: 4, label: '4 - Moderately anxious or guarded' }, { value: 7, label: '7 - Equivalent to acute panic state' }
        ]},
        { id: 'agitation', label: 'Agitation', type: 'select', defaultUnit: '0', options: [
            { value: 0, label: '0 - Normal activity' }, { value: 1, label: '1 - Somewhat normal activity' }, { value: 2, label: '2 - Moderately fidgety and restless' }, { value: 4, label: '4 - Paces, or thrashes about' }, { value: 7, label: '7 - Runs about, or is fighting' }
        ]},
        { id: 'tactile', label: 'Tactile Disturbances', type: 'select', defaultUnit: '0', options: [
            { value: 0, label: '0 - None' }, { value: 1, label: '1 - Very mild itching, pins and needles' }, { value: 2, label: '2 - Mild itching' }, { value: 3, label: '3 - Moderate itching or pins and needles' }, { value: 4, label: '4 - Moderate hallucinations' }, { value: 5, label: '5 - Severe hallucinations' }, { value: 6, label: '6 - Extremely severe hallucinations' }, { value: 7, label: '7 - Continuous hallucinations' }
        ]},
        { id: 'auditory', label: 'Auditory Disturbances', type: 'select', defaultUnit: '0', options: [
            { value: 0, label: '0 - None' }, { value: 1, label: '1 - Very mild harshness or ability to frighten' }, { value: 2, label: '2 - Mild harshness' }, { value: 3, label: '3 - Moderate harshness' }, { value: 4, label: '4 - Moderate hallucinations' }, { value: 5, label: '5 - Severe hallucinations' }, { value: 6, label: '6 - Extremely severe hallucinations' }, { value: 7, label: '7 - Continuous hallucinations' }
        ]},
        { id: 'visual', label: 'Visual Disturbances', type: 'select', defaultUnit: '0', options: [
            { value: 0, label: '0 - None' }, { value: 1, label: '1 - Very mild sensitivity' }, { value: 2, label: '2 - Mild sensitivity' }, { value: 3, label: '3 - Moderate sensitivity' }, { value: 4, label: '4 - Moderate hallucinations' }, { value: 5, label: '5 - Severe hallucinations' }, { value: 6, label: '6 - Extremely severe hallucinations' }, { value: 7, label: '7 - Continuous hallucinations' }
        ]},
        { id: 'headache', label: 'Headache, Fullness in Head', type: 'select', defaultUnit: '0', options: [
            { value: 0, label: '0 - Not present' }, { value: 1, label: '1 - Very mild' }, { value: 2, label: '2 - Mild' }, { value: 3, label: '3 - Moderate' }, { value: 4, label: '4 - Moderately severe' }, { value: 5, label: '5 - Severe' }, { value: 6, label: '6 - Very severe' }, { value: 7, label: '7 - Extremely severe' }
        ]},
        { id: 'orientation', label: 'Orientation and Clouding of Sensorium', type: 'select', defaultUnit: '0', options: [
            { value: 0, label: '0 - Oriented and can do serial additions' }, { value: 1, label: '1 - Cannot do serial additions' }, { value: 2, label: '2 - Disoriented for date by no more than 2 calendar days' }, { value: 3, label: '3 - Disoriented for date by more than 2 calendar days' }, { value: 4, label: '4 - Disoriented for place and/or person' }
        ]},
    ],
    calculate: (inputs) => {
        let score = 0;
        const keys = ['nausea', 'tremor', 'sweats', 'anxiety', 'agitation', 'tactile', 'auditory', 'visual', 'headache', 'orientation'];
        for (const key of keys) {
            if (inputs[key] === undefined) return null;
            score += Number(inputs[key]);
        }
        return score;
    },
    resultLabel: 'CIWA-Ar Score',
    resultUnit: 'points',
    details: {
        description: "The Clinical Institute Withdrawal Assessment for Alcohol, Revised (CIWA-Ar) is a 10-item scale used to quantify the severity of alcohol withdrawal and to guide therapy.",
    },
    interpretResult: (score) => {
        if (typeof score !== 'number') return null;
        let severity, recommendation;
        if (score <= 9) {
            severity = "Absent or minimal withdrawal";
            recommendation = "No medication needed unless there's a history of severe withdrawal or seizures.";
        } else if (score <= 15) {
            severity = "Mild to moderate withdrawal";
            recommendation = "Symptom-triggered medication is appropriate. Monitor closely.";
        } else { // score > 15
            severity = "Severe withdrawal";
            recommendation = "Symptom-triggered medication required. High risk for delirium tremens. Consider scheduled medication regimen and intensive monitoring.";
        }
        return `Score: ${score}. Severity: ${severity}. Recommendation: ${recommendation}`;
    }
  },
  {
    id: 'correctedCsfWbc',
    name: 'Corrected CSF WBC Count (Traumatic LP)',
    keywords: ['csf', 'wbc', 'corrected', 'traumatic tap', 'lp', 'lumbar puncture', 'meningitis'],
    inputs: [
        { id: 'csfWbc', label: 'Observed CSF WBC Count', type: 'number', min: 0, defaultUnit: 'cells/µL' },
        { id: 'csfRbc', label: 'Observed CSF RBC Count', type: 'number', min: 0, defaultUnit: 'cells/µL' },
        { id: 'bloodWbc', label: 'Peripheral Blood WBC Count', type: 'number', min: 0, ...commonUnitConfigs.wbcCount },
        { id: 'bloodRbc', label: 'Peripheral Blood RBC Count', type: 'number', min: 0, ...commonUnitConfigs.rbcCount },
    ],
    calculate: (inputs, currentUnits) => {
        const { csfWbc, csfRbc, bloodWbc, bloodRbc } = inputs;
        if ([csfWbc, csfRbc, bloodWbc, bloodRbc].some(v => v === undefined || String(v).trim() === '')) return null;

        const csfWbcVal = Number(csfWbc);
        const csfRbcVal = Number(csfRbc);
        const bloodWbcVal = getConvertedValue('bloodWbc', { bloodWbc }, currentUnits, commonUnitConfigs.wbcCount);
        const bloodRbcVal = getConvertedValue('bloodRbc', { bloodRbc }, currentUnits, commonUnitConfigs.rbcCount);
        
        if (bloodWbcVal === undefined || bloodRbcVal === undefined) return "Unit error";
        if ([csfWbcVal, csfRbcVal, bloodWbcVal, bloodRbcVal].some(isNaN) || [csfWbcVal, csfRbcVal, bloodWbcVal, bloodRbcVal].some(v => v < 0)) return "Invalid input.";
        if (bloodRbcVal === 0) return "Peripheral RBC count cannot be zero.";

        const predictedWbc = bloodWbcVal * (csfRbcVal / bloodRbcVal);
        const correctedWbc = csfWbcVal - predictedWbc;
        
        return Math.max(0, correctedWbc); // Corrected count cannot be negative
    },
    resultLabel: 'Corrected CSF WBC Count',
    resultUnit: 'cells/µL',
    details: {
        formula: "Corrected CSF WBC = Observed CSF WBC - (Blood WBC * [Observed CSF RBC / Blood RBC])",
        description: "Estimates the true number of white blood cells (WBCs) in the cerebrospinal fluid (CSF) by correcting for contamination from peripheral blood during a traumatic lumbar puncture.",
        ruleOfThumb: "A simpler rule of thumb often used is subtracting 1 WBC for every 500-1000 RBCs in the CSF, but the formula provided is more precise.",
    },
    interpretResult: (result) => {
        if (typeof result !== 'number') return null;
        return `Corrected CSF WBC count is approximately ${result.toFixed(1)} cells/µL. A value >5-10 cells/µL may suggest underlying pleocytosis (inflammation/infection), but results must be interpreted in the full clinical context.`;
    }
  },
  {
    id: 'psiScore',
    name: 'Pneumonia Severity Index (PSI)',
    keywords: ['psi', 'pneumonia severity index', 'cap', 'community acquired pneumonia', 'risk'],
    inputs: [
        { id: 'age', label: 'Age', type: 'number', min: 0, defaultUnit: 'years' },
        { id: 'gender', label: 'Sex', type: 'select', defaultUnit: 'male', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }] },
        { id: 'nursingHome', label: 'Nursing Home Resident', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes (+10 pts)' }] },
        { id: 'neoplastic', label: 'Neoplastic Disease', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes (+30 pts)' }] },
        { id: 'liverDz', label: 'Liver Disease', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes (+20 pts)' }] },
        { id: 'chf', label: 'Congestive Heart Failure', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes (+10 pts)' }] },
        { id: 'cerebrovascular', label: 'Cerebrovascular Disease', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes (+10 pts)' }] },
        { id: 'renalDz', label: 'Renal Disease', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes (+10 pts)' }] },
        { id: 'mentalStatus', label: 'Altered Mental Status', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes (+20 pts)' }] },
        { id: 'pulse', label: 'Pulse ≥ 125 bpm', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes (+10 pts)' }] },
        { id: 'respRate', label: 'Respiratory Rate ≥ 30/min', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes (+20 pts)' }] },
        { id: 'sbp', label: 'Systolic BP < 90 mmHg', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes (+20 pts)' }] },
        { id: 'temp', label: 'Temperature <35°C or ≥40°C', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes (+15 pts)' }] },
        { id: 'ph', label: 'Arterial pH < 7.35', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes (+30 pts)' }] },
        { id: 'bun', label: 'BUN ≥ 30 mg/dL (11 mmol/L)', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes (+20 pts)' }] },
        { id: 'sodium', label: 'Sodium < 130 mEq/L', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes (+20 pts)' }] },
        { id: 'glucose', label: 'Glucose ≥ 250 mg/dL (14 mmol/L)', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes (+10 pts)' }] },
        { id: 'hct', label: 'Hematocrit < 30%', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes (+10 pts)' }] },
        { id: 'paO2', label: 'PaO₂ < 60 mmHg or O₂ Sat < 90%', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes (+10 pts)' }] },
        { id: 'pleuralEffusion', label: 'Pleural Effusion', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes (+10 pts)' }] },
    ],
    calculate: (inputs) => {
        let score = 0;
        const keys = ['nursingHome', 'neoplastic', 'liverDz', 'chf', 'cerebrovascular', 'renalDz', 'mentalStatus', 'pulse', 'respRate', 'sbp', 'temp', 'ph', 'bun', 'sodium', 'glucose', 'hct', 'paO2', 'pleuralEffusion'];
        const points = [10, 30, 20, 10, 10, 10, 20, 10, 20, 20, 15, 30, 20, 20, 10, 10, 10, 10];
        
        const ageVal = Number(inputs.age);
        if (inputs.age === undefined || String(inputs.age).trim() === '' || isNaN(ageVal) || ageVal < 0) return null;

        if (inputs.gender === 'male') {
            score += ageVal;
        } else {
            score += Math.max(0, ageVal - 10);
        }

        for (let i=0; i < keys.length; i++) {
            const key = keys[i];
            if (inputs[key] === undefined) return null;
            if (Number(inputs[key]) === 1) {
                score += points[i];
            }
        }
        return score;
    },
    resultLabel: 'PSI Score',
    resultUnit: 'points',
    details: {
        description: "The Pneumonia Severity Index (PSI) is a clinical prediction rule that stratifies adults with community-acquired pneumonia (CAP) into risk classes to help guide decisions about site of care.",
    },
    interpretResult: (score) => {
        if (typeof score !== 'number') return null;
        let riskClass, mortality, recommendation;
        if (score <= 50) {
            riskClass = "I";
            mortality = "0.1%";
            recommendation = "Outpatient care";
        } else if (score <= 70) {
            riskClass = "II";
            mortality = "0.6%";
            recommendation = "Outpatient care";
        } else if (score <= 90) {
            riskClass = "III";
            mortality = "0.9-2.8%";
            recommendation = "Outpatient care or brief inpatient admission";
        } else if (score <= 130) {
            riskClass = "IV";
            mortality = "8.2-9.3%";
            recommendation = "Inpatient admission";
        } else { // score > 130
            riskClass = "V";
            mortality = "27-31.1%";
            recommendation = "Inpatient admission (consider ICU)";
        }
        return `Score: ${score}. Risk Class: ${riskClass}. Approx. 30-day Mortality: ${mortality}. Recommendation: ${recommendation}.`;
    }
  },
  {
    id: 'epworthSleepinessScale',
    name: 'Epworth Sleepiness Scale (ESS)',
    keywords: ['epworth', 'ess', 'sleepiness', 'daytime', 'sleep apnea', 'osa', 'pulmonology'],
    inputs: [
        { id: 'q1', label: '1. Sitting and reading', type: 'select', defaultUnit: '0', options: [{ value: 0, label: '0 - Would never doze' }, { value: 1, label: '1 - Slight chance' }, { value: 2, label: '2 - Moderate chance' }, { value: 3, label: '3 - High chance' }] },
        { id: 'q2', label: '2. Watching TV', type: 'select', defaultUnit: '0', options: [{ value: 0, label: '0 - Would never doze' }, { value: 1, label: '1 - Slight chance' }, { value: 2, label: '2 - Moderate chance' }, { value: 3, label: '3 - High chance' }] },
        { id: 'q3', label: '3. Sitting, inactive in a public place (e.g. a theater or a meeting)', type: 'select', defaultUnit: '0', options: [{ value: 0, label: '0 - Would never doze' }, { value: 1, label: '1 - Slight chance' }, { value: 2, label: '2 - Moderate chance' }, { value: 3, label: '3 - High chance' }] },
        { id: 'q4', label: '4. As a passenger in a car for an hour without a break', type: 'select', defaultUnit: '0', options: [{ value: 0, label: '0 - Would never doze' }, { value: 1, label: '1 - Slight chance' }, { value: 2, label: '2 - Moderate chance' }, { value: 3, label: '3 - High chance' }] },
        { id: 'q5', label: '5. Lying down to rest in the afternoon when circumstances permit', type: 'select', defaultUnit: '0', options: [{ value: 0, label: '0 - Would never doze' }, { value: 1, label: '1 - Slight chance' }, { value: 2, label: '2 - Moderate chance' }, { value: 3, label: '3 - High chance' }] },
        { id: 'q6', label: '6. Sitting and talking to someone', type: 'select', defaultUnit: '0', options: [{ value: 0, label: '0 - Would never doze' }, { value: 1, label: '1 - Slight chance' }, { value: 2, label: '2 - Moderate chance' }, { value: 3, label: '3 - High chance' }] },
        { id: 'q7', label: '7. Sitting quietly after a lunch without alcohol', type: 'select', defaultUnit: '0', options: [{ value: 0, label: '0 - Would never doze' }, { value: 1, label: '1 - Slight chance' }, { value: 2, label: '2 - Moderate chance' }, { value: 3, label: '3 - High chance' }] },
        { id: 'q8', label: '8. In a car, while stopped for a few minutes in traffic', type: 'select', defaultUnit: '0', options: [{ value: 0, label: '0 - Would never doze' }, { value: 1, label: '1 - Slight chance' }, { value: 2, label: '2 - Moderate chance' }, { value: 3, label: '3 - High chance' }] },
    ],
    calculate: (inputs) => {
        let score = 0;
        for (let i = 1; i <= 8; i++) {
            const val = Number(inputs[`q${i}`]);
            if (isNaN(val) || inputs[`q${i}`] === undefined) return null;
            score += val;
        }
        return score;
    },
    resultLabel: 'Epworth Sleepiness Score',
    resultUnit: 'points',
    details: {
        description: "The Epworth Sleepiness Scale (ESS) is a questionnaire used to measure daytime sleepiness. The score can help identify potential sleep disorders like obstructive sleep apnea (OSA).",
    },
    interpretResult: (score) => {
        if (typeof score !== 'number') return null;
        if (score <= 10) return `Score: ${score}. Normal level of daytime sleepiness.`;
        if (score <= 17) return `Score: ${score}. Moderate excessive daytime sleepiness. Further evaluation may be warranted.`;
        return `Score: ${score}. Severe excessive daytime sleepiness. Seeking medical advice is recommended.`;
    }
  },
  {
    id: 'fena',
    name: 'Fractional Excretion of Sodium (FeNa)',
    keywords: ['fena', 'fractional excretion', 'sodium', 'aki', 'acute kidney injury', 'prerenal', 'atn', 'nephrology'],
    inputs: [
        { id: 'serumNa', label: 'Serum Sodium', type: 'number', min: 0, ...commonUnitConfigs.sodiumMeqL },
        { id: 'urineNa', label: 'Urine Sodium', type: 'number', min: 0, ...commonUnitConfigs.sodiumMeqL },
        { id: 'serumCr', label: 'Serum Creatinine', type: 'number', min: 0, ...commonUnitConfigs.serumCreatinine },
        { id: 'urineCr', label: 'Urine Creatinine', type: 'number', min: 0, ...commonUnitConfigs.serumCreatinine },
    ],
    calculate: (inputs, currentUnits) => {
        const { serumNa, urineNa, serumCr, urineCr } = inputs;
        if ([serumNa, urineNa, serumCr, urineCr].some(v => v === undefined || String(v).trim() === '')) return null;

        const sNa = getConvertedValue('serumNa', { serumNa }, currentUnits, commonUnitConfigs.sodiumMeqL);
        const uNa = getConvertedValue('urineNa', { urineNa }, currentUnits, commonUnitConfigs.sodiumMeqL);
        const sCr = getConvertedValue('serumCr', { serumCr }, currentUnits, commonUnitConfigs.serumCreatinine);
        const uCr = getConvertedValue('urineCr', { urineCr }, currentUnits, commonUnitConfigs.serumCreatinine);
        
        if ([sNa, uNa, sCr, uCr].some(v => v === undefined) || [sNa, uNa, sCr, uCr].some(v => v < 0)) return "Invalid input or unit error.";
        if (sNa === 0 || uCr === 0) return "Serum Sodium and Urine Creatinine cannot be zero.";

        const fena = ((uNa / sNa) * (sCr / uCr)) * 100;
        return fena;
    },
    resultLabel: 'FeNa',
    resultUnit: '%',
    details: {
        formula: "FeNa (%) = [(Urine Na / Serum Na) / (Urine Cr / Serum Cr)] * 100\n= [(Urine Na * Serum Cr) / (Serum Na * Urine Cr)] * 100",
        description: "The Fractional Excretion of Sodium (FeNa) helps differentiate pre-renal acute kidney injury (AKI) from acute tubular necrosis (ATN).",
        importantNote: "The accuracy of FeNa is diminished in patients on diuretic therapy. In these cases, the Fractional Excretion of Urea (FeUrea) may be a more reliable marker."
    },
    interpretResult: (fena) => {
        if (typeof fena !== 'number') return null;
        if (fena < 1) return `FeNa < 1% (${fena.toFixed(2)}%). Suggests a pre-renal cause of AKI (e.g., volume depletion). The kidneys are appropriately conserving sodium.`;
        if (fena > 2) return `FeNa > 2% (${fena.toFixed(2)}%). Suggests an intrinsic cause of AKI, most commonly Acute Tubular Necrosis (ATN). The kidneys are inappropriately wasting sodium.`;
        return `FeNa is between 1-2% (${fena.toFixed(2)}%). This is an indeterminate result and requires further clinical correlation.`;
    }
  },
  {
    id: 'friedewaldLDL',
    name: 'Friedewald Equation for LDL-C',
    keywords: ['friedewald', 'ldl', 'cholesterol', 'lipids', 'dyslipidemia', 'cardiology'],
    inputs: [
        { id: 'totalChol', label: 'Total Cholesterol', type: 'number', min: 0, ...commonUnitConfigs.cholesterol },
        { id: 'hdlChol', label: 'HDL Cholesterol', type: 'number', min: 0, ...commonUnitConfigs.cholesterol },
        { id: 'triglycerides', label: 'Triglycerides', type: 'number', min: 0, ...commonUnitConfigs.triglycerides },
    ],
    calculate: (inputs, currentUnits) => {
        const { totalChol, hdlChol, triglycerides } = inputs;
        if ([totalChol, hdlChol, triglycerides].some(v => v === undefined || String(v).trim() === '')) return null;

        const totalCholVal = Number(totalChol);
        const hdlCholVal = Number(hdlChol);
        const tgVal = Number(triglycerides);

        if ([totalCholVal, hdlCholVal, tgVal].some(isNaN) || [totalCholVal, hdlCholVal, tgVal].some(v => v < 0)) return "Invalid input.";
        
        const unit = currentUnits.triglycerides || 'mg/dL';
        
        if (unit === 'mg/dL') {
            if (tgVal > 400) {
                return "Formula inaccurate when Triglycerides > 400 mg/dL.";
            }
            if (totalCholVal < hdlCholVal + (tgVal / 5)) {
                return "LDL cannot be calculated, TC is too low relative to HDL and TG."
            }
            return totalCholVal - hdlCholVal - (tgVal / 5);
        } else { // mmol/L
            const tg_base = getConvertedValue('triglycerides', {triglycerides}, currentUnits, commonUnitConfigs.triglycerides)
            if (tg_base > 400) {
                return "Formula inaccurate when Triglycerides > 4.5 mmol/L (>400 mg/dL).";
            }
            if (totalCholVal < hdlCholVal + (tgVal / 2.2)) {
                return "LDL cannot be calculated, TC is too low relative to HDL and TG."
            }
            return totalCholVal - hdlCholVal - (tgVal / 2.2);
        }
    },
    resultLabel: 'Estimated LDL-C',
    resultUnit: '', // Unit is dynamic based on input
    details: {
        formula: "mg/dL: LDL-C = Total Cholesterol - HDL-C - (Triglycerides / 5)\nmmol/L: LDL-C = Total Cholesterol - HDL-C - (Triglycerides / 2.2)",
        description: "The Friedewald equation is a widely used formula for estimating Low-Density Lipoprotein (LDL) cholesterol.",
        limitations: "This formula is not valid and should not be used if Triglyceride levels are >400 mg/dL (>4.5 mmol/L) or in patients with dysbetalipoproteinemia."
    },
    interpretResult: (result, inputs, units) => {
        if (typeof result !== 'number') return null;
        const unit = units.totalChol || 'mg/dL';
        let interpretation;
        if (unit === 'mg/dL') {
            interpretation = `Estimated LDL-C: ${result.toFixed(1)} mg/dL.`;
            if (result < 70) interpretation += " Very Low/Optimal (often a target for very high-risk patients).";
            else if (result < 100) interpretation += " Optimal/Near Optimal.";
            else if (result < 130) interpretation += " Borderline High.";
            else if (result < 160) interpretation += " High.";
            else if (result < 190) interpretation += " Very High.";
            else interpretation += " Extremely High.";
        } else {
            interpretation = `Estimated LDL-C: ${result.toFixed(2)} mmol/L.`;
            if (result < 1.8) interpretation += " Very Low/Optimal (often a target for very high-risk patients).";
            else if (result < 2.6) interpretation += " Optimal/Near Optimal.";
            else if (result < 3.4) interpretation += " Borderline High.";
            else if (result < 4.1) interpretation += " High.";
            else if (result < 4.9) interpretation += " Very High.";
            else interpretation += " Extremely High.";
        }
        return `${interpretation} Target levels depend on individual cardiovascular risk.`;
    }
  },
  {
    id: 'ettSizePediatric',
    name: 'Endotracheal Tube (ETT) Size for Children',
    keywords: ['ett', 'endotracheal tube', 'intubation', 'pediatrics', 'anesthesia', 'emergency', 'cole formula'],
    inputs: [
        { id: 'age', label: 'Age (1-8 years)', type: 'number', min: 1, max: 8, defaultUnit: 'years' },
    ],
    calculate: ({ age }) => {
        if (age === undefined || String(age).trim() === '') return null;
        const ageVal = Number(age);
        if (isNaN(ageVal) || ageVal < 1 || ageVal > 8) {
            return "Age must be between 1 and 8 years for this formula.";
        }
        
        const uncuffedSize = (ageVal / 4) + 4;
        const cuffedSize = (ageVal / 4) + 3.5;

        return {
            uncuffed: uncuffedSize,
            cuffed: cuffedSize
        };
    },
    resultLabel: 'Estimated ETT Size',
    resultUnit: {
        uncuffed: 'mm ID',
        cuffed: 'mm ID'
    },
    details: {
        formula: "Uncuffed Tube Size (mm) = (Age in years / 4) + 4\nCuffed Tube Size (mm) = (Age in years / 4) + 3.5",
        description: "This calculator uses the Cole formula to estimate the appropriate endotracheal tube (ETT) size for children between 1 and 8 years old.",
        importantNote: "This is only an estimate. Clinical judgment is essential. Always have ETT sizes 0.5mm smaller and 0.5mm larger than the calculated size readily available."
    },
    interpretResult: (result) => {
        if (typeof result !== 'object') return null;
        return `Estimated uncuffed ETT size is ${result.uncuffed.toFixed(2)} mm. Estimated cuffed ETT size is ${result.cuffed.toFixed(2)} mm.`;
    }
  },
  {
    id: 'gdsShort',
    name: 'Geriatric Depression Scale (GDS) - Short Form',
    keywords: ['gds', 'geriatric depression', 'depression', 'screening', 'elderly', 'psychiatry'],
    inputs: [
        { id: 'q1', label: '1. Are you basically satisfied with your life?', type: 'select', defaultUnit: '1', options: [{ value: 1, label: 'Yes'}, { value: 0, label: 'No'}] },
        { id: 'q2', label: '2. Have you dropped many of your activities and interests?', type: 'select', defaultUnit: '0', options: [{ value: 1, label: 'Yes'}, { value: 0, label: 'No'}] },
        { id: 'q3', label: '3. Do you feel that your life is empty?', type: 'select', defaultUnit: '0', options: [{ value: 1, label: 'Yes'}, { value: 0, label: 'No'}] },
        { id: 'q4', label: '4. Do you often get bored?', type: 'select', defaultUnit: '0', options: [{ value: 1, label: 'Yes'}, { value: 0, label: 'No'}] },
        { id: 'q5', label: '5. Are you in good spirits most of the time?', type: 'select', defaultUnit: '1', options: [{ value: 1, label: 'Yes'}, { value: 0, label: 'No'}] },
        { id: 'q6', label: '6. Are you afraid that something bad is going to happen to you?', type: 'select', defaultUnit: '0', options: [{ value: 1, label: 'Yes'}, { value: 0, label: 'No'}] },
        { id: 'q7', label: '7. Do you feel happy most of the time?', type: 'select', defaultUnit: '1', options: [{ value: 1, label: 'Yes'}, { value: 0, label: 'No'}] },
        { id: 'q8', label: '8. Do you often feel helpless?', type: 'select', defaultUnit: '0', options: [{ value: 1, label: 'Yes'}, { value: 0, label: 'No'}] },
        { id: 'q9', label: '9. Do you prefer to stay at home, rather than going out?', type: 'select', defaultUnit: '0', options: [{ value: 1, label: 'Yes'}, { value: 0, label: 'No'}] },
        { id: 'q10', label: '10. Do you feel you have more problems with memory than most?', type: 'select', defaultUnit: '0', options: [{ value: 1, label: 'Yes'}, { value: 0, label: 'No'}] },
        { id: 'q11', label: '11. Do you think it is wonderful to be alive now?', type: 'select', defaultUnit: '1', options: [{ value: 1, label: 'Yes'}, { value: 0, label: 'No'}] },
        { id: 'q12', label: '12. Do you feel pretty worthless the way you are now?', type: 'select', defaultUnit: '0', options: [{ value: 1, label: 'Yes'}, { value: 0, label: 'No'}] },
        { id: 'q13', label: '13. Do you feel full of energy?', type: 'select', defaultUnit: '1', options: [{ value: 1, label: 'Yes'}, { value: 0, label: 'No'}] },
        { id: 'q14', label: '14. Do you feel that your situation is hopeless?', type: 'select', defaultUnit: '0', options: [{ value: 1, label: 'Yes'}, { value: 0, label: 'No'}] },
        { id: 'q15', label: '15. Do you think that most people are better off than you are?', type: 'select', defaultUnit: '0', options: [{ value: 1, label: 'Yes'}, { value: 0, label: 'No'}] },
    ],
    calculate: (inputs) => {
        const questions = [
            { id: 'q1', scoreOnNo: true }, { id: 'q2', scoreOnYes: true }, { id: 'q3', scoreOnYes: true },
            { id: 'q4', scoreOnYes: true }, { id: 'q5', scoreOnNo: true }, { id: 'q6', scoreOnYes: true },
            { id: 'q7', scoreOnNo: true }, { id: 'q8', scoreOnYes: true }, { id: 'q9', scoreOnYes: true },
            { id: 'q10', scoreOnYes: true }, { id: 'q11', scoreOnNo: true }, { id: 'q12', scoreOnYes: true },
            { id: 'q13', scoreOnNo: true }, { id: 'q14', scoreOnYes: true }, { id: 'q15', scoreOnYes: true }
        ];
        let score = 0;
        for (const q of questions) {
            const answer = inputs[q.id];
            if (answer === undefined) return null;
            if (q.scoreOnYes && answer === '1') {
                score++;
            } else if (q.scoreOnNo && answer === '0') {
                score++;
            }
        }
        return score;
    },
    resultLabel: 'GDS-15 Score',
    resultUnit: 'points',
    details: {
        description: "The Geriatric Depression Scale (GDS) Short Form is a 15-item screening tool for depression in older adults. A higher score indicates a greater likelihood of depression.",
        scoring: "One point is assigned for 'No' answers to questions 1, 5, 7, 11, 13, and for 'Yes' answers to all other questions."
    },
    interpretResult: (score) => {
        if (typeof score !== 'number') return null;
        if (score <= 4) return `Score: ${score}. Suggests depression is not likely (Normal range).`;
        if (score <= 8) return `Score: ${score}. Suggests mild depression.`;
        if (score <= 11) return `Score: ${score}. Suggests moderate depression.`;
        return `Score: ${score}. Suggests severe depression.`;
    }
  },
  {
    id: 'ckdEpi2021',
    name: 'eGFR (CKD-EPI 2021 Creatinine)',
    keywords: ['egfr', 'gfr', 'ckd-epi', 'ckd', 'chronic kidney disease', 'renal function', 'creatinine', '2021'],
    inputs: [
      { id: 'age', label: 'Age', type: 'number', min: 0, defaultUnit: 'years' },
      { id: 'gender', label: 'Sex', type: 'select', defaultUnit: 'male', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }] },
      { id: 'serumCreatinine', label: 'Serum Creatinine', type: 'number', min: 0, ...commonUnitConfigs.serumCreatinine },
    ],
    calculate: (inputs, currentUnits) => {
        const { age, gender, serumCreatinine } = inputs;
        if ([age, gender, serumCreatinine].some(v => v === undefined || String(v).trim() === '')) return null;

        const ageVal = Number(age);
        const crVal = getConvertedValue('serumCreatinine', { serumCreatinine }, currentUnits, commonUnitConfigs.serumCreatinine);
        
        if (crVal === undefined || isNaN(ageVal) || crVal <= 0 || ageVal <= 0) return "Invalid input. Age and Creatinine must be positive.";
        
        const k = (gender === 'female') ? 0.7 : 0.9;
        const alpha = (gender === 'female') ? -0.241 : -0.302;
        const sexFactor = (gender === 'female') ? 1.012 : 1;
        
        const term1 = Math.min(crVal / k, 1);
        const term2 = Math.max(crVal / k, 1);
        
        const egfr = 142 * Math.pow(term1, alpha) * Math.pow(term2, -1.200) * Math.pow(0.9938, ageVal) * sexFactor;
        
        return egfr;
    },
    resultLabel: 'eGFR',
    resultUnit: 'mL/min/1.73m²',
    details: {
        formula: "eGFR = 142 × min(SCr/κ, 1)^α × max(SCr/κ, 1)^-1.200 × 0.9938^Age × (1.012 if Female)",
        description: "Calculates estimated Glomerular Filtration Rate (eGFR) using the 2021 CKD-EPI Creatinine equation. This is the current standard for assessing kidney function.",
        parameters: "κ (kappa): 0.7 for females, 0.9 for males.\nα (alpha): -0.241 for females, -0.302 for males.\nSCr is serum creatinine in mg/dL."
    },
    interpretResult: (egfr) => {
        if (typeof egfr !== 'number') return null;
        let stage;
        if (egfr >= 90) stage = "G1: Normal or high GFR (≥ 90).";
        else if (egfr >= 60) stage = "G2: Mildly decreased GFR (60-89).";
        else if (egfr >= 45) stage = "G3a: Mildly to moderately decreased GFR (45-59).";
        else if (egfr >= 30) stage = "G3b: Moderately to severely decreased GFR (30-44).";
        else if (egfr >= 15) stage = "G4: Severely decreased GFR (15-29).";
        else stage = "G5: Kidney failure (< 15).";
        return `eGFR: ${egfr.toFixed(1)} mL/min/1.73m². CKD Stage: ${stage} Albuminuria assessment is required for complete CKD staging.`;
    }
  },
  {
    id: 'hasBled',
    name: 'HAS-BLED Bleeding Risk Score',
    keywords: ['has-bled', 'hasbled', 'bleeding risk', 'anticoagulation', 'afib', 'atrial fibrillation', 'stroke'],
    inputs: [
        { id: 'htn', label: 'Hypertension (uncontrolled, SBP > 160 mmHg)', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes (+1)' }] },
        { id: 'renal', label: 'Abnormal Renal Function (dialysis, transplant, Cr > 2.26 mg/dL)', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes (+1)' }] },
        { id: 'liver', label: 'Abnormal Liver Function (cirrhosis or significant LFTs)', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes (+1)' }] },
        { id: 'stroke', label: 'History of Stroke', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes (+1)' }] },
        { id: 'bleeding', label: 'Bleeding history or predisposition (e.g., anemia)', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes (+1)' }] },
        { id: 'inr', label: 'Labile INRs (Time in Therapeutic Range < 60%)', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes (+1)' }] },
        { id: 'age', label: 'Age > 65 years ("Elderly")', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes (+1)' }] },
        { id: 'drugs', label: 'Concomitant Drugs (e.g., antiplatelets, NSAIDs)', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes (+1)' }] },
        { id: 'alcohol', label: 'Alcohol Use (≥ 8 drinks/week)', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes (+1)' }] },
    ],
    calculate: (inputs) => {
        let score = 0;
        const keys = ['htn', 'renal', 'liver', 'stroke', 'bleeding', 'inr', 'age', 'drugs', 'alcohol'];
        for (const key of keys) {
            if (inputs[key] === undefined) return null;
            score += Number(inputs[key]);
        }
        return score;
    },
    resultLabel: 'HAS-BLED Score',
    resultUnit: 'points',
    details: {
        description: "The HAS-BLED score estimates the 1-year risk of major bleeding for patients with atrial fibrillation on anticoagulation. It helps in assessing the risk-benefit of antithrombotic therapy.",
        criteria: "H: Hypertension, A: Abnormal renal/liver function (1 pt each), S: Stroke, B: Bleeding, L: Labile INR, E: Elderly (>65), D: Drugs/alcohol (1 pt each)."
    },
    interpretResult: (score) => {
        if (typeof score !== 'number') return null;
        const riskRates = ["1.13%", "1.02%", "1.88%", "3.74%", "8.70%", "12.50%"];
        const annualRisk = riskRates[Math.min(score, 5)] || "≥12.50%";

        let interpretation = `Score: ${score}. Estimated 1-year major bleeding risk is ~${annualRisk}. `;
        if (score >= 3) {
            interpretation += "This indicates a high risk of bleeding. Caution and regular review are advised when prescribing antithrombotic therapy. The score is meant to encourage addressing modifiable risk factors, not necessarily withholding treatment.";
        } else {
            interpretation += "This indicates a low to moderate risk of bleeding. Anticoagulation is generally favored if indicated by stroke risk (e.g., CHA₂DS₂-VASc score).";
        }
        return interpretation;
    }
  },
  {
    id: 'maddreyDF',
    name: "Maddrey's Discriminant Function (Alcoholic Hepatitis)",
    keywords: ['maddrey', 'mdf', 'discriminant function', 'alcoholic hepatitis', 'liver', 'steroids'],
    inputs: [
        { id: 'prothrombinTime', label: 'Patient Prothrombin Time', type: 'number', min: 0, defaultUnit: 'seconds' },
        { id: 'controlProthrombinTime', label: 'Control Prothrombin Time', type: 'number', min: 0, defaultUnit: 'seconds' },
        { id: 'bilirubinMaddrey', label: 'Total Bilirubin', type: 'number', min: 0, ...commonUnitConfigs.bilirubin },
    ],
    calculate: (inputs, currentUnits) => {
        const { prothrombinTime, controlProthrombinTime, bilirubinMaddrey } = inputs;
        if ([prothrombinTime, controlProthrombinTime, bilirubinMaddrey].some(v => v === undefined || String(v).trim() === '')) return null;

        const ptVal = Number(prothrombinTime);
        const controlPtVal = Number(controlProthrombinTime);
        const biliVal_mg_dl = getConvertedValue('bilirubinMaddrey', { bilirubinMaddrey }, currentUnits, commonUnitConfigs.bilirubin);

        if (biliVal_mg_dl === undefined || isNaN(ptVal) || isNaN(controlPtVal) || [ptVal, controlPtVal, biliVal_mg_dl].some(v => v < 0)) return "Invalid input.";
        
        const mdf = 4.6 * (ptVal - controlPtVal) + biliVal_mg_dl;
        return mdf;
    },
    resultLabel: 'Discriminant Function Score',
    resultUnit: '',
    details: {
        formula: "MDF = 4.6 * (Patient's PT - Control PT) + Total Bilirubin (mg/dL)",
        description: "Maddrey's Discriminant Function (MDF) is used to assess the severity and prognosis of alcoholic hepatitis and to determine the potential utility of corticosteroid treatment.",
    },
    interpretResult: (score) => {
        if (typeof score !== 'number') return null;
        if (score > 32) return `Score: ${score.toFixed(1)}. This indicates severe alcoholic hepatitis with a high short-term mortality risk. Corticosteroid therapy is often considered.`;
        return `Score: ${score.toFixed(1)}. This indicates a better prognosis. Corticosteroids are generally not indicated.`;
    }
  },
  {
    id: 'mdrdEgfr',
    name: 'eGFR (MDRD Study Equation)',
    keywords: ['egfr', 'gfr', 'mdrd', 'kidney', 'renal function', 'creatinine', 'old'],
    inputs: [
        { id: 'serumCreatinine', label: 'Serum Creatinine', type: 'number', min: 0, ...commonUnitConfigs.serumCreatinine },
        { id: 'age', label: 'Age', type: 'number', min: 18, defaultUnit: 'years' },
        { id: 'gender', label: 'Sex', type: 'select', defaultUnit: 'male', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }] },
        { id: 'race', label: 'Race (per original formula)', type: 'select', defaultUnit: 'not_black', options: [{ value: 'not_black', label: 'Not Black' }, { value: 'black', label: 'Black' }] },
    ],
    calculate: (inputs, currentUnits) => {
        const { serumCreatinine, age, gender, race } = inputs;
        if ([serumCreatinine, age, gender, race].some(v => v === undefined || String(v).trim() === '')) return null;

        const crVal = getConvertedValue('serumCreatinine', { serumCreatinine }, currentUnits, commonUnitConfigs.serumCreatinine);
        const ageVal = Number(age);

        if (crVal === undefined || isNaN(ageVal) || crVal <= 0 || ageVal <= 0) return "Invalid input. Age and Creatinine must be positive.";
        
        let egfr = 175 * Math.pow(crVal, -1.154) * Math.pow(ageVal, -0.203);
        if (gender === 'female') {
            egfr *= 0.742;
        }
        if (race === 'black') {
            egfr *= 1.212;
        }
        
        return egfr;
    },
    resultLabel: 'eGFR',
    resultUnit: 'mL/min/1.73m²',
    details: {
        formula: "eGFR = 175 × (SerumCr)^-1.154 × (Age)^-0.203 × (0.742 if female) × (1.212 if Black)",
        description: "Calculates estimated Glomerular Filtration Rate (eGFR) using the classic 4-variable MDRD Study equation.",
        importantNote: "This is an older formula. The 2021 CKD-EPI creatinine equation is now the recommended standard as it does not include a race-based variable and has better accuracy."
    },
    interpretResult: (egfr) => {
        if (typeof egfr !== 'number') return null;
        let stage;
        if (egfr >= 90) stage = "G1: Normal or high GFR (≥ 90).";
        else if (egfr >= 60) stage = "G2: Mildly decreased GFR (60-89).";
        else if (egfr >= 30) stage = "G3a: Mildly to moderately decreased GFR (45-59), G3b: Moderately to severely decreased GFR (30-44). The MDRD is less accurate > 60.";
        else if (egfr >= 15) stage = "G4: Severely decreased GFR (15-29).";
        else stage = "G5: Kidney failure (< 15).";
        return `eGFR: ${egfr.toFixed(1)} mL/min/1.73m². CKD Stage: ${stage} Albuminuria assessment is required for complete CKD staging.`;
    }
  },
  {
    id: 'targetHeight',
    name: 'Target Height Prediction (Mid-Parental)',
    keywords: ['target height', 'mid-parental height', 'pediatrics', 'growth', 'height prediction', 'tanner'],
    inputs: [
        { id: 'childGender', label: "Child's Sex", type: 'select', defaultUnit: 'boy', options: [{value: 'boy', label: 'Boy'}, {value: 'girl', label: 'Girl'}]},
        { id: 'fatherHeight', label: "Father's Height", type: 'number', min: 0, ...commonUnitConfigs.height },
        { id: 'motherHeight', label: "Mother's Height", type: 'number', min: 0, ...commonUnitConfigs.height },
    ],
    calculate: (inputs, currentUnits) => {
        const { childGender, fatherHeight, motherHeight } = inputs;
        if ([childGender, fatherHeight, motherHeight].some(v => v === undefined || String(v).trim() === '')) return null;

        const fatherHeightCm = getConvertedValue('fatherHeight', { fatherHeight }, currentUnits, commonUnitConfigs.height);
        const motherHeightCm = getConvertedValue('motherHeight', { motherHeight }, currentUnits, commonUnitConfigs.height);

        if (fatherHeightCm === undefined || motherHeightCm === undefined || fatherHeightCm <= 0 || motherHeightCm <= 0) {
            return "Invalid height inputs.";
        }
        
        let targetHeightCm;
        if(childGender === 'boy') {
            targetHeightCm = (fatherHeightCm + (motherHeightCm + 13)) / 2;
        } else { // girl
            targetHeightCm = ((fatherHeightCm - 13) + motherHeightCm) / 2;
        }

        const targetHeightInches = targetHeightCm / 2.54;

        return {
            cm: targetHeightCm.toFixed(1),
            inches: targetHeightInches.toFixed(1)
        };
    },
    resultLabel: 'Predicted Target Height',
    resultUnit: { cm: 'cm', inches: 'inches' },
    details: {
        formula: "Boy: ((Mother's Height + 13cm) + Father's Height) / 2\nGirl: (Mother's Height + (Father's Height - 13cm)) / 2",
        description: "The Tanner method estimates a child's potential adult height based on the heights of their parents (mid-parental height).",
        importantNote: "This is an estimation. Most children will reach an adult height within 8.5 cm (about 3.3 inches) of this target height. Genetic potential, nutrition, and overall health all influence final adult height."
    },
    interpretResult: (result) => {
        if (typeof result !== 'object' || result.cm === undefined) return null;
        const feet = Math.floor(result.inches / 12);
        const inches = Math.round(result.inches % 12);
        return `Predicted adult height is ${result.cm} cm (approximately ${feet}'${inches}").`;
    }
  },
  {
    id: 'qsofaScore',
    name: 'qSOFA Score (Quick SOFA)',
    keywords: ['qsofa', 'quick sofa', 'sepsis', 'septic shock', 'icu', 'critical care'],
    inputs: [
        { id: 'respRate', label: 'Respiratory Rate ≥ 22/min', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes (+1)' }] },
        { id: 'mentalStatus', label: 'Altered Mentation (GCS < 15)', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes (+1)' }] },
        { id: 'sbp', label: 'Systolic Blood Pressure ≤ 100 mmHg', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes (+1)' }] },
    ],
    calculate: (inputs) => {
        let score = 0;
        const keys = ['respRate', 'mentalStatus', 'sbp'];
        for (const key of keys) {
            if (inputs[key] === undefined) return null;
            score += Number(inputs[key]);
        }
        return score;
    },
    resultLabel: 'qSOFA Score',
    resultUnit: 'points',
    details: {
        description: "The quick Sequential (Sepsis-related) Organ Failure Assessment (qSOFA) is a bedside prompt that may identify patients with suspected infection who are at greater risk for a poor outcome outside the intensive care unit (ICU).",
    },
    interpretResult: (score) => {
        if (typeof score !== 'number') return null;
        if (score >= 2) {
            return `Score: ${score}. Positive screen. Patients with suspected infection who are likely to have a prolonged ICU stay or to die in the hospital. Consider obtaining a full SOFA score and escalating care.`;
        }
        return `Score: ${score}. Negative screen. Lower risk of poor outcome. Continue monitoring.`;
    }
  },
  {
    id: 'timiStemi',
    name: 'TIMI Score for STEMI',
    keywords: ['timi', 'stemi', 'myocardial infarction', 'heart attack', 'cardiology', 'risk'],
    inputs: [
        { id: 'age', label: 'Age', type: 'select', defaultUnit: '0', options: [
            { value: 0, label: '< 65 years (+0)' },
            { value: 2, label: '65-74 years (+2)' },
            { value: 3, label: '≥ 75 years (+3)' }
        ]},
        { id: 'historyDmHtAngina', label: 'History of Diabetes, HTN, or Angina', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes (+1)' }] },
        { id: 'sbp', label: 'Systolic BP < 100 mmHg', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 3, label: 'Yes (+3)' }] },
        { id: 'hr', label: 'Heart Rate > 100 bpm', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 2, label: 'Yes (+2)' }] },
        { id: 'killip', label: 'Killip Class II-IV', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No (Class I)' }, { value: 2, label: 'Yes (+2)' }] },
        { id: 'weight', label: 'Weight < 67 kg (150 lbs)', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes (+1)' }] },
        { id: 'anteriorSte', label: 'Anterior ST Elevation or LBBB', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes (+1)' }] },
        { id: 'timeToTx', label: 'Time to reperfusion > 4 hours', type: 'select', defaultUnit: '0', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes (+1)' }] },
    ],
    calculate: (inputs) => {
        let score = 0;
        const keys = ['age', 'historyDmHtAngina', 'sbp', 'hr', 'killip', 'weight', 'anteriorSte', 'timeToTx'];
        for (const key of keys) {
            if (inputs[key] === undefined) return null;
            score += Number(inputs[key]);
        }
        return score;
    },
    resultLabel: 'TIMI Score for STEMI',
    resultUnit: 'points',
    details: {
        description: "The Thrombolysis in Myocardial Infarction (TIMI) risk score for ST-elevation MI (STEMI) is a simple tool for predicting 30-day mortality in patients presenting with STEMI.",
    },
    interpretResult: (score) => {
        if (typeof score !== 'number') return null;
        const mortalityRates = ["0.8%", "1.6%", "2.2%", "4.4%", "7.3%", "12.4%", "16.1%", "23.4%", "26.8%", "35.9%"];
        const mortality = mortalityRates[Math.min(score, 9)] || ">35.9%";
        return `Score: ${score}. Approximate 30-day mortality risk: ${mortality}.`;
    }
  },
  {
    id: 'sodiumCorrectionHyperglycemia',
    name: 'Sodium Correction in Hyperglycemia',
    keywords: ['sodium', 'hyperglycemia', 'dka', 'hhs', 'electrolytes', 'correction'],
    inputs: [
        { id: 'measuredNa', label: 'Measured Serum Sodium', type: 'number', min: 0, ...commonUnitConfigs.sodiumMeqL },
        { id: 'glucose', label: 'Serum Glucose', type: 'number', min: 0, ...commonUnitConfigs.glucose },
    ],
    calculate: (inputs, currentUnits) => {
        const { measuredNa, glucose } = inputs;
        if ([measuredNa, glucose].some(v => v === undefined || String(v).trim() === '')) return null;

        const naVal = getConvertedValue('measuredNa', { measuredNa }, currentUnits, commonUnitConfigs.sodiumMeqL);
        const glucoseVal_mgdl = getConvertedValue('glucose', { glucose }, currentUnits, commonUnitConfigs.glucose);

        if (naVal === undefined || glucoseVal_mgdl === undefined || naVal < 0 || glucoseVal_mgdl < 0) return "Invalid input or unit error.";

        if (glucoseVal_mgdl <= 100) return naVal;

        const correctedNa = naVal + 2.4 * ((glucoseVal_mgdl - 100) / 100);
        return correctedNa;
    },
    resultLabel: 'Corrected Sodium',
    resultUnit: 'mEq/L',
    details: {
        formula: "Corrected Na = Measured Na + [2.4 × ((Glucose in mg/dL - 100) / 100)]",
        description: "Estimates the true serum sodium concentration in the presence of hyperglycemia, which can cause pseudohyponatremia by shifting water from the intracellular to the extracellular space.",
        notes: "This calculator uses a correction factor of 2.4, which is supported by recent evidence. The classic correction factor was 1.6. The result provides an estimate of what the sodium level would be if the glucose were normal (100 mg/dL)."
    },
    interpretResult: (result) => {
        if (typeof result !== 'number') return null;
        return `The corrected sodium is approximately ${result.toFixed(1)} mEq/L. This value should be used to assess the patient's true sodium status.`;
    }
  },
  {
    id: 'wintersFormula',
    name: "Winter's Formula for Metabolic Acidosis",
    keywords: ['winters formula', 'acid-base', 'metabolic acidosis', 'pco2', 'compensation', 'abg'],
    inputs: [
        { id: 'bicarbonate', label: 'Serum Bicarbonate (HCO₃⁻)', type: 'number', min: 0, ...commonUnitConfigs.genericMeqL },
        { id: 'pco2', label: 'Actual PaCO₂ (from ABG)', type: 'number', min: 0, defaultUnit: 'mmHg' },
    ],
    calculate: ({ bicarbonate }, currentUnits) => {
        if (bicarbonate === undefined || String(bicarbonate).trim() === '') return null;
        
        const hco3Val = getConvertedValue('bicarbonate', { bicarbonate }, currentUnits, commonUnitConfigs.genericMeqL);
        if (hco3Val === undefined || hco3Val < 0) return "Invalid Bicarbonate value.";

        const expectedPco2 = (1.5 * hco3Val) + 8;
        const lowerBound = expectedPco2 - 2;
        const upperBound = expectedPco2 + 2;

        return `${lowerBound.toFixed(1)} - ${upperBound.toFixed(1)}`;
    },
    resultLabel: 'Expected PaCO₂ Range',
    resultUnit: 'mmHg',
    details: {
        formula: "Expected PaCO₂ = (1.5 × [HCO₃⁻]) + 8 ± 2",
        description: "Winter's formula calculates the expected respiratory compensation (PaCO₂) for a given degree of metabolic acidosis. It helps determine if a concurrent respiratory disorder is present.",
    },
    interpretResult: (result, inputs) => {
        if (typeof result !== 'string') return null;
        if (inputs.pco2 === undefined || String(inputs.pco2).trim() === '') return "Enter the patient's Actual PaCO₂ to assess compensation status.";
        
        const range = result.split(' - ').map(Number);
        const pco2Val = Number(inputs.pco2);

        if (isNaN(pco2Val) || isNaN(range[0]) || isNaN(range[1])) return "Invalid input for PaCO₂.";

        if (pco2Val > range[1]) {
            return 'Actual PaCO₂ is higher than expected, suggesting a concurrent respiratory acidosis.';
        } else if (pco2Val < range[0]) {
            return 'Actual PaCO₂ is lower than expected, suggesting a concurrent respiratory alkalosis.';
        } else {
            return 'Actual PaCO₂ is within the expected range, indicating appropriate respiratory compensation.';
        }
    }
  }
];