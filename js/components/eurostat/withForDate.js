'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getDateWithForDate = function _getDateWithForDate() {
  if (this.date && this.date.value) {
    return this.date.value;
  }
  var _state = this.state,
      dateOptions = _state.dateOptions,
      dateDefault = _state.dateDefault;

  return Array.isArray(dateOptions) && dateOptions.length !== 0 ? dateDefault : '';
};

var withForDate = function withForDate(target) {
  Object.assign(target.prototype, {
    _getDateWithForDate: _getDateWithForDate
  });
};

exports.default = withForDate;
//# sourceMappingURL=withForDate.js.map