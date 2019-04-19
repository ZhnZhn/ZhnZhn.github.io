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

var _class, _class2, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _RowInputSelect = require('./RowInputSelect');

var _RowInputSelect2 = _interopRequireDefault(_RowInputSelect);

var _ShowHide = require('../../zhn/ShowHide');

var _ShowHide2 = _interopRequireDefault(_ShowHide);

var _withLoadOptions = require('../decorators/withLoadOptions');

var _withLoadOptions2 = _interopRequireDefault(_withLoadOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var SelectOneTwo = (0, _withLoadOptions2.default)(_class = (_temp = _class2 = function (_Component) {
  (0, _inherits3.default)(SelectOneTwo, _Component);

  function SelectOneTwo(props) {
    (0, _classCallCheck3.default)(this, SelectOneTwo);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SelectOneTwo.__proto__ || Object.getPrototypeOf(SelectOneTwo)).call(this, props));

    _this.state = {
      isLoading: false,
      isLoadingFailed: false,
      oneOptions: [],
      twoOptions: []
    };

    _this._loadOptions = function () {
      var _this$props = _this.props,
          uri = _this$props.uri,
          oneJsonProp = _this$props.oneJsonProp;

      _this._handlerWithLoadOptions('oneOptions', 'isLoading', 'isLoadingFailed', uri, oneJsonProp);
    };

    _this._setTwoOptions = function () {
      var twoOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      _this.two = null;
      _this.setState({ twoOptions: twoOptions });
    };

    _this._hSelectOne = function (one) {
      var onSelectOne = _this.props.onSelectOne;

      _this.one = one;
      if (one) {
        if (one.columns) {
          _this._setTwoOptions(one.columns);
        } else if (!_this._isDfColumns) {
          _this._setTwoOptions();
        }
      } else if (!_this._isDfColumns) {
        _this._setTwoOptions();
      }
      if (_isFn(onSelectOne)) {
        onSelectOne(one);
      }
    };

    _this._hSelectTwo = function (two) {
      _this.two = two;
    };

    _this.one = null;
    _this.two = null;
    return _this;
  }

  (0, _createClass3.default)(SelectOneTwo, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._loadOptions();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevProps !== this.props) {
        if (this.state.isLoadingFailed && this.props.isShow) {
          this._loadOptions();
        }
      }
    }
  }, {
    key: 'componetWillUnmount',
    value: function componetWillUnmount() {
      this._unmountWithLoadOptions();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          isShowLabels = _props.isShowLabels,
          oneCaption = _props.oneCaption,
          oneOptionNames = _props.oneOptionNames,
          isHideTwo = _props.isHideTwo,
          twoCaption = _props.twoCaption,
          _state = this.state,
          isLoading = _state.isLoading,
          isLoadingFailed = _state.isLoadingFailed,
          oneOptions = _state.oneOptions,
          twoOptions = _state.twoOptions;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_RowInputSelect2.default, {
          isShowLabels: isShowLabels,
          caption: oneCaption,
          options: oneOptions,
          optionNames: oneOptionNames,
          isLoading: isLoading,
          isLoadingFailed: isLoadingFailed,
          onLoadOption: this._loadOptions,
          onSelect: this._hSelectOne
        }),
        _react2.default.createElement(
          _ShowHide2.default,
          { isShow: !isHideTwo },
          _react2.default.createElement(_RowInputSelect2.default, {
            isShowLabels: isShowLabels,
            caption: twoCaption,
            options: twoOptions,
            onSelect: this._hSelectTwo
          })
        )
      );
    }
  }, {
    key: 'getValidation',
    value: function getValidation() {
      var msg = [],
          _props2 = this.props,
          oneCaption = _props2.oneCaption,
          twoCaption = _props2.twoCaption,
          msgOnNotSelected = _props2.msgOnNotSelected;

      if (!this.one) {
        msg.push(msgOnNotSelected(oneCaption));
      }
      if (!this.two) {
        msg.push(msgOnNotSelected(twoCaption));
      }

      if (msg.length > 0) {
        return { isValid: false, msg: msg };
      }
      return { isValid: true };
    }
  }, {
    key: 'getValues',
    value: function getValues() {
      return {
        one: this.one,
        two: this.two
      };
    }
  }]);
  return SelectOneTwo;
}(_react.Component), _class2.defaultProps = {
  isShow: true,
  isHideTwo: false,
  oneOptionNames: 'Items',
  msgOnNotSelected: function msgOnNotSelected(item) {
    return item + ' is not selected';
  }
}, _temp)) || _class;

exports.default = SelectOneTwo;
//# sourceMappingURL=SelectOneTwo.js.map