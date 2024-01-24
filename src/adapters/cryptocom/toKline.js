import {
  crOptionsFromStr,
  fToKline
} from '../fToKline';

const toKline = fToKline({
  ...crOptionsFromStr(false),
  d: 't',
  o: 'o',
  h: 'h',
  l: 'l',
  c: 'c',
  v: 'v'
});

export default toKline
