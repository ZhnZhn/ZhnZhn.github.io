
export const crRouter = obj => Object
 .assign(Object.create(null), obj)

 export const crGetRoute = (
   routes,
   dfRoute
 ) => {
   const _router = crRouter(routes);
   return routeId => routeId && _router[routeId] || dfRoute;
 }
