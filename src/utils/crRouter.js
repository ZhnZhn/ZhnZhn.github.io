import {
  isObj,
  isStr
} from './isTypeFn';

const _crObjectWithNullPrototype = () => Object.create(null)
export const crRouter = (
  obj
) => isObj(obj)
  ? Object.setPrototypeOf(obj, null)
  : _crObjectWithNullPrototype()

export const crGetRoute = (
  routes,
  dfRoute
) => {
  const _router = crRouter(routes);
  return routeId => isStr(routeId)
    ? _router[routeId] || dfRoute
    : dfRoute;
}

export const crIdLookup = (
  arr,
  getId
) => arr.reduce((idLookup, item) => {
  idLookup[getId(item)] = item
  return idLookup;
}, _crObjectWithNullPrototype())
