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

var _withLoadOptions = require('./decorators/withLoadOptions');

var _withLoadOptions2 = _interopRequireDefault(_withLoadOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//const defaultChildOptions = [];


var SelectParentChild = (0, _withLoadOptions2.default)(_class = (_temp = _class2 = function (_Component) {
  (0, _inherits3.default)(SelectParentChild, _Component);

  function SelectParentChild(props) {
    (0, _classCallCheck3.default)(this, SelectParentChild);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SelectParentChild.__proto__ || Object.getPrototypeOf(SelectParentChild)).call(this));

    _this.state = {
      parentOptions: [],
      isLoading: false,
      isLoadingFailed: false,
      childOptions: []
    };

    _this._handlerLoadParentOptions = function () {
      var _this$props = _this.props,
          uri = _this$props.uri,
          parentJsonProp = _this$props.parentJsonProp;

      _this._handlerWithLoadOptions('parentOptions', 'isLoading', 'isLoadingFailed', uri, parentJsonProp);
    };

    _this._setChildOptions = function () {
      var childOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      _this.child = null;
      _this.setState({ childOptions: childOptions });
    };

    _this._handlerSelectParent = function (parent) {
      var onSelectParent = _this.props.onSelectParent;

      _this.parent = parent;
      if (parent) {
        if (parent.columns) {
          _this._setChildOptions(parent.columns);
          /*
          this.child = null;
          this.setState({ childOptions: parent.columns });
          */
        } else if (!_this._isDfColumns) {
          _this._setChildOptions();
          /*
          this.child = null;
          this.setState({ childOptions : defaultChildOptions });
          */
        }
      } else if (!_this._isDfColumns) {
        _this._setChildOptions();
        /*
        this.child = null;
        this.setState({ childOptions: [] });
        */
      }
      if (typeof onSelectParent === 'function') {
        onSelectParent(parent);
      }
    };

    _this._handlerSelectChild = function (child) {
      _this.child = child;
    };

    _this.getValidation = function () {
      var msg = [],
          _this$props2 = _this.props,
          parentCaption = _this$props2.parentCaption,
          childCaption = _this$props2.childCaption,
          msgOnNotSelected = _this$props2.msgOnNotSelected;

      if (!_this.parent) {
        msg.push(msgOnNotSelected(parentCaption));
      }
      if (!_this.child) {
        msg.push(msgOnNotSelected(childCaption));
      }

      if (msg.length > 0) {
        return { isValid: false, msg: msg };
      }
      return { isValid: true };
    };

    _this.getValues = function () {
      return {
        parent: _this.parent,
        child: _this.child
      };
    };

    _this.parent = null;
    _this.child = null;
    return _this;
  }

  (0, _createClass3.default)(SelectParentChild, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._handlerLoadParentOptions();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevProps !== this.props) {
        if (this.state.isLoadingFailed && this.props.isShow) {
          this._handlerLoadParentOptions();
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
          parentCaption = _props.parentCaption,
          parentOptionNames = _props.parentOptionNames,
          childCaption = _props.childCaption,
          _state = this.state,
          parentOptions = _state.parentOptions,
          isLoading = _state.isLoading,
          isLoadingFailed = _state.isLoadingFailed,
          childOptions = _state.childOptions;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_RowInputSelect2.default, {
          isShowLabels: isShowLabels,
          caption: parentCaption,
          options: parentOptions,
          optionNames: parentOptionNames,
          isLoading: isLoading,
          isLoadingFailed: isLoadingFailed,
          onLoadOption: this._handlerLoadParentOptions,
          onSelect: this._handlerSelectParent
        }),
        _react2.default.createElement(_RowInputSelect2.default, {
          isShowLabels: isShowLabels,
          caption: childCaption,
          options: childOptions,
          onSelect: this._handlerSelectChild
        })
      );
    }
  }]);
  return SelectParentChild;
}(_react.Component), _class2.defaultProps = {
  isShow: true,
  msgOnNotSelected: function msgOnNotSelected(item) {
    return item + ' is not selected';
  }
}, _temp)) || _class;

exports.default = SelectParentChild;
//# sourceMappingURL=SelectParentChild.js.map