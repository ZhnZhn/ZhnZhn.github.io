import ChartConfig from '../../charts/ChartConfig'
import Builder from '../../charts/ConfigBuilder'

import Chart from '../../charts/Chart'
import Tooltip from '../../charts/Tooltip'

import AdapterFn from '../AdapterFn'
import IntradayFns from '../IntradayFns'

const {
  ymdhmsToUTC,
  volumeColumnPoint,
  stockSeriesLegend,
  valueMoving
} = AdapterFn;

const { crMarkerColor, crDataVm } = IntradayFns;

const _crSeriaData = (json, option, config, chartId) => {
  const _value = json.intraday
  , _dateKeys = _value
       ? Object.keys(_value).sort()
       : []
  , _data = []
  , _dataVolume = [], _dataVolumeColumn = []
  , _dataHigh = [], _dataLow = [], _dataOpen = [];

  let i = 0, _max = _dateKeys.length
  , _minClose = Number.POSITIVE_INFINITY
  , _maxClose = Number.NEGATIVE_INFINITY
  , _dateMs
  , _strDate, _point
  , _open, _high, _low, _closeV, _close, _volume ;
  for (i; i<_max; i++) {
    _strDate = _dateKeys[i]
    _point = _value[_strDate]
    _closeV = parseFloat(_point['close'])
    _close = parseFloat(_point['close'])

    _open = parseFloat(_point['open'])
    _high = parseFloat(_point['high'])
    _low = parseFloat(_point['low'])
    _volume = parseFloat(_point['volume'])

    _dateMs = ymdhmsToUTC(_strDate)
    _data.push({
      x: _dateMs,
      y: _close,
      ...crMarkerColor(_strDate)
    })

    _dataHigh.push([_dateMs, _high])
    _dataLow.push([_dateMs, _low])
    _dataOpen.push([_dateMs, _open])

    _dataVolume.push([_dateMs, _volume])
    _dataVolumeColumn.push(
        volumeColumnPoint({
           open: _open,
           close: _closeV,
           volume: _volume,
           date: _dateMs,
           option: { _high: _high, _low: _low }
        })
      )

      if (_minClose > _close) {
        _minClose = _close
      }
      if (_maxClose < _close ) {
        _maxClose = _close
      }
  }

  ChartConfig.setStockSerias(
    config, _data, _dataHigh, _dataLow, _dataOpen, chartId
  )


  return {
    data: _data,
    minClose: _minClose,
    maxClose: _maxClose,
    dVolume: _dataVolume,
    dColumn: _dataVolumeColumn
  };
};

const _crZhConfig = (id, dataSource) => ({
  id: id,
  key: id,
  isWithoutAdd: true,
  legend: stockSeriesLegend(),
  dataSource: dataSource
});

const _crIntradayConfigOption = ({ id, data, dataSource }) => ({
  zhConfig: _crZhConfig(id, dataSource),
  valueMoving: valueMoving(data)
});

const WtdIntraday = {
  crKey(option){
    const { value, two } = option;
    return `${value} (${two}min)`;
  },
  toConfig(json, option) {
    const _initialConfig = ChartConfig.fBaseAreaConfig()
    , { _itemId, dataSource } = option
    , {
        data,
        minClose, maxClose,
        dColumn, dVolume
      } = _crSeriaData(json, option, _initialConfig, _itemId )
    , _dataVm = crDataVm(data)
    //, { timezone_name='' } = json
    , config = Builder()
        .init(_initialConfig)
        .add('chart', { spacingTop: 25, marginBottom: 20 })
        .addCaption(_itemId)
        .addTooltip(Tooltip.fnBasePointFormatterT)
        .add(_crIntradayConfigOption({
           id: _itemId,
           data: _dataVm,
           dataSource
        }))
        .setMinMax(minClose, maxClose, false)
        .addMiniVolume({
          id: _itemId,
          dVolume, dColumn,
          tooltipColumn: Chart.fTooltip(Tooltip.volumeDmyt)
        })
        .toConfig();

    return { config };
  }
};

export default WtdIntraday
