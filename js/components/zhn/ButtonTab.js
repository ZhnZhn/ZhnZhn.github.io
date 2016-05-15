'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ButtonTab = _react2.default.createClass({
  displayName: 'ButtonTab',
  getInitialState: function getInitialState() {
    return {
      isShow: this.props.isShow
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.isShow !== this.state.isShow) {
      this.setState({ isShow: nextProps.isShow });
    }
  },
  _handlerClick: function _handlerClick() {
    this.props.onClick();
    this.setState({ isShow: !this.state.isShow });
  },
  render: function render() {
    var _props = this.props;
    var caption = _props.caption;
    var style = _props.style;

    var _rootClass = this.state.isShow ? 'button-tab button-tab--show not-selected' : 'button-tab not-selected';
    return _react2.default.createElement(
      'div',
      {
        className: _rootClass,
        style: Object.assign({}, style),
        onClick: this._handlerClick
      },
      caption
    );
  }
});

exports.default = ButtonTab;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn\ButtonTab.js.map