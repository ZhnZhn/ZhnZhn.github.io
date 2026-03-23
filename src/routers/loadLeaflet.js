import { throwErrOffline } from './asyncFn';

export const loadLeaflet = () => import(
  /* webpackChunkName: "leaflet" */
  /* webpackMode: "lazy" */
  'leaflet'
).catch(throwErrOffline)
