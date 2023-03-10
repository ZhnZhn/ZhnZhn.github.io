const DATA_URL = 'https://bdm.insee.fr/series/sdmx/data/SERIES_BDM';

const InseeApi = {
  getRequestUrl(option) {
    return `${DATA_URL}/${option.value}?startPeriod=${option.fromDate}&endPeriod=${option.toDate}`;
  },
  checkResponse() {
    return true;
  }
};

export default InseeApi
