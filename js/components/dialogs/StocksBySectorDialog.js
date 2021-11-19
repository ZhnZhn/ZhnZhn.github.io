"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _ChartActions = _interopRequireWildcard(require("../../flux/actions/ChartActions"));

var _DialogCell = _interopRequireDefault(require("./DialogCell"));

var _ModalDialog = _interopRequireDefault(require("../zhn-moleculs/ModalDialog"));

var _NasdaqLink = _interopRequireDefault(require("../native-links/NasdaqLink"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//import PropTypes from "prop-types";
const S_ROOT_NOT_LABELS = {
  width: 280
},
      S_CAPTION = {
  display: 'inline-block',
  maxWidth: 295
},
      S_LINK_SHOW_HIDE = {
  marginBottom: 10
},
      S_LINK_ROOT = {
  display: 'flex',
  alignItems: 'center',
  margin: '8px 5px 0 5px',
  lineHeight: 1.5,
  fontWeight: 'bold'
},
      S_LINK_CAPTION = {
  color: '#1b75bb',
  display: 'inline-block',
  width: 100,
  paddingRight: 5,
  textAlign: 'right',
  fontSize: '16px'
},
      S_LINK = {
  paddingTop: 0
},
      S_LINK_NOT_LABELS = {
  marginLeft: 8
};
const IEX_SOURCES = [{
  a: '1 Month',
  b: '1m'
}, {
  a: '3 Months',
  b: '3m'
}, {
  a: '6 Months',
  b: '6m'
}, {
  a: '1 Year',
  b: '1y'
}, {
  a: '2 Years',
  b: '2y'
}].map(({
  a,
  b
}) => ({
  caption: 'IEX Cloud: ' + a,
  value: 'IEX',
  dfProps: {
    dfType: 'chart',
    dfPeriod: b
  }
}));
const SOURCE_OPTIONS = [{
  caption: 'Alpha Vantage: Daily (100)',
  value: 'AL',
  dfProps: {
    dfSubId: 'I',
    dfFn: 'TIME_SERIES_DAILY',
    interval: 'Daily',
    outputsize: 'compact'
  }
}, ...IEX_SOURCES];
const DF_SOURCE = SOURCE_OPTIONS[0];

const _isFn = fn => typeof fn === 'function';

const _getItemId = props => ((props.data || {}).item || {}).id;

const _createInitialState = props => ({
  itemId: _getItemId(props),
  isShowLink: false
});

class StocksBySectorDialog extends _react.Component {
  /*
   static propTypes = {
     isShow: PropTypes.bool,
     data: PropTypes.object,
     store: PropTypes.object,
     onClose: PropTypes.func
   }
  */
  constructor(props) {
    super(props);

    this._hClickLabels = () => {
      this.setState(prevState => ({
        isShowLabels: !prevState.isShowLabels
      }));
    };

    this._hClickLink = () => {
      this.setState(prevState => ({
        isShowLink: !prevState.isShowLink
      }));
    };

    this._hShow = () => {
      const {
        data
      } = this.props;

      if (data && _isFn(data.onShow)) {
        data.onShow();
      }
    };

    this._hSelectDataSource = item => {
      this._dataSource = item;
    };

    this._getDataSource = () => this._dataSource || DF_SOURCE;

    this._hLoad = () => {
      const {
        data,
        onClose
      } = this.props,
            {
        item,
        browserType,
        chartContainerType,
        dialogProps
      } = data,
            {
        id,
        text
      } = item || {},
            {
        caption,
        value,
        dfProps
      } = this._getDataSource();

      _ChartActions.default[_ChartActions.CHAT_LOAD]({
        chartType: chartContainerType,
        browserType
      }, {
        title: text,
        value: id,
        item: item,
        loadId: value,
        id: id,
        _itemKey: id + "_" + value,
        linkFn: 'NASDAQ',
        dataSource: caption,
        ...dialogProps,
        ...dfProps
      });

      onClose();
    };

    this.toolbarButtons = [{
      caption: 'L',
      title: 'Click to toggle labels',
      onClick: this._hClickLabels
    }, {
      caption: 'O',
      title: 'Click to toggle options',
      onClick: this._hClickLink
    }];
    this._commandButtons = [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.Button.Load, {
      onClick: this._hLoad
    }, "load"), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.Button.Show, {
      onClick: this._hShow
    }, "show")];
    this.state = { ..._createInitialState(props),
      isShowLabels: true
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (_getItemId(nextProps) !== prevState.itemId) {
      return _createInitialState(nextProps);
    }

    return null;
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props && nextProps.isShow === this.props.isShow) {
      return false;
    }

    return true;
  }

  render() {
    const {
      isShow,
      data,
      onClose
    } = this.props,
          {
      item
    } = data || {},
          {
      text
    } = item || {},
          {
      isShowLabels,
      isShowLink
    } = this.state,
          _style = isShowLabels ? null : S_ROOT_NOT_LABELS,
          _linkStyle = isShowLabels ? S_LINK : { ...S_LINK,
      ...S_LINK_NOT_LABELS
    };

    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ModalDialog.default, {
      caption: text,
      style: _style,
      styleCaption: S_CAPTION,
      isShow: isShow,
      commandButtons: this._commandButtons,
      onClose: onClose,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ToolbarButtonCircle, {
        buttons: this.toolbarButtons
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowInputSelect, {
        isShowLabels: isShowLabels,
        caption: "Source",
        placeholder: DF_SOURCE.caption,
        options: SOURCE_OPTIONS,
        onSelect: this._hSelectDataSource
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ShowHide, {
        isShow: isShowLink,
        style: S_LINK_SHOW_HIDE,
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          style: S_LINK_ROOT,
          children: [isShowLabels && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            style: S_LINK_CAPTION,
            children: "Link:"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_NasdaqLink.default, {
            style: _linkStyle,
            item: item,
            caption: "NASDAQ"
          })]
        })
      })]
    });
  }

}

var _default = StocksBySectorDialog;
exports.default = _default;
//# sourceMappingURL=StocksBySectorDialog.js.map