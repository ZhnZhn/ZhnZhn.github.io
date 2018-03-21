'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _rCreateItem2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ChartFn = require('../../charts/ChartFn');

var _ChartFn2 = _interopRequireDefault(_ChartFn);

var _ComponentActions = require('../../flux/actions/ComponentActions');

var _ComponentActions2 = _interopRequireDefault(_ComponentActions);

var _ChartActions = require('../../flux/actions/ChartActions');

var _ChartActions2 = _interopRequireDefault(_ChartActions);

var _Type = require('../../constants/Type');

var _Items = require('../items/Items');

var _Items2 = _interopRequireDefault(_Items);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _crAreaChart = function _crAreaChart(_ref) {
  var store = _ref.store,
      config = _ref.config,
      index = _ref.index,
      option = _ref.option,
      props = _ref.props;

  var _config$zhConfig = config.zhConfig,
      zhConfig = _config$zhConfig === undefined ? {} : _config$zhConfig,
      _zhConfig$id = zhConfig.id,
      id = _zhConfig$id === undefined ? 'Id:' + index : _zhConfig$id,
      key = zhConfig.key,
      _key = key || id,
      chartType = option.chartType;

  return _react2.default.createElement(_Items2.default.AreaChart, (0, _extends3.default)({
    key: _key,
    chartType: chartType,
    caption: id,
    config: config,
    onSetActive: _ComponentActions2.default.setActiveCheckbox,
    onShowConfigDialog: _ComponentActions2.default.showOptionDialog.bind(null, 'ChartConfigDialog'),
    onAddToWatch: _ComponentActions2.default.showModalDialog.bind(null, _Type.ModalDialog.ADD_TO_WATCH)
  }, props, {
    crValueMoving: _ChartFn2.default.crValueMoving,

    onCopy: _ChartActions2.default.copy,
    onPasteToDialog: _ComponentActions2.default.showModalDialog.bind(null, _Type.ModalDialog.PASTE_TO),
    getCopyFromChart: store.getCopyFromChart.bind(store),
    ChartFn: _ChartFn2.default
  }));
};

var _crMapChart = function _crMapChart(_ref2) {
  var store = _ref2.store,
      config = _ref2.config,
      index = _ref2.index,
      option = _ref2.option,
      props = _ref2.props;
  var _config$zhConfig2 = config.zhConfig,
      zhConfig = _config$zhConfig2 === undefined ? {} : _config$zhConfig2,
      _zhConfig$id2 = zhConfig.id,
      id = _zhConfig$id2 === undefined ? 'Id:' + index : _zhConfig$id2,
      _zhConfig$key = zhConfig.key,
      key = _zhConfig$key === undefined ? index : _zhConfig$key,
      chartType = option.chartType;


  return _react2.default.createElement(_Items2.default.MapChart, (0, _extends3.default)({
    key: key,
    chartType: chartType,
    caption: id,
    config: config
  }, props));
};

var _fItem = function _fItem(Comp) {
  return function (_ref3) {
    var store = _ref3.store,
        config = _ref3.config,
        index = _ref3.index,
        option = _ref3.option,
        props = _ref3.props;
    var id = config.id;

    return _react2.default.createElement(Comp, (0, _extends3.default)({
      key: id,
      config: config
    }, props));
  };
};

var _rCreateItem = (_rCreateItem2 = {
  DEFAULT: _crAreaChart
}, (0, _defineProperty3.default)(_rCreateItem2, _Type.CompItemType.EUROSTAT_MAP, _crMapChart), (0, _defineProperty3.default)(_rCreateItem2, _Type.CompItemType.COIN_INFO, _fItem(_Items2.default.CoinInfo)), (0, _defineProperty3.default)(_rCreateItem2, _Type.CompItemType.TABLE, _fItem(_Items2.default.Table)), (0, _defineProperty3.default)(_rCreateItem2, _Type.CompItemType.ALPHA_PERF, _fItem(_Items2.default.AlphaPerf)), _rCreateItem2);

var ItemFactory = {
  createItem: function createItem(_ref4) {
    var store = _ref4.store,
        config = _ref4.config,
        index = _ref4.index,
        option = _ref4.option,
        props = _ref4.props;
    var zhCompType = config.zhCompType,
        _fnCreate = zhCompType && _rCreateItem[zhCompType] ? _rCreateItem[zhCompType] : _rCreateItem.DEFAULT;


    return _fnCreate({ store: store, config: config, index: index, option: option, props: props });
  }
};

exports.default = ItemFactory;
//# sourceMappingURL=ItemFactory.js.map