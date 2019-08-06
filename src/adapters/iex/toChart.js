import Builder from '../../charts/ConfigBuilder'
import AdapterFn from '../AdapterFn'
import AdapterStockFn from '../AdapterStockFn'

const {
        valueMoving,
        stockSeriesLegend,
      } = AdapterFn;
const { toSeriesData } = AdapterStockFn;

const _crZhConfig = (id, option) => {
  const { value, dataSource } = option;
  return {
    dataSource,
    id: id,
    key: value,
    linkFn: "NASDAQ",
    item: value,
    isWithLegend: true,
    legend: stockSeriesLegend()
  };
}

const _crInfo = (title) => ({
  name: title,
  frequency: "Daily",
});

const _crId = ({ value }) => value;

const toChart = {
  toConfig(json, option){
    const {
      title,
      isNotZoomToMinMax,
      isDrawDeltaExtrems
    } = option
    , _id = _crId(option)
    , dataOption = toSeriesData(json, {
        isNotZoomToMinMax,
        isDrawDeltaExtrems
      })
    , { data, dataMfi } = dataOption
    , config = Builder()
        .stockConfig(_id, dataOption)
        .addCaption(title)
        .add({
           valueMoving: valueMoving(data),
           info: _crInfo(title),
           zhConfig: _crZhConfig(_id, option)
         })
         .addZhPoints(dataMfi)
         .toConfig();

    return config;
  },

  toSeries(json, option){
    const _id = _crId(option)
        , { data } = toSeriesData(json, {
             isAllSeries: false,
          });
    return Builder()
      .initSeria()
      .addPoints(_id, data)
      .toSeria();
  }
}

export default toChart
