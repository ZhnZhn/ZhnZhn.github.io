"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _ShowHide = _interopRequireDefault(require("../zhn/ShowHide"));
var _HighchartWrapper = _interopRequireDefault(require("../zhn/HighchartWrapper"));
var _jsxRuntime = require("react/jsx-runtime");
const MiniCharts = _ref => {
  let {
    withoutAnimation,
    configs,
    idPropName = 'id',
    absComp,
    onLoaded,
    onWillUnLoaded
  } = _ref;
  return (0, _uiApi.safeMap)(configs, item => /*#__PURE__*/(0, _jsxRuntime.jsx)(_ShowHide.default, {
    isShow: true,
    withoutAnimation: withoutAnimation,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_HighchartWrapper.default, {
      config: item.config,
      absComp: absComp,
      onLoaded: onLoaded,
      onWillUnLoaded: onWillUnLoaded
    })
  }, item[idPropName]));
};

/*
MiniCharts.propTypes = {
  withoutAnimation: PropTypes.bool,
  configs: PropTypes.arrayOf(
    PropTypes.shape({
      config: PropTypes.object
  })),
  idPropName: PropTypes.string,
  absComp: PropTypes.node,
  onLoaded: PropTypes.func,
  onWillUnLoaded: PropTypes.func
}
*/
var _default = exports.default = MiniCharts;
//# sourceMappingURL=MiniCharts.js.map