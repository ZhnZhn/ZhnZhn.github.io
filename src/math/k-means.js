

const C = {
  N: 6,
  ITERATION: 100
};

// convenience functions
const getterSetter = function(initialValue, validator) {
  let thingToGetSet = initialValue;
  const _fnIsValid = validator || function(val) { return true };
  return function(newValue) {
    if (typeof newValue === 'undefined') return thingToGetSet;
    if (_fnIsValid(newValue)) thingToGetSet = newValue;
  };
};

const sumOfSquareDiffs = function(oneVector, anotherVector) {
  const squareDiffs = oneVector.map( (component, i) => {
    return Math.pow(component - anotherVector[i], 2);
  });
  return squareDiffs.reduce( (a, b) => { return a + b }, 0);
};

const mindex = function(array) {
  const min = array.reduce( (a, b) => {
    return Math.min(a, b);
  });
  return array.indexOf(min);
};

const sumVectors = function(a, b) {
  return a.map( (val, i) => { return val + b[i]; });
};

const averageLocation = function(points) {
  const zeroVector = points[0].location().map( () => { return 0; })
      , locations = points.map( (point) => { return point.location(); })
      , vectorSum = locations.reduce( (a, b) => { return sumVectors(a, b); }, zeroVector);

  return vectorSum.map( (val) => { return val / points.length; });
};

// objects
const Point = function(location) {
  const self = this;
  this.location = getterSetter(location);

  this.label = getterSetter();
  this.updateLabel = function(centroids) {
    const distancesSquared = centroids.map( (centroid) => {
      return sumOfSquareDiffs(self.location(), centroid.location());
    });
    self.label(mindex(distancesSquared));
  };
};

const Centroid = function(initialLocation, label) {
  const self = this;
  this.location = getterSetter(initialLocation);
  this.label = getterSetter(label);
  this.updateLocation = function(points) {
    const pointsWithThisCentroid = points.filter( (point) => { return point.label() == self.label(); });
    if (pointsWithThisCentroid.length > 0) self.location(averageLocation(pointsWithThisCentroid));
  };
};



const kmeans = function(data, config) {
  // default k
  const k = config.k || Math.round(Math.sqrt(data.length / 2))
      , iterations = config.iterations;

  // initialize point objects with data
  const points = data.map( (vector) => { return new Point(vector); });

  // intialize centroids randomly
  const centroids = [];
  let i;
  for (i = 0; i < k; i++) {
    centroids.push(new Centroid(points[i % points.length].location(), i));
  }

  // update labels and centroid locations until convergence
  let iter;
  for (iter = 0; iter < iterations; iter++) {
    points.forEach( (point) => { point.updateLabel(centroids); });
    centroids.forEach( (centroid) => { centroid.updateLocation(points); });
  }

  // return points and centroids
  return {
    points: points,
    centroids: centroids
  };

};


//fn for sort clusters
const compareUnaryCentroid = (a, b) => {
  if ( a.centroid[0] < b.centroid[0] ) { return -1;}
  if ( a.centroid[0] > b.centroid[0] ) { return 1;}
  if ( a.centroid[0] === b.centroid[0] ) { return 0;}
};
const compareUnaryPoint = (a, b) => {
  if ( a[0] < b[0] ) { return -1;}
  if ( a[0] > b[0] ) { return 1;}
  if ( a[0] === b[0] ) { return 0;}
};

const clusterMaker = {

  data: getterSetter([], function(arrayOfArrays) {
    const n = arrayOfArrays[0].length;
    return (arrayOfArrays.map( (array) => {
      return array.length == n;
    }).reduce( (boolA, boolB) => { return (boolA & boolB); }, true));
  }),

  clusters() {
    const pointsAndCentroids = kmeans(this.data(), {k: this.k(), iterations: this.iterations() })
        , points = pointsAndCentroids.points
        , centroids = pointsAndCentroids.centroids;

    return centroids.map( (centroid) => {
      return {
        centroid: centroid.location(),
        points: points
                  .filter( (point) => {
                    return point.label() == centroid.label();
                  })
                  .map( (point) => {
                     return point.location();
                  })
      };
    });
  },

  k: getterSetter(undefined, function(value) { return ((value % 1 == 0) & (value > 0)) }),

  iterations: getterSetter(Math.pow(10, 3), function(value) { return ((value % 1 == 0) & (value > 0)) }),


  unarySortedClusters() {
    return this.clusters()
        .sort(compareUnaryCentroid)
        .map( (cluster) => {
           cluster.points = cluster.points.sort(compareUnaryPoint);
           return cluster;
        });
  },

  crUnarySortedCluster(points=[], n=C.N, iteration=C.ITERATION){
    this.k(n)
    this.iterations(iteration)
    this.data(points)
    return this.unarySortedClusters();
  }

};

export default clusterMaker
