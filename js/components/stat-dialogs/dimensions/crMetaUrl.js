"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _crEsDimUrl = _interopRequireDefault(require("./crEsDimUrl"));

const _crDimUrl = ({
  proxy = '',
  baseMeta,
  dfId
}) => "" + proxy + baseMeta + "/" + dfId;

const _rCrDimUrl = {
  DF: _crDimUrl,
  EU_STAT: _crEsDimUrl.default
};

const _crUrl = props => (_rCrDimUrl[props.loadId] || _rCrDimUrl.DF)(props);

const crMetaUrl = props => props.metaUrl || _crUrl(props);

var _default = crMetaUrl;
exports.default = _default;
//# sourceMappingURL=crMetaUrl.js.map