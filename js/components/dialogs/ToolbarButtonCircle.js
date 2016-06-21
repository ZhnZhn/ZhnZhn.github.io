'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Row = require('./Row');

var _Row2 = _interopRequireDefault(_Row);

var _ButtonCircle = require('../zhn/ButtonCircle');

var _ButtonCircle2 = _interopRequireDefault(_ButtonCircle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Styles = {
  ROW: {
    paddingTop: '4px',
    paddingBottom: '8px'
  },
  BUTTON_CIRCLE: {
    marginLeft: '20px'
  }
};

var ToolbarButtonCircle = _react2.default.createClass({
  displayName: 'ToolbarButtonCircle',
  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.buttons === this.props.buttons) {
      return false;
    }
    return true;
  },
  _renderButtons: function _renderButtons() {
    var buttons = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

    return buttons.map(function (button, index) {
      var caption = button.caption;
      var onClick = button.onClick;

      return _react2.default.createElement(_ButtonCircle2.default, {
        key: caption + index,
        caption: caption,
        style: Styles.BUTTON_CIRCLE,
        onClick: onClick
      });
    });
  },
  render: function render() {
    var buttons = this.props.buttons;

    return _react2.default.createElement(
      _Row2.default,
      { style: Styles.ROW },
      this._renderButtons(buttons)
    );
  }
});

exports.default = ToolbarButtonCircle;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\dialogs\ToolbarButtonCircle.js.map