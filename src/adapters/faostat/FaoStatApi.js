import { isCategory } from '../CategoryFn';

import {
  crError,
  isSeriesReq,
  isQueryAllowed,
  getValue
} from './fnAdapter';

import getMemoizedYear from './getMemoizedYear';

const API_URL = 'https://faostatservices.fao.org/api/v1/en/data'
, TAIL = '&area_cs=M49&item_cs=CPC&show_codes=true&show_unit=true&show_flags=true&show_notes=true&null_values=false&page_number=1&datasource=PRODUCTION_AWS&output_type=objects'
, WORLD_LIST_ID = '5000>';

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
      dfItemName='item',
      seriaType
    } = option
    , _one = getValue(items[0])
    , _two = getValue(items[1])
    , _three = getValue(items[2])
    , _element = _three || dfElement
    , [
      _year,
      _pageSize
    ] = _one === WORLD_LIST_ID
        ? [ getMemoizedYear(2004), 5000]
        : [ getMemoizedYear(1980), 100]
    , _apiUrl = `${API_URL}/${dfDomain}?element=${_element}&${dfItemName}=${_two}`
    , _apiQuery = isCategory(seriaType)
        ? `area=${WORLD_LIST_ID}&year=${option.time}&page_size=300`
        : `area=${_one}&year=${_year}&page_size=${_pageSize}`

    return `${_apiUrl}&${_apiQuery}${TAIL}`;
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
