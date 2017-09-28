'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _Chart = require('./Chart');

var _Chart2 = _interopRequireDefault(_Chart);

var _ChartConfig = require('./ChartConfig');

var _ChartConfig2 = _interopRequireDefault(_ChartConfig);

var _SeriaBuilder = require('./SeriaBuilder');

var _SeriaBuilder2 = _interopRequireDefault(_SeriaBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ConfigBuilder = function ConfigBuilder() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (!(this instanceof ConfigBuilder)) {
    return new ConfigBuilder(config);
  }
  this.config = config;
};

ConfigBuilder.prototype = (0, _extends3.default)({}, _SeriaBuilder2.default, {
  init: function init() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    this.config = config;
    return this;
  },
  initBaseArea: function initBaseArea() {
    this.config = _ChartConfig2.default.fBaseAreaConfig();
    return this;
  },
  addTitle: function addTitle(title) {
    var _to = this.config.title || {};
    this.config.title = Object.assign(_to, _Chart2.default.fTitle({
      text: title,
      y: _Chart2.default.STACKED_TITLE_Y
    }));
    return this;
  },
  addSubtitle: function addSubtitle(subtitle) {
    var _to = this.config.subtitle || {};
    this.config.subtitle = Object.assign(_to, _Chart2.default.fSubtitle({
      text: subtitle,
      y: _Chart2.default.STACKED_SUBTITLE_Y
    }));
    return this;
  },
  addCaption: function addCaption() {
    var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var subtitle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    return this.addTitle(title).addSubtitle(subtitle);
  },
  addTooltip: function addTooltip(tooltip) {
    this.config.tooltip = _Chart2.default.fTooltip(tooltip);
    return this;
  },
  add: function add(propName, option) {
    if (typeof propName === 'string') {
      var _to = this.config[propName];
      if (_to && (typeof _to === 'undefined' ? 'undefined' : (0, _typeof3.default)(_to)) === 'object') {
        Object.assign(this.config[propName], option);
      } else {
        this.config[propName] = option;
      }
    } else if (propName && (typeof propName === 'undefined' ? 'undefined' : (0, _typeof3.default)(propName)) === 'object') {
      Object.assign(this.config, propName);
    }
    return this;
  },
  toConfig: function toConfig() {
    return this.config;
  }
});

exports.default = ConfigBuilder;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\charts\ConfigBuilder.js.map