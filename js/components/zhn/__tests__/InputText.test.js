"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require("@testing-library/jest-dom");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@testing-library/react");

var _fireEventHelpers = _interopRequireDefault(require("./_fireEventHelpers"));

var _InputText = _interopRequireDefault(require("../InputText"));

var fireChange = _fireEventHelpers["default"].fireChange,
    fireKeyDownEnter = _fireEventHelpers["default"].fireKeyDownEnter,
    fireKeyDownDelete = _fireEventHelpers["default"].fireKeyDownDelete;
describe("InputText", function () {
  var _findInput = function _findInput() {
    return _react2.screen.findByRole('textbox');
  };

  test('should render InputText with event handlers and ref', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var onEnter, onChange, ref, _render, rerender, input, _changeValue;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            onEnter = jest.fn(), onChange = jest.fn(), ref = /*#__PURE__*/_react["default"].createRef(), _render = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_InputText["default"], {
              ref: ref,
              initValue: "abc",
              onChange: onChange,
              onEnter: onEnter
            })), rerender = _render.rerender;
            input = _react2.screen.getByRole('textbox');
            expect(input).toHaveValue('abc'); //2 Test event handlers
            //2.1 KeyDown Delete

            fireKeyDownDelete(input);
            _context.next = 6;
            return _findInput();

          case 6:
            input = _context.sent;
            expect(input).toHaveValue(''); //2.2 onChange

            _changeValue = 'abcd';
            fireChange(input, _changeValue);
            _context.next = 12;
            return _findInput();

          case 12:
            input = _context.sent;
            expect(input).toHaveValue(_changeValue);
            expect(onChange).toHaveBeenCalledTimes(1);
            expect(onChange.mock.calls[0][0]).toBe(_changeValue); //2.3 KeyDown Enter && onEnter

            fireKeyDownEnter(input);
            expect(onEnter).toHaveBeenCalledTimes(1);
            expect(onEnter.mock.calls[0][0]).toBe('abcd'); //3 Test ref implementation interface
            //3.1

            expect(ref.current.getValue()).toBe('abcd'); //3.2

            (0, _react2.act)(function () {
              return ref.current.setValue('a');
            });
            _context.next = 23;
            return _findInput();

          case 23:
            input = _context.sent;
            expect(input).toHaveValue('a'); //3.3

            ref.current.focus();
            expect(input).toHaveFocus(); //4 Test rerender with new initValue without optional handlers

            rerender( /*#__PURE__*/_react["default"].createElement(_InputText["default"], {
              initValue: "abcde"
            }));
            _context.next = 30;
            return _findInput();

          case 30:
            input = _context.sent;
            expect(input).toHaveValue('abcde'); //4.1 KeyDown Enter && onEnter

            fireKeyDownEnter(input);
            expect(onEnter).toHaveBeenCalledTimes(1); //4.2 onChange

            fireChange(input, _changeValue);
            _context.next = 37;
            return _findInput();

          case 37:
            input = _context.sent;
            expect(input).toHaveValue(_changeValue);
            expect(onChange).toHaveBeenCalledTimes(1);

          case 40:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
});
//# sourceMappingURL=InputText.test.js.map