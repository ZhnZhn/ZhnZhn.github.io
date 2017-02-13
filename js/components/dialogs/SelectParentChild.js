'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _RowInputSelect = require('./RowInputSelect');

var _RowInputSelect2 = _interopRequireDefault(_RowInputSelect);

var _withLoadOptions = require('./decorators/withLoadOptions');

var _withLoadOptions2 = _interopRequireDefault(_withLoadOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultChildOptions = [];

var SelectParentChild = (0, _withLoadOptions2.default)(_class = (_temp = _class2 = function (_Component) {
  _inherits(SelectParentChild, _Component);

  function SelectParentChild(props) {
    _classCallCheck(this, SelectParentChild);

    var _this = _possibleConstructorReturn(this, (SelectParentChild.__proto__ || Object.getPrototypeOf(SelectParentChild)).call(this));

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

    _this._handlerSelectParent = function (parent) {
      _this.parent = parent;
      if (parent) {
        if (parent.columns) {
          _this.child = null;
          _this.setState({ childOptions: parent.columns });
        } else {
          _this.child = null;
          _this.setState({ childOptions: defaultChildOptions });
        }
      } else {
        _this.child = null;
        _this.setState({ childOptions: [] });
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

  _createClass(SelectParentChild, [{
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
          caption: parentCaption,
          options: parentOptions,
          optionNames: parentOptionNames,
          isLoading: isLoading,
          isLoadingFailed: isLoadingFailed,
          onLoadOption: this._handlerLoadParentOptions,
          onSelect: this._handlerSelectParent
        }),
        _react2.default.createElement(_RowInputSelect2.default, {
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
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\dialogs\SelectParentChild.js.map