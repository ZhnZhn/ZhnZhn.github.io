
const BIS_API = "https://stats.bis.org/api/v2/data/dataflow/BIS";

const BisApi = {
  getRequestUrl(option){
    return `${option.proxy}${BIS_API}/${option.dfCase}/1.0/${option.items[0].v}`;
  }
};

export default BisApi
