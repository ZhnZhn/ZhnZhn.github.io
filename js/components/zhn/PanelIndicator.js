'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ShowHide = require('./ShowHide');

var _ShowHide2 = _interopRequireDefault(_ShowHide);

var _InputText = require('./InputText');

var _InputText2 = _interopRequireDefault(_InputText);

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
    display: 'inline-block',
    color: 'black',
    fontWeight: 'bold',
    width: '48px'
  }
};

var PanelIndicator = _react2.default.createClass({
  displayName: 'PanelIndicator',
  getInitialState: function getInitialState() {
    return {
      descr: [],
      mfiDescrs: []
    };
  },
  _checkIfAlreadyAdded: function _checkIfAlreadyAdded(arrObj, id) {
    var result = arrObj.find(function (obj) {
      return obj.id === id;
    });
    if (result === undefined) {
      return false;
    } else {
      return true;
    }
  },
  _handlerAddSma: function _handlerAddSma() {
    var value = this.refs.inputSMA.getValue();
    var descr = this.state.descr;
    var _id = 'SMA(' + value + ')';

    if (!this._checkIfAlreadyAdded(descr, _id)) {
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
  _handlerRemoveMfi: function _handlerRemoveMfi(id) {
    this.props.onRemoveMfi(id);
    this.state.mfiDescrs = this.state.mfiDescrs.filter(function (descr) {
      return descr.id !== id;
    });
    this.setState({ mfiDescrs: this.state.mfiDescrs });
  },
  _handlerAddMfi: function _handlerAddMfi() {
    var mfiDescrs = this.state.mfiDescrs;
    var _value = this.refs.inputMfi.getValue();
    var _id = 'MFI(' + _value + ')';

    if (!this._checkIfAlreadyAdded(mfiDescrs, _id)) {
      this.props.onAddMfi(_value, _id);
      mfiDescrs.push({
        id: _id,
        color: 'green'
      });
      this.setState({ mfiDescrs: mfiDescrs });
    }
  },
  _renderIndicators: function _renderIndicators() {
    var _this = this;

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
  _renderMfi: function _renderMfi() {
    var _this2 = this;

    var _descr = this.state.mfiDescrs.map(function (descr, index) {
      var id = descr.id;
      var color = descr.color;

      return _react2.default.createElement(
        'div',
        { key: id, style: { paddingTop: '5px' } },
        _react2.default.createElement(_SvgMinus2.default, {
          onClick: _this2._handlerRemoveMfi.bind(null, id)
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
    var _props = this.props;
    var isShow = _props.isShow;
    var isMfi = _props.isMfi;


    var _mfiDom = isMfi ? _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        { style: { paddingTop: '5px' } },
        _react2.default.createElement(
          'span',
          { style: styles.captionSpan },
          'MFI'
        ),
        _react2.default.createElement(_InputText2.default, {
          ref: 'inputMfi',
          initValue: '14'
        }),
        _react2.default.createElement(_SvgPlus2.default, { onClick: this._handlerAddMfi })
      ),
      this._renderMfi()
    ) : undefined;

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
        _react2.default.createElement(_InputText2.default, {
          ref: 'inputSMA',
          initValue: '50'
        }),
        _react2.default.createElement(_SvgPlus2.default, { onClick: this._handlerAddSma })
      ),
      this._renderIndicators(),
      _mfiDom
    );
  }
});

exports.default = PanelIndicator;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn\PanelIndicator.js.map