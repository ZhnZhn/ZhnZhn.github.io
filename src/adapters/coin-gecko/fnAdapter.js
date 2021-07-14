import AdapterFn from '../AdapterFn'

const {
  crError,
  getValue,
  getYmdhmUTC
} = AdapterFn

const C = {
  DF_PAGE: 1,
  DF_PER_PAGE: 10,
  DF_CURRENCY: 'USD'
};

const _isInRange = (v, min, max) => v>min && v<max ;

const fnAdapter = {
  crError,
  getYmdhmUTC,

  crPageConfig: option => {
    const { items=[] } = option
    , _page = getValue(items[0])
    , page = _isInRange(_page, 0, 11)
        ? _page : C.DF_PAGE
    , _perPage = getValue(items[1])
    , perPage = _isInRange(_perPage, 9, 51)
        ? _perPage : C.DF_PER_PAGE;
    return [
      page, perPage,
      getValue(items[2]) || C.DF_CURRENCY
    ]
  }
};

export default fnAdapter
