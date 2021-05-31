/**
 * @jest-environment jsdom
 */
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsxRuntime = require("react/jsx-runtime.js");

require("@testing-library/jest-dom");

var _react = require("react");

var _react2 = require("@testing-library/react");

var _fireEventHelpers = _interopRequireDefault(require("./_fireEventHelpers"));

var _InputSecret = _interopRequireDefault(require("../InputSecret"));

var fireChange = _fireEventHelpers["default"].fireChange,
    fireKeyDownEnter = _fireEventHelpers["default"].fireKeyDownEnter,
    fireKeyDownDelete = _fireEventHelpers["default"].fireKeyDownDelete;
describe('InputSecret', function () {
  var placeholder = 'api-key',
      _findInput = function _findInput() {
    return _react2.screen.findByPlaceholderText(placeholder);
  };

  test('should render InputSecret with event handlers and ref', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var onEnter, ref, _render, rerender, input, _changeValue, _onEnterTimes;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            onEnter = jest.fn(), ref = /*#__PURE__*/(0, _react.createRef)(), _render = (0, _react2.render)( /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputSecret["default"], {
              ref: ref,
              placeholder: placeholder,
              onEnter: onEnter
            })), rerender = _render.rerender; //2 Test onChange handle and removed attribute value

            _context.next = 3;
            return _findInput();

          case 3:
            input = _context.sent;
            _changeValue = 'abcd';
            fireChange(input, _changeValue);
            _context.next = 8;
            return _findInput();

          case 8:
            input = _context.sent;
            expect(input).toHaveValue(_changeValue);
            expect(input.hasAttribute('value')).toBe(false); //3 Test KeyDown handle
            //3.1 Test KeyDown Enter

            fireKeyDownEnter(input);
            expect(onEnter).toHaveBeenCalledTimes(1);
            expect(onEnter.mock.calls[0][0]).toBe(_changeValue); //3.2 Test KeyDown Delete

            fireKeyDownDelete(input);
            _context.next = 17;
            return _findInput();

          case 17:
            input = _context.sent;
            expect(input).toHaveValue('');
            expect(onEnter).toHaveBeenCalledTimes(2);
            expect(onEnter.mock.calls[1][0]).toBe(''); //4 Test ref implementation interface

            fireChange(input, _changeValue); //4.1

            expect(ref.current.getValue()).toBe(_changeValue); //4.2

            (0, _react2.act)(function () {
              return ref.current.clear();
            });
            _context.next = 26;
            return _findInput();

          case 26:
            input = _context.sent;
            expect(input).toHaveValue('');
            expect(input.hasAttribute('value')).toBe(false); //5 Test rerender without onEnter

            _onEnterTimes = 2;
            fireChange(input, _changeValue); //5.1 Test render

            rerender( /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputSecret["default"], {
              ref: ref,
              placeholder: placeholder
            }));
            _context.next = 34;
            return _findInput();

          case 34:
            input = _context.sent;
            expect(input).toHaveValue(_changeValue);
            expect(input.hasAttribute('value')).toBe(false); //5.2 Test KeyDown Enter

            fireKeyDownEnter(input);
            expect(onEnter).toHaveBeenCalledTimes(_onEnterTimes); //5.3 Test KeyDown Delete

            fireKeyDownDelete(input);
            _context.next = 42;
            return _findInput();

          case 42:
            input = _context.sent;
            expect(input).toHaveValue('');
            expect(onEnter).toHaveBeenCalledTimes(_onEnterTimes);

          case 45:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
});
//# sourceMappingURL=InputSecret.test.js.map