export interface CancerType {
  slug: string;
  name: string;
  summary: string;
  overview: string;
  symptoms: string[];
  diagnosis: string;
  treatment: string;
  questions: string[];
  source: string;
}

export const cancerTypes: CancerType[] = [
  {
    slug: 'breast-cancer', name: 'Breast Cancer',
    summary: 'Understand changes in breast cells, assessment and the main approaches to care.',
    overview: 'Breast cancer develops when cells in the breast grow out of control. It often starts in the milk ducts or lobules. It can affect people of any sex. Tests help the care team understand the type, stage and biological features of the cancer.',
    symptoms: ['A new lump or thickening in the breast or underarm', 'Changes to the breast’s shape, skin or nipple', 'Nipple discharge that is unusual for you'],
    diagnosis: 'Assessment may include an examination, mammogram or ultrasound and a biopsy. A biopsy can confirm cancer and help identify hormone receptors and HER2 status, which can guide treatment.',
    treatment: 'Depending on the cancer and individual circumstances, options may include surgery, radiotherapy, chemotherapy, hormone therapy, targeted treatment or immunotherapy. Not everyone needs every treatment.',
    questions: ['What are my cancer’s hormone receptor and HER2 results?', 'How do the stage and test results affect my options?', 'What support is available during and after treatment?'],
    source: 'https://www.cancer.gov/types/breast',
  },
  {
    slug: 'lung-cancer', name: 'Lung Cancer',
    summary: 'An introduction to lung cancer types, diagnosis and treatment decisions.',
    overview: 'Lung cancer begins in cells of the lungs. The two main groups are non-small cell lung cancer and small cell lung cancer. Smoking is a major risk factor, but people who have never smoked can also develop lung cancer.',
    symptoms: ['A cough that persists or changes', 'Breathlessness or chest discomfort', 'Coughing up blood or unexplained weight loss'],
    diagnosis: 'Imaging and a tissue sample are usually needed to identify the type and stage. In some non-small cell lung cancers, biomarker testing can help identify whether a targeted medicine or immunotherapy may be appropriate.',
    treatment: 'Treatment may involve surgery, radiotherapy, chemotherapy, targeted therapy or immunotherapy. The cancer type, stage, biomarkers and general health all influence the plan.',
    questions: ['Which type of lung cancer do I have?', 'Is biomarker testing relevant to my diagnosis?', 'What can help with breathing symptoms and day-to-day wellbeing?'],
    source: 'https://www.cancer.gov/types/lung',
  },
  {
    slug: 'colorectal-cancer', name: 'Colorectal Cancer',
    summary: 'Learn about cancer of the colon or rectum and what happens after assessment.',
    overview: 'Colorectal cancer starts in the colon or rectum. Some cancers develop from polyps over time. Screening can identify some cancers or precancerous changes before symptoms appear, but recommended screening depends on age, risk and local guidance.',
    symptoms: ['A persistent change in bowel habits', 'Blood in the stool or bleeding from the rectum', 'Ongoing abdominal discomfort or unexplained weight loss'],
    diagnosis: 'A colonoscopy allows the bowel to be examined and a sample taken. Scans and laboratory tests help determine the stage. Some tumours are tested for mismatch repair or other biomarkers to support treatment decisions.',
    treatment: 'Surgery is common for localised disease. Chemotherapy, radiotherapy for some rectal cancers, targeted treatments or immunotherapy may be recommended depending on the situation.',
    questions: ['Is the cancer in the colon or rectum, and what is its stage?', 'Do my results suggest that inherited-risk assessment is needed?', 'How might treatment affect bowel function?'],
    source: 'https://www.cancer.gov/types/colorectal',
  },
  {
    slug: 'liver-cancer', name: 'Liver Cancer',
    summary: 'Learn the distinction between primary liver cancer and cancer that spreads to the liver.',
    overview: 'Primary liver cancer begins in the liver. Hepatocellular carcinoma is the most common type in adults. Cancer that spreads to the liver from another organ is a different condition and is usually treated according to where it began.',
    symptoms: ['Persistent discomfort in the upper right abdomen', 'Yellowing of the skin or eyes', 'Unexplained weight loss, appetite changes or abdominal swelling'],
    diagnosis: 'Blood tests, specialised scans and sometimes a biopsy are used. The team assesses both the cancer and how well the liver is working, because liver health affects treatment choices.',
    treatment: 'Options can include surgery, liver transplantation for selected patients, local treatments such as ablation or embolisation, radiotherapy or medicines. Suitability depends on tumour features, liver function and overall health.',
    questions: ['Did the cancer start in the liver?', 'How is my liver function affecting the plan?', 'Are local treatments or systemic medicines appropriate for me?'],
    source: 'https://www.cancer.gov/types/liver',
  },
  {
    slug: 'prostate-cancer', name: 'Prostate Cancer',
    summary: 'Understand how risk assessment helps guide monitoring and treatment.',
    overview: 'Prostate cancer starts in the prostate gland. Some prostate cancers grow slowly; others behave more aggressively. The grade, stage, PSA result and individual priorities help the care team assess risk and discuss next steps.',
    symptoms: ['Early prostate cancer may cause no symptoms', 'Difficulty passing urine or a change in urine flow', 'Blood in urine or semen; persistent pain needs assessment'],
    diagnosis: 'Assessment may include a PSA blood test, examination, MRI and a biopsy. PSA alone does not diagnose cancer. A pathologist grades the tissue, often using a Grade Group based on the Gleason score.',
    treatment: 'For selected low-risk cancers, active surveillance may be appropriate. Surgery, radiotherapy, hormone treatment and other medicines may be recommended for other situations. Discuss possible effects on urinary, bowel and sexual function.',
    questions: ['What is my risk group and Grade Group?', 'Is active surveillance an option?', 'What side effects matter most for my daily life?'],
    source: 'https://www.cancer.gov/types/prostate',
  },
  {
    slug: 'stomach-cancer', name: 'Stomach Cancer',
    summary: 'An introduction to gastric cancer, investigations and supportive care.',
    overview: 'Stomach cancer, also called gastric cancer, usually starts in the stomach lining. The position and type of the cancer, its stage and certain biomarkers can affect the treatment plan.',
    symptoms: ['Persistent indigestion or upper abdominal discomfort', 'Feeling full after small amounts of food', 'Unexplained weight loss, vomiting or difficulty swallowing'],
    diagnosis: 'An upper endoscopy allows a specialist to look inside the stomach and take biopsies. Scans and other tests help establish the stage. Biomarker testing may be relevant for some cancers.',
    treatment: 'Treatment can include surgery, chemotherapy, targeted therapy, immunotherapy or radiotherapy in selected situations. Nutritional assessment and symptom support are important parts of care.',
    questions: ['Where in the stomach is the cancer?', 'Would biomarker testing influence treatment?', 'Can I meet a dietitian to discuss eating and nutrition?'],
    source: 'https://www.cancer.gov/types/stomach',
  },
  {
    slug: 'lymphoma', name: 'Lymphoma',
    summary: 'Learn about a group of cancers affecting cells of the lymphatic system.',
    overview: 'Lymphoma begins in lymphocytes, a type of white blood cell. It includes Hodgkin lymphoma and many types of non-Hodgkin lymphoma. These can behave very differently, so identifying the exact subtype is important.',
    symptoms: ['Persistent, often painless swelling of lymph nodes', 'Unexplained fevers or drenching night sweats', 'Unexplained weight loss or persistent fatigue'],
    diagnosis: 'A lymph node or tissue biopsy is usually needed to identify the subtype. Blood tests, scans and sometimes bone marrow tests provide further information for planning care.',
    treatment: 'Depending on subtype and symptoms, management may include active monitoring, chemotherapy, antibody treatments, radiotherapy, targeted medicines, stem cell transplantation or cellular therapies in selected settings.',
    questions: ['What is the exact lymphoma subtype?', 'Does it need treatment now or active monitoring?', 'What symptoms should I report promptly?'],
    source: 'https://www.cancer.gov/types/lymphoma',
  },
  {
    slug: 'leukaemia', name: 'Leukaemia',
    summary: 'Understand the main groups of blood-forming cell cancers.',
    overview: 'Leukaemia is a cancer of blood-forming tissues, including the bone marrow. It is commonly described as acute or chronic and lymphoid or myeloid. Each type needs a different approach to testing and care.',
    symptoms: ['Persistent fatigue, pallor or breathlessness', 'Frequent infections or unexplained fever', 'Easy bruising, unusual bleeding or small red skin spots'],
    diagnosis: 'Blood counts, specialised cell tests and often a bone marrow sample help establish the diagnosis. Chromosome and molecular tests can provide information relevant to treatment and monitoring.',
    treatment: 'Treatment depends on the precise type. It may include chemotherapy, targeted medicines, immunotherapy, stem cell transplantation or active monitoring for selected chronic leukaemias. Acute leukaemia needs prompt specialist assessment.',
    questions: ['Is my leukaemia acute or chronic, and which subtype is it?', 'Which molecular results matter for my care?', 'What precautions should I take about infection or bleeding?'],
    source: 'https://www.cancer.gov/types/leukemia',
  },
];
