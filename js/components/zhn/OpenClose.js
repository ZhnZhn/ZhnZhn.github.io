'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  rootDiv: {
    backgroundColor: '#4D4D4D'
  },
  labelCaption: {
    paddingLeft: '4px',
    verticalAlign: 'top',
    color: 'rgba(164, 135, 212, 1)',
    fontFamily: 'Roboto, Arial Unicode MS, Arial, sans-serif',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer'
  },
  itemRow: {
    backgroundColor: '#404040'
  }
};

var OpenClose = _react2.default.createClass({
  displayName: 'OpenClose',

  getInitialState: function getInitialState() {
    var isOpen = this.props.isClose ? false : true;
    return {
      isOpen: isOpen,
      pathOpen: "M 2,14 L 14,14 14,2 2,14",
      fillOpen: "yellow",
      pathClose: "M 2,2 L 14,8 2,14 2,2",
      fillClose: "#4D4D4D"
    };
  },

  _handlerClickOpenClose: function _handlerClickOpenClose() {
    this.state.isOpen = !this.state.isOpen;
    this.setState(this.state);
  },

  render: function render() {

    var pathV = void 0,
        fillV = void 0,
        displayDivStyle = void 0,
        classShow = void 0;
    if (this.state.isOpen) {
      pathV = this.state.pathOpen;
      fillV = this.state.fillOpen;
      displayDivStyle = 'block';
      classShow = 'show-popup';
    } else {
      pathV = this.state.pathClose;
      fillV = this.state.fillClose;
      displayDivStyle = 'none';
      classShow = null;
    }

    return _react2.default.createElement(
      'div',
      { style: styles.rootDiv },
      _react2.default.createElement(
        'div',
        { className: 'not-selected', onClick: this._handlerClickOpenClose },
        _react2.default.createElement(
          'div',
          { style: { width: '16px', height: '16px', display: 'inline-block' } },
          _react2.default.createElement(
            'svg',
            {
              viewBox: '0 0 16 16', width: '100%', height: '100%',
              preserveAspectRatio: 'none', xmlns: 'http://www.w3.org/2000/svg',
              style: { display: 'inline-block' }
            },
            _react2.default.createElement('path', {
              d: pathV,
              fill: fillV,
              strokeWidth: '1', stroke: 'yellow'
            })
          )
        ),
        _react2.default.createElement(
          'span',
          { style: styles.labelCaption },
          this.props.caption
        )
      ),
      _react2.default.createElement(
        'div',
        { className: classShow, style: { display: displayDivStyle } },
        this.props.children
      )
    );
  }
});

exports.default = OpenClose;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn\OpenClose.js.map