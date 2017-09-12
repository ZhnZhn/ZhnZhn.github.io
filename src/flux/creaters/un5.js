const C = {
  DF_ONE: { caption: 'All', value: 'all' },
  COLLON: ': ',
  DOTS: '...',
  MAX_SUBTITLE: 60,
  TRADE_FLOW: {
    caption: 'Export Value',
    value: { rg: 2 }
  }
};

const createLoadOptions = (props={}, options={}) => {
  const { fnValue, loadId, dataSource } = props
      , {
          one, two, three, tradeFlow
        } = options
      , _one = one || C.DF_ONE
      , _tradeFlow = tradeFlow || C.TRADE_FLOW
      , _two = three.value
           ? three.value
           : two.value
      , _value = (typeof fnValue === 'function')
           ? fnValue(_one.value, _two)
           : undefined
      , _title = _one.caption + C.COLLON + _tradeFlow.caption
      , _subtitle = (three.caption.length > C.MAX_SUBTITLE)
           ? three.caption.substr(0, C.MAX_SUBTITLE) + C.DOTS
           : three.caption;
  return {
    value : _value,
    loadId : loadId,
    title : _title,
    subtitle : _subtitle,
    dataSource : dataSource,
    one: _one.value,
    two: _two,
    ..._tradeFlow.value
  }
}

export default createLoadOptions
