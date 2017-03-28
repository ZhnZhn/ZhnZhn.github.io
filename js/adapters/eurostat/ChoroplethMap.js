'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash.get');

var _lodash2 = _interopRequireDefault(_lodash);

var _JsonStatFn = require('./JsonStatFn');

var _JsonStatFn2 = _interopRequireDefault(_JsonStatFn);

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
    URL_EU_GEOJSON = 'data/geo/eu-stat.geo.json',
    NUMBER_OF_CLUSTERS = 6,
    NUMBER_OF_ITERATION = 100,
    COLORS = ['#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#08519c', '#08306b', '#74c476'];

var _findFeature = function _findFeature() {
  var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var value = arguments[1];

  var i = 0,
      len = arr.length;
  for (; i < len; i++) {
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
  return _kMeans2.default.unarySortedClusters();
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
    "fillColor": COLORS[feature.properties.cluster],
    "weight": 1,
    "fillOpacity": 0.7,
    "opacity": 0.65
  };
};

var _fnCreateEl = function _fnCreateEl(tag) {
  var className = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var cssText = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  var el = document.createElement(tag);
  el.className = className;
  el.style.cssText = cssText;
  return el;
};

var _fnCreateInfoControl = function _fnCreateInfoControl(L) {
  var wgInfo = L.control();
  wgInfo.onAdd = function (map) {
    this.divEl = _fnCreateEl('div', 'control-info');
    return this.divEl;
  };
  wgInfo.update = function (props) {
    if (props) {
      var label = props.label,
          value = props.value;

      this.divEl.innerHTML = '<p><span>' + label + ':&nbsp;</span><span>' + (value ? value : 'unknown') + '</span></p>';
    }
  };
  wgInfo.updateCluster = function (cluster, color, from, to) {
    if (cluster) {
      var str = '<p style="background: ' + color + '; opacity: 0.7; padding: 3px">' + from + '-' + to + '</p>';
      var points = (0, _lodash2.default)(cluster, 'points', []);
      points.forEach(function (point) {
        str += '<p style="padding: 3px;"><span style="display: inline-block; width: 30px;">' + point.id + '</span><span>' + point[0] + '</span></p>';
      });
      this.divEl.innerHTML = str;
    }
  };
  return wgInfo;
};

var _fnCalcUpper = function _fnCalcUpper(clusters, index) {
  var arrL = (0, _lodash2.default)(clusters, '[' + index + '].points', [[0]]),
      arrH = (0, _lodash2.default)(clusters, '[' + (index + 1) + '].points', [[0]]),
      upLow = arrL[arrL.length - 1][0],
      upUp = arrH[0] ? arrH[0][0] : upLow;

  return upLow + (upUp - upLow) / 2;
};

var _fnCreateRowEl = function _fnCreateRowEl(color, from, to, cluster, wg) {
  var _n = (0, _lodash2.default)(cluster, 'points.length', 0);
  var el = _fnCreateEl('p', '', 'opacity: 0.7; background: ' + color + '; padding: 5px 6px; cursor: pointer;');
  el.addEventListener('click', function (event) {
    //console.log(cluster)
    wg.updateCluster(cluster, color, from, to);
  });
  el.innerHTML = '<span>' + from + '&ndash;' + to + '<span>\n                  <span style="float: right; color: black;">' + _n + '</span>';
  return el;
};
var _fnCreateFooterEl = function _fnCreateFooterEl() {
  var el = _fnCreateEl('div');
  el.innerHTML = '<p style="opacity:0.65;background:green;padding: 3px 6px">No Data</p>\n                  <p style="color:black;padding-top: 5px;">Source: EuroStat</p>';
  return el;
};

var _fnCreateGradeControl = function _fnCreateGradeControl(minValue, maxValue, clusters, L, wg) {
  var gradeContorl = L.control({ position: 'bottomleft' });
  gradeContorl.onAdd = function (map) {
    var _div = _fnCreateEl('div', 'control-grade');

    var _upperPrev = Math.round(_fnCalcUpper(clusters, 0));
    _div.appendChild(_fnCreateRowEl(COLORS[0], Math.floor(minValue), _upperPrev, clusters[0], wg));

    var i = void 0,
        _upperNext = void 0;
    for (i = 1; i < NUMBER_OF_CLUSTERS - 1; i++) {
      _upperNext = Math.round(_fnCalcUpper(clusters, i));
      _div.appendChild(_fnCreateRowEl(COLORS[i], _upperPrev, _upperNext, clusters[i], wg));
      _upperPrev = _upperNext;
    }
    _div.appendChild(_fnCreateRowEl(COLORS[NUMBER_OF_CLUSTERS - 1], _upperPrev, Math.round(maxValue), clusters[i], wg));
    _div.appendChild(_fnCreateFooterEl());

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
  var statJson = option.jsonCube,
      geoJson = option.geoJson,
      configSlice = option.zhMapSlice,
      map = option.map,
      L = option.L,
      _JsonStatFn$createGeo = _JsonStatFn2.default.createGeoSlice(statJson, configSlice),
      dGeo = _JsonStatFn$createGeo.dGeo,
      sGeo = _JsonStatFn$createGeo.sGeo,
      _fnMergeGeoAndValue2 = _fnMergeGeoAndValue(sGeo, dGeo, geoJson),
      minValue = _fnMergeGeoAndValue2.minValue,
      maxValue = _fnMergeGeoAndValue2.maxValue,
      points = _fnMergeGeoAndValue2.points,
      _clusters = _fnCreateClusters(points, NUMBER_OF_CLUSTERS, NUMBER_OF_ITERATION),
      _hmIdCluster = _fnCreateHmIdCluster(_clusters);

  _fnMergeGeoJsonAndClusters(geoJson, _hmIdCluster, NUMBER_OF_CLUSTERS);

  var infoControl = _fnCreateInfoControl(L);
  infoControl.addTo(map);

  L.geoJSON(geoJson, {
    style: _fnStyle,
    onEachFeature: _fnOnEachFeature.bind(null, infoControl)
  }).addTo(map);

  if (points.length > 1) {
    var gradeControl = _fnCreateGradeControl(minValue, maxValue, _clusters, L, infoControl);
    gradeControl.addTo(map);
  }

  return option;
};

var ChoroplethMap = {
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
  draw: function draw(id, jsonCube, zhMapSlice) {
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

exports.default = ChoroplethMap;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\eurostat\ChoroplethMap.js.map