
const GoogleTallin = {};

const tickets = [
  { ticket:"ARC1T", value:"GOOG/TAL_ARC1T", caption:"Arco Vara AS (ARC1T)" },
 { ticket:"BLT1T", value:"GOOG/TAL_BLT1T", caption:"Baltika AS (BLT1T)" },
 { ticket:"EEG1T", value:"GOOG/TAL_EEG1T", caption:"Ekspress Grupp AS (EEG1T)" },
 { ticket:"HAE1T", value:"GOOG/TAL_HAE1T", caption:"Harju Electrics Ltd (HAE1T)" },
 { ticket:"JRV1T", value:"GOOG/TAL_JRV1T", caption:"Jarvevana AS (JRV1T)" },
 { ticket:"MRK1T", value:"GOOG/TAL_MRK1T", caption:"Merko Construction Ltd (MRK1T)" },
 { ticket:"NCN1T", value:"GOOG/TAL_NCN1T", caption:"Nordecon As (NCN1T)" },
 { ticket:"OMXTGI", value:"GOOG/TAL_OMXTGI", caption:"OMX Tallinn_GI (OMXTGI)" },
 { ticket:"OEG1T", value:"GOOG/TAL_OEG1T", caption:"Olympic Entertainment Group AS (OEG1T)" },
 { ticket:"PRF1T", value:"GOOG/TAL_PRF1T", caption:"Premia Foods AS (PRF1T)" },
 { ticket:"PKG1T", value:"GOOG/TAL_PKG1T", caption:"Pro Kapital Grupp (PKG1T)" },
 { ticket:"SFG1T", value:"GOOG/TAL_SFG1T", caption:"Silvano Fashion Group AS (SFG1T)" },
 { ticket:"SKN1T", value:"GOOG/TAL_SKN1T", caption:"Skano Group AS (SKN1T)" },
 { ticket:"TAL1T", value:"GOOG/TAL_TAL1T", caption:"Tallink Grupp AS (TAL1T)" },
 { ticket:"TKM1T", value:"GOOG/TAL_TKM1T", caption:"Tallinna Kaubamaja AS (TKM1T)" },
 { ticket:"TVEAT", value:"GOOG/TAL_TVEAT", caption:"Tallinna Vesi AS (TVEAT)" },
 { ticket:"TPD1T", value:"GOOG/TAL_TPD1T", caption:"Trigon Property Development AS (TPD1T)" }
]

GoogleTallin.getTickets = function(){
  return tickets;
}

export default GoogleTallin
