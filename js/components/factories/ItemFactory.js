'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ComponentActions = require('../../flux/actions/ComponentActions');

var _ComponentActions2 = _interopRequireDefault(_ComponentActions);

var _Type = require('../../constants/Type');

var _AreaChartItem = require('../items/AreaChartItem');

var _AreaChartItem2 = _interopRequireDefault(_AreaChartItem);

var _MapChartItem = require('../items/MapChartItem');

var _MapChartItem2 = _interopRequireDefault(_MapChartItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _createAreaChartItem = function _createAreaChartItem(config, index, option, props) {
  var zhConfig = config.zhConfig,
      id = zhConfig.id,
      key = zhConfig.key,
      chartType = option.chartType;

  return _react2.default.createElement(_AreaChartItem2.default, _extends({
    ref: 'chart' + index,
    key: key,
    chartType: chartType,
    caption: id,
    config: config,
    onSetActive: _ComponentActions2.default.setActiveCheckbox,
    onAddToWatch: _ComponentActions2.default.showModalDialog.bind(null, _Type.ModalDialog.ADD_TO_WATCH)
  }, props));
};

var _createMapChartItem = function _createMapChartItem(config, index, option, props) {
  var zhConfig = config.zhConfig,
      id = zhConfig.id,
      key = zhConfig.key,
      chartType = option.chartType;


  return _react2.default.createElement(_MapChartItem2.default, _extends({
    ref: 'chart' + index,
    key: key,
    chartType: chartType,
    caption: id,
    config: config
  }, props));
};

var _rCreateItem = _defineProperty({
  DEFAULT: _createAreaChartItem

}, _Type.CompItemType.EUROSTAT_MAP, _createMapChartItem);

var ItemFactory = {
  createItem: function createItem(config, index, option, props) {
    var zhCompType = config.zhCompType,
        _fnCreate = zhCompType && _rCreateItem[zhCompType] ? _rCreateItem[zhCompType] : _rCreateItem.DEFAULT;


    return _fnCreate(config, index, option, props);
  }
};

exports.default = ItemFactory;
//# sourceMappingURL=ItemFactory.js.map