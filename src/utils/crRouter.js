import { isStr } from './isTypeFn';

export const crRouter = obj => Object
  .setPrototypeOf(obj || {}, null)

export const crGetRoute = (
  routes,
  dfRoute
) => {
  const _router = crRouter(routes);
  return routeId => isStr(routeId)
    ? _router[routeId] || dfRoute
    : dfRoute;
}
