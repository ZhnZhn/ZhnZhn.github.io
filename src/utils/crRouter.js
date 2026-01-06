import {
  isObj,
  isStr
} from './isTypeFn';

export const crRouter = (
  obj
) => isObj(obj)
  ? Object.setPrototypeOf(obj, null)
  : Object.create(null)

export const crGetRoute = (
  routes,
  dfRoute
) => {
  const _router = crRouter(routes);
  return routeId => isStr(routeId)
    ? _router[routeId] || dfRoute
    : dfRoute;
}
