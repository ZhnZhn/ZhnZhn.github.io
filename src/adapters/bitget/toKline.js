import {
  crOptionsFromStr,
  fToKline
} from '../fToKline';

const toKline = fToKline({
  ...crOptionsFromStr(false),
  h: '2',
  l: '3',
  c: '4'
});

export default toKline
