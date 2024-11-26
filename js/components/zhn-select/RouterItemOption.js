"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.getItemOptionComp = void 0;
var _crRouter = require("../../utils/crRouter");
var _ItemOption = _interopRequireDefault(require("./ItemOption"));
var _ItemTopicOption = _interopRequireDefault(require("./ItemTopicOption"));
const getItemOptionComp = exports.getItemOptionComp = (0, _crRouter.crGetRoute)({
  DF: _ItemOption.default,
  ItemOption: _ItemOption.default,
  ItemTopicOption: _ItemTopicOption.default
});
//# sourceMappingURL=RouterItemOption.js.map