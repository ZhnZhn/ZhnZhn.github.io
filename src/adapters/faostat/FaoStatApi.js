const C = {
  BASE: 'http://fenixservices.fao.org/faostat/api/v1/en/data',
  TAIL: 'area_cs=FAO&item_cs=FAO&show_codes=true&show_unit=true&show_flags=true&null_values=false&output_type=json',
  MEM_YEAR: undefined
};

const _crMemYear = () => {
  const year = (new Date()).getUTCFullYear()
      , arr = [];
  let i = 1980;
  for(;i<year;i++){ arr.push(i) }
  return C.MEM_YEAR = arr.join(',');
  //return C.MEM_YEAR;
};
const _getMemYear = () => {
  return C.MEM_YEAR || _crMemYear();
};

const FaoStatApi = {
  getRequestUrl(option){
    const { proxy, one, two, three, dfElement, dfDomain='QC' } = option
         , _element = three || dfElement
         , _year = _getMemYear();

    return `${proxy}${C.BASE}/${dfDomain}?element=${_element}&area=${one}&item=${two}&year=${_year}${C.TAIL}`;
  },

  checkResponse(json){
    return json && Array.isArray(json.data);
  },

  addPropsTo(option){
    const { qA, qI, qE } = option;
    Object.assign(option, {
      one: qA,
      two: qI,
      three: qE,
      title: 'More about data on tab Info in Description'
    })
  }
};

export default FaoStatApi
