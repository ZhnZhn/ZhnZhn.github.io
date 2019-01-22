'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _withSet = require('./withSet');

var _withSet2 = _interopRequireDefault(_withSet);

var _withToggle = require('./withToggle');

var _withToggle2 = _interopRequireDefault(_withToggle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _addBtTo = function _addBtTo(arr, caption, title, onClick, compInst) {
  arr.push({
    caption: caption, title: title,
    onClick: compInst ? onClick.bind(compInst) : onClick
  });
};

var _createType2WithToolbar = function _createType2WithToolbar(props) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      noDate = _ref.noDate,
      noLabels = _ref.noLabels,
      isOptions = _ref.isOptions,
      isToggle = _ref.isToggle;

  var buttons = [],
      _set = this._setStateByWithSet,
      _toggle = this._toggleStateByWithToggle;

  if (typeof props.onClickInfo === 'function') {
    _addBtTo(buttons, 'I', 'Click to show description about data source', this._clickInfoWithToolbar, this);
  }
  if (!noLabels) {
    this._clickLabelWithToolbar = _toggle.bind(this, 'isShowLabels');
    _addBtTo(buttons, 'L', "Click to toggle row's labels", this._clickLabelWithToolbar);
  }
  if (!props.noDate && !noDate) {
    this._clickDateWithToolbar = _toggle.bind(this, 'isShowDate');
    _addBtTo(buttons, 'D', 'Click to toggle date input', this._clickDateWithToolbar);
  }
  if (isOptions) {
    this._hideOptionsWithToolbar = _set.bind(this, 'isOptions', false);
    this._showOptionsWithToolbar = _set.bind(this, 'isOptions', true);
    _addBtTo(buttons, 'O', 'Click to show options', this._showOptionsWithToolbar);
    this.dialogOptions = {};
    this._toggleOptionWithToolbar = this._toggleOptionWithToolbar.bind(this);
  }
  if (isToggle) {
    this._hideToggleWithToolbar = _set.bind(this, 'isToggle', false);
    this._showToggleWithToolbar = _set.bind(this, 'isToggle', true);
    _addBtTo(buttons, 'T', 'Click to show toggle options', this._showToggleWithToolbar);
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

var _toggleOptionWithToolbar = function _toggleOptionWithToolbar(propName) {
  this.dialogOptions[propName] = !this.dialogOptions[propName];
};

var withToolbar = function withToolbar(target) {
  (0, _withSet2.default)(target);
  (0, _withToggle2.default)(target);
  Object.assign(target.prototype, {
    _toggleWithToolbar: _toggleWithToolbar,
    _createType2WithToolbar: _createType2WithToolbar,
    _clickInfoWithToolbar: _clickInfoWithToolbar,
    _toggleOptionWithToolbar: _toggleOptionWithToolbar
  });
};

exports.default = withToolbar;
//# sourceMappingURL=withToolbar.js.map