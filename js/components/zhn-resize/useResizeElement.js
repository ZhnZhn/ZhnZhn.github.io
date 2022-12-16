"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useRefInit = _interopRequireDefault(require("../hooks/useRefInit"));
var _ResizeElementImpl = _interopRequireDefault(require("./ResizeElementImpl"));
const useResizeElement = (props, ref) => {
  const resizeImpl = (0, _useRefInit.default)(() => {
    return new _ResizeElementImpl.default(props);
  });

  /*eslint-disable react-hooks/exhaustive-deps */
  (0, _uiApi.useImperativeHandle)(ref, () => ({
    toWidth: resizeImpl.toWidth,
    resizeBy: resizeImpl.resizeBy
  }), []);
  // resizeImpl.toWidth, resizeImpl.resizeBy

  (0, _uiApi.useEffect)(() => {
    return () => resizeImpl.clearInterval();
  }, []);
  // resizeImpl
  /*eslint-enable react-hooks/exhaustive-deps */

  return [resizeImpl.hStartResizeLeft, resizeImpl.hStartResizeRight, resizeImpl.hStopResize, resizeImpl.hKdLeft, resizeImpl.hKdRight];
};
var _default = useResizeElement;
exports.default = _default;
//# sourceMappingURL=useResizeElement.js.map