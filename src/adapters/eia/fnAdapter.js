import {
  isNumber,
  getCaption,
  ymdToUTC
} from '../AdapterFn';

const _crZhConfig = (
  json,
  option
) => {
  const {
    dataSource,
    key
  } = option;
  return {
    id: key,
    key,
    dataSource
  };
};

const _crInfo = (
  json,
  option
) => ({
  name: option.title + ': ' + option.subtitle,
  description: json.response.description || ''
})


export const crTitle = ({
  items=[],
  dfTitle
}) => {
  const _s1 = getCaption(items[0])
  , _s2 = getCaption(items[1])
  , _s3 = getCaption(items[2])
  , _subtitle = `${_s2}${_s3 ? ':' : ''} ${_s3}`;

  return {
    title: `${_s1}: ${dfTitle}`,
    subtitle: _subtitle
  };
}

const _toNumber = str => {
  const _n = parseFloat(str);
  return isNumber(_n)
    ? _n
    : null;
};

export const crData = (
  json,
  { dfData }
) => json.response.data.map(item => [
  ymdToUTC(item.period),
  _toNumber(item[dfData])
])


export const crConfOption = (
  option,
  json
) => ({
  zhConfig: _crZhConfig(json, option),
  info: _crInfo(json, option)
})
