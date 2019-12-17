"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _eurostat = _interopRequireDefault(require("../creaters/eurostat"));

var _eurostat2 = _interopRequireDefault(require("../creaters/eurostat2"));

var _eurostat3 = _interopRequireDefault(require("../creaters/eurostat3"));

var _selectN = _interopRequireDefault(require("../creaters/selectN"));

var _eurostatN = _interopRequireDefault(require("../creaters/eurostatN"));

var _type = _interopRequireDefault(require("../creaters/type3"));

var _type2 = _interopRequireDefault(require("../creaters/type4"));

var _type3 = _interopRequireDefault(require("../creaters/type5"));

var _un = _interopRequireDefault(require("../creaters/un5"));

var _futures = _interopRequireDefault(require("../creaters/futures3"));

var _futuresWiki = _interopRequireDefault(require("../creaters/futuresWiki"));

var _bigMac = _interopRequireDefault(require("../creaters/bigMac"));

var noopFn = function noopFn() {};

var _r = {
  BigMac: _bigMac["default"],
  DEFAULT: _type["default"],
  DialogType3: _type["default"],
  DialogType4: _type2["default"],
  DialogType4A: _type2["default"],
  DialogType5: _type3["default"],
  DialogQuery: _type["default"],
  DialogType5A: _type3["default"],
  Futures3Dialog: _futures["default"],
  FuturesWikiDialog: _futuresWiki["default"],
  DialogEurostat: _eurostat["default"],
  DialogEurostat2: _eurostat2["default"],
  DialogEurostat3: _eurostat3["default"],
  DialogEurostat3A: _eurostat3["default"],
  DialogSelectN: _selectN["default"],
  DialogStatN: _eurostatN["default"],
  UnDialog5: _un["default"]
};
var RouterLoadFn = {
  getFn: function getFn(loadFnType, dialogType) {
    if (loadFnType) {
      if (_r[loadFnType]) {
        return _r[loadFnType];
      } else {
        return noopFn;
      }
    } else if (dialogType && _r[dialogType]) {
      return _r[dialogType];
    } else {
      return _r.DEFAULT;
    }
  }
};
var _default = RouterLoadFn;
exports["default"] = _default;
//# sourceMappingURL=RouterLoadFn.js.map