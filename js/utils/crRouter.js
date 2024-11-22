"use strict";

exports.__esModule = true;
exports.crRouter = exports.crGetRoute = void 0;
const crRouter = obj => Object.assign(Object.create(null), obj);
exports.crRouter = crRouter;
const crGetRoute = (routes, dfRoute) => {
  const _router = crRouter(routes);
  return routeId => routeId && _router[routeId] || dfRoute;
};
exports.crGetRoute = crGetRoute;
//# sourceMappingURL=crRouter.js.map