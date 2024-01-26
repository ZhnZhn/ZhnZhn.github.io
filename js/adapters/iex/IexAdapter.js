"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crAdapterRouter = require("../crAdapterRouter");
var _TemplateScatter = _interopRequireDefault(require("./TemplateScatter"));
var _TemplateTokens = _interopRequireDefault(require("./TemplateTokens"));
var _toCompanyImpl = _interopRequireDefault(require("./toCompanyImpl"));
var _toStatsImpl = _interopRequireDefault(require("./toStatsImpl"));
var _toDividendsImpl = _interopRequireDefault(require("./toDividendsImpl"));
var _toChart = _interopRequireDefault(require("./toChart"));
var _toTable = _interopRequireDefault(require("./toTable"));
var _ItemTypes = _interopRequireDefault(require("./ItemTypes"));
const _rAdapter = {
    _pn: 'dfType',
    DF: _toChart.default,
    [_ItemTypes.default.DIV]: (0, _TemplateScatter.default)(_toDividendsImpl.default),
    [_ItemTypes.default.CHART]: _toChart.default,
    [_ItemTypes.default.COM]: (0, _TemplateTokens.default)(_toCompanyImpl.default),
    [_ItemTypes.default.STA]: (0, _TemplateTokens.default)(_toStatsImpl.default),
    [_ItemTypes.default.ML]: _toTable.default
  },
  IexAdapter = (0, _crAdapterRouter.crAdapterRouter)(_rAdapter, {
    crDfKey: _ref => {
      let {
        _itemKey,
        one = '',
        two = ''
      } = _ref;
      return _itemKey || one + '_' + two;
    }
  });
var _default = exports.default = IexAdapter;
//# sourceMappingURL=IexAdapter.js.map