
import CA from '../../flux/actions/ComponentActions';

const wrapExportChartLocal = (wrap, Chart) => {
  wrap(Chart.prototype, 'exportChartLocal', function (fn, ...args) {
     if (args.length === 0) {
       CA.showCustomizeExport({ fn: fn, chart: this });
     } else {
       fn.apply(this, args);
     }
  })
};

export default wrapExportChartLocal
