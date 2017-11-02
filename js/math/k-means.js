'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var C = {
  N: 6,
  ITERATION: 100
};

// convenience functions
var getterSetter = function getterSetter(initialValue, validator) {
  var thingToGetSet = initialValue;
  var _fnIsValid = validator || function (val) {
    return true;
  };
  return function (newValue) {
    if (typeof newValue === 'undefined') return thingToGetSet;
    if (_fnIsValid(newValue)) thingToGetSet = newValue;
  };
};

var sumOfSquareDiffs = function sumOfSquareDiffs(oneVector, anotherVector) {
  var squareDiffs = oneVector.map(function (component, i) {
    return Math.pow(component - anotherVector[i], 2);
  });
  return squareDiffs.reduce(function (a, b) {
    return a + b;
  }, 0);
};

var mindex = function mindex(array) {
  var min = array.reduce(function (a, b) {
    return Math.min(a, b);
  });
  return array.indexOf(min);
};

var sumVectors = function sumVectors(a, b) {
  return a.map(function (val, i) {
    return val + b[i];
  });
};

var averageLocation = function averageLocation(points) {
  var zeroVector = points[0].location().map(function () {
    return 0;
  }),
      locations = points.map(function (point) {
    return point.location();
  }),
      vectorSum = locations.reduce(function (a, b) {
    return sumVectors(a, b);
  }, zeroVector);

  return vectorSum.map(function (val) {
    return val / points.length;
  });
};

// objects
var Point = function Point(location) {
  var self = this;
  this.location = getterSetter(location);

  this.label = getterSetter();
  this.updateLabel = function (centroids) {
    var distancesSquared = centroids.map(function (centroid) {
      return sumOfSquareDiffs(self.location(), centroid.location());
    });
    self.label(mindex(distancesSquared));
  };
};

var Centroid = function Centroid(initialLocation, label) {
  var self = this;
  this.location = getterSetter(initialLocation);
  this.label = getterSetter(label);
  this.updateLocation = function (points) {
    var pointsWithThisCentroid = points.filter(function (point) {
      return point.label() == self.label();
    });
    if (pointsWithThisCentroid.length > 0) self.location(averageLocation(pointsWithThisCentroid));
  };
};

var kmeans = function kmeans(data, config) {
  // default k
  var k = config.k || Math.round(Math.sqrt(data.length / 2)),
      iterations = config.iterations;

  // initialize point objects with data
  var points = data.map(function (vector) {
    return new Point(vector);
  });

  // intialize centroids randomly
  var centroids = [];
  var i = void 0;
  for (i = 0; i < k; i++) {
    centroids.push(new Centroid(points[i % points.length].location(), i));
  }

  // update labels and centroid locations until convergence
  var iter = void 0;
  for (iter = 0; iter < iterations; iter++) {
    points.forEach(function (point) {
      point.updateLabel(centroids);
    });
    centroids.forEach(function (centroid) {
      centroid.updateLocation(points);
    });
  }

  // return points and centroids
  return {
    points: points,
    centroids: centroids
  };
};

//fn for sort clusters
var compareUnaryCentroid = function compareUnaryCentroid(a, b) {
  if (a.centroid[0] < b.centroid[0]) {
    return -1;
  }
  if (a.centroid[0] > b.centroid[0]) {
    return 1;
  }
  if (a.centroid[0] === b.centroid[0]) {
    return 0;
  }
};
var compareUnaryPoint = function compareUnaryPoint(a, b) {
  if (a[0] < b[0]) {
    return -1;
  }
  if (a[0] > b[0]) {
    return 1;
  }
  if (a[0] === b[0]) {
    return 0;
  }
};

var clusterMaker = {

  data: getterSetter([], function (arrayOfArrays) {
    var n = arrayOfArrays[0].length;
    return arrayOfArrays.map(function (array) {
      return array.length == n;
    }).reduce(function (boolA, boolB) {
      return boolA & boolB;
    }, true);
  }),

  clusters: function clusters() {
    var pointsAndCentroids = kmeans(this.data(), { k: this.k(), iterations: this.iterations() }),
        points = pointsAndCentroids.points,
        centroids = pointsAndCentroids.centroids;

    return centroids.map(function (centroid) {
      return {
        centroid: centroid.location(),
        points: points.filter(function (point) {
          return point.label() == centroid.label();
        }).map(function (point) {
          return point.location();
        })
      };
    });
  },


  k: getterSetter(undefined, function (value) {
    return value % 1 == 0 & value > 0;
  }),

  iterations: getterSetter(Math.pow(10, 3), function (value) {
    return value % 1 == 0 & value > 0;
  }),

  unarySortedClusters: function unarySortedClusters() {
    return this.clusters().sort(compareUnaryCentroid).map(function (cluster) {
      cluster.points = cluster.points.sort(compareUnaryPoint);
      return cluster;
    });
  },
  crUnarySortedCluster: function crUnarySortedCluster() {
    var points = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : C.N;
    var iteration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : C.ITERATION;

    this.k(n);
    this.iterations(iteration);
    this.data(points);
    return this.unarySortedClusters();
  }
};

exports.default = clusterMaker;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\math\k-means.js.map