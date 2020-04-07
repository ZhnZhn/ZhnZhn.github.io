
const C = {
  DF_PAGE: 1,
  DF_PER_PAGE: 10,
  DF_CURRENCY: 'USD'
};

const _isInRange = (v, min, max) => v>min && v<max ;

const fnAdapter = {
  crPageConfig: option => {
    const { items=[] } = option
    , [ it1={}, it2={}, it3={} ] = items
    , _page = it1.value
    , page = _isInRange(_page, 0, 11)
        ? _page : C.DF_PAGE
    , _perPage = it2.value
    , perPage = _isInRange(_perPage, 9, 51)
        ? _perPage : C.DF_PER_PAGE;
    return [
      page, perPage,
      it3.value || C.DF_CURRENCY
    ]
  }
};

export default fnAdapter
