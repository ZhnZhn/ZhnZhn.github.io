import {
  crError,
  isSeriesReq,
  isQueryAllowed,
  getValue
} from './fnAdapter';

import getMemoizedYear from './getMemoizedYear';

const API_URL = 'https://fenixservices.fao.org/faostat/api/v1/en/data'
, TAIL = 'area_cs=FAO&item_cs=FAO&show_codes=true&show_unit=true&show_flags=true&null_values=false&output_type=json'

const _isArr = Array.isArray
, _assign = Object.assign

const _isTitle = (
  qT
) => qT.indexOf('World') !== -1
  && qT.length < 22;

const _checkReq = (option) => {
  if (option._isTs && isSeriesReq(option)) {
    throw new Error('ERR_10');
  }
  if (isQueryAllowed(option)) {
    throw new Error('Query lists for lists is not allowed.');
  }
};

const FaoStatApi = {
  getRequestUrl(option){
    _checkReq(option)
    const {
      items,
      dfElement,
      dfDomain='QC',
      dfItemName='item'
    } = option
    , _one = getValue(items[0])
    , _two = getValue(items[1])
    , _three = getValue(items[2])
    , _element = _three || dfElement
    , _year = getMemoizedYear();

    return `${API_URL}/${dfDomain}?element=${_element}&area=${_one}&${dfItemName}=${_two}&year=${_year}&${TAIL}`;
  },

  checkResponse(json){
    if (!(json && _isArr(json.data))) {
      throw crError();
    }
  },

  addPropsTo(option){
    const {
      qA,
      qI,
      qE,
      qT=''
    } = option
    , title = _isTitle(qT) ? qT : '';
    _assign(option, {
      items: [{v:qA},{v:qI},{v:qE}],
      itemCaption: 'Item',
      title
    })
  }
};

export default FaoStatApi
