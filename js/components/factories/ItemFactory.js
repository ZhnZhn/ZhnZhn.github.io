'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _createAreaChartItem = function _createAreaChartItem(config, index, option, props) {
  var zhConfig = config.zhConfig,
      id = zhConfig.id,
      key = zhConfig.key,
      chartType = option.chartType;

  return _react2.default.createElement(_AreaChartItem2.default, (0, _extends3.default)({
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


  return _react2.default.createElement(_MapChartItem2.default, (0, _extends3.default)({
    ref: 'chart' + index,
    key: key,
    chartType: chartType,
    caption: id,
    config: config
  }, props));
};

var _rCreateItem = (0, _defineProperty3.default)({
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
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\factories\ItemFactory.js.map