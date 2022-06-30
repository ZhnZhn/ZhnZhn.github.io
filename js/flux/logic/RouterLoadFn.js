"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _selectN = _interopRequireDefault(require("../creaters/selectN"));

var _statN = _interopRequireDefault(require("../creaters/statN"));

var _type = _interopRequireDefault(require("../creaters/type3"));

var _type2 = _interopRequireDefault(require("../creaters/type4"));

var _type3 = _interopRequireDefault(require("../creaters/type5"));

var _un = _interopRequireDefault(require("../creaters/un5"));

var _futures = _interopRequireDefault(require("../creaters/futures3"));

var _futuresWiki = _interopRequireDefault(require("../creaters/futuresWiki"));

var _bigMac = _interopRequireDefault(require("../creaters/bigMac"));

const noopFn = () => {};

const _r = {
  BigMac: _bigMac.default,
  DF: _type.default,
  DialogType3: _type.default,
  DialogType4: _type2.default,
  DialogType4A: _type2.default,
  DialogType5: _type3.default,
  DialogType5A: _type3.default,
  Futures3Dialog: _futures.default,
  FuturesWikiDialog: _futuresWiki.default,
  DialogSelectN: _selectN.default,
  DialogQuery: _selectN.default,
  DialogStatN: _statN.default,
  UnDialog5: _un.default,
  UnDialogAgg: _un.default
};
const RouterLoadFn = {
  getFn: (loadFnType, dialogType) => loadFnType ? _r[loadFnType] || noopFn : dialogType && _r[dialogType] || _r.DF
};
var _default = RouterLoadFn;
exports.default = _default;
//# sourceMappingURL=RouterLoadFn.js.map