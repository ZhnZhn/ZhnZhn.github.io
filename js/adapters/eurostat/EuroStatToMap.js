'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonstat = require('jsonstat');

var _jsonstat2 = _interopRequireDefault(_jsonstat);

var _kMeans = require('../../math/k-means');

var _kMeans2 = _interopRequireDefault(_kMeans);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*eslint-disable no-undef */
if (process.env.NODE_ENV !== 'development') {
  System.config({
    baseURL: "/"
  });
}
/*eslint-enable no-undef */

var URL_LEAFLET = 'lib/leaflet.js',
    URL_EU_GEOJSON = 'data/geo/eu-stat.geo.json';

var NUMBER_OF_CLUSTERS = 6,
    NUMBER_OF_ITERATION = 100,
    _clusterColors = ['#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#08519c', '#08306b', '#74c476'];

var _findFeature = function _findFeature(arr, value) {
  var i = void 0,
      len = void 0;
  for (i = 0, len = arr.length; i < len; i++) {
    var feature = arr[i];
    if (feature.properties.id === value) {
      return feature;
    }
  }
  return undefined;
};

var _fnMergeGeoAndValue = function _fnMergeGeoAndValue(sGeo, dGeo, json) {
  var points = [];
  var minValue = Number.POSITIVE_INFINITY,
      maxValue = Number.NEGATIVE_INFINITY;
  sGeo.forEach(function (cell, index) {
    var feature = _findFeature(json.features, dGeo.id[index]);
    if (feature && cell.value) {
      feature.properties.value = cell.value;

      var point = [cell.value, 0];
      point.id = feature.properties.id;
      points.push(point);

      if (minValue > cell.value) {
        minValue = cell.value;
      }
      if (maxValue < cell.value) {
        maxValue = cell.value;
      }
    }
  });
  if (points.length === 0) {
    var point = [0, 0];
    point.id = 'ID';
    points.push(point);
  }
  return { minValue: minValue, maxValue: maxValue, points: points };
};

var _fnCreateClusters = function _fnCreateClusters(points, n, iteration) {
  _kMeans2.default.k(n);
  _kMeans2.default.iterations(iteration);
  _kMeans2.default.data(points);

  var _clusters = _kMeans2.default.clusters().sort(function (a, b) {
    if (a.centroid[0] < b.centroid[0]) {
      return -1;
    }
    if (a.centroid[0] > b.centroid[0]) {
      return 1;
    }
    if (a.centroid[0] === b.centroid[0]) {
      return 0;
    }
  });
  _clusters.forEach(function (cluster) {
    cluster.points = cluster.points.sort(function (a, b) {
      if (a[0] < b[0]) {
        return -1;
      }
      if (a[0] > b[0]) {
        return 1;
      }
      if (a[0] === b[0]) {
        return 0;
      }
    });
  });

  return _clusters;
};

var _fnCreateHmIdCluster = function _fnCreateHmIdCluster(clusters) {
  var hm = {};
  clusters.forEach(function (cluster, i) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = cluster.points[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var point = _step.value;

        hm[point.id] = i;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  });
  return hm;
};

var _fnMergeGeoJsonAndClusters = function _fnMergeGeoJsonAndClusters(geoJson, hmIdCluster, maxCluster) {
  geoJson.features.forEach(function (feature) {
    var _properties = feature.properties,
        _id = _properties.id;
    if (_id) {
      var _cluster = hmIdCluster[_id];
      _properties.cluster = typeof _cluster !== "undefined" ? _cluster : maxCluster;
    } else {
      _properties.cluster = maxCluster;
    }
  });
};

var _fnStyle = function _fnStyle(feature) {
  return {
    "color": 'green',
    "fillColor": _clusterColors[feature.properties.cluster],
    "weight": 1,
    "fillOpacity": 0.7,
    "opacity": 0.65
  };
};

var _fnCreateInfoControl = function _fnCreateInfoControl(L) {
  var wgInfo = L.control();
  wgInfo.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'control-info');
    this.update();
    return this._div;
  };
  wgInfo.update = function (props) {
    if (props) {
      var label = props.label;
      var value = props.value;


      this._div.innerHTML = '<b>' + label + '</b><br><b>' + (value ? value : 'uknown') + '</b>';
    }
  };
  return wgInfo;
};

var _fnCalcUpper = function _fnCalcUpper(_clusters, index) {
  var _arrL = _clusters[index].points,
      _arrH = _clusters[index + 1].points,
      _upLow = _arrL[_arrL.length - 1][0],
      _upUp = _arrH[0] ? _arrH[0][0] : _upLow;

  return _upLow + (_upUp - _upLow) / 2;
};

var _fnCreateItemInnerHtml = function _fnCreateItemInnerHtml(color, from, to) {
  return '<i style="opacity:0.7;background:' + color + ';">' + from + '&ndash;' + to + '</i><br/>';
};

