"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _ChartActions = require("../../flux/actions/ChartActions");

var _ComponentActions = require("../../flux/actions/ComponentActions");

var _withTheme = _interopRequireDefault(require("../hoc/withTheme"));

var _has = _interopRequireDefault(require("../has"));

var _crCn = _interopRequireDefault(require("../zhn-utils/crCn"));

var _crModelMore = _interopRequireDefault(require("./crModelMore"));

var _Comp = _interopRequireDefault(require("../Comp"));

var _ModalCompareTo = _interopRequireDefault(require("./ModalCompareTo"));

var _ChartList = _interopRequireDefault(require("./ChartList"));

var _jsxRuntime = require("react/jsx-runtime");

const TH_ID = 'CHART_CONTAINER';
const CL_ROOT = "item-container",
      CL_SCROLL = 'scroll-container-y scroll-items',
      CL_SHOW = "show-popup",
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
const COMP_ACTIONS = [_ChartActions.CHAT_SHOW, _ChartActions.CHAT_LOAD_COMPLETED, _ChartActions.CHAT_CLOSE];

const _isFn = fn => typeof fn === "function";

const _isInArray = (arr = [], value) => Boolean(~arr.indexOf(value));

const _crItemRefPropName = index => 'chart' + index;

const _isContWidth = contWidth => contWidth && contWidth <= INITIAL_WIDTH;

const _crFnByNameArgs = (ref, methodName, ...args) => () => {
  const _comp = ref.current;

  if (_comp) {
    _comp[methodName](...args);
  }
};

class ChartContainer extends _react.Component {
  constructor(_props) {
    super(_props);

    this._initWidthProperties = props => {
      const {
        contWidth
      } = props;
      this._initialWidthStyle = _isContWidth(contWidth) ? {
        width: contWidth
      } : _has.default.initWidthStyle(INITIAL_WIDTH, MIN_WIDTH);
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

    this._isDataForContainer = data => {
      const {
        chartType
      } = this.props;
      return data === chartType || data && data.chartType === chartType;
    };

    this._onStore = (actionType, data) => {
      if (this._isDataForContainer(data)) {
        if (_isInArray(COMP_ACTIONS, actionType)) {
          if (actionType !== _ChartActions.CHAT_CLOSE) {
            this._refSpComp.current.scrollTop = 0; //this.spComp.scrollTop()
          }

          this.setState(data);
        } else if (actionType === _ComponentActions.ComponentActionTypes.CLOSE_CHART_CONTAINER_2) {
          this._hHide();
        }
      }
    };

    this._toggleChb = (isCheck, checkBox) => {
      const {
        onSetActive,
        chartType,
        browserType
      } = this.props;
      checkBox.chartType = chartType;
      checkBox.browserType = browserType;
      onSetActive(isCheck, checkBox);
    };

    this._hHide = () => {
      const {
        chartType,
        browserType,
        onCloseContainer
      } = this.props;
      onCloseContainer(chartType, browserType);
      this.setState({
        isShow: false
      });
    };

    this._getItemMax = () => this.state.configs.length;

    this._hResizeAfter = parentWidth => {
      const max = this._getItemMax();

      let i = 0,
          _refItem;

      for (; i < max; i++) {
        _refItem = this[_crItemRefPropName(i)];

        if (_refItem && _isFn(_refItem.reflowChart)) {
          _refItem.reflowChart(parentWidth - this.childMargin);
        }
      }
    };

    this._compareTo = dateTo => {
      const _arrR = [],
            max = this._getItemMax();

      let i = 0,
          _refItem;

      for (; i < max; i++) {
        _refItem = this[_crItemRefPropName(i)];

        if (_refItem && _isFn(_refItem.compareTo)) {
          _arrR.push(_refItem.compareTo(dateTo));
        }
      }

      const _r = max - _arrR.filter(Boolean).length;

      if (max > 0 && _r === 0) {
        this.props.updateMovingValues(_arrR);
      }

      return _r;
    };

    this._onShowCaptions = parentWidth => {
      const max = this._getItemMax();

      let i = 0,
          _refItem;

      for (; i < max; i++) {
        _refItem = this[_crItemRefPropName(i)];

        if (_refItem && _isFn(_refItem.showCaption)) {
          _refItem.showCaption();
        }
      }
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
        style
      } = this._refRootNode.current || {},
            {
        width
      } = style || {};

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

    this._refRootNode = /*#__PURE__*/(0, _react.createRef)();
    this._refSpComp = /*#__PURE__*/(0, _react.createRef)();
    this._refResize = /*#__PURE__*/(0, _react.createRef)();
    this.childMargin = CHILD_MARGIN;

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

    const _initState = store.getConfigs(chartType);

    if (_initState) {
      this.setState(_initState);
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
          _className = (0, _crCn.default)(CL_ROOT, [isShow, CL_SHOW]);

    return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      ref: this._refRootNode,
      className: _className,
      style: { ...this._initialWidthStyle,
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
        onClose: this._hHide,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.SvgHrzResize, {
          ref: this._refResize,
          initWidth: INITIAL_WIDTH,
          minWidth: this._MIN_WIDTH,
          maxWidth: MAX_WIDTH,
          step: STEP,
          nodeRef: this._refRootNode,
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