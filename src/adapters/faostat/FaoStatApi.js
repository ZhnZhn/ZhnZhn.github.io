import fnAdapter from './fnAdapter'

const C = {
  BASE: 'http://fenixservices.fao.org/faostat/api/v1/en/data',
  TAIL: 'area_cs=FAO&item_cs=FAO&show_codes=true&show_unit=true&show_flags=true&null_values=false&output_type=json',
  MEM_YEAR: void 0
};

const { isSeriesReq, getValue } = fnAdapter
, _isArr = Array.isArray
, _assign = Object.assign;

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

const _checkReq = (option) => {
  if (option._isTs && isSeriesReq(option)) {
    throw new Error('ERR_10');
  }
};

const FaoStatApi = {
  getRequestUrl(option){
    _checkReq(option)
    const {
      proxy,
      items,
      dfElement,
      dfDomain='QC',
      dfItemName='item'
    } = option
    , _one = getValue(items[0])
    , _two = getValue(items[1])
    , _three = getValue(items[2])
    , _element = _three || dfElement
    , _year = _getMemYear();

    return `${proxy}${C.BASE}/${dfDomain}?element=${_element}&area=${_one}&${dfItemName}=${_two}&year=${_year}&${C.TAIL}`;
  },

  checkResponse(json){
    return json && _isArr(json.data);
  },

  addPropsTo(option){
    const { qA, qI, qE, qT='' } = option
    , title = _isTitle(qT) ? qT : '';
    _assign(option, {
      items: [{v:qA},{v:qI},{v:qE}],
      itemCaption: 'Item',
      title
    })
  }
};

export default FaoStatApi
