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

var _AreaChartItem = require('../items/AreaChartItem');

var _AreaChartItem2 = _interopRequireDefault(_AreaChartItem);

var _MapChartItem = require('../items/MapChartItem');

var _MapChartItem2 = _interopRequireDefault(_MapChartItem);

var _SectorItem = require('../items/SectorItem');

var _SectorItem2 = _interopRequireDefault(_SectorItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _createAreaChartItem = function _createAreaChartItem(_ref) {
  var store = _ref.store,
      config = _ref.config,
      index = _ref.index,
      option = _ref.option,
      props = _ref.props;
  var _config$zhConfig = config.zhConfig,
      zhConfig = _config$zhConfig === undefined ? {} : _config$zhConfig,
      _zhConfig$id = zhConfig.id,
      id = _zhConfig$id === undefined ? 'Id:' + index : _zhConfig$id,
      _zhConfig$key = zhConfig.key,
      key = _zhConfig$key === undefined ? index : _zhConfig$key,
      chartType = option.chartType;

  return _react2.default.createElement(_AreaChartItem2.default, (0, _extends3.default)({
    ref: 'chart' + index,
    key: key,
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

var _createMapChartItem = function _createMapChartItem(_ref2) {
  var store = _ref2.store,
      config = _ref2.config,
      index = _ref2.index,
      option = _ref2.option,
      props = _ref2.props;
  var _config$zhConfig2 = config.zhConfig,
      zhConfig = _config$zhConfig2 === undefined ? {} : _config$zhConfig2,
      _zhConfig$id2 = zhConfig.id,
      id = _zhConfig$id2 === undefined ? 'Id:' + index : _zhConfig$id2,
      _zhConfig$key2 = zhConfig.key,
      key = _zhConfig$key2 === undefined ? index : _zhConfig$key2,
      chartType = option.chartType;


  return _react2.default.createElement(_MapChartItem2.default, (0, _extends3.default)({
    ref: 'chart' + index,
    key: key,
    chartType: chartType,
    caption: id,
    config: config
  }, props));
};

var _crSectorItem = function _crSectorItem(_ref3) {
  var store = _ref3.store,
      config = _ref3.config,
      index = _ref3.index,
      option = _ref3.option,
      props = _ref3.props;

  return _react2.default.createElement(_SectorItem2.default, {
    key: 'key',
    config: config
  });
};

var _rCreateItem = (_rCreateItem2 = {
  DEFAULT: _createAreaChartItem

}, (0, _defineProperty3.default)(_rCreateItem2, _Type.CompItemType.EUROSTAT_MAP, _createMapChartItem), (0, _defineProperty3.default)(_rCreateItem2, 'SECTOR', _crSectorItem), _rCreateItem2);

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
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\factories\ItemFactory.js.map