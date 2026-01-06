"use strict";

exports.__esModule = true;
exports.crRouter = exports.crGetRoute = void 0;
var _isTypeFn = require("./isTypeFn");
const crRouter = obj => (0, _isTypeFn.isObj)(obj) ? Object.setPrototypeOf(obj, null) : Object.create(null);
exports.crRouter = crRouter;
const crGetRoute = (routes, dfRoute) => {
  const _router = crRouter(routes);
  return routeId => (0, _isTypeFn.isStr)(routeId) ? _router[routeId] || dfRoute : dfRoute;
};
exports.crGetRoute = crGetRoute;
//# sourceMappingURL=crRouter.js.map