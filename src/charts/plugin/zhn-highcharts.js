import ComponentActions from '../../flux/actions/ComponentActions';
import { ModalDialog } from '../../constants/Type';

const _getExtremes = (v1, v2) => {
  return v1 >= v2
    ? { min: v2, max: v1 }
    : { min: v1, max: v2 };
};

const HighchartsZhn = (Highcharts) => {
  const Chart = Highcharts.Chart;
  Highcharts.wrap(Chart.prototype, 'showCredits', function (next, credits) {
     next.call(this, credits);
     if (credits.enabled) {
       this.credits.element.onclick = function(){
         var link = document.createElement('a');
         link.rel = "noopener noreferrer";
         link.target = credits.targer;
         link.href = credits.href;
         link.click();
       }
     }
  });

  Highcharts.wrap(Chart.prototype, 'exportChartLocal', function (fn, ...args) {
     if (args.length === 0) {
       ComponentActions.showModalDialog(ModalDialog.CUSTOMIZE_EXPORT, { fn: fn, chart: this });
     } else {
       fn.apply(this, args);
     }
  });

  Highcharts.wrap(Chart.prototype, 'zhRemoveCategory', function(fn, id) {
    const _c = this.xAxis[0].categories;
    if (_c) {
      const _newC = _c.filter(str => str !== id)
          , _newData = this.options.series[0].data.filter(p => p.c !== id && p.name !== id && p.id !== id)
      if (_newC.length < _c.length) {
        if (typeof this.yAxis[0].min !== 'undefined') {
          const _len = _newData.length
              , { min, max } = _getExtremes(_newData[0].y, _newData[_len-1].y)
          this.yAxis[0].setExtremes(min, max, false)
        }
        this.xAxis[0].setCategories(_newC, false)
        this.series[0].update({data: _newData}, true)
      }
   }
  })
};

export default HighchartsZhn
