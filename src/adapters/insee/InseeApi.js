const C = {
  ROOT: 'https://bdm.insee.fr/series/sdmx/data/SERIES_BDM/'
};

const InseeApi = {
  getRequestUrl(option) {
    const { value, fromDate, toDate } = option;
    return `${C.ROOT}${value}?startPeriod=${fromDate}&endPeriod=${toDate}`;
  },
  checkResponse(str) {
    return true;
  }
}

export default InseeApi
