import AdapterFn from './AdapterFn'

const {
  ymdToUTC,
  crVolumePoint,
  crAthPoint
} = AdapterFn;

const _isUndef = v => typeof v === 'undefined';

const AdapterStockFn = {
  toSeriesData: ({ arr=[], seriaOption={}, option={} }) => {
    const {
      isAllSeries=true,
      pnDate='date',
    } = seriaOption
    , {
      isNotZoomToMinMax,
      isDrawDeltaExtrems,
      seriaType,
      seriaColor,
      seriaWidth
    } = option
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
            crVolumePoint({
               open, close, volume, date: _date,
               option: { _high: high, _low: low }
            })
        )
        dataMfi.push([date, close, high, low, close, volume])
        dataATH.push(!_isUndef(_prevClose)
          ? crAthPoint({
             date: _date,
             close: _prevClose,
             open
            })
          : crAthPoint({
             date: _date,
             close: close,
             open: close
            })
        )
        _prevClose = close
       }
    })
    return {
      data,
      minClose, maxClose,
      dataOpen, dataHigh, dataLow,
      dataVolume, dataVolumeColumn,
      dataATH, dataMfi,
      isNotZoomToMinMax,
      isDrawDeltaExtrems,
      seriaType,
      seriaColor,
      seriaWidth
    };
  }
};

export default AdapterStockFn
