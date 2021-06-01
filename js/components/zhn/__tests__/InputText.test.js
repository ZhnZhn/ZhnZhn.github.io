/**
 * @jest-environment jsdom
 */
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsxRuntime = require("react/jsx-runtime.js");

require("@testing-library/jest-dom");

var _zhnTestUtils = _interopRequireDefault(require("../../_test-utils/zhn-test-utils"));

var _InputText = _interopRequireDefault(require("../InputText"));

var createRef = _zhnTestUtils["default"].createRef,
    render = _zhnTestUtils["default"].render,
    screen = _zhnTestUtils["default"].screen,
    act = _zhnTestUtils["default"].act,
    fireChange = _zhnTestUtils["default"].fireChange,
    fireKeyDownEnter = _zhnTestUtils["default"].fireKeyDownEnter,
    fireKeyDownDelete = _zhnTestUtils["default"].fireKeyDownDelete;
describe("InputText", function () {
  var _findInput = function _findInput() {
    return screen.findByRole('textbox');
  };

  test('should render InputText with event handlers and ref', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var initValue, onEnter, onChange, ref, _render, rerender, input, _changeValue, _initValue;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            initValue = 'abc', onEnter = jest.fn(), onChange = jest.fn(), ref = createRef(), _render = render( /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputText["default"], {
              ref: ref,
              initValue: initValue,
              onChange: onChange,
              onEnter: onEnter
            })), rerender = _render.rerender;
            input = screen.getByRole('textbox');
            expect(input).toHaveValue(initValue); //2 Test event handlers
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
            expect(onEnter.mock.calls[0][0]).toBe(_changeValue); //3 Test ref implementation interface
            //3.1

            expect(ref.current.getValue()).toBe(_changeValue); //3.2

            act(function () {
              return ref.current.setValue('a');
            });
            _context.next = 23;
            return _findInput();

          case 23:
            input = _context.sent;
            expect(input).toHaveValue('a'); //3.3

            ref.current.focus();
            expect(input).toHaveFocus(); //4 Test rerender with new initValue without optional handlers

            _initValue = "abcde";
            rerender( /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputText["default"], {
              initValue: _initValue
            }));
            _context.next = 31;
            return _findInput();

          case 31:
            input = _context.sent;
            expect(input).toHaveValue(_initValue); //4.1 KeyDown Enter && onEnter

            fireKeyDownEnter(input);
            expect(onEnter).toHaveBeenCalledTimes(1); //4.2 onChange

            fireChange(input, _changeValue);
            _context.next = 38;
            return _findInput();

          case 38:
            input = _context.sent;
            expect(input).toHaveValue(_changeValue);
            expect(onChange).toHaveBeenCalledTimes(1);

          case 41:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
});
//# sourceMappingURL=InputText.test.js.map