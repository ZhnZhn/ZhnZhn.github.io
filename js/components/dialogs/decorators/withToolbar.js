'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _createType2WithToolbar = function _createType2WithToolbar(props, withoutDate) {
  var toolbarButtons = [];

  if (typeof props.onClickInfo === 'function') {
    toolbarButtons.push({
      caption: 'I', title: 'Information About Dataset',
      onClick: this._clickInfoWithToolbar.bind(this) });
  }
  if (!withoutDate) {
    toolbarButtons.push({
      caption: 'D', title: 'Toggle Date Input',
      onClick: this._clickDateWithToolbar.bind(this)
    });
  }

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
  var _proto = target.prototype;
  _proto._createType2WithToolbar = _createType2WithToolbar;
  _proto._clickInfoWithToolbar = _clickInfoWithToolbar;
  _proto._clickDateWithToolbar = _clickDateWithToolbar;
};

exports.default = withToolbar;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\dialogs\decorators\withToolbar.js.map