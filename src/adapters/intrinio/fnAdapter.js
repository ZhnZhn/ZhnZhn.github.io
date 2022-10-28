import {
  isNumberOrNull,
  ymdToUTC,
} from '../AdapterFn';

const FRED = 'FRED';

const _crId = ({
  value,
  two,
  three=''
}) => two
  ? `${value}_${two}_${three}`
  : value;

const _crLinkItem = (
  option
) => {
  const {
    linkFn,
    value
  } = option;
  return linkFn === FRED ? {
    id: (value || '').replace('$', ''),
    article: option.dfArticle
  } : value;
};

const _crZhConfig = (option) => {
  const {
    title='',
    dataSource,
    linkFn
  } = option
  , item = _crLinkItem(option)
  , id = _crId(option);
  return {
    id: id,
    key: id,
    itemCaption: title,
    linkFn,
    item,
    dataSource
  };
};

const _crInfo = ({
  title=''
}) => ({
  name: title
});

export const crSubtitle = ({
  subtitle='',
  threeCaption
}) => threeCaption
  ? `${subtitle}, ${threeCaption}`
  : subtitle

export const crData = (
  json
) => json.data.reduce((_data, p) => {
  const {
    date,
    value
  } = p;
  if (isNumberOrNull(value)) {
    _data.push({
       x: ymdToUTC(date),
       y: value
    });
  }
  return _data;
}, []).reverse()

export const crConfigOption = (
  option
) => ({
  zhConfig: _crZhConfig(option),
  info: _crInfo(option)
})
