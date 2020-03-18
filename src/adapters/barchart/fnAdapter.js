
import dt from '../../utils/DateUtils'

import AdapterFn from '../AdapterFn'
import AdapterStockFn from '../AdapterStockFn'

const {
  crItemConf,
  crValueConf,
  valueMoving
} =AdapterFn;
const { toSeriesData } = AdapterStockFn;

const DESCR = "Copyright © 2017. All <a href='https://www.barchartmarketdata.com'>market data</a> provided by Barchart Market Data Solutions.<br><br>" +
              "BATS market data is at least 15-minutes delayed. Forex market data is at least 10-minutes delayed. AMEX, NASDAQ, NYSE and futures market data (CBOT, CME, COMEX and NYMEX) is end-of-day. Information is provided 'as is' and solely for informational purposes, not for trading purposes or advice, and is delayed. To see all exchange delays and terms of use, please see our <a href='https://www.barchart.com/agreement.php'>disclaimer.</a>"
const DATA_SOURCE = "Barchart Market Data Solutions"

const _crInfo = (caption) => ({
  description: DESCR,
  frequency: "Daily",
  name: caption,
  toDate: dt.getFromDate(0),
  fromDate: dt.getFromDate(1)
});

const _crZhConfig = (id, data, option) => {
  const { value } = option
  , dataSource = DATA_SOURCE;
  return {
    columnName: "Close",
    dataSource,
    id,
    key: value,
    item: value,
    linkFn: "NASDAQ",
    itemConf: {
      _itemKey: value,
      ...crItemConf(option),
      ...crValueConf(data),
      value, dataSource
    },
    legend: AdapterFn.stockSeriesLegend()
  }
};

const fnAdapter = {
  toSeriesData: toSeriesData,

  crTitle: (option) => ({
    title: option.title || ''
  }),

  crChartId: (option) => {
    const { value='' } = option;
    return `B/${value}`;
  },

  crData: (json, option) => {
    const {
      isNotZoomToMinMax,
      isDrawDeltaExtrems
    } = option;
    return toSeriesData(json.results, {
       pnDate: 'tradingDay',
       isNotZoomToMinMax,
       isDrawDeltaExtrems
    });
  },

  crConfigOption: ({ chartId, option, data }) => {
    const { title='' } = option;
    return {
      valueMoving: valueMoving(data),
      info: _crInfo(title),
      zhConfig: _crZhConfig(chartId, data, option)
    };
  }
}

export default fnAdapter
