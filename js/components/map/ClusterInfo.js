"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _ShowHide = _interopRequireDefault(require("../zhn/ShowHide"));

var _Sparklines = _interopRequireDefault(require("../zhn-sparklines/Sparklines"));

var _use = _interopRequireDefault(require("../hooks/use"));

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from 'prop-types'
const {
  SparkView,
  Line,
  Spot,
  MaxLabel,
  MinLabel
} = _Sparklines.default;
const {
  useToggle,
  useKeyEnter
} = _use.default;
const COLOR_MAX = "#8bc34a";
const COLOR_MIN = "#f44336";
const COLOR_EQUAL = 'black';
const SPOT_COLORS = {
  '-1': COLOR_MIN,
  '0': COLOR_EQUAL,
  '1': COLOR_MAX
};
const S = {
  CAPTION: {
    position: 'relative',
    padding: 3,
    marginBottom: 5,
    lineHeight: 1.8,
    opacity: 0.7
  },
  CAPTION_BT: {
    position: 'absolute',
    top: 4,
    right: 8,
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  ITEM_ROOT: {
    padding: 3,
    cursor: 'pointer'
  },
  ITEM_TITLE: {
    display: 'inline-block',
    width: 30
  },
  ITEM_VALUE: {
    display: 'inline-block',
    float: 'right'
  }
};

const Caption = ({
  color,
  from,
  to,
  onClick
}) => {
  const _hKeyDown = useKeyEnter(onClick);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
    style: { ...S.CAPTION,
      ...{
        background: color
      }
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
      children: [from, "\xA0\u2013\xA0", to]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      tabIndex: "0",
      role: "button",
      style: S.CAPTION_BT,
      onClick: onClick,
      onKeyDown: _hKeyDown,
      children: "*"
    })]
  });
};

const Item = ({
  title,
  value,
  status,
  onClick
}) => {
  const _hKeyDown = useKeyEnter(onClick),
        _value = status ? value + " (" + status + ")" : value;

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    tabIndex: "0",
    role: "button",
    style: S.ITEM_ROOT,
    onClick: onClick,
    onKeyDown: _hKeyDown,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: S.ITEM_TITLE,
      children: title
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: S.ITEM_VALUE,
      children: _value
    })]
  });
};

const ClusterItem = ({
  point,
  color,
  index,
  isShowRange
}) => {
  const _refData = (0, _react.useRef)(point.seria.data || []),
        _refPointIndex = (0, _react.useRef)(_refData.current.length - 1),
        [isShowChart, toggleIsShowChart] = useToggle(index < 3);

  const _maxLabel = isShowRange ? /*#__PURE__*/(0, _jsxRuntime.jsx)(MaxLabel, {
    color: COLOR_MAX,
    fontSize: 14
  }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {}),
        _minLabel = isShowRange ? /*#__PURE__*/(0, _jsxRuntime.jsx)(MinLabel, {
    color: COLOR_MIN,
    fontSize: 14
  }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {});

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
        margin: 3 //marginLeft={20}
        ,
        children: [_maxLabel, _minLabel, /*#__PURE__*/(0, _jsxRuntime.jsx)(Line, {
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


const Cluster = ({
  cluster,
  color,
  isShowRange
}) => {
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


const ClusterInfo = ({
  cluster,
  color,
  from,
  to
}) => {
  const [isShowRange, onClick] = useToggle(false);
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


var _default = ClusterInfo;
exports.default = _default;
//# sourceMappingURL=ClusterInfo.js.map