import Builder from '../../charts/ConfigBuilder'
import AdapterFn from '../AdapterFn'
import AdapterStockFn from '../AdapterStockFn'

const {
        valueMoving,
        stockSeriesLegend,
        crZhFn, fnGetConfigMfi
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
    const { title } = option
    , _id = _crId(option)
    , dataOption = toSeriesData(_id, json)
    , { data, dataMfi } = dataOption
    , config = Builder()
        .initBaseStock(_id, dataOption)
        .addCaption(title)
        .add({
           valueMoving: valueMoving(data),
           info: _crInfo(title),
           zhConfig: _crZhConfig(_id, option),
           ...crZhFn()
         })
         .addZhPoints(dataMfi, fnGetConfigMfi)
         .toConfig();

    return config;
  },

  toSeries(json, option){
    const _id = _crId(option)
        , { data } = toSeriesData(_id, json, {
             isAllSeries: false,
          });
    return Builder()
      .initBaseSeria()
      .addPoints(_id, data)
      .toConfig();
  }
}

export default toChart