var _fnCreateGradeControl = function _fnCreateGradeControl(minValue, maxValue, _clusters, L) {
  var gradeContorl = L.control({ position: 'bottomleft' });

  gradeContorl.onAdd = function (map) {
    var _div = L.DomUtil.create('div', 'control-grade');

    var _upperPrev = Math.round(_fnCalcUpper(_clusters, 0));
    _div.innerHTML = _fnCreateItemInnerHtml(_clusterColors[0], Math.floor(minValue), _upperPrev);

    var i = void 0,
        _upperNext = void 0;
    for (i = 1; i < NUMBER_OF_CLUSTERS - 1; i++) {
      _upperNext = Math.round(_fnCalcUpper(_clusters, i));
      _div.innerHTML += _fnCreateItemInnerHtml(_clusterColors[i], _upperPrev, _upperNext);
      _upperPrev = _upperNext;
    }
    _div.innerHTML += _fnCreateItemInnerHtml(_clusterColors[NUMBER_OF_CLUSTERS - 1], _upperPrev, Math.round(maxValue));

    return _div;
  };

  return gradeContorl;
};

var _fnOnMouseOver = function _fnOnMouseOver(infoControl, e) {
  var _layer = e.target;
  infoControl.update(_layer.feature.properties);
};
var _fnOnMouseOut = function _fnOnMouseOut(infoControl, e) {
  //infoControl.update()
};
var _fnOnEachFeature = function _fnOnEachFeature(infoControl, feature, layer) {
  layer.on({
    mouseover: _fnOnMouseOver.bind(null, infoControl),
    mouseout: _fnOnMouseOut.bind(null, infoControl)
  });
};

var _createChoroplethMap = function _createChoroplethMap(option) {
  var statJson = option.jsonCube;
  var geoJson = option.geoJson;
  var configSlice = option.zhMapSlice;
  var map = option.map;
  var L = option.L;
  var ds = (0, _jsonstat2.default)(statJson).Dataset(0);
  var dGeo = ds.Dimension("geo");
  var _dGeo = dGeo ? dGeo : [];
  var sGeo = ds.Data(configSlice);
  var _sGeo = sGeo ? sGeo : [];

  var _fnMergeGeoAndValue2 = _fnMergeGeoAndValue(_sGeo, _dGeo, geoJson);

  var minValue = _fnMergeGeoAndValue2.minValue;
  var maxValue = _fnMergeGeoAndValue2.maxValue;
  var points = _fnMergeGeoAndValue2.points;
  var _clusters = _fnCreateClusters(points, NUMBER_OF_CLUSTERS, NUMBER_OF_ITERATION);
  var _hmIdCluster = _fnCreateHmIdCluster(_clusters);

  _fnMergeGeoJsonAndClusters(geoJson, _hmIdCluster, NUMBER_OF_CLUSTERS);

  var infoControl = _fnCreateInfoControl(L);
  infoControl.addTo(map);

  L.geoJSON(geoJson, {
    style: _fnStyle,
    onEachFeature: _fnOnEachFeature.bind(null, infoControl)
  }).addTo(map);

  if (points.length > 1) {
    var gradeControl = _fnCreateGradeControl(minValue, maxValue, _clusters, L);
    gradeControl.addTo(map);
  }

  return option;
};

var EuroStatToMap = {
  hmUrlGeoJson: {},
  L: undefined,

  getLeaflet: function getLeaflet() {
    var _this = this;

    if (this.L) {
      return Promise.resolve(this.L);
    } else {
      return System.import(URL_LEAFLET).then(function (L) {
        return _this.L = L;
      });
    }
  },
  getGeoJson: function getGeoJson(url) {
    var _this2 = this;

    var geoJson = this.hmUrlGeoJson[url];
    if (geoJson) {
      return Promise.resolve(geoJson);
    } else {
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (geoJson) {
        return _this2.hmUrlGeoJson[url] = geoJson;
      });
    }
  },
  drawChoroplethMap: function drawChoroplethMap(id, jsonCube, zhMapSlice) {
    var _this3 = this;

    return this.getLeaflet().then(function (L) {
      var map = L.map(id).setView([58.00, 10.00], 3);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        id: 'addis',
        attribution: '&copy; <a  href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);
      return { jsonCube: jsonCube, zhMapSlice: zhMapSlice, L: L, map: map };
    }).then(function (option) {
      return _this3.getGeoJson(URL_EU_GEOJSON).then(function (geoJson) {
        option.geoJson = geoJson;
        return option;
      });
    }).then(function (option) {
      return Promise.resolve(_createChoroplethMap(option));
    });
  }
};

exports.default = EuroStatToMap;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\eurostat\EuroStatToMap.js.map