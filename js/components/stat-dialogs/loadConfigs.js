"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _LoadGuard = _interopRequireDefault(require("../../utils/LoadGuard"));

var _loadDims = _interopRequireDefault(require("./loadDims"));

var _loadDimsWithOptions = _interopRequireDefault(require("./loadDimsWithOptions"));

const MSG_STILL_LOADING = "Another dialog are still loading";

const _isDimsWithOptions = dims => {
  const _len = dims.length;
  let i = 0;

  for (i; i < _len; i++) {
    if (!dims[i].options) {
      break;
    }
  }

  return i === _len;
};

const _crConfigs = dims => {
  const configs = dims.map(({
    c,
    v,
    options
  }) => ({
    id: v,
    caption: c,
    options
  }));
  configs.dateOptions = dims.dateOptions;
  return configs;
};

const _crUrl = ({
  proxy = '',
  baseMeta,
  dfId
}) => {
  return "" + proxy + baseMeta + "/" + dfId;
};

const _crMetaUrl = props => props.metaUrl || _crUrl(props);

const guard = new _LoadGuard.default();

const loadConfigs = props => {
  if (!guard.isLoading) {
    const metaUrl = _crMetaUrl(props); //Load from dims configuration


    if (props.dims) {
      return (0, _loadDims.default)({
        metaUrl,
        ...props
      });
    }

    guard.start(metaUrl);
    return (0, _loadDimsWithOptions.default)(metaUrl).then(({
      dims,
      mapFrequency,
      timeId
    }) => {
      guard.stop();
      return _isDimsWithOptions(dims) ? {
        timeId,
        mapFrequency,
        configs: _crConfigs(dims)
      } : (0, _loadDims.default)({
        noTime: props.noTime,
        metaUrl,
        dims,
        mapFrequency,
        timeId
      });
    }).catch(({
      errMsg,
      message
    }) => {
      guard.stop();
      return {
        errMsg: errMsg || message
      };
    });
  } else {
    return Promise.resolve({
      errMsg: MSG_STILL_LOADING
    });
  }
};

var _default = loadConfigs;
exports.default = _default;
//# sourceMappingURL=loadConfigs.js.map