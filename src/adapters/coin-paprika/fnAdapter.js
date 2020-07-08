import AdapterFn from '../AdapterFn'

const {
  ymdToUTC,
  crVolumePoint,
  valueMoving,
  getValue,
  joinBy,
  toUpperCaseFirst
} = AdapterFn

const _crZhConfig = ({
    _itemKey,
    itemCaption,
    dataSource
  }) => ({
    id: _itemKey, key: _itemKey,
    itemCaption,
    dataSource
  });


const _crInfo = ({ title }) => ({
  name: title
});

const fnAdapter = {  
  getValue,
  joinBy,
  toUpperCaseFirst,

  crData: (arr) => {
    const data = []
    , dColumn = [], dVolume = []
    , dMarketCap = [];
    arr.forEach(item => {
      const {
        time_close, close,
        open, low, high, volume,
        market_cap
      } = item
      , _date = time_close
          ? ymdToUTC(time_close.split('T')[0])
          : void 0;
      if (_date) {
        data.push([ _date, close ])
        dVolume.push([ _date, volume ])
        dColumn.push(
          crVolumePoint({
             date: _date,
             open, close, volume,
             option: {
                _high: high,
                _low: low
              }
          })
        )
        dMarketCap.push([_date, market_cap])
      }
    })
    return {
      data,
      dVolume, dColumn,
      dMarketCap
    };
  },

  crConfigOption: ({ json, option, data }) => ({
      zhConfig: _crZhConfig(option),
      valueMoving: valueMoving(data),
      info: _crInfo(option)
    })
}

export default fnAdapter
