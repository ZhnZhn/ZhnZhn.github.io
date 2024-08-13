import {
  isNumber,
  getCaption,
  joinBy,
  ymdToUTC
} from '../AdapterFn';

const _crZhConfig = (
  json,
  {
    dataSource,
    key
  }
) => ({
  id: key,
  key,
  dataSource
});

const _crInfo = (
  { response },
  option
) => ({
  name: joinBy(': ', option.title, option.subtitle),
  description: response.description
   || (response.data[0] || {})["series-description"]
   || ''
});

export const crTitle = ({
  items=[],
  dfTitle
}) => ({
  title: joinBy(': ', getCaption(items[0]), dfTitle),
  subtitle: joinBy(': ', getCaption(items[1]), getCaption(items[2]))
})

const _toNumber = str => {
  const _n = parseFloat(str);
  return isNumber(_n)
    ? _n
    : null;
};

export const getResponseData = (
  json
) => ((json || {}).response || {}).data

export const crData = (
  json,
  { dfData }
) => getResponseData(json).map(item => [
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
