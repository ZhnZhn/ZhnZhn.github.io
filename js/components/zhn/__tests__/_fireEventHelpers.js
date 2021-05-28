"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = require("@testing-library/react");

describe('_fireEventHelpers', function () {
  test('', function () {
    return expect('').toBe('');
  });
});
var fireEventHelpers = {
  fireClick: function fireClick(el) {
    return _react.fireEvent.click(el);
  },
  fireChange: function fireChange(input, value) {
    return _react.fireEvent.change(input, {
      target: {
        value: value
      }
    });
  },
  fireKeyDownEnter: function fireKeyDownEnter(input) {
    return _react.fireEvent.keyDown(input, {
      key: 'Enter',
      keyCode: 13
    });
  },
  fireKeyDownDelete: function fireKeyDownDelete(input) {
    return _react.fireEvent.keyDown(input, {
      key: 'Delete',
      keyCode: 46
    });
  }
};
var _default = fireEventHelpers;
exports["default"] = _default;
//# sourceMappingURL=_fireEventHelpers.js.map