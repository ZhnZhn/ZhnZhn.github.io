"use strict";

exports.__esModule = true;
exports.useSort = exports.useMenu = exports.useColumn = void 0;
var _uiApi = require("../uiApi");
var _compareFactory = require("./compareFactory");
var _Style = require("./Style");
const SORT_TO_UP = 'UP',
  SORT_TO_DOWN = 'DOWN';
const useMenu = () => {
  const [isMenuMore, _setIsMenuMore] = (0, _uiApi.useState)(false),
    toggleMenuMore = (0, _uiApi.useCallback)(evt => {
      evt.stopPropagation();
      _setIsMenuMore(is => !is);
    }, []);
  return [isMenuMore, toggleMenuMore];
};
exports.useMenu = useMenu;
const useColumn = initialArr => {
  const [arr, _setArr] = (0, _uiApi.useState)(initialArr || []),
    hToggleBy = (0, _uiApi.useCallback)(index => {
      _setArr(arr => {
        arr[index].isHide = !arr[index].isHide;
        return [...arr];
      });
    }, []);
  return [arr, hToggleBy];
};
exports.useColumn = useColumn;
const useSort = initialRows => {
  const [state, _setRows] = (0, _uiApi.useState)({
      _rows: initialRows || []
    }),
    sortByPn = (0, _uiApi.useCallback)(pn => {
      _setRows(_ref => {
        let {
          _rows,
          sortBy,
          sortTo
        } = _ref;
        const _compBy = (0, _compareFactory.factoryCompareBy)(_Style.TOKEN_NAN, pn);
        if (pn === sortBy && sortTo === SORT_TO_UP) {
          _rows = _rows.sort((0, _compareFactory.factoryOpCompareBy)(pn, _compBy));
          sortTo = SORT_TO_DOWN;
        } else {
          _rows = _rows.sort(_compBy);
          sortTo = SORT_TO_UP;
        }
        return {
          _rows,
          sortTo,
          sortBy: pn
        };
      });
    }, []);
  return [state, sortByPn];
};
exports.useSort = useSort;
//# sourceMappingURL=useTable.js.map