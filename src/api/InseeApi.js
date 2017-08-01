const C = {
  //ROOT: 'https://crossorigin.me/https://bdm.insee.fr/series/sdmx/data/SERIES_BDM/'
  ROOT: 'https://bdm.insee.fr/series/sdmx/data/SERIES_BDM/'
}

const InseeApi = {
  getRequestUrl(option) {
    const { proxy, value, fromDate, toDate } = option;
    return `${proxy}${C.ROOT}${value}?startPeriod=${fromDate}&endPeriod=${toDate}`;
  },
  checkResponse(str) {
    return true;
  }
}

export default InseeApi
