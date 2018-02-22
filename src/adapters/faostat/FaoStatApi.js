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
};
const _getMemYear = () => {
  return C.MEM_YEAR || _crMemYear();
};

const _isTitle = (qT) => {
  return qT.indexOf('World') !== -1
     && qT.length < 22;
};

const FaoStatApi = {
  getRequestUrl(option){
    const {
            proxy,
            one, two, three,
            dfElement,
            dfDomain='QC',
            dfItemName='item'
           } = option
         , _element = three || dfElement
         , _year = _getMemYear();

    return `${proxy}${C.BASE}/${dfDomain}?element=${_element}&area=${one}&${dfItemName}=${two}&year=${_year}&${C.TAIL}`;
  },

  checkResponse(json){
    return json && Array.isArray(json.data);
  },

  addPropsTo(option){
    const { qA, qI, qE, qT='' } = option;
    const title = _isTitle(qT) ? qT : '';
    Object.assign(option, {
      one: qA,
      two: qI,
      three: qE,
      title
    })
  }
};

export default FaoStatApi
