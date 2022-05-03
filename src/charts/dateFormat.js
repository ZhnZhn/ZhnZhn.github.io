import Highcharts from 'highcharts';

const format = Highcharts.dateFormat
, DMY_FORMAT = '%A, %b %d, %Y'
, TDMY_FORMAT = '%H:%M, %A, %b %d, %Y'
, TD_FORMAT = '%H:%M:%S %d-%m-%Y';

export const formatDate = format
export const toDmy = format.bind(null, DMY_FORMAT)
export const toTdmy = format.bind(null, TDMY_FORMAT)
export const toTdmyIf = mls => format('%H:%M', mls) === '00:00'
  ? toDmy(mls)
  : toTdmy(mls)
export const toTd = format.bind(null, TD_FORMAT)
