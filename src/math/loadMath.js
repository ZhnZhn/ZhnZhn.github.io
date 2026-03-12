import { crGetRoute } from '../utils/crRouter';

export const K_MEANS = "kmeans"

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
  }
})
