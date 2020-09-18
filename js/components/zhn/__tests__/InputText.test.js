"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require("@testing-library/jest-dom");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@testing-library/react");

var _InputText = _interopRequireDefault(require("../InputText"));

describe("InputText", function () {
  var _findInput = function _findInput() {
    return _react2.screen.findByRole('textbox');
  };

  test('should render InputText with event handlers and ref', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var onEnter, onChange, ref, _render, rerender, input;

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

            _react2.fireEvent.keyDown(input, {
              key: 'Delete',
              keyCode: 46
            });

            _context.next = 6;
            return _findInput();

          case 6:
            input = _context.sent;
            expect(input).toHaveValue(''); //2.2 onChange

            _react2.fireEvent.change(input, {
              target: {
                value: 'abcd'
              }
            });

            _context.next = 11;
            return _findInput();

          case 11:
            input = _context.sent;
            expect(input).toHaveValue('abcd');
            expect(onChange).toHaveBeenCalledTimes(1);
            expect(onChange.mock.calls[0][0]).toBe('abcd'); //2.3 KeyDown Enter && onEnter

            _react2.fireEvent.keyDown(input, {
              key: 'Enter',
              keyCode: 13
            });

            expect(onEnter).toHaveBeenCalledTimes(1);
            expect(onEnter.mock.calls[0][0]).toBe('abcd'); //3 Test ref implementation interface
            //3.1

            expect(ref.current.getValue()).toBe('abcd'); //3.2

            (0, _react2.act)(function () {
              return ref.current.setValue('a');
            });
            _context.next = 22;
            return _findInput();

          case 22:
            input = _context.sent;
            expect(input).toHaveValue('a'); //3.3

            ref.current.focus();
            expect(input).toHaveFocus(); //4 Test rerender with new initValue without optional handlers

            rerender( /*#__PURE__*/_react["default"].createElement(_InputText["default"], {
              initValue: "abcde"
            }));
            _context.next = 29;
            return _findInput();

          case 29:
            input = _context.sent;
            expect(input).toHaveValue('abcde'); //4.1 KeyDown Enter && onEnter

            _react2.fireEvent.keyDown(input, {
              key: 'Enter',
              keyCode: 13
            });

            expect(onEnter).toHaveBeenCalledTimes(1); //4.2 onChange

            _react2.fireEvent.change(input, {
              target: {
                value: 'abcd'
              }
            });

            _context.next = 36;
            return _findInput();

          case 36:
            input = _context.sent;
            expect(input).toHaveValue('abcd');
            expect(onChange).toHaveBeenCalledTimes(1);

          case 39:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
});
//# sourceMappingURL=InputText.test.js.map