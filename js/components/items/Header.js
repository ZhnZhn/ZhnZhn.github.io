'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _withTheme = require('../hoc/withTheme');

var _withTheme2 = _interopRequireDefault(_withTheme);

var _SvgMore = require('../zhn/SvgMore');

var _SvgMore2 = _interopRequireDefault(_SvgMore);

var _ModalSlider = require('../zhn-modal-slider/ModalSlider');

var _ModalSlider2 = _interopRequireDefault(_ModalSlider);

var _SvgCheckBox = require('../zhn/SvgCheckBox');

var _SvgCheckBox2 = _interopRequireDefault(_SvgCheckBox);

var _SvgClose = require('../zhn/SvgClose');

var _SvgClose2 = _interopRequireDefault(_SvgClose);

var _ValueMovingBadge = require('./ValueMovingBadge');

var _ValueMovingBadge2 = _interopRequireDefault(_ValueMovingBadge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import PropTypes from "prop-types";

var TH_ID = 'ELEMENT';
var CL = 'not-selected shadow-right';

var CL_MORE = "popup-menu charts__menu-more";

var S = {
  ROOT: {
    backgroundColor: '#1b2836',
    paddingTop: '4px',
    paddingRight: '42px',
    height: 'auto',
    width: '100%',
    borderTopRightRadius: '2px',
    borderBottomRightRadius: '2px',
    'box-shadow': '0 5px 11px 0 rgba(0,0,0,0.18), 0 4px 15px 0 rgba(0,0,0,0.15)'
  },
  SVG_MORE: {
    stroke: '#777777',
    fill: '#777777'
  },
  ROOT_MORE: {
    display: 'inline-block'
  },
  CHECK_BOX: {
    //float: 'left',
    marginRight: '10px',
    marginLeft: '10px'
  },
  CAPTION_OPEN: {
    textAlign: 'left',
    display: 'inline-block',
    color: 'rgba(164, 135, 212, 1)',
    cursor: 'pointer',
    width: '125px',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    textOverflow: 'clip',
    overflow: 'hidden'

  },
  CAPTION_CLOSE: {
    color: 'gray'
  },
  CAPTION_WIDTH: {
    textAlign: 'left',
    width: '280px'
  },
  TIME: {
    color: 'rgb(253, 179, 22)',
    fontWeight: 'bold',
    paddingLeft: '16px'
  },
  CLOSE: {
    position: 'absolute',
    right: 0,
    top: '4px'
  }
};

var ItemTime = function ItemTime(_ref) {
  var itemTime = _ref.itemTime;

  if (!itemTime) return null;
  return _react2.default.createElement(
    'span',
    { style: S.TIME },
    itemTime
  );
};

var Header = function (_Component) {
  (0, _inherits3.default)(Header, _Component);

  function Header() {
    var _ref2;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Header);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref2 = Header.__proto__ || Object.getPrototypeOf(Header)).call.apply(_ref2, [this].concat(args))), _this), _this.state = {
      isMore: false
    }, _this._toggleMore = function () {
      _this.setState(function (prevState) {
        return {
          isMore: !prevState.isMore
        };
      });
    }, _this._renderMore = function (moreModel, TS) {
      if (!moreModel) return null;
      var isMore = _this.state.isMore;

      return _react2.default.createElement(
        _react.Fragment,
        null,
        _react2.default.createElement(_SvgMore2.default, {
          svgStyle: S.SVG_MORE,
          onClick: _this._toggleMore
        }),
        _react2.default.createElement(_ModalSlider2.default, {
          isShow: isMore,
          rootStyle: S.ROOT_MORE,
          className: CL_MORE,
          style: TS.BORDER,
          model: moreModel,
          onClose: _this._toggleMore
        })
      );
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Header, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          theme = _props.theme,
          isOpen = _props.isOpen,
          onCheck = _props.onCheck,
          onUnCheck = _props.onUnCheck,
          itemCaption = _props.itemCaption,
          itemTitle = _props.itemTitle,
          itemTime = _props.itemTime,
          onToggle = _props.onToggle,
          valueMoving = _props.valueMoving,
          isAdminMode = _props.isAdminMode,
          crValueMoving = _props.crValueMoving,
          moreModel = _props.moreModel,
          onClose = _props.onClose,
          TS = theme.getStyle(TH_ID),
          _openStyle = isOpen ? S.CAPTION_OPEN : (0, _extends3.default)({}, S.CAPTION_OPEN, S.CAPTION_CLOSE),
          _captionStyle = valueMoving ? _openStyle : (0, _extends3.default)({}, _openStyle, S.CAPTION_WIDTH);

      return _react2.default.createElement(
        'div',
        { style: (0, _extends3.default)({}, S.ROOT, TS.ROOT) },
        this._renderMore(moreModel, TS),
        _react2.default.createElement(_SvgCheckBox2.default, {
          style: S.CHECK_BOX,
          onCheck: onCheck,
          onUnCheck: onUnCheck
        }),
        _react2.default.createElement(
          'button',
          {
            className: CL,
            title: itemTitle,
            style: _captionStyle,
            onClick: onToggle
          },
          itemCaption
        ),
        valueMoving ? _react2.default.createElement(_ValueMovingBadge2.default, {
          valueMoving: valueMoving,
          isAdminMode: isAdminMode,
          crValueMoving: crValueMoving
        }) : _react2.default.createElement(ItemTime, {
          itemType: itemTime
        }),
        _react2.default.createElement(_SvgClose2.default, {
          style: S.CLOSE,
          onClose: onClose
        })
      );
    }
  }]);
  return Header;
}(_react.Component);

/*
Header.propTypes = {
  isOpen : PropTypes.bool.isRequired,
  chartType : PropTypes.string.isRequired,
  moreModel: PropTypes.object,
  onCheck : PropTypes.func.isRequired,
  onUnCheck : PropTypes.func.isRequired,
  itemCaption : PropTypes.string.isRequired,
  itemTitle : PropTypes.string.isRequired,
  itemTime : PropTypes.string,
  onToggle : PropTypes.func.isRequired,
  valueMoving : PropTypes.object,
  isAdminMode: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool
  ]),
  crValueMoving: PropTypes.func,
  onClose : PropTypes.func.isRequired
}
*/

exports.default = (0, _withTheme2.default)(Header);
//# sourceMappingURL=Header.js.map