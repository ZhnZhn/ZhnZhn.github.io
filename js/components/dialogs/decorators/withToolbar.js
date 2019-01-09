'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _addBtTo = function _addBtTo(arr, caption, title, onClick, compInst) {
  arr.push({
    caption: caption, title: title,
    onClick: onClick.bind(compInst)
  });
};

var _createType2WithToolbar = function _createType2WithToolbar(props) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      noDate = _ref.noDate,
      noLabels = _ref.noLabels,
      isOptions = _ref.isOptions;

  var buttons = [];

  if (typeof props.onClickInfo === 'function') {
    _addBtTo(buttons, 'I', 'Click to show description about data source', this._clickInfoWithToolbar, this);
  }
  if (!noLabels) {
    _addBtTo(buttons, 'L', "Click to toggle row's labels", this._clickLabelWithToolbar, this);
  }
  if (!props.noDate && !noDate) {
    _addBtTo(buttons, 'D', 'Click to toggle date input', this._clickDateWithToolbar, this);
  }
  if (isOptions) {
    this._hideOptionsWithToolbar = this._hideOptionsWithToolbar.bind(this);
    _addBtTo(buttons, 'O', 'Click to show options', this._showOptionsWithToolbar, this);
    this.dialogOptions = {};
    this._toggleOptionWithToolbar = this._toggleOptionWithToolbar.bind(this);
  }

  return buttons;
};

var _toggleWithToolbar = function _toggleWithToolbar() {
  this.setState(function (prevState) {
    return {
      isToolbar: !prevState.isToolbar
    };
  });
};

var _clickInfoWithToolbar = function _clickInfoWithToolbar() {
  var _props = this.props,
      descrUrl = _props.descrUrl,
      onClickInfo = _props.onClickInfo;

  onClickInfo({ descrUrl: descrUrl });
};
var _clickLabelWithToolbar = function _clickLabelWithToolbar() {
  this.setState(function (prevState) {
    return {
      isShowLabels: !prevState.isShowLabels
    };
  });
};
var _clickDateWithToolbar = function _clickDateWithToolbar() {
  this.setState(function (prevState) {
    return {
      isShowDate: !prevState.isShowDate
    };
  });
};

var _showOptionsWithToolbar = function _showOptionsWithToolbar() {
  this.setState({ isOptions: true });
};
var _hideOptionsWithToolbar = function _hideOptionsWithToolbar() {
  this.setState({ isOptions: false });
};
var _toggleOptionWithToolbar = function _toggleOptionWithToolbar(propName) {
  this.dialogOptions[propName] = !this.dialogOptions[propName];
};

var withToolbar = function withToolbar(target) {
  Object.assign(target.prototype, {
    _toggleWithToolbar: _toggleWithToolbar,
    _createType2WithToolbar: _createType2WithToolbar,
    _clickInfoWithToolbar: _clickInfoWithToolbar,
    _clickLabelWithToolbar: _clickLabelWithToolbar,
    _clickDateWithToolbar: _clickDateWithToolbar,
    _showOptionsWithToolbar: _showOptionsWithToolbar,
    _hideOptionsWithToolbar: _hideOptionsWithToolbar,
    _toggleOptionWithToolbar: _toggleOptionWithToolbar
  });
};

exports.default = withToolbar;
//# sourceMappingURL=withToolbar.js.map