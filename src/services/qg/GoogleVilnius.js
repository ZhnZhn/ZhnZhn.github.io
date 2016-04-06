
const GoogleVilnius = {};

const tickets = [
  { ticket:"AVG1L", value:"GOOG/VSE_AVG1L", caption:"Agrowill Group AB (AVG1L)" },
{ ticket:"ANK1L", value:"GOOG/VSE_ANK1L", caption:"Anyksciu Vynas AB (ANK1L)" },
{ ticket:"APG1L", value:"GOOG/VSE_APG1L", caption:"Apranga APB (APG1L)" },
{ ticket:"CTS1L", value:"GOOG/VSE_CTS1L", caption:"City Service AB (CTS1L)" },
{ ticket:"DKR1L", value:"GOOG/VSE_DKR1L", caption:"Dvarcioniu keramika AB (DKR1L)" },
{ ticket:"GRG1L", value:"GOOG/VSE_GRG1L", caption:"Grigiskes AB (GRG1L)" },
{ ticket:"GUB1L", value:"GOOG/VSE_GUB1L", caption:"Gubernija AB (GUB1L)" },
{ ticket:"AGP1L", value:"GOOG/VSE_AGP1L", caption:"Imoniu grupe Alita AB (AGP1L)" },
{ ticket:"IVL1L", value:"GOOG/VSE_IVL1L", caption:"Invalda LT AB (IVL1L)" },
{ ticket:"KNR1L", value:"GOOG/VSE_KNR1L", caption:"Kauno energija AB (KNR1L)" },
{ ticket:"KBL1L", value:"GOOG/VSE_KBL1L", caption:"Klaipedos Baldai AB (KBL1L)" },
{ ticket:"KNF1L", value:"GOOG/VSE_KNF1L", caption:"Klaipedos Nafta AB (KNF1L)" },
{ ticket:"LGD1L", value:"GOOG/VSE_LGD1L", caption:"LITGRID AB (LGD1L)" },
{ ticket:"LES1L", value:"GOOG/VSE_LES1L", caption:"Lesto AB (LES1L)" },
{ ticket:"LDJ1L", value:"GOOG/VSE_LDJ1L", caption:"Lietuvos Dujos AB (LDJ1L)" },
{ ticket:"LJL1L", value:"GOOG/VSE_LJL1L", caption:"Lietuvos Juru Laivininkyste AB (LJL1L)" },
{ ticket:"LNR1L", value:"GOOG/VSE_LNR1L", caption:"Lietuvos energijos gamyba AB (LNR1L)" },
{ ticket:"LLK1L", value:"GOOG/VSE_LLK1L", caption:"Limarko laivininkystes kompanija AB (LLK1L)" },
{ ticket:"LNS1L", value:"GOOG/VSE_LNS1L", caption:"Linas AB (LNS1L)" },
{ ticket:"LNA1L", value:"GOOG/VSE_LNA1L", caption:"Linas Agro Group AB (LNA1L)" },
{ ticket:"PTR1L", value:"GOOG/VSE_PTR1L", caption:"Panevezio statybos trestas AB (PTR1L)" },
{ ticket:"PZV1L", value:"GOOG/VSE_PZV1L", caption:"Pieno Zvaigzdes AB (PZV1L)" },
{ ticket:"RSU1L", value:"GOOG/VSE_RSU1L", caption:"Rokiskio Suris AB (RSU1L)" },
{ ticket:"SAN1L", value:"GOOG/VSE_SAN1L", caption:"Sanitas AB (SAN1L)" },
{ ticket:"SAB1L", value:"GOOG/VSE_SAB1L", caption:"Siauliu Bankas AB (SAB1L)" },
{ ticket:"SNG1L", value:"GOOG/VSE_SNG1L", caption:"Snaige AB (SNG1L)" },
{ ticket:"TEO1L", value:"GOOG/VSE_TEO1L", caption:"TEO LT (TEO1L)" },
{ ticket:"UKB1L", value:"GOOG/VSE_UKB1L", caption:"Ukio Bankas AB (UKB1L)" },
{ ticket:"UTR1L", value:"GOOG/VSE_UTR1L", caption:"Utenos Trikotazas AB (UTR1L)" },
{ ticket:"VLP1L", value:"GOOG/VSE_VLP1L", caption:"Vilkyskiu pienine AB (VLP1L)" },
{ ticket:"VDG1L", value:"GOOG/VSE_VDG1L", caption:"Vilniaus Degtine AB (VDG1L)" },
{ ticket:"VBL1L", value:"GOOG/VSE_VBL1L", caption:"Vilniaus baldai AB (VBL1L)" },
{ ticket:"ZMP1L", value:"GOOG/VSE_ZMP1L", caption:"Zemaitijos Pienas AB (ZMP1L)" }
]

GoogleVilnius.getTickets = function(){
  return tickets;
}

export default GoogleVilnius
