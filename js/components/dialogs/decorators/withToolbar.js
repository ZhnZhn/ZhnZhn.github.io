'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _createType2WithToolbar = function _createType2WithToolbar(props) {
  var toolbarButtons = [];

  if (typeof props.onClickInfo === 'function') {
    toolbarButtons.push({ caption: 'I', onClick: this._clickInfoWithToolbar.bind(this) });
  }
  toolbarButtons.push({ caption: 'D', onClick: this._clickDateWithToolbar.bind(this) });

  return toolbarButtons;
};

var _clickInfoWithToolbar = function _clickInfoWithToolbar() {
  var _props = this.props,
      descrUrl = _props.descrUrl,
      onClickInfo = _props.onClickInfo;

  onClickInfo({ descrUrl: descrUrl });
};

var _clickDateWithToolbar = function _clickDateWithToolbar() {
  this.setState({ isShowDate: !this.state.isShowDate });
};

var withToolbar = function withToolbar(target) {
  target.prototype._createType2WithToolbar = _createType2WithToolbar;
  target.prototype._clickInfoWithToolbar = _clickInfoWithToolbar;
  target.prototype._clickDateWithToolbar = _clickDateWithToolbar;
};

exports.default = withToolbar;
//# sourceMappingURL=withToolbar.js.map