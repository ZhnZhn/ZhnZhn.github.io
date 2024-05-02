"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crDimUrlEs = _interopRequireDefault(require("./crDimUrlEs"));
const _crDimUrl = _ref => {
  let {
    proxy = '',
    baseMeta,
    dfId
  } = _ref;
  return "" + proxy + baseMeta + "/" + dfId;
};
const _crDimUrlFso = _ref2 => {
  let {
    proxy = '',
    baseMeta,
    dfId
  } = _ref2;
  return "" + proxy + baseMeta + "/" + dfId + "/" + dfId + ".px";
};
const _rCrDimUrl = {
  DF: _crDimUrl,
  EU_STAT: _crDimUrlEs.default,
  FSO: _crDimUrlFso
};
const _crUrl = props => (_rCrDimUrl[props.loadId] || _rCrDimUrl.DF)(props);
const crDimUrl = props => props.dimUrl || _crUrl(props);
var _default = exports.default = crDimUrl;
//# sourceMappingURL=crDimUrl.js.map