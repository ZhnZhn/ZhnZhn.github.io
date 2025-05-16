"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _uiApi = require("../uiApi");
var _crModelMore = _interopRequireDefault(require("./crModelMore"));
var _forEachInstance = _interopRequireDefault(require("./forEachInstance"));
const CHILD_MARGIN = 36;
const _crFnByNameArgs = function (ref, methodName) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }
  return () => {
    const _compInstance = (0, _uiApi.getRefValue)(ref);
    if (_compInstance) {
      _compInstance[methodName](...args);
    }
  };
};
const _fReflowChartByRef = parentWidth => refItem => {
  if ((0, _isTypeFn.isFn)(refItem.reflowChart)) {
    refItem.reflowChart(parentWidth - CHILD_MARGIN);
  }
};
const _showCaptionByRef = refItem => {
  if ((0, _isTypeFn.isFn)(refItem.showCaption)) {
    refItem.showCaption();
  }
};
const useChartContainerMenuMore = (isAdminMode, props, INITIAL_WIDTH, MIN_WIDTH, STEP, hmCharts, showCompareTo) => {
  const _refRootElement = (0, _uiApi.useRef)(),
    _refResize = (0, _uiApi.useRef)(),
    {
      onSortBy,
      onRemoveAll
    } = props

    /*eslint-disable react-hooks/exhaustive-deps */,
    [_hResizeAfter, _onShowCaptions] = (0, _uiApi.useMemo)(() => [parentWidth => {
      (0, _forEachInstance.default)(hmCharts, _fReflowChartByRef(parentWidth));
    }, () => {
      (0, _forEachInstance.default)(hmCharts, _showCaptionByRef);
    }], [])
    //hmCharts
    /*eslint-enable react-hooks/exhaustive-deps */

    /*eslint-disable react-hooks/exhaustive-deps */,
    _fitToWidth = (0, _uiApi.useMemo)(() => () => {
      const {
        width
      } = (0, _uiApi.getRefElementStyle)(_refRootElement) || {};
      if (width) {
        _hResizeAfter((0, _isTypeFn.parseIntBy10)(width));
      }
    }, [])
    //_hResizeAfter
    /*eslint-enable react-hooks/exhaustive-deps */

    /*eslint-disable react-hooks/exhaustive-deps */,
    _modelMore = (0, _uiApi.useMemo)(() => (0, _crModelMore.default)(isAdminMode, {
      onMinWidth: _crFnByNameArgs(_refResize, 'toWidth', MIN_WIDTH, true),
      onInitWidth: _crFnByNameArgs(_refResize, 'toWidth', INITIAL_WIDTH, true),
      onPlusWidth: _crFnByNameArgs(_refResize, 'resizeBy', STEP),
      onMinusWidth: _crFnByNameArgs(_refResize, 'resizeBy', -STEP),
      onFit: _fitToWidth,
      onShowCaptions: _onShowCaptions,
      onSortBy,
      onRemoveAll,
      onCompareTo: showCompareTo
    }), [isAdminMode]);
  // INITIAL_WIDTH, MIN_WIDTH, STEP, showCompareTo
  // onRemoveAll, onSortBy
  // _fitToWidth, _onShowCaptions
  /*eslint-enable react-hooks/exhaustive-deps */

  return [_refRootElement, _refResize, _modelMore, _hResizeAfter];
};
var _default = exports.default = useChartContainerMenuMore;
//# sourceMappingURL=useChartContainerMenuMore.js.map