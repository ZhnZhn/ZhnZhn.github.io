import { crSeriaConfig } from '../../charts/configBuilderFn';
import crConfigType1 from '../../charts/crConfigType1';

import {
  ymdToUTC,
  findMinY
} from '../AdapterFn';
import { compareByDate } from '../compareByFn';
import { crInfo } from './fnDescr';

const _parser = new window.DOMParser()
, _isNaN = Number.isNaN;

//€

const _crZhConfig = id => ({
  id: id,
  key: id,
  dataSource: 'INSEE'
});

const _crValueStatus = node => {
  const _status = node.getAttribute('OBS_STATUS');
  return _status
    && _status.length === 1
    && _status !== 'A'
      ? _status.toLowerCase()
      : void 0;
};

const _toData = (str) => {
  const xml = _parser.parseFromString(str, 'text/xml')
  , series = xml.getElementsByTagName('Series')
  , data = []
  , seriesParams = [];

  let i=0
  , max = series.length
  , _seria
  , _getAttr
  , _childNodes
  , _v;

  for(i; i<max; i++){
    _seria = series[i]
    _getAttr = _seria.getAttribute.bind(_seria)
    seriesParams.push({
      id: _getAttr('IDBANK'),
      title: _getAttr('TITLE_EN'),
      frequency: _getAttr('FREQ'),
      updatedOn: _getAttr('LAST_UPDATE'),
      unitMeasure: _getAttr('UNIT_MEASURE'),
      unitMult: _getAttr('UNIT_MULT')
    })
    _childNodes = _seria.childNodes || []
    _childNodes.forEach(node => {
      _v = parseFloat(node.getAttribute('OBS_VALUE'))
      if (!_isNaN(_v)) {
        data.push([
          ymdToUTC(node.getAttribute('TIME_PERIOD')),
          _v,
          _crValueStatus(node)
        ])
      }
    })
  }

  return [
    data.sort(compareByDate),
    seriesParams
  ];
}

const _crConfigOption = (
  option,
  seriesParams
) => ({
  info: crInfo(
    option.title,
    option.subtitle,
    seriesParams
  ),
  zhConfig: _crZhConfig(option.value)
});

const InseeAdapter = {
  toConfig(str, option) {
    const [
      data,
      seriesParams
    ] = _toData(str);
    return {
      config: crConfigType1({
        option,
        data,
        confOption: _crConfigOption(option, seriesParams)
      })
    };
  },

  toSeries(str, option) {
     const {
       value,
       title,
       subtitle
     } = option
     , data = _toData(str)[0];
     return crSeriaConfig({
        data,
        minY: findMinY(data),
        zhValueText: subtitle || title || value
     });
  }
}

export default InseeAdapter
