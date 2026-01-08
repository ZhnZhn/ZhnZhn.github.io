"use strict";

exports.__esModule = true;
exports.crRouter = exports.crIdLookup = exports.crGetRoute = void 0;
var _isTypeFn = require("./isTypeFn");
const _crObjectWithNullPrototype = () => Object.create(null);
const crRouter = obj => (0, _isTypeFn.isObj)(obj) ? Object.setPrototypeOf(obj, null) : _crObjectWithNullPrototype();
exports.crRouter = crRouter;
const crGetRoute = (routes, dfRoute) => {
  const _router = crRouter(routes);
  return routeId => (0, _isTypeFn.isStr)(routeId) ? _router[routeId] || dfRoute : dfRoute;
};
exports.crGetRoute = crGetRoute;
const crIdLookup = (arr, getId) => arr.reduce((idLookup, item) => {
  idLookup[getId(item)] = item;
  return idLookup;
}, _crObjectWithNullPrototype());
exports.crIdLookup = crIdLookup;
//# sourceMappingURL=crRouter.js.map