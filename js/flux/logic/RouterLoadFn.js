"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.getLoadFn = void 0;
var _crRouter = require("../../utils/crRouter");
var _selectN = _interopRequireDefault(require("../creaters/selectN"));
var _statN = _interopRequireDefault(require("../creaters/statN"));
var _un = _interopRequireDefault(require("../creaters/un5"));
const FN_NOOP = () => {};
const _getLoadFn = (0, _crRouter.crGetRoute)({
  DialogSelectN: _selectN.default,
  DialogQuery: _selectN.default,
  DialogStatN: _statN.default,
  UnDialog5: _un.default,
  UnDialogAgg: _un.default
});
const getLoadFn = (loadFnType, dialogType) => loadFnType ? _getLoadFn(loadFnType) || FN_NOOP : _getLoadFn(dialogType) || _selectN.default;
exports.getLoadFn = getLoadFn;
//# sourceMappingURL=RouterLoadFn.js.map