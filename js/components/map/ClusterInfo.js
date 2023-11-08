"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useToggle = _interopRequireDefault(require("../hooks/useToggle"));
var _fUseKey = require("../hooks/fUseKey");
var _ShowHide = _interopRequireDefault(require("../zhn/ShowHide"));
var _SparklinesLazy = _interopRequireDefault(require("../zhn-lazy/SparklinesLazy"));
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from 'prop-types'

const {
  SparkView,
  Line,
  Spot,
  MaxLabel,
  MinLabel
} = _SparklinesLazy.default;
const COLOR_MAX = "#8bc34a";
const COLOR_MIN = "#f44336";
const COLOR_EQUAL = 'black';
const SPOT_COLORS = {
  '-1': COLOR_MIN,
  '0': COLOR_EQUAL,
  '1': COLOR_MAX
};
const S_CAPTION = {
    position: 'relative',
    padding: 3,
    marginBottom: 5,
    lineHeight: 1.8,
    opacity: 0.7
  },
  S_CAPTION_BT = {
    position: 'absolute',
    top: 4,
    right: 8,
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  S_ITEM = {
    padding: 3,
    cursor: 'pointer'
  },
  S_ITEM_TITLE = {
    display: 'inline-block',
    width: 30
  },
  S_ITEM_VALUE = {
    display: 'inline-block',
    float: 'right'
  };
const Caption = _ref => {
  let {
    color,
    from,
    to,
    onClick
  } = _ref;
  const _hKeyDown = (0, _fUseKey.useKeyEnter)(onClick);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
    style: {
      ...S_CAPTION,
      ...{
        background: color
      }
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
      children: [from, "\xA0\u2013\xA0", to]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      tabIndex: "0",
      role: "button",
      style: S_CAPTION_BT,
      onClick: onClick,
      onKeyDown: _hKeyDown,
      children: "*"
    })]
  });
};
const Item = _ref2 => {
  let {
    title,
    value,
    status,
    onClick
  } = _ref2;
  const _hKeyDown = (0, _fUseKey.useKeyEnter)(onClick),
    _value = status ? `${value} (${status})` : value;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    tabIndex: "0",
    role: "button",
    style: S_ITEM,
    onClick: onClick,
    onKeyDown: _hKeyDown,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: S_ITEM_TITLE,
      children: title
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: S_ITEM_VALUE,
      children: _value
    })]
  });
};
const ClusterItem = _ref3 => {
  let {
    point,
    color,
    index,
    isShowRange
  } = _ref3;
  const _refData = (0, _uiApi.useRef)(point.seria.data || []),
    _refPointIndex = (0, _uiApi.useRef)(_refData.current.length - 1),
    [isShowChart, toggleIsShowChart] = (0, _useToggle.default)(index < 3);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(Item, {
      title: point.id,
      value: point[0],
      status: point.status,
      onClick: toggleIsShowChart
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ShowHide.default, {
      isShow: isShowChart,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(SparkView, {
        height: 32,
        width: 140,
        svgHeight: 32,
        svgWidth: 140,
        data: _refData.current,
        margin: 3
        //marginLeft={20}
        ,
        children: [isShowRange ? /*#__PURE__*/(0, _jsxRuntime.jsx)(MaxLabel, {
          color: COLOR_MAX,
          fontSize: 14
        }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {}), isShowRange ? /*#__PURE__*/(0, _jsxRuntime.jsx)(MinLabel, {
          color: COLOR_MIN,
          fontSize: 14
        }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(Line, {
          color: color
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Spot, {
          pointIndex: _refPointIndex.current,
          size: 3,
          spotColors: SPOT_COLORS
        })]
      })
    })]
  });
};

/*
 ClusterItem.propTypes = {
  point: PropTypes.shape({
    0: PropTypes.number,
    id: PropTypes.string,
    status: PropTypes.string,
    seria: PropTypes.shape({
      data: PropTypes.array
    })
  }),
  color: PropTypes.string,
  index: PropTypes.number,
  isShowRange: PropTypes.bool
}
*/

const Cluster = _ref4 => {
  let {
    cluster,
    color,
    isShowRange
  } = _ref4;
  const points = cluster.points || [];
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    children: points.map((point, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(ClusterItem, {
      point,
      color,
      index,
      isShowRange
    }, point.id))
  });
};
/*
Cluster.propTypes = {
  cluster: PropTypes.shape({
    points: PropTypes.arrayOf(
        PropTypes.shape({
           id: PropTypes.string
    }))
  }),
  color: PropTypes.string
}
*/

const ClusterInfo = _ref5 => {
  let {
    cluster,
    color,
    from,
    to
  } = _ref5;
  const [isShowRange, onClick] = (0, _useToggle.default)(false);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(Caption, {
      color,
      from,
      to,
      onClick
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Cluster, {
      cluster,
      color,
      isShowRange
    })]
  });
};

/*
ClusterInfo.propTypes = {
  cluster: PropTypes.object,
  color: PropTypes.string,
  from: PropTypes.string,
  to: PropTypes.string
}
*/
var _default = exports.default = ClusterInfo;
//# sourceMappingURL=ClusterInfo.js.map