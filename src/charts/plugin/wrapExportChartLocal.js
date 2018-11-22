import {
  showCustomizeExportDialog
} from '../../flux/actions/AppAction';

const wrapExportChartLocal = (wrap, Chart) => {
  wrap(Chart.prototype, 'exportChartLocal', function (fn, ...args) {
     if (args.length === 0) {
       showCustomizeExportDialog({ fn: fn, chart: this });
     } else {
       fn.apply(this, args);
     }
  })
};

export default wrapExportChartLocal
