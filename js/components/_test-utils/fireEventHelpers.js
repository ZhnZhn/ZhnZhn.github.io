"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("@testing-library/react");

var _userEvent = _interopRequireDefault(require("@testing-library/user-event"));

const fireEventHelpers = {
  fireClick: el => _react.fireEvent.click(el),
  fireChange: (input, value) => _react.fireEvent.change(input, {
    target: {
      value
    }
  }),
  fireType: (input, value) => _userEvent.default.type(input, value),
  fireKeyDownEnter: input => _react.fireEvent.keyDown(input, {
    key: 'Enter',
    keyCode: 13
  }),
  fireKeyDownDelete: input => _react.fireEvent.keyDown(input, {
    key: 'Delete',
    keyCode: 46
  })
};
var _default = fireEventHelpers;
exports.default = _default;
//# sourceMappingURL=fireEventHelpers.js.map