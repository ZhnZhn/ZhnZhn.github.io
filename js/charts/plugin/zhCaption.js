"use strict";

exports.__esModule = true;
exports.default = void 0;
var _styleFn = require("../../components/styleFn");
const _crTextStyle = () => ({
    color: (0, _styleFn.getColorBlack)(),
    'font-size': '16px',
    'font-weight': 800
  }),
  S_INLINE = {
    display: 'inline'
  },
  S_NONE = {
    display: 'none'
  },
  CONFIG_HIDE = {
    chart: {
      spacingTop: 0,
      marginTop: 18
    },
    exporting: {
      enabled: false
    },
    subtitle: {
      style: {
        display: 'none'
      }
    },
    title: {
      style: {
        display: 'none'
      }
    }
  },
  CONFIG_SHOW = {
    chart: {
      spacingTop: 25,
      marginTop: 70
    },
    exporting: {
      enabled: true
    },
    subtitle: {
      style: {
        display: 'inline-block'
      }
    },
    title: {
      style: {
        display: 'inline-block'
      }
    }
  },
  PN_TITLE = 'zhElTitle',
  PN_SUBTITLE = 'zhElSubtitle';
const _renderTextTo = (chart, objText, x, y, propName) => {
  const _el = chart[propName];
  if (_el && _el.css) {
    _el.css({
      ...S_INLINE
    });
    return;
  }
  const {
    text
  } = objText || {};
  if (text) {
    chart[propName] = chart.renderer.text(text, x, y).css(_crTextStyle()).add();
  }
};
const _hideEl = (chart, propName) => {
  const _el = chart[propName];
  if (_el && _el.css) {
    _el.css({
      ...S_NONE
    });
  }
};
const zhCaption = Chart => {
  Chart.prototype.zhHideCaption = function () {
    try {
      const _height = this.chartHeight - 40;
      this.update(CONFIG_HIDE, false);
      this.setSize(null, _height, true);
      const _ = this.options;
      _renderTextTo(this, _.title, 40, 70, PN_TITLE);
      _renderTextTo(this, _.subtitle, 40, 90, PN_SUBTITLE);
    } catch (err) {
      console.log(err.msg);
    }
  };
  Chart.prototype.zhShowCaption = function () {
    try {
      const _height = this.chartHeight + 40;
      this.update(CONFIG_SHOW, false);
      this.setSize(null, _height, true);
      _hideEl(this, PN_TITLE);
      _hideEl(this, PN_SUBTITLE);
    } catch (err) {
      console.log(err.msg);
    }
  };
};
var _default = exports.default = zhCaption;
//# sourceMappingURL=zhCaption.js.map