import {
  isArr,
  crError,
  getCaption,
  getValue,
  isTotalData
} from './fnAdapter';

const URL = 'https://ember-data-api-scg3n.ondigitalocean.app/ember/generation_yearly.json'
, QUERY_TAIL = '&_shape=array';

const EmberApi = {
  getRequestUrl(options) {
    const {
      items
    } = options
    , geo = getCaption(items[0])
    , source = getValue(items[2])
    , _sourceQuery = isTotalData(source)
       ? ''
       : `&variable__exact=${source}`;

    return `${URL}?country_or_region__exact=${geo}&${QUERY_TAIL}&${_sourceQuery}`;
  },

  checkResponse(json) {
    if (!isArr(json)) {
      throw crError('', 'There are no data');
    }
  }
}

export default EmberApi
