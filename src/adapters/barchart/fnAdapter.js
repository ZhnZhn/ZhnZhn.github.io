
import dt from '../../utils/DateUtils'

import AdapterFn from '../AdapterFn'
import AdapterStockFn from '../AdapterStockFn'

const { valueMoving } =AdapterFn;
const { toSeriesData } = AdapterStockFn;

const DESCR = "Copyright © 2017. All <a href='https://www.barchartmarketdata.com'>market data</a> provided by Barchart Market Data Solutions.<br><br>" +
              "BATS market data is at least 15-minutes delayed. Forex market data is at least 10-minutes delayed. AMEX, NASDAQ, NYSE and futures market data (CBOT, CME, COMEX and NYMEX) is end-of-day. Information is provided 'as is' and solely for informational purposes, not for trading purposes or advice, and is delayed. To see all exchange delays and terms of use, please see our <a href='https://www.barchart.com/agreement.php'>disclaimer.</a>"
const TITLE = "Source: Barchart";

const _crInfo = (caption) => ({
  description: DESCR,
  frequency: "Daily",
  name: caption,
  toDate: dt.getFromDate(0),
  fromDate: dt.getFromDate(1)
});

const _crZhConfig = (id, value) => ({
  columnName: "Close",
  dataSource: "Barchart Market Data Solutions",
  id: id,
  key: value,
  item: value,
  linkFn: "NASDAQ",
  isWithLegend: true,
  legend: AdapterFn.stockSeriesLegend()
});

const fnAdapter = {
  toSeriesData: toSeriesData,

  crTitle: (option) => ({
    title: TITLE,
    subtitle: option.title || ''
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
    const { title='', value='' } = option;
    return {
      valueMoving: valueMoving(data),
      info: _crInfo(title),
      zhConfig: _crZhConfig(chartId, value)
    };
  }
}

export default fnAdapter
