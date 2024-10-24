const API_URL = "https://sdmx.oecd.org/public/rest/data";

const OecdApi = {
  getRequestUrl(option){
    const { items } = option;
    return `${API_URL}/${option.dfDs}/${items[0].v}.Q.${items[1].v}.IX?startPeriod=2005&format=jsondata`;
  },

  checkResponse(){}
};

export default OecdApi
