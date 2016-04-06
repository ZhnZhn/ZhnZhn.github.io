
let QuandlWorldBankEconomic = {};

const metrics = [
  { caption: "GDP (current US$)", value: "NY_GDP_MKTP_CD"},
  { caption: "GDP deflator (base year varies by country)", value: "NY_GDP_DEFL_ZS"},
  { caption: "GDP growth (annual %)", value: "NY_GDP_MKTP_KD_ZG" },
  { caption: "GDP per capita (current US$)", value: "NY_GDP_PCAP_CD"},
  { caption: "Fossil fuel energy consumption (% of total)", value: "EG_USE_COMM_FO_ZS"},
  { caption: "Fuel exports (% of merchandise exports)", value: "TX_VAL_FUEL_ZS_UN"},
  { caption: "Fuel imports (% of merchandise imports)", value: "TM_VAL_FUEL_ZS_UN"},
  { caption: "Imports of goods and services (current US$)", value: "NE_IMP_GNFS_CD"},
  { caption: "Imports of goods and services (annual % growth)", value: "NE_IMP_GNFS_KD_ZG"},
  { caption: "Imports of goods and services (BoP, current US$)", value: "BM_GSR_GNFS_CD"},
  { caption: "Exports of goods and services (% of GDP)", value: "NE_EXP_GNFS_ZS"},
  { caption: "Exports of goods and services (annual % growth)", value: "NE_EXP_GNFS_KD_ZG"},
  { caption: "Exports of goods and services (BoP, current US$)", value: "BX_GSR_GNFS_CD"},
  { caption: "Inflation, consumer prices (annual %)", value: "FP_CPI_TOTL_ZG"},
  { caption: "Inflation, GDP deflator (annual %)", value: "NY_GDP_DEFL_KD_ZG"},
];

QuandlWorldBankEconomic.getMetrics = function(){
   return metrics;
}

export default QuandlWorldBankEconomic;
