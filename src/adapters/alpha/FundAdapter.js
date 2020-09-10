import crConfigType1 from '../../charts/crConfigType1'
import fnAdapter from './fnAdapter'

const { Builder } = crConfigType1
, {
  ymdToUTC,
  compareByDate
} = fnAdapter
, _isNan = Number.isNaN || isNaN;

const _crData = (json, option) => {
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

const _crConfigOption = (option) => ({
  //valueMoving: valueMoving(data),
  zhConfig: _crZhConfig(option)
})

const FundAdapter = {
  crKey(option){
    return option._itemKey;
  },
  toConfig(json, option){
    const data = _crData(json, option)
    , confOption = _crConfigOption(option);
    return {
      config: crConfigType1({
        option, data, confOption,
      })
    };
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
