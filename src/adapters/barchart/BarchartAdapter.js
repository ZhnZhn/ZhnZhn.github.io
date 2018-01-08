
import DateUtils from '../../utils/DateUtils'

import AdapterFn from '../AdapterFn'
import Tooltip from '../../charts/Tooltip'
import ConfigBuilder from '../../charts/ConfigBuilder'

import { fnAddSeriesSma, fnRemoveSeries, fnGetConfigMfi } from '../IndicatorSma';

const DESCR = "Copyright © 2017. All <a href='https://www.barchartmarketdata.com'>market data</a> provided by Barchart Market Data Solutions.<br><br>" +
              "BATS market data is at least 15-minutes delayed. Forex market data is at least 10-minutes delayed. AMEX, NASDAQ, NYSE and futures market data (CBOT, CME, COMEX and NYMEX) is end-of-day. Information is provided 'as is' and solely for informational purposes, not for trading purposes or advice, and is delayed. To see all exchange delays and terms of use, please see our <a href='https://www.barchart.com/agreement.php'>disclaimer.</a>"

const _crInfo = (caption) => ({
  description: DESCR,
  frequency: "Daily",
  name: caption,
  newest_available_date: DateUtils.getFromDate(0),
  oldest_available_date: DateUtils.getFromDate(2)
});

const _crZhConfig = (id, value) => ({
  columnName: "Close",
  dataSource: "Barchart Market Data Solutions",
  id: id,
  key: value,
  linkFn: "NASDAQ",
  isWithLegend: true,
  legend: AdapterFn.stockSeriesLegend()
});

const _crSeriesData = (chartId, json={}, isAllSeries=true ) => {
  const { results=[] } = json
      , data = []
      , dataOpen = [], dataHigh = [], dataLow = []
      , dataVolume = [], dataVolumeColumn = []
      , dataATH = [], dataMfi = [];
  let _prevClose
    , minClose = Number.POSITIVE_INFINITY
    , maxClose = Number.NEGATIVE_INFINITY;
  results.forEach(item => {
    const {
           tradingDay='',
           open, high, low, close, volume
          } = item
        , _date = AdapterFn.ymdToUTC(tradingDay);

    data.push([_date, close])

    if (isAllSeries) {
      if (minClose > close) { minClose = close }
      if (maxClose < close ) { maxClose = close }

      dataOpen.push([_date, open])
      dataHigh.push([_date, high])
      dataLow.push([_date, low])
      dataVolume.push([_date, volume])
      dataVolumeColumn.push(
          AdapterFn.volumeColumnPoint({
             open, close, volume, date: _date,
             option: { _high: high, _low: low }
          })
      )
      dataMfi.push([tradingDay, close, high, low, close, volume])
      if (typeof _prevClose !== 'undefined'){
        dataATH.push(
           AdapterFn.athPoint({
             date: _date, prevClose: _prevClose, open
           })
        )
      }
      _prevClose = close
     }
  })

  return {
    data, minClose, maxClose,
    dataOpen, dataHigh, dataLow,
    dataVolume, dataVolumeColumn,
    dataATH, dataMfi
  };

}

const _crChartId = (option) => {
  const { value='' } = option;
  return `B/${value}`;
}

const _crConfig = (json, option) => {
  const  { value='', title='' } = option
      , _chartId = _crChartId(option)
      , {
          data, minClose, maxClose,
          dataOpen, dataHigh, dataLow,
          dataVolume, dataVolumeColumn,
          dataATH, dataMfi
        } = _crSeriesData(_chartId, json)
      , config = ConfigBuilder()
         .initBaseArea()
         .add('chart', { spacingTop: 25 })
         .addCaption(title)
         .addTooltip(Tooltip.fnBasePointFormatter)
         .add({
            valueMoving: AdapterFn.valueMoving(data),
            info: _crInfo(title),
            zhConfig: _crZhConfig(_chartId, value),
            zhFnAddSeriesSma: fnAddSeriesSma,
            zhFnRemoveSeries: fnRemoveSeries
          })
          .addZhVolumeConfig(_chartId, dataVolumeColumn, dataVolume)
          .addZhATHConfig(_chartId, dataATH)
          .addZhPoints(dataMfi, fnGetConfigMfi)
          .setMinMax(minClose, maxClose)
          .setStockSerias(_chartId, data, dataHigh, dataLow, dataOpen)
          .toConfig();
  return {
    config,
    isDrawDeltaExtrems:false,
    isNotZoomToMinMax:false
  };
}

const BarchartAdapter = {
  toConfig(json, option) {
    const _config = _crConfig(json, option);
    return _config;
  },

  toSeries(json, option) {
    const { parentId } = option
        , _id = `${parentId}_${_crChartId(option)}`
        , { data } = _crSeriesData(_id, json, false);
    return ConfigBuilder()
      .initBaseSeria()
      .addPoints(_id, data)
      .toConfig();
  }
}

export default BarchartAdapter
