"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _ChartActions = require("../../flux/actions/ChartActions");
var _ComponentActions = require("../../flux/actions/ComponentActions");
var _withTheme = _interopRequireDefault(require("../hoc/withTheme"));
var _has = require("../has");
var _crCn = _interopRequireDefault(require("../zhn-utils/crCn"));
var _crModelMore = _interopRequireDefault(require("./crModelMore"));
var _Comp = _interopRequireDefault(require("../Comp"));
var _ModalCompareTo = _interopRequireDefault(require("./ModalCompareTo"));
var _ChartList = _interopRequireDefault(require("./ChartList"));
var _jsxRuntime = require("react/jsx-runtime");
const TH_ID = 'CHART_CONTAINER';
const CL_ROOT = "item-container",
  CL_SCROLL = 'scroll-container-y scroll-items',
  CL_SHOW_CONT = "show-cont",
  CL_MENU_MORE = "popup-menu charts__menu-more",
  CHILD_MARGIN = 36,
  INITIAL_WIDTH = 635,
  MIN_WIDTH_WITH_TAB_MINI = 470,
  MIN_WIDTH = 365,
  MAX_WIDTH = 1200,
  STEP = 10,
  S_BR_CAPTION = {
    paddingTop: 2,
    paddingLeft: 2
  },
  S_SVG_MORE = {
    position: 'relative',
    top: 2
  },
  S_CAPTION = {
    position: 'relative',
    top: -1
  },
  S_INLINE = {
    display: 'inline-block'
  },
  S_NONE = {
    display: 'none'
  };
