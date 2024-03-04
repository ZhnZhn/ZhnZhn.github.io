import {
  isNumberOrNull,
  ymdToUTC,
} from '../AdapterFn';

const FRED = 'FRED';

const _crId = ({
  one,
  two,
  three='',
  _itemKey
}) => _itemKey
  || (two
       ? `${one}_${two}_${three}`
       : one
    );

const _crLinkItem = ({
  linkFn,
  one,
  dfArticle
}) => {
  return linkFn === FRED ? {
    id: (one || '').replace('$', ''),
    article: dfArticle
  } : one;
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
