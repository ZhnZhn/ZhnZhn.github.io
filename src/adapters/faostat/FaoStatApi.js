import {
  isCategory,
  isTreeMap
} from '../CategoryFn';
import {  
  isTokenInStr,
  assign,
  getValue,
  getCaption,
  fCheckResponse
} from '../AdapterFn';

import {
  isSeriesReq,
  isQueryAllowed
} from './fnAdapter';

import getMemoizedYear from './getMemoizedYear';

const API_URL = 'https://faostatservices.fao.org/api/v1/en/data'
, TAIL = '&area_cs=M49&item_cs=CPC&show_codes=true&show_unit=true&show_flags=true&show_notes=true&null_values=false&page_number=1&datasource=PRODUCTION_AWS&output_type=objects'
, WORLD_LIST_ID = '5000>';

const _isTitle = (
  qT
) => isTokenInStr(qT, 'World')
  && qT.length < 22;

const _checkReq = (option) => {
  if (option._isTs && isSeriesReq(option)) {
    throw new Error('ERR_10');
  }
  if (isQueryAllowed(option)) {
    throw new Error('Query lists for lists is not allowed.');
  }
  const _element = option.items[2] || {};
  if (isTreeMap(option.seriaType) && !_element.isTm) {
    throw new Error(`TreeMap for ${getCaption(_element)} is not exist.`);
  }
};

const _getListId = (
  geoId
) => isTokenInStr(geoId, '>')
  ? geoId
  : WORLD_LIST_ID;

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
        ? [getMemoizedYear(2004), 5000]
        : [getMemoizedYear(1980), 100]
    , _apiUrl = `${API_URL}/${dfDomain}?element=${_element}&${dfItemName}=${_two}`
    , _isCategorySeriaType = isCategory(seriaType)
    , _area = _isCategorySeriaType
        ? _getListId(_one)
        : _one
    , _apiQuery = _isCategorySeriaType
        ? `area=${_area}&year=${option.time}&page_size=300`
        : `area=${_area}&year=${_year}&page_size=${_pageSize}`

    return `${_apiUrl}&${_apiQuery}${TAIL}`;
  },

  checkResponse: fCheckResponse(),

  addPropsTo(option){
    const {
      qA,
      qI,
      qE,
      qT=''
    } = option
    , title = _isTitle(qT) ? qT : '';
    assign(option, {
      items: [{v:qA},{v:qI},{v:qE}],
      itemCaption: 'Item',
      title
    })
  }
};

export default FaoStatApi