const CHAT_ACTIONS = [_ChartActions.CHAT_SHOW, _ChartActions.CHAT_LOAD_COMPLETED, _ChartActions.CHAT_CLOSE];
const _isFn = fn => typeof fn === "function";
const _isInArray = function (arr, value) {
  if (arr === void 0) {
    arr = [];
  }
  return Boolean(~arr.indexOf(value));
};
const _crItemRefPropName = index => 'chart' + index;
const _isContWidth = contWidth => contWidth && contWidth <= INITIAL_WIDTH;
const _crFnByNameArgs = function (ref, methodName) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }
  return () => {
    const _comp = ref.current;
    if (_comp) {
      _comp[methodName](...args);
    }
  };
};
const _isDataForContainer = (data, chartType) => data === chartType || data && data.chartType === chartType;
class ChartContainer extends _uiApi.Component {
  constructor(_props) {
    super(_props);
    this._initWidthProperties = props => {
      const {
        contWidth
      } = props;
      this._initialWidthStyle = _isContWidth(contWidth) ? {
        width: contWidth
      } : (0, _has.initWidthStyle)(INITIAL_WIDTH, MIN_WIDTH);
      this._INITIAL_WIDTH = this._initialWidthStyle.width;
      this._MIN_WIDTH = this._INITIAL_WIDTH > MIN_WIDTH_WITH_TAB_MINI ? MIN_WIDTH_WITH_TAB_MINI : MIN_WIDTH;
    };
    this._initHandlers = props => {
      const {
          onSortBy,
          onRemoveAll
        } = this.props,
        _refResize = this._refResize;
      this._HANDLERS = {
        onMinWidth: _crFnByNameArgs(_refResize, 'toWidth', this._MIN_WIDTH, true),
        onInitWidth: _crFnByNameArgs(_refResize, 'toWidth', this._INITIAL_WIDTH, true),
        onPlusWidth: _crFnByNameArgs(_refResize, 'resizeBy', STEP),
        onMinusWidth: _crFnByNameArgs(_refResize, 'resizeBy', -STEP),
        onFit: this._fitToWidth,
        onShowCaptions: this._onShowCaptions,
        onSortBy,
        onRemoveAll,
        onCompareTo: this._onCompareTo
      };
    };
    this._onStore = (actionType, data) => {
      const {
        chartType
      } = this.props;
      if (_isDataForContainer(data, chartType)) {
        if (_isInArray(CHAT_ACTIONS, actionType)) {
          if (actionType !== _ChartActions.CHAT_CLOSE) {
            this._refSpComp.current.scrollTop = 0;
            //this.spComp.scrollTop()
          }

          this.setState(data);
        } else if (actionType === _ComponentActions.CAT_CLOSE_CHART_CONTAINER_2) {
          this._hHide();
        }
      }
    };
    this._toggleChb = (isCheck, checkBox) => {
      const {
        chartType,
        browserType,
        onSetActive
      } = this.props;
      checkBox.chartType = chartType;
      checkBox.browserType = browserType;
      onSetActive(isCheck, checkBox);
    };
    this._hHide = () => {
      this.props.onCloseContainer();
      this.setState({
        isShow: false
      });
    };
    this._forEachItem = onItem => {
      const max = this.state.configs.length;
      let i = 0,
        _refItem;
      for (; i < max; i++) {
        _refItem = this[_crItemRefPropName(i)];
        if (_refItem) {
          onItem(_refItem);
        }
      }
      return max;
    };
    this._hResizeAfter = parentWidth => {
      this._forEachItem(refItem => {
        if (_isFn(refItem.reflowChart)) {
          refItem.reflowChart(parentWidth - CHILD_MARGIN);
        }
      });
    };
    this._compareTo = dateTo => {
      const _arrR = [],
        itemLength = this._forEachItem(refItem => {
          if (_isFn(refItem.compareTo)) {
            _arrR.push(refItem.compareTo(dateTo));
          }
        });
      const _r = itemLength - _arrR.filter(Boolean).length;
      if (itemLength > 0 && _r === 0) {
        this.props.updateMovingValues(_arrR);
      }
      return _r;
    };
    this._onShowCaptions = () => {
      this._forEachItem(refItem => {
        if (_isFn(refItem.showCaption)) {
          refItem.showCaption();
        }
      });
    };
    this._showMore = () => {
      this.setState({
        isMore: true
      });
    };
    this._hToggleMore = () => {
      this.setState(prevState => ({
        isMore: !prevState.isMore
      }));
    };
    this._refChart = (index, comp) => this[_crItemRefPropName(index)] = comp;
    this._fitToWidth = () => {
      const {
        width
      } = (0, _uiApi.getRefElementStyle)(this._refRootElement) || {};
      if (width) {
        this._hResizeAfter(parseInt(width, 10));
      }
    };
    this._onCompareTo = () => {
      this.setState({
        isCompareTo: true
      });
    };
    this._closeCompareTo = () => {
      this.setState({
        isCompareTo: false
      });
    };
    this._refRootElement = (0, _uiApi.createRef)();
    this._refSpComp = (0, _uiApi.createRef)();
    this._refResize = (0, _uiApi.createRef)();
    this._initWidthProperties(_props);
    this._initHandlers(_props);
    this._hSetActive = this._toggleChb.bind(this, true);
    this._hSetNotActive = this._toggleChb.bind(this, false);
    this.state = {
      isMore: false,
      isCompareTo: false
    };
  }
  componentDidMount() {
    const {
      store,
      chartType
    } = this.props;
    this.unsubscribe = store.listen(this._onStore);
    const _initialConfigState = store.getConfigs(chartType);
    if (_initialConfigState) {
      this.setState(_initialConfigState);
    }
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    const {
        theme,
        caption,
        chartType,
        browserType,
        onCloseItem,
        store
      } = this.props,
      TS = theme.getStyle(TH_ID),
      _isAdminModeFn = _isFn(store.isAdminMode) ? store.isAdminMode.bind(store) : () => false,
      _isAdminMode = (store.isAdminMode == null ? void 0 : store.isAdminMode()) || false,
      _modelMore = (0, _crModelMore.default)(_isAdminMode, this._HANDLERS),
      {
        isShow,
        isMore,
        isCompareTo,
        configs
      } = this.state,
      _style = isShow ? S_INLINE : S_NONE,
      _className = (0, _crCn.default)(CL_ROOT, [isShow, CL_SHOW_CONT]);
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      ref: this._refRootElement,
      className: _className,
      style: {
        ...this._initialWidthStyle,
        ..._style,
        ...TS.ROOT
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.ModalSlider, {
        isShow: isMore,
        className: CL_MENU_MORE,
        style: TS.EL_BORDER,
        model: _modelMore,
        onClose: this._hToggleMore
      }), _isAdminMode && /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalCompareTo.default, {
        isShow: isCompareTo,
        onClose: this._closeCompareTo,
        onCompareTo: this._compareTo
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.BrowserCaption, {
        style: S_BR_CAPTION,
        onMore: this._showMore,
        onCheck: this._hSetActive,
        onUnCheck: this._hSetNotActive,
        caption: caption,
        captionStyle: S_CAPTION,
        svgMoreStyle: S_SVG_MORE,
        onClose: this._hHide,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.SvgHrzResize, {
          ref: this._refResize,
          initWidth: INITIAL_WIDTH,
          minWidth: this._MIN_WIDTH,
          maxWidth: MAX_WIDTH,
          step: STEP,
          elementRef: this._refRootElement,
          onResizeAfter: this._hResizeAfter
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.ScrollPane, {
        ref: this._refSpComp,
        className: CL_SCROLL,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ChartList.default, {
          refChartFn: this._refChart,
          isAdminMode: _isAdminModeFn,
          configs: configs,
          store: store,
          chartType: chartType,
          browserType: browserType,
          onCloseItem: onCloseItem
        })
      })]
    });
  }
}
ChartContainer.defaultProps = {
  onSetActive: () => {}
};
var _default = (0, _withTheme.default)(ChartContainer);
exports.default = _default;
//# sourceMappingURL=ChartContainer.js.map