import AdapterFn from './AdapterFn'

const {
  ymdToUTC,
  volumeColumnPoint,
  athPoint
} = AdapterFn;

const _isUndef = v => typeof v === 'undefined';

const AdapterStockFn = {
  toSeriesData: (arr=[], seriaOption) => {
    const {
            isAllSeries=true,
            pnDate='date',
            ...restOption
            //isNotZoomToMinMax,
            //isDrawDeltaExtrems
          } = seriaOption || {};
    const data = []
        , dataOpen = [], dataHigh = [], dataLow = []
        , dataVolume = [], dataVolumeColumn = []
        , dataATH = [], dataMfi = [];
    let _prevClose
      , minClose = Number.POSITIVE_INFINITY
      , maxClose = Number.NEGATIVE_INFINITY;
    arr.forEach(item => {
      const {
             open, high, low, close,
             volume
            } = item
          , date = item[pnDate] || ''
          , _date = ymdToUTC(date);

      data.push([_date, close])

      if (isAllSeries) {
        if (minClose > close) { minClose = close }
        if (maxClose < close ) { maxClose = close }

        dataOpen.push([_date, open])
        dataHigh.push([_date, high])
        dataLow.push([_date, low])
        dataVolume.push([_date, volume])
        dataVolumeColumn.push(
            volumeColumnPoint({
               open, close, volume, date: _date,
               option: { _high: high, _low: low }
            })
        )
        dataMfi.push([date, close, high, low, close, volume])
        if (!_isUndef(_prevClose)){
          dataATH.push(
             athPoint({
               date: _date,
               prevClose: _prevClose,
               open
             })
          )
        } else {
          dataATH.push(
             athPoint({
               date: _date,
               prevClose: close,
               open: close
             })
          )
        }
        _prevClose = close
       }
    })    
    return {
      data,
      minClose, maxClose,
      dataOpen, dataHigh, dataLow,
      dataVolume, dataVolumeColumn,
      dataATH, dataMfi,
      ...restOption
    };
  }
};

export default AdapterStockFn
