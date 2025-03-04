"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _addDialogPropsTo = _interopRequireDefault(require("../addDialogPropsTo"));
var _menuData = require("./_menuData");
const _checkItems = (items, result) => {
  Object.keys(result).forEach(id => {
    expect(items[id]).toEqual(result[id]);
  });
};
describe('addDialogPropsTo', () => {
  const fn = _addDialogPropsTo.default;
  test('should correct transform menu items', () => {
    fn(_menuData.items);
    _checkItems(_menuData.items, _menuData.result);
  });
  test('should correct transform idTuple menu items case', () => {
    fn(_menuData.items_idTuple, _menuData.df_idTuple);
    _checkItems(_menuData.items_idTuple, _menuData.result_idTuple);
  });
  test('should correct transform dfAddProps menu items case', () => {
    fn(_menuData.items_dfAddProps, _menuData.df_dfAddProps);
    _checkItems(_menuData.items_dfAddProps, _menuData.result_dfAddProps);
  });
});
//# sourceMappingURL=addDialogPropsTo.test.js.map