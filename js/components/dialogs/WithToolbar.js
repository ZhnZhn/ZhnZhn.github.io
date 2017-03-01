'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var WithToolbar = {
  _createType2WithToolbar: function _createType2WithToolbar() {
    var toolbarButtons = [];

    if (typeof this.props.onClickInfo === 'function') {
      toolbarButtons.push({ caption: 'I', onClick: this._clickInfoWithToolbar });
    }
    toolbarButtons.push({ caption: 'D', onClick: this._clickDateWithToolbar });

    return toolbarButtons;
  },
  _clickInfoWithToolbar: function _clickInfoWithToolbar() {
    var _props = this.props,
        descrUrl = _props.descrUrl,
        onClickInfo = _props.onClickInfo;

    onClickInfo({ descrUrl: descrUrl });
  },
  _clickDateWithToolbar: function _clickDateWithToolbar() {
    this.setState({ isShowDate: !this.state.isShowDate });
  }
};

exports.default = WithToolbar;
//# sourceMappingURL=WithToolbar.js.map