import Highcharts from 'highcharts';
import { bindTo } from '../utils/bindTo';

export const formatDate = Highcharts.dateFormat

const DMY_FORMAT_CONFIG = '%A, %b %d, %Y'
, TDMY_FORMAT_CONFIG = '%H:%M, %A, %b %d, %Y'
, TD_FORMAT_CONFIG = '%H:%M:%S %d-%m-%Y';

export const toDmy = bindTo(formatDate, DMY_FORMAT_CONFIG)
export const toTdmy = bindTo(formatDate, TDMY_FORMAT_CONFIG)
export const toTdmyIf = mls => formatDate('%H:%M', mls) === '00:00'
  ? toDmy(mls)
  : toTdmy(mls)
export const toTd = bindTo(formatDate, TD_FORMAT_CONFIG)
