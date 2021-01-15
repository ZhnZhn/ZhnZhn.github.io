"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = require("react");

var _compFactory = _interopRequireDefault(require("./compFactory"));

var _Style = _interopRequireDefault(require("./Style"));

var C = {
  UP: 'UP',
  DOWN: 'DOWN'
};
var useTable = {
  useMenu: function useMenu() {
    var _useState = (0, _react.useState)(false),
        isMenuMore = _useState[0],
        _setIsMenuMore = _useState[1],
        toggleMenuMore = (0, _react.useCallback)(function (evt) {
      evt.stopPropagation();

      _setIsMenuMore(function (is) {
        return !is;
      });
    }, []);

    return [isMenuMore, toggleMenuMore];
  },
  useColumn: function useColumn(initialArr) {
    var _useState2 = (0, _react.useState)(initialArr || []),
        arr = _useState2[0],
        _setArr = _useState2[1],
        hToggleBy = (0, _react.useCallback)(function (index) {
      _setArr(function (arr) {
        arr[index].isHide = !arr[index].isHide;
        return [].concat(arr);
      });
    }, []);

    return [arr, hToggleBy];
  },
  useSort: function useSort(initialRows) {
    var _useState3 = (0, _react.useState)({
      _rows: initialRows || []
    }),
        state = _useState3[0],
        _setRows = _useState3[1],
        sortByPn = (0, _react.useCallback)(function (pn) {
      _setRows(function (_ref) {
        var _rows = _ref._rows,
            sortBy = _ref.sortBy,
            sortTo = _ref.sortTo;

        var _compBy = _compFactory["default"].compBy(_Style["default"].TOKEN_NAN, pn);

        if (pn === sortBy && sortTo === C.UP) {
          _rows = _rows.sort(_compFactory["default"].opCompBy(pn, _compBy));
          sortTo = C.DOWN;
        } else {
          _rows = _rows.sort(_compBy);
          sortTo = C.UP;
        }

        return {
          _rows: _rows,
          sortTo: sortTo,
          sortBy: pn
        };
      });
    }, []);

    return [state, sortByPn];
  }
};
var _default = useTable;
exports["default"] = _default;
//# sourceMappingURL=useTable.js.map