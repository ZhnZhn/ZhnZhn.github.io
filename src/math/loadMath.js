import { crGetRoute } from '../utils/crRouter';
import { catchDynamicLoad } from '../utils/catchFn';

const K_MEANS = "kmeans"
const JENKS = "jenks"

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
      .catch(catchDynamicLoad)

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
      .catch(catchDynamicLoad)
  },
})

export const loadKmeans = () => loadMath(K_MEANS)
export const loadJenks = () => loadMath(JENKS)
