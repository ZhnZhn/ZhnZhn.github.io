import fnAdapter from './fnAdapter'
import Builder from '../../charts/ConfigBuilder'

const {
  ymdToUTC,
  compareByDate,
  valueMoving
} = fnAdapter

const _isNan = Number.isNaN || isNaN;

const crData = (json, option) => {
  const { dfItem, dfPeriod } = option
  , _pnReport = dfPeriod === 'A'
       ? 'annualReports'
       : 'quarterlyReports'
  , _reports = json[_pnReport] || []
  , _data = [];

  _reports.forEach(item => {
    const _y = parseInt(item[dfItem], 10)
    if (!_isNan(_y)) {
      _data.push([ymdToUTC(item.fiscalDateEnding), _y])
    }
  })
  return _data.sort(compareByDate);
}

const _crZhConfig = ({
  _itemKey,
  itemCaption,
  dataSource,
}) => ({
  id: _itemKey, key: _itemKey,
  itemCaption,
  dataSource
});

const crConfigOption = ({option, data}) => ({
  valueMoving: valueMoving(data),
  zhConfig: _crZhConfig(option)
})

const FundAdapter = {
  toConfig(json, option){
    const {
      seriaType,
      seriaColor,
      seriaWidth,
      title, subtitle
    } = option
    , data = crData(json, option)
    , seria = Builder()
        .splineSeria({
           seriaType,
           seriaColor,
           seriaWidth,
           data
        })
        .toSeria()
    , config = Builder()
        .area2Config(title, subtitle)
        .addSeries(seria)
        .addMinMax(data, option)
        .add({
          ...crConfigOption({ option, data })
        })
        .toConfig();

    return { config };
  },
  toSeries(json, option){
    return Builder.crSeria({
      adapter: FundAdapter,
      json, option,
      type: 'spline'
    });
  }
};

export default FundAdapter
