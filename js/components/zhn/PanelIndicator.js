'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ShowHide = require('./ShowHide');

var _ShowHide2 = _interopRequireDefault(_ShowHide);

var _SvgPlus = require('./SvgPlus');

var _SvgPlus2 = _interopRequireDefault(_SvgPlus);

var _SvgMinus = require('./SvgMinus');

var _SvgMinus2 = _interopRequireDefault(_SvgMinus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  rootDiv: {
    position: 'absolute',
    zIndex: 10,
    top: '55px',
    left: '8px',

    backgroundColor: 'rgb(77, 77, 77)',
    border: '2px solid rgb(35, 47, 59)',
    borderRadius: '5px',
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px 5px',

    padding: '10px',
    paddingTop: '5px',
    paddingBottom: '5px'
  },
  captionSpan: {
    color: 'black',
    fontWeight: 'bold'
  },
  inputText: {
    background: 'transparent none repeat scroll 0 0',
    border: 'medium none',
    outline: 'medium none',
    height: '26px',
    paddingLeft: '5px',
    color: 'green',
    width: '40px',
    fontSize: '16px',
    fontWeight: 'bold',
    backgroundColor: '#E1E1CB',
    marginLeft: '5px',
    marginRight: '5px',
    display: 'inline'
  }
};

var PanelIndicator = _react2.default.createClass({
  displayName: 'PanelIndicator',
  getInitialState: function getInitialState() {
    return {
      value: 50,
      descr: []
    };
  },
  _handlerInputChange: function _handlerInputChange(event) {
    this.setState({ value: event.target.value });
  },
  _handlerAddSma: function _handlerAddSma() {
    var _state = this.state;
    var value = _state.value;
    var descr = _state.descr;
    var _id = 'SMA(' + value + ')';
    var result = descr.find(function (d) {
      return d.id === _id;
    });

    if (result === undefined) {
      var color = this.props.onAddSma(value);
      if (color) {
        descr.push({
          id: _id,
          color: color
        });
        this.setState({ descr: descr });
      }
    }
  },
  _handlerRemoveSerias: function _handlerRemoveSerias(id) {
    if (this.props.onRemoveSeries(id)) {
      this.state.descr = this.state.descr.filter(function (descr) {
        return descr.id !== id;
      });
      this.setState({ descr: this.state.descr });
    }
  },
  _renderIndicators: function _renderIndicators() {
    var _this = this;

    var onRemoveSeries = this.props.onRemoveSeries;

    var _descr = this.state.descr.map(function (descr, index) {
      var id = descr.id;
      var color = descr.color;

      return _react2.default.createElement(
        'div',
        { key: id, style: { paddingTop: '5px' } },
        _react2.default.createElement(_SvgMinus2.default, {
          onClick: _this._handlerRemoveSerias.bind(null, id)
        }),
        _react2.default.createElement(
          'span',
          { style: { color: color, paddingLeft: '8px' } },
          id
        )
      );
    });
    return _react2.default.createElement(
      'div',
      null,
      _descr
    );
  },
  render: function render() {
    var isShow = this.props.isShow;
    var value = this.state.value;

    return _react2.default.createElement(
      _ShowHide2.default,
      { isShow: isShow, style: styles.rootDiv },
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'span',
          { style: styles.captionSpan },
          'SMA'
        ),
        _react2.default.createElement('input', {
          ref: 'inputSMA',
          style: styles.inputText,
          value: value,
          translate: false,
          onChange: this._handlerInputChange
        }),
        _react2.default.createElement(_SvgPlus2.default, { onClick: this._handlerAddSma })
      ),
      this._renderIndicators()
    );
  }
});

exports.default = PanelIndicator;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn\PanelIndicator.js.map