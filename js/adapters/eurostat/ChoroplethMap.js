'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _reactDom = require('react-dom');

var _lodash = require('lodash.merge');

var _lodash2 = _interopRequireDefault(_lodash);

var _JsonStatFn = require('./JsonStatFn');

var _JsonStatFn2 = _interopRequireDefault(_JsonStatFn);

var _kMeans = require('../../math/k-means');

var _kMeans2 = _interopRequireDefault(_kMeans);

var _mathFn = require('../../math/mathFn');

var _mathFn2 = _interopRequireDefault(_mathFn);

var _safeGet = require('../../utils/safeGet');

var _safeGet2 = _interopRequireDefault(_safeGet);

var _MapFactory = require('../../components/factories/MapFactory');

var _MapFactory2 = _interopRequireDefault(_MapFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*eslint-disable no-undef */
if (process.env.NODE_ENV !== 'development') {
  window.System.config({
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
    var feature = _findFeature(json.features, dGeo.id[index]),
        value = cell.value;
    if (feature && value) {
      feature.properties.value = value;

      var point = [value, 0];
      point.id = feature.properties.id;
      points.push(point);

      if (minValue > value) {
        minValue = value;
      }
      if (maxValue < value) {
        maxValue = value;
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
  var id = arguments[3];

  var el = document.createElement(tag);
  el.className = className;
  el.style.cssText = cssText;
  if (id) {
    el.id = id;
  }
  return el;
};

var _fnCreateInfoControl = function _fnCreateInfoControl(L, mapId) {
  var wgInfo = L.control();
  wgInfo.onAdd = function (map) {
    this.idEl = mapId + '_info-control';
    this.divEl = _fnCreateEl('div', 'control-info', '', this.idEl);
    return this.divEl;
  };
  wgInfo.update = function (props) {
    if (props) {
      var elInfo = _MapFactory2.default.crInfo(props);
      (0, _reactDom.render)(elInfo, document.getElementById(this.idEl));
    }
  };
  wgInfo.updateCluster = function (cluster, color, from, to) {
    if (cluster) {
      var elClusterInfo = _MapFactory2.default.crClusterInfo({ cluster: cluster, color: color, from: from, to: to });
      (0, _reactDom.render)(elClusterInfo, document.getElementById(this.idEl));
    }
  };
  return wgInfo;
};

var _fnCalcUpper = function _fnCalcUpper(clusters, index, maxValue) {
  if (clusters.length - 1 === index) {
    return maxValue;
  }
  var arrL = (0, _safeGet2.default)(clusters, '[' + index + '].points', [[0]]),
      arrH = (0, _safeGet2.default)(clusters, '[' + (index + 1) + '].points', [[0]]),
      upLow = arrL[arrL.length - 1][0],
      upUp = arrH[0] ? arrH[0][0] : upLow;

  return upLow + (upUp - upLow) / 2;
};

var _fnCreateRowEl = function _fnCreateRowEl(color, from, to, cluster, wg) {
  var _n = (0, _safeGet2.default)(cluster, 'points.length', 0);
  var el = _fnCreateEl('p', '', 'opacity: 0.7; background: ' + color + '; padding: 5px 6px; cursor: pointer;');
  el.addEventListener('click', function (event) {
    wg.updateCluster(cluster, color, from, to);
  });
  el.innerHTML = '<span>' + from + '&ndash;' + to + '<span>\n                  <span style="float: right; color: black; padding-left: 16px">' + _n + '</span>';
  return el;
};
var _fnCreateFooterEl = function _fnCreateFooterEl() {
  var el = _fnCreateEl('div');
  el.innerHTML = '<p style="opacity:0.65;background:green;padding: 3px 6px">No Data</p>\n                  <p style="color:black;padding-top: 5px;">Source: Eurostat</p>';
  return el;
};

var _fnCreateGradeControl = function _fnCreateGradeControl(minValue, maxValue, clusters, L, wg) {
  var gradeContorl = L.control({ position: 'bottomleft' });
  gradeContorl.onAdd = function (map) {
    var _div = _fnCreateEl('div', 'control-grade');

    var _upperPrev = void 0,
        _upperNext = void 0;
    _upperPrev = _mathFn2.default.toFixed(minValue);
    clusters.forEach(function (cluster, index) {
      _upperNext = _mathFn2.default.toFixed(_fnCalcUpper(clusters, index, maxValue));
      _div.appendChild(_fnCreateRowEl(COLORS[index], _upperPrev, _upperNext, cluster, wg));
      _upperPrev = _upperNext;
    });
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

var _fnAddGeoSeria = function _fnAddGeoSeria(points, statJson, configSlice) {
  /* eslint-disable no-unused-vars */
  var time = configSlice.time,
      seriaSlice = (0, _objectWithoutProperties3.default)(configSlice, ['time']);
  /* eslint-enable no-unused-vars */

  return points.map(function (point) {
    seriaSlice.geo = point.id;
    point.seria = _JsonStatFn2.default.crGeoSeria(statJson, seriaSlice);
    return point;
  });
};

var _createChoroplethMap = function _createChoroplethMap(option) {
  var statJson = option.jsonCube,
      geoJson = option.geoJson,
      configSlice = option.zhMapSlice,
      map = option.map,
      L = option.L,
      mapId = option.mapId,
      _JsonStatFn$createGeo = _JsonStatFn2.default.createGeoSlice(statJson, configSlice),
      dGeo = _JsonStatFn$createGeo.dGeo,
      sGeo = _JsonStatFn$createGeo.sGeo,
      time = _JsonStatFn$createGeo.time,
      _fnMergeGeoAndValue2 = _fnMergeGeoAndValue(sGeo, dGeo, geoJson),
      minValue = _fnMergeGeoAndValue2.minValue,
      maxValue = _fnMergeGeoAndValue2.maxValue,
      points = _fnMergeGeoAndValue2.points,
      _points = _fnAddGeoSeria(points, statJson, configSlice),
      _clusters = _kMeans2.default.crUnarySortedCluster(_points, NUMBER_OF_CLUSTERS, NUMBER_OF_ITERATION),
      _hmIdCluster = _fnCreateHmIdCluster(_clusters);

  _fnMergeGeoJsonAndClusters(geoJson, _hmIdCluster, NUMBER_OF_CLUSTERS);
  var infoControl = _fnCreateInfoControl(L, mapId);
  infoControl.addTo(map);

  L.geoJSON(geoJson, {
    style: _fnStyle,
    onEachFeature: _fnOnEachFeature.bind(null, infoControl)
  }).addTo(map);

  if (_points.length > 1) {
    var gradeControl = _fnCreateGradeControl(minValue, maxValue, _clusters, L, infoControl);
    gradeControl.addTo(map);
  }

  option.time = time;
  return option;
};

var _crGeoJson = function _crGeoJson(geoJson) {
  var _geoJson = (0, _lodash2.default)({}, geoJson);
  _geoJson.features.forEach(function (feature) {
    feature.properties.value = null;
  });
  return _geoJson;
};

var ChoroplethMap = {
  hmUrlGeoJson: {},
  L: undefined,
  mapOption: {
    doubleClickZoom: false
  },

  getLeaflet: function getLeaflet() {
    var _this = this;

    if (this.L) {
      return Promise.resolve(this.L);
    } else {
      return window.System.import(URL_LEAFLET).then(function (L) {
        return _this.L = L;
      });
    }
  },
  getGeoJson: function getGeoJson(url) {
    var _this2 = this;

    var geoJson = this.hmUrlGeoJson[url];
    if (geoJson) {
      return Promise.resolve(_crGeoJson(geoJson));
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
      var map = L.map(id, _this3.mapOption).setView([58.00, 10.00], 3);

      /*
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
           id: 'addis',
           attribution: '&copy; <a  href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
           errorTileUrl: ''
      }).addTo(map);
      */

      L.tileLayer('', {
        //id: 'addis',
        id: id + '_tile'
      }).addTo(map);

      return { jsonCube: jsonCube, zhMapSlice: zhMapSlice, L: L, map: map, mapId: id };
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
//# sourceMappingURL=ChoroplethMap.js.map