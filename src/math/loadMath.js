import { crGetRoute } from '../utils/crRouter';
import { throwErrOffline } from '../utils/asyncFn';

const K_MEANS = "kmeans";
const JENKS = "jenks";

export const loadMath = crGetRoute({
  get [K_MEANS]() {
    /*eslint-disable no-undef */
    if ( process.env.NODE_ENV === '_development') {
      return import("js/math/k-means.js")
        .then(module => module.default)
    }
    /*eslint-enable no-undef */
    return import(
       /* webpackChunkName: "math-kmeans" */
       /* webpackMode: "lazy" */
       "./k-means"
     ).then(module => module.default)
      .catch(throwErrOffline)

  },
  get [JENKS]() {
    /*eslint-disable no-undef */
    if ( process.env.NODE_ENV === '_development') {
      return import("js/math/jenksModule.js")
        .then(module => module.default)
    }
    /*eslint-enable no-undef */
    return import(
       /* webpackChunkName: "math-jenks" */
       /* webpackMode: "lazy" */
       "./jenksModule"
     ).then(module => module.default)
      .catch(throwErrOffline)
  },
})

export const loadKmeans = () => loadMath(K_MEANS)
export const loadJenks = () => loadMath(JENKS)
