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

var _DateField = _interopRequireDefault(require("../DateField"));

var createRef = _zhnTestUtils["default"].createRef,
    render = _zhnTestUtils["default"].render,
    screen = _zhnTestUtils["default"].screen,
    act = _zhnTestUtils["default"].act,
    fireChange = _zhnTestUtils["default"].fireChange,
    fireKeyDownEnter = _zhnTestUtils["default"].fireKeyDownEnter,
    fireKeyDownDelete = _zhnTestUtils["default"].fireKeyDownDelete;
describe("DateField", function () {
  var _findInput = function _findInput() {
    return screen.findByRole('textbox');
  };

  test('', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var onEnter, ref, initialValue, _render, rerender, input, _changeValue, _setValue, _rerenderValue;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            onEnter = jest.fn(), ref = createRef(), initialValue = "2010-01-01", _render = render( /*#__PURE__*/(0, _jsxRuntime.jsx)(_DateField["default"], {
              ref: ref,
              initialValue: initialValue,
              onEnter: onEnter
            })), rerender = _render.rerender;
            input = screen.getByRole('textbox');
            expect(input).toHaveValue(initialValue); //2 Test event handlers
            //2.1 onChange

            _changeValue = '2020-01-01';
            fireChange(input, _changeValue);
            _context.next = 7;
            return _findInput();

          case 7:
            input = _context.sent;
            expect(input).toHaveValue(_changeValue); //2.2 KeyDown Enter

            fireKeyDownEnter(input);
            expect(onEnter).toHaveBeenCalledTimes(1);
            expect(onEnter.mock.calls[0][0]).toBe(_changeValue); //2.3 KeyDown Delete

            fireKeyDownDelete(input);
            _context.next = 15;
            return _findInput();

          case 15:
            input = _context.sent;
            expect(input).toHaveValue(initialValue); //3 Test ref implementation interface
            //3.1

            expect(ref.current.getValue()).toBe(initialValue); //3.2

            _setValue = '2000-01-01';
            act(function () {
              return ref.current.setValue(_setValue);
            });
            _context.next = 22;
            return _findInput();

          case 22:
            input = _context.sent;
            expect(input).toHaveValue(_setValue); //3.3

            expect(ref.current.isValid()).toBe(true); //3.4

            ref.current.focus();
            expect(input).toHaveFocus(); //4 Test rerender with new initialValue

            _rerenderValue = "2020-01-01";
            rerender( /*#__PURE__*/(0, _jsxRuntime.jsx)(_DateField["default"], {
              initialValue: _rerenderValue
            }));
            _context.next = 31;
            return _findInput();

          case 31:
            input = _context.sent;
            expect(input).toHaveValue(_rerenderValue);

          case 33:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
});
//# sourceMappingURL=DateField.test.js.map