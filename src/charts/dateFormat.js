import Highcharts from 'highcharts';

const format = Highcharts.dateFormat
, DMY_FORMAT = '%A, %b %d, %Y'
, TDMY_FORMAT = '%H:%M, %A, %b %d, %Y'
, TD_FORMAT = '%H:%M:%S %d-%m-%Y';

const dateFormat = {
  formatDate: format,
  toDmy: format.bind(null, DMY_FORMAT),
  toTdmy: format.bind(null, TDMY_FORMAT),
  toTdmyIf: mls => format('%H:%M', mls) === '00:00'
    ? dateFormat.toDmy(mls)
    : dateFormat.toTdmy(mls),
  toTd: format.bind(null, TD_FORMAT),
};

export default dateFormat
