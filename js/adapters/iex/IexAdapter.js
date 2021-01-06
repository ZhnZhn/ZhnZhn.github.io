"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _crAdapterRouter = _interopRequireDefault(require("../crAdapterRouter"));

var _TemplateScatter = _interopRequireDefault(require("./TemplateScatter"));

var _TemplateTokens = _interopRequireDefault(require("./TemplateTokens"));

var _toCompanyImpl = _interopRequireDefault(require("./toCompanyImpl"));

var _toStatsImpl = _interopRequireDefault(require("./toStatsImpl"));

var _toEarningsImpl = _interopRequireDefault(require("./toEarningsImpl"));

var _toDividendsImpl = _interopRequireDefault(require("./toDividendsImpl"));

var _toChart = _interopRequireDefault(require("./toChart"));

var _toTable = _interopRequireDefault(require("./toTable"));

var _ItemTypes = _interopRequireDefault(require("./ItemTypes"));

var _rAdapter2;

var _rAdapter = (_rAdapter2 = {
  _pn: 'dfType',
  DF: _toChart["default"]
}, _rAdapter2[_ItemTypes["default"].ERN] = (0, _TemplateScatter["default"])(_toEarningsImpl["default"]), _rAdapter2[_ItemTypes["default"].DIV] = (0, _TemplateScatter["default"])(_toDividendsImpl["default"]), _rAdapter2[_ItemTypes["default"].CHART] = _toChart["default"], _rAdapter2[_ItemTypes["default"].COM] = (0, _TemplateTokens["default"])(_toCompanyImpl["default"]), _rAdapter2[_ItemTypes["default"].STA] = (0, _TemplateTokens["default"])(_toStatsImpl["default"]), _rAdapter2[_ItemTypes["default"].ML] = _toTable["default"], _rAdapter2),
    IexAdapter = (0, _crAdapterRouter["default"])(_rAdapter, {
  crDfKey: function crDfKey(_ref) {
    var _itemKey = _ref._itemKey,
        _ref$one = _ref.one,
        one = _ref$one === void 0 ? '' : _ref$one,
        _ref$two = _ref.two,
        two = _ref$two === void 0 ? '' : _ref$two;
    return _itemKey || one + '_' + two;
  }
});

var _default = IexAdapter;
exports["default"] = _default;
//# sourceMappingURL=IexAdapter.js.map