"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _LogicFn = require("./LogicFn");
var _selectN = _interopRequireDefault(require("../creaters/selectN"));
var _statN = _interopRequireDefault(require("../creaters/statN"));
var _un = _interopRequireDefault(require("../creaters/un5"));
var _futuresWiki = _interopRequireDefault(require("../creaters/futuresWiki"));
const FN_NOOP = () => {};
const _r = {
  DF: _selectN.default,
  FuturesWikiDialog: _futuresWiki.default,
  DialogSelectN: _selectN.default,
  DialogQuery: _selectN.default,
  DialogStatN: _statN.default,
  UnDialog5: _un.default,
  UnDialogAgg: _un.default
};
(0, _LogicFn.clearPrototypeOf)(_r);
const RouterLoadFn = {
  getFn: (loadFnType, dialogType) => loadFnType ? _r[loadFnType] || FN_NOOP : dialogType && _r[dialogType] || _r.DF
};
var _default = exports.default = RouterLoadFn;
//# sourceMappingURL=RouterLoadFn.js.map