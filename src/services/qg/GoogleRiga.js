
const GoogleRiga = {};

const tickets = [
  { ticket:"BRV1R", value:"GOOG/RSE_BRV1R", caption:"Brivais Vilnis AS (BRV1R)" },
  { ticket:"LOK1R", value:"GOOG/RSE_LOK1R", caption:"Daugavpils Lokomotivju Remonta Rupnic AS (LOK1R)" },
  { ticket:"DPK1R", value:"GOOG/RSE_DPK1R", caption:"Ditton pievadkezu rupnica AS (DPK1R)" },
  { ticket:"GRD1R", value:"GOOG/RSE_GRD1R", caption:"Grindeks AS (GRD1R)" },
  { ticket:"GRZ1R", value:"GOOG/RSE_GRZ1R", caption:"Grobina AS (GRZ1R)" },
  { ticket:"KA11R", value:"GOOG/RSE_KA11R", caption:"Kurzemes Atslega 1 AS (KA11R)" },
  { ticket:"KCM1R", value:"GOOG/RSE_KCM1R", caption:"Kurzemes CMAS AS (KCM1R)" },
  { ticket:"GZE1R", value:"GOOG/RSE_GZE1R", caption:"Latvijas Gaze AS (GZE1R)" },
  { ticket:"LJM1R", value:"GOOG/RSE_LJM1R", caption:"Latvijas Juras medicinas centrs AS (LJM1R)" },
  { ticket:"LSC1R", value:"GOOG/RSE_LSC1R", caption:"Latvijas Kugnieciba AS (LSC1R)" },
  { ticket:"ZOV1R", value:"GOOG/RSE_ZOV1R", caption:"Latvijas Zoovetapgade AS (ZOV1R)" },
  { ticket:"BAL1R", value:"GOOG/RSE_BAL1R", caption:"Latvijas balzams AS (BAL1R)" },
  { ticket:"LTT1R", value:"GOOG/RSE_LTT1R", caption:"Latvijas tilti AS (LTT1R)" },
  { ticket:"LAP1R", value:"GOOG/RSE_LAP1R", caption:"Liepajas autobusu parks AS (LAP1R)" },
  { ticket:"LME1R", value:"GOOG/RSE_LME1R", caption:"Liepajas metalurgs AS (LME1R)" },
  { ticket:"NKA1R", value:"GOOG/RSE_NKA1R", caption:"Nordeka AS (NKA1R)" },
  { ticket:"OMXRGI", value:"GOOG/RSE_OMXRGI", caption:"OMX Riga_GI (OMXRGI)" },
  { ticket:"OLF1R", value:"GOOG/RSE_OLF1R", caption:"Olainfarm AS (OLF1R)" },
  { ticket:"RAR1R", value:"GOOG/RSE_RAR1R", caption:"Rigas Autoelektroaparatu Rupnica AS (RAR1R)" },
  { ticket:"FRM1R", value:"GOOG/RSE_FRM1R", caption:"Rigas Farmaceitiska Fabrika AS (FRM1R)" },
  { ticket:"RJR1R", value:"GOOG/RSE_RJR1R", caption:"Rigas Juvelierizstradajumu Rupnica AS (RJR1R)" },
  { ticket:"RKB1R", value:"GOOG/RSE_RKB1R", caption:"Rigas Kugu Buvetava AS (RKB1R)" },
  { ticket:"RER1R", value:"GOOG/RSE_RER1R", caption:"Rigas elektromasinbuves rupnica AS (RER1R)" },
  { ticket:"SAF1R", value:"GOOG/RSE_SAF1R", caption:"SAF Tehnika AS (SAF1R)" },
  { ticket:"SMA1R", value:"GOOG/RSE_SMA1R", caption:"Saldus Mezrupnieciba AS (SMA1R)" },
  { ticket:"SCM1R", value:"GOOG/RSE_SCM1R", caption:"Siguldas cltslt un mkslgs apskls stcj AS (SCM1R)" },
  { ticket:"TMA1R", value:"GOOG/RSE_TMA1R", caption:"Talsu Mezrupnieciba AS (TMA1R)" },
  { ticket:"TKB1R", value:"GOOG/RSE_TKB1R", caption:"Tosmares kugubuvetava AS (TKB1R)" },
  { ticket:"VSS1R", value:"GOOG/RSE_VSS1R", caption:"VALMIERAS STIKLA SKIEDRA AS (VSS1R)" },
  { ticket:"VEF1R", value:"GOOG/RSE_VEF1R", caption:"VEF AS (VEF1R)" },
  { ticket:"RRR1R", value:"GOOG/RSE_RRR1R", caption:"VEF Radiotehnika RRR AS (RRR1R)" },
  { ticket:"VNF1R", value:"GOOG/RSE_VNF1R", caption:"VENTSPILS NAFTA AS (VNF1R)" }
]

GoogleRiga.getTickets = function(){
  return tickets;
}

export default GoogleRiga
