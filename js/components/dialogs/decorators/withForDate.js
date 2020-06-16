"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _getDateWithForDate = function _getDateWithForDate() {
  if (this.date && this.date.value) {
    return this.date.value;
  }

  var _this$state = this.state,
      dateOptions = _this$state.dateOptions,
      dateDefault = _this$state.dateDefault;
  return Array.isArray(dateOptions) && dateOptions.length !== 0 ? dateDefault : '';
};

var withForDate = function withForDate(target) {
  Object.assign(target.prototype, {
    _getDateWithForDate: _getDateWithForDate
  });
};

var _default = withForDate;
exports["default"] = _default;
//# sourceMappingURL=withForDate.js.map