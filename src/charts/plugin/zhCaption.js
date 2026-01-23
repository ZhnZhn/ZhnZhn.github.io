import {
  S_INLINE,
  S_NONE,
  getColorBlack
} from '../../components/styleFn';

const _crTextStyle = () => ({
  color: getColorBlack(),
  'font-size': '16px',
  'font-weight': 800
})
, _crChartProps = (
  spacingTop,
  marginTop
) => ({
  spacingTop,
  marginTop
})
, _crConfig = (
  chart,
  isExportingEnable,
  style
) => ({
  chart,
  exporting: { enabled: isExportingEnable },
  subtitle: { style: { ...style }},
  title: { style: { ...style }}
})
, CONFIG_HIDE = _crConfig(
  _crChartProps(0, 18),
  false,
  S_NONE
)
, CONFIG_SHOW = _crConfig(
  _crChartProps(25, 70),
  true,
  S_INLINE
)
, PN_TITLE = 'zhElTitle'
, PN_SUBTITLE = 'zhElSubtitle';

const _renderTextTo = (
  chart,
  objText,
  x,
  y,
  propName
) => {
  const _el = chart[propName];
  if (_el && _el.css) {
    _el.css({ display: 'inline' })
    return;
  }
  const { text } = objText || {};
  if (text) {
    chart[propName] = chart.renderer
      .text(text, x, y)
      .css(_crTextStyle())
      .add()
  }
};
const _hideEl = (
  chart,
  propName
) => {
  const _el = chart[propName];
  if (_el && _el.css) {
    _el.css({...S_NONE})
  }
};

const zhCaption = (Chart) => {
  Chart.prototype.zhHideCaption = function(){
    try {
      const _height = this.chartHeight - 40;
      this.update(CONFIG_HIDE, false)
      this.setSize(null, _height, true)

      const _ = this.options
      _renderTextTo(this, _.title, 40, 70, PN_TITLE)
      _renderTextTo(this, _.subtitle, 40, 90, PN_SUBTITLE)
    } catch(err) {
      console.log(err.msg)
    }
  }

  Chart.prototype.zhShowCaption = function(){
    try {
      const _height = this.chartHeight + 40;
      this.update(CONFIG_SHOW, false)
      this.setSize(null, _height, true)

      _hideEl(this, PN_TITLE)
      _hideEl(this, PN_SUBTITLE)
    } catch(err) {
      console.log(err.msg)
    }
  }
};

export default zhCaption
