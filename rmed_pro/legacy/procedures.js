/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export const medicalProcedures = [
  {
    id: 'proc_egd',
    name: 'Upper Endoscopy (EGD - Esophagogastroduodenoscopy)',
    keywords: ['egd', 'upper endoscopy', 'gastroscopy', 'esophagoscopy', 'duodenoscopy', 'gastroenterology'],
    description: 'A procedure to visually examine the esophagus, stomach, and duodenum using a thin, flexible tube with a light and camera (endoscope).',
    indications: [
      'Investigating symptoms like persistent heartburn, nausea, vomiting, abdominal pain, difficulty swallowing, or GI bleeding.',
      'Diagnosing conditions like GERD, ulcers, inflammation, tumors, or celiac disease.',
      'Performing biopsies to test for H. pylori, cancer, or other conditions.',
      'Therapeutic interventions like stretching narrowed areas (dilatation), removing polyps, or stopping bleeding.',
    ],
    contraindications: [
      'Patient refusal.',
      'Severe cardiorespiratory instability.',
      'Uncooperative patient (unless general anesthesia is used).',
      'Perforated viscus (absolute, unless for therapeutic attempt to close perforation).',
      'Severe coagulopathy or thrombocytopenia if biopsy or therapeutic intervention is anticipated (relative).',
    ],
    preparation: [
      'Fasting: No food for at least 6-8 hours before the procedure.',
      'Fluids: Clear liquids may be allowed up to 2-4 hours before, then NPO.',
      'Medications: Inform your doctor about all medications, especially blood thinners, diabetes medications, and NSAIDs. Adjustments may be needed.',
      'Arrange for a ride home, as sedation is typically used.',
    ],
    procedureSteps: [
      'Sedation is administered (usually IV).',
      'Throat may be numbed with a spray.',
      'Patient lies on left side.',
      'Endoscope passed through mouth into esophagus, stomach, and duodenum.',
      'Air introduced for better visualization.',
      'Examination performed, biopsies/interventions as needed.',
      'Typically 15-30 minutes.',
    ],
    postProcedureCare: [
      'Monitoring in recovery area (1-2 hours).',
      'Possible bloating or mild sore throat.',
      'Resume normal diet once fully awake, unless instructed otherwise.',
      'No driving or important decisions for the rest of the day due to sedation.',
    ],
    risksComplications: [
      'Bleeding (especially with biopsies/polypectomy).',
      'Infection.',
      'Perforation (rare).',
      'Reaction to sedation.',
      'Aspiration.',
      'Persistent pain.',
    ],
    alternatives: [
      'Barium swallow or upper GI series.',
      'Capsule endoscopy.',
      'CT scan or MRI.',
      'Non-invasive H. pylori tests.',
    ],
    patientInformation: 'An EGD is a common and generally safe procedure. Follow preparation instructions carefully. Discuss concerns with your doctor.',
  },
  {
    id: 'proc_colonoscopy',
    name: 'Colonoscopy',
    keywords: ['colonoscopy', 'lower endoscopy', 'colon cancer screening', 'gastroenterology', 'polyps'],
    description: 'A procedure to examine the entire length of the colon (large intestine) and rectum using a colonoscope, a flexible tube with a light and camera.',
    indications: [
      'Screening for colorectal cancer and polyps (recommended starting at age 45 for average-risk individuals).',
      'Investigating symptoms like changes in bowel habits, rectal bleeding, abdominal pain, or unexplained weight loss.',
      'Diagnosing inflammatory bowel disease.',
      'Surveillance for patients with a history of polyps or colorectal cancer.',
      'Therapeutic interventions like polyp removal.',
    ],
    contraindications: [
      'Patient refusal.',
      'Documented or suspected colonic perforation.',
      'Fulminant colitis or toxic megacolon.',
      'Severe, unstable cardiopulmonary disease.',
      'Inadequate bowel preparation.',
    ],
    preparation: [
      'Bowel Cleansing: Crucial for a clear view. Follow prescribed bowel prep instructions exactly.',
      'Diet: Clear liquid diet the day before. Avoid red/purple liquids.',
      'Fasting: NPO for several hours before.',
      'Medications: Inform doctor about all medications, especially blood thinners, iron, diabetes meds.',
      'Arrange for a ride home.',
    ],
    procedureSteps: [
      'Sedation administered (usually IV).',
      'Patient lies on left side.',
      'Colonoscope inserted into rectum and advanced through colon to cecum.',
      'Air/CO2 used to inflate colon.',
      'Examination during withdrawal. Polyps removed/biopsies taken as needed.',
      'Typically 20-60 minutes.',
    ],
    postProcedureCare: [
      'Monitoring in recovery area.',
      'Possible bloating or gas pains.',
      'Light spotting of blood if biopsies/polypectomy.',
      'Resume normal diet as tolerated, unless instructed otherwise.',
      'No driving for the rest of the day.',
    ],
    risksComplications: [
      'Bleeding (especially with polypectomy).',
      'Perforation (rare).',
      'Reaction to sedation.',
      'Infection (rare).',
      'Post-polypectomy syndrome.',
    ],
    alternatives: [
      'Flexible sigmoidoscopy.',
      'CT colonography (Virtual Colonoscopy).',
      'Fecal Immunochemical Test (FIT) / Stool DNA test.',
      'Barium enema.',
    ],
    patientInformation: 'Colonoscopy is effective for cancer prevention/diagnosis. Bowel prep is critical. Discuss concerns with your doctor.',
  },
];
