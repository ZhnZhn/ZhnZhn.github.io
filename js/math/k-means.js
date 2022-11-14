"use strict";

exports.__esModule = true;
exports.default = void 0;

const N = 6,
      ITERATION = 100,
      FN_TRUE = () => true; // convenience functions


const getterSetter = function (initialValue, validator) {
  let value = initialValue;

  const _fnIsValid = validator || FN_TRUE;

  return function (newValue) {
    if (typeof newValue === 'undefined') {
      return value;
    }

    if (_fnIsValid(newValue)) {
      value = newValue;
    }
  };
};

const sumOfSquareDiffs = (oneVector, anotherVector) => oneVector.map((component, i) => Math.pow(component - anotherVector[i], 2)) //squareDiffs
.reduce((a, b) => a + b, 0); //get array index with min value


const mindex = arr => arr.reduce((r, v, index) => r[0] < v ? r : [v, index], [Infinity, -1])[1];

const sumVectors = (a, b) => a.map((val, i) => val + b[i]);

const averageLocation = points => {
  const zeroVector = points[0].location().map(() => 0),
        locations = points.map(point => point.location()),
        vectorSum = locations.reduce((a, b) => sumVectors(a, b), zeroVector);
  return vectorSum.map(val => val / points.length);
}; // objects


const Point = function (location) {
  this.location = getterSetter(location);
  this.label = getterSetter();

  this.updateLabel = centroids => {
    const distancesSquared = centroids.map(centroid => sumOfSquareDiffs(this.location(), centroid.location()));
    this.label(mindex(distancesSquared));
  };
};

const Centroid = function (initialLocation, label) {
  this.location = getterSetter(initialLocation);
  this.label = getterSetter(label);

  this.updateLocation = points => {
    const pointsWithThisCentroid = points.filter(point => point.label() == this.label());

    if (pointsWithThisCentroid.length > 0) {
      this.location(averageLocation(pointsWithThisCentroid));
    }
  };
};

const kmeans = function (data, config) {
  // default k
  const k = config.k || Math.round(Math.sqrt(data.length / 2)),
        iterations = config.iterations; // initialize point objects with data

  const points = data.map(vector => new Point(vector)); // intialize centroids randomly

  const centroids = [];
  let i;

  for (i = 0; i < k; i++) {
    centroids.push(new Centroid(points[i % points.length].location(), i));
  } // update labels and centroid locations until convergence


  let iter;

  for (iter = 0; iter < iterations; iter++) {
    points.forEach(point => {
      point.updateLabel(centroids);
    });
    centroids.forEach(centroid => {
      centroid.updateLocation(points);
    });
  } // return points and centroids


  return {
    points,
    centroids
  };
}; //fns for sort clusters


const compareUnaryCentroid = (a, b) => a.centroid[0] - b.centroid[0];

const compareUnaryPoint = (a, b) => a[0] - b[0];

const _isValidValue = value => value % 1 == 0 & value > 0;

const clusterMaker = {
  k: getterSetter(void 0, _isValidValue),
  iterations: getterSetter(10 ** 3, _isValidValue),
  data: getterSetter([], arrayOfArrays => {
    const n = arrayOfArrays[0].length;
    return arrayOfArrays.map(array => array.length == n).reduce((boolA, boolB) => boolA & boolB, true);
  }),

  clusters() {
    const pointsAndCentroids = kmeans(this.data(), {
      k: this.k(),
      iterations: this.iterations()
    }),
          points = pointsAndCentroids.points,
          centroids = pointsAndCentroids.centroids;
    return centroids.map(centroid => ({
      centroid: centroid.location(),
      points: points.reduce((arr, point) => {
        if (point.label() == centroid.label()) {
          arr.push(point.location());
        }

        return arr;
      }, [])
    }));
  },

  unarySortedClusters() {
    return this.clusters().sort(compareUnaryCentroid).map(cluster => {
      cluster.points.sort(compareUnaryPoint);
      return cluster;
    });
  },

  crUnarySortedCluster(points, n, iteration) {
    if (points === void 0) {
      points = [];
    }

    if (n === void 0) {
      n = N;
    }

    if (iteration === void 0) {
      iteration = ITERATION;
    }

    this.k(n);
    this.iterations(iteration);
    this.data(points);
    return this.unarySortedClusters();
  }

};
var _default = clusterMaker;
exports.default = _default;
//# sourceMappingURL=k-means.js.map