
import DateUtils from '../../utils/DateUtils'

import AdapterFn from '../AdapterFn'
import AdapterStockFn from '../AdapterStockFn'
import Builder from '../../charts/ConfigBuilder'

import { fnAddSeriesSma, fnRemoveSeries, fnGetConfigMfi } from '../IndicatorSma';

const DESCR = "Copyright © 2017. All <a href='https://www.barchartmarketdata.com'>market data</a> provided by Barchart Market Data Solutions.<br><br>" +
              "BATS market data is at least 15-minutes delayed. Forex market data is at least 10-minutes delayed. AMEX, NASDAQ, NYSE and futures market data (CBOT, CME, COMEX and NYMEX) is end-of-day. Information is provided 'as is' and solely for informational purposes, not for trading purposes or advice, and is delayed. To see all exchange delays and terms of use, please see our <a href='https://www.barchart.com/agreement.php'>disclaimer.</a>"

const TITLE = "Source: Barchart";

const { toSeriesData } = AdapterStockFn;

const _crInfo = (caption) => ({
  description: DESCR,
  frequency: "Daily",
  name: caption,
  newest_available_date: DateUtils.getFromDate(0),
  oldest_available_date: DateUtils.getFromDate(1)
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

const _crChartId = (option) => {
  const { value='' } = option;
  return `B/${value}`;
};

const _crConfig = (json={}, option) => {
  const  { value='', title='' } = option
      , _chartId = _crChartId(option)
      , dataOption = toSeriesData(_chartId, json.results, {
           pnDate: 'tradingDay'
        })
      , { data, dataMfi } = dataOption
      , config = Builder()
         .initBaseStock(_chartId, dataOption)
         .addCaption(TITLE, title)
         .add({
            valueMoving: AdapterFn.valueMoving(data),
            info: _crInfo(title),
            zhConfig: _crZhConfig(_chartId, value),
            zhFnAddSeriesSma: fnAddSeriesSma,
            zhFnRemoveSeries: fnRemoveSeries
          })
          .addZhPoints(dataMfi, fnGetConfigMfi)
          .toConfig();
  return {
    config
    //isDrawDeltaExtrems:false,
    //isNotZoomToMinMax:false
  };
}

const BarchartAdapter = {
  toConfig(json, option) {
    const _config = _crConfig(json, option);
    return _config;
  },

  toSeries(json={}, option) {
    const { parentId } = option
        , _id = `${parentId}_${_crChartId(option)}`
        , { data } = toSeriesData(_id, json.results, {
             isAllSeries: false,
             pnDate: 'tradingDay'
          });
    return Builder()
      .initBaseSeria()
      .addPoints(_id, data)
      .toConfig();
  }
}

export default BarchartAdapter
