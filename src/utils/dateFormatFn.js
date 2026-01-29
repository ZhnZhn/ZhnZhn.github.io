import Highcharts from 'highcharts';

import { bindTo } from './bindTo';
import { isNumber } from './isTypeFn';

const formatDate = Highcharts.dateFormat
, WMDY_FORMAT_CONFIG = '%A, %b %d, %Y'
, TDMY_FORMAT_CONFIG = `%H:%M, ${WMDY_FORMAT_CONFIG}`
, DMY_FORMAT_CONFIG = '%d-%m-%Y'
, TD_FORMAT_CONFIG = `%H:%M:%S ${DMY_FORMAT_CONFIG}`;

export const toWmdy = bindTo(formatDate, WMDY_FORMAT_CONFIG)

const toTdmy = bindTo(formatDate, TDMY_FORMAT_CONFIG);
export const toTdmyIf = mls => {
  let _strDate = toTdmy(mls);
  return _strDate.slice(0, 5) === "00:00"
    ? _strDate.slice(7)
    : _strDate;
}

export const toDmy = bindTo(formatDate, DMY_FORMAT_CONFIG)

const toTd = bindTo(formatDate, TD_FORMAT_CONFIG)
export const toTdSafe = (mls) => isNumber(mls)
  ? toTd(mls)
  : ''
