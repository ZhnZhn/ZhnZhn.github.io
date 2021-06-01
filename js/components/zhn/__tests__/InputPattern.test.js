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

var _InputPattern = _interopRequireDefault(require("../InputPattern"));

var createRef = _zhnTestUtils["default"].createRef,
    render = _zhnTestUtils["default"].render,
    screen = _zhnTestUtils["default"].screen,
    act = _zhnTestUtils["default"].act,
    fireClick = _zhnTestUtils["default"].fireClick,
    fireChange = _zhnTestUtils["default"].fireChange,
    fireKeyDownEnter = _zhnTestUtils["default"].fireKeyDownEnter,
    fireKeyDownDelete = _zhnTestUtils["default"].fireKeyDownDelete;
describe("InputPattern", function () {
  var _findInput = function _findInput() {
    return screen.findByRole('textbox');
  };

  var _findBtClear = function _findBtClear() {
    return screen.findByRole('button');
  };

  test("should render InputPattern with event handlers and ref", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var onEnter, onClear, onTest, ref, initValue, _render, rerender, input, _changeValue, btClear, _initValue;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            onEnter = jest.fn(), onClear = jest.fn(), onTest = jest.fn(function (str) {
              return str.length < 4;
            }), ref = createRef(), initValue = "abc", _render = render( /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputPattern["default"], {
              ref: ref,
              initValue: initValue,
              onTest: onTest,
              onEnter: onEnter,
              onClear: onClear
            })), rerender = _render.rerender;
            input = screen.getByRole('textbox');
            expect(input).toHaveValue(initValue); //2 Test event handlers
            //2.1 onChange

            _changeValue = 'abcd';
            fireChange(input, _changeValue);
            _context.next = 7;
            return _findInput();

          case 7:
            input = _context.sent;
            expect(input).toHaveValue(_changeValue);
            expect(onTest).toHaveBeenCalledTimes(1);
            expect(onTest.mock.calls[0][0]).toBe(_changeValue); //2.2 KeyDown Delete

            fireKeyDownDelete(input);
            _context.next = 14;
            return _findInput();

          case 14:
            input = _context.sent;
            expect(input).toHaveValue(initValue); //2.3 KeyDown Enter && onEnter

            fireKeyDownEnter(input);
            expect(onEnter).toHaveBeenCalledTimes(1);
            expect(onEnter.mock.calls[0][0]).toBe(initValue); //2.4 onClick on BtClear

            _context.next = 21;
            return _findBtClear();

          case 21:
            btClear = _context.sent;
            fireClick(btClear);
            _context.next = 25;
            return _findInput();

          case 25:
            input = _context.sent;
            expect(input).toHaveValue(initValue);
            expect(input).toHaveFocus();
            expect(onClear).toHaveBeenCalledTimes(1); //3 Test ref implementation interface
            //3.1

            expect(ref.current.getValue()).toBe(initValue); //3.2

            expect(ref.current.isValid()).toBe(true);
            expect(onTest).toHaveBeenCalledTimes(2);
            expect(onTest.mock.calls[1][0]).toBe(initValue); //3.3

            ref.current.focus();
            expect(input).toHaveFocus(); //3.4

            act(function () {
              return ref.current.showErrMsg();
            });
            expect(ref.current.isValid()).toBe(true); //4 Test rerender with new initValue without optional handlers

            _initValue = "abcde";
            rerender( /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputPattern["default"], {
              initValue: _initValue
            }));
            _context.next = 41;
            return _findInput();

          case 41:
            input = _context.sent;
            expect(input).toHaveValue(_initValue);

          case 43:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
});
//# sourceMappingURL=InputPattern.test.js.map