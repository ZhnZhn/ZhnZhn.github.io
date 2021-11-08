"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _crDimUrlEs = _interopRequireDefault(require("./crDimUrlEs"));

const _crDimUrl = ({
  proxy = '',
  baseMeta,
  dfId
}) => "" + proxy + baseMeta + "/" + dfId;

const _rCrDimUrl = {
  DF: _crDimUrl,
  EU_STAT: _crDimUrlEs.default
};

const _crUrl = props => (_rCrDimUrl[props.loadId] || _rCrDimUrl.DF)(props);

const crDimUrl = props => props.dimUrl || _crUrl(props);

var _default = crDimUrl;
exports.default = _default;
//# sourceMappingURL=crDimUrl.js.map