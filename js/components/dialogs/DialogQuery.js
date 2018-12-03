'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _dec2, _class;
//import PropTypes from "prop-types";

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DialogCell = require('./DialogCell');

var _DialogCell2 = _interopRequireDefault(_DialogCell);

var _MenuMore = require('./MenuMore');

var _MenuMore2 = _interopRequireDefault(_MenuMore);

var _Decorators = require('./decorators/Decorators');

var _Decorators2 = _interopRequireDefault(_Decorators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ERR_MSG = 'Empty or Id format is not valid';

var _testId = function _testId(value) {
  if (typeof value !== 'string' || !value) {
    return false;
  } else if (value.split('/').length !== 3) {
    return false;
  }
  return true;
};

var DialogQuery = (_dec = _Decorators2.default.withToolbar, _dec2 = _Decorators2.default.withLoad, _dec(_class = _dec2(_class = function (_Component) {
  (0, _inherits3.default)(DialogQuery, _Component);

  function DialogQuery(props) {
    (0, _classCallCheck3.default)(this, DialogQuery);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DialogQuery.__proto__ || Object.getPrototypeOf(DialogQuery)).call(this, props));

    _this._handleLoad = function () {
      if (_this._idInput && _this._idInput.isValid()) {
        var _this$props = _this.props,
            onLoad = _this$props.onLoad,
            loadFn = _this$props.loadFn;

        onLoad(loadFn(_this.props, {
          one: {
            value: _this._idInput.getValue(),
            caption: "seriaId"
          }
        }));
      }
    };

    _this._refIdInput = function (c) {
      return _this._idInput = c;
    };

    _this._refDates = function (c) {
      return _this.datesFragment = c;
    };

    _this._menuMore = (0, _MenuMore2.default)(_this, {
      toggleToolBar: _this._toggleWithToolbar,
      onAbout: _this._clickInfoWithToolbar
    });
    var noDate = props.noDate;

    _this.toolbarButtons = _this._createType2WithToolbar(props, { noDate: noDate });
    _this._commandButtons = _this._crCommandsWithLoad(_this);

    _this.state = {
      isToolbar: true,
      isShowLabels: true,
      isShowDate: true
    };
    return _this;
  }

  (0, _createClass3.default)(DialogQuery, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (this.props !== nextProps) {
        if (this.props.isShow === nextProps.isShow) {
          return false;
        }
      }
      return true;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          caption = _props.caption,
          isShow = _props.isShow,
          onShow = _props.onShow,
          onFront = _props.onFront,
          onClose = _props.onClose,
          oneCaption = _props.oneCaption,
          onePlaceholder = _props.onePlaceholder,
          noDate = _props.noDate,
          initFromDate = _props.initFromDate,
          initToDate = _props.initToDate,
          msgOnNotValidFormat = _props.msgOnNotValidFormat,
          onTestDate = _props.onTestDate,
          _state = this.state,
          isToolbar = _state.isToolbar,
          isShowLabels = _state.isShowLabels,
          isShowDate = _state.isShowDate;

      return _react2.default.createElement(
        _DialogCell2.default.DraggableDialog,
        {
          isShow: isShow,
          menuModel: this._menuMore,
          caption: caption,
          commandButtons: this._commandButtons,
          onShowChart: onShow,
          onFront: onFront,
          onClose: onClose
        },
        _react2.default.createElement(_DialogCell2.default.Toolbar, {
          isShow: isToolbar,
          buttons: this.toolbarButtons
        }),
        _react2.default.createElement(_DialogCell2.default.RowPattern, {
          ref: this._refIdInput,
          isShow: isShow,
          isShowLabels: isShowLabels,
          placeholder: onePlaceholder,
          title: oneCaption,
          onTest: _testId,
          errorMsg: ERR_MSG
        }),
        !noDate && _react2.default.createElement(
          _DialogCell2.default.ShowHide,
          { isShow: isShowDate },
          _react2.default.createElement(_DialogCell2.default.DatesFragment, {
            ref: this._refDates,
            isShowLabels: isShowLabels,
            initFromDate: initFromDate,
            initToDate: initToDate,
            msgOnNotValidFormat: msgOnNotValidFormat,
            onTestDate: onTestDate
          })
        )
      );
    }
  }]);
  return DialogQuery;
}(_react.Component)) || _class) || _class);
exports.default = DialogQuery;
//# sourceMappingURL=DialogQuery.js.map