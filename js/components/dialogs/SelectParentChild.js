'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _WithLoadOptions = require('./WithLoadOptions');

var _WithLoadOptions2 = _interopRequireDefault(_WithLoadOptions);

var _RowInputSelect = require('./RowInputSelect');

var _RowInputSelect2 = _interopRequireDefault(_RowInputSelect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultChildOptions = [];

var SelectParentChild = _react2.default.createClass(_extends({
  displayName: 'SelectParentChild'
}, _WithLoadOptions2.default, {
  getDefaultProps: function getDefaultProps() {
    return {
      msgOnNotSelected: function msgOnNotSelected(item) {
        return item + ' is not selected';
      }
    };
  },
  getInitialState: function getInitialState() {
    this.parent = null;
    this.child = null;
    return {
      parentOptions: [],
      isLoading: false,
      isLoadingFailed: false,

      childOptions: []
    };
  },
  componentDidMount: function componentDidMount() {
    this._handlerLoadParentOptions();
  },
  componetWillUnmount: function componetWillUnmount() {
    this._unmountWithLoadOptions();
  },
  _handlerLoadParentOptions: function _handlerLoadParentOptions() {
    var _props = this.props;
    var uri = _props.uri;
    var parentJsonProp = _props.parentJsonProp;

    this._handlerWithLoadOptions('parentOptions', 'isLoading', 'isLoadingFailed', uri, parentJsonProp);
  },
  _handlerSelectParent: function _handlerSelectParent(parent) {
    this.parent = parent;
    if (parent) {
      if (parent.columns) {
        this.child = null;
        this.setState({ childOptions: parent.columns });
      } else {
        this.child = null;
        this.setState({ childOptions: defaultChildOptions });
      }
    } else {
      this.child = null;
      this.setState({ childOptions: [] });
    }
  },
  _handlerSelectChild: function _handlerSelectChild(child) {
    this.child = child;
  },
  render: function render() {
    var _props2 = this.props;
    var parentCaption = _props2.parentCaption;
    var parentOptionNames = _props2.parentOptionNames;
    var childCaption = _props2.childCaption;
    var _state = this.state;
    var parentOptions = _state.parentOptions;
    var isLoading = _state.isLoading;
    var isLoadingFailed = _state.isLoadingFailed;
    var childOptions = _state.childOptions;

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
  },
  getValidation: function getValidation() {
    var msg = [];
    var _props3 = this.props;
    var parentCaption = _props3.parentCaption;
    var childCaption = _props3.childCaption;
    var msgOnNotSelected = _props3.msgOnNotSelected;

    if (!this.parent) {
      msg.push(msgOnNotSelected(parentCaption));
    }
    if (!this.child) {
      msg.push(msgOnNotSelected(childCaption));
    }

    if (msg.length > 0) {
      return { isValid: false, msg: msg };
    }
    return { isValid: true };
  },
  getValues: function getValues() {
    return {
      parent: this.parent,
      child: this.child
    };
  }
}));

exports.default = SelectParentChild;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\dialogs\SelectParentChild.js.map