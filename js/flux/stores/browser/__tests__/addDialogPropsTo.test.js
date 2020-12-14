"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _addDialogPropsTo = _interopRequireDefault(require("../addDialogPropsTo"));

var _menuData = _interopRequireDefault(require("./_menuData"));

var items = _menuData["default"].items,
    result = _menuData["default"].result;
describe('addDialogPropsTo', function () {
  test('should currect transform menu items', function () {
    (0, _addDialogPropsTo["default"])(items);
    Object.keys(result).forEach(function (id) {
      expect(items[id]).toEqual(result[id]);
    });
  });
});
//# sourceMappingURL=addDialogPropsTo.test.js.map