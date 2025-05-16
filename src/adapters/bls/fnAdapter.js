import { joinByColon } from '../../utils/arrFn';
import {
  isTypeNumber,
  parseIntBy10
} from '../../utils/isTypeFn';

import {
  ymdToUTC
} from '../AdapterFn';

const _crZhConfig = ({
  _itemKey,
  itemCaption,
  dataSource,
  dfTitle,
  linkItem
}) => ({
  id: _itemKey,
  key: _itemKey,
  item: { ...linkItem },
  linkFn: 'DF',
  itemCaption,
  dataSource: joinByColon(dataSource, dfTitle)
});

const _crInfo = ({
  itemCaption
}) => ({
  name: itemCaption
});

export const crData = (
  json
) => json.Results.series[0].data.reduce((_data, p) => {
  const {
    year,
    period='',
    value
  } = p
  , _m = parseIntBy10((''+period).replace('M',''));
  if (isTypeNumber(_m) && _m>0 && _m<13) {
    _data.push({
       x: ymdToUTC(`${year}-${_m}`),
       y: parseFloat(value)
    });
  }
  return _data;
}, []).reverse();

export const crConfOption = (
  option
) => ({
  zhConfig: _crZhConfig(option),
  info: _crInfo(option)
})
