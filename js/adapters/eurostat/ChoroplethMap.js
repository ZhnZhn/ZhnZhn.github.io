"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _interopRequireWildcard2 = _interopRequireDefault(require("@babel/runtime/helpers/interopRequireWildcard"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _reactDom = require("react-dom");

var _JsonStatFn = _interopRequireDefault(require("./JsonStatFn"));

var _kMeans = _interopRequireDefault(require("../../math/k-means"));

var _mathFn = _interopRequireDefault(require("../../math/mathFn"));

var _safeGet = _interopRequireDefault(require("../../utils/safeGet"));

var _merge = _interopRequireDefault(require("../../utils/merge"));

var _MapFactory = _interopRequireDefault(require("../../components/factories/MapFactory"));

var URL_EU_GEOJSON = 'data/geo/eu-stat.geo.json',
    NUMBER_OF_CLUSTERS = 6,
    NUMBER_OF_ITERATION = 100,
    COLORS = ['#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#08519c', '#08306b', '#74c476'];

var _findFeature = function _findFeature(features, value) {
  if (!Array.isArray(features)) {
    return undefined;
  }

  for (var i = 0; i < features.length; i++) {
    if (features[i] && features[i].properties && features[i].properties.id === value) {
      return features[i];
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

  return {
    minValue: minValue,
    maxValue: maxValue,
    points: points
  };
};

var _fnCreateHmIdCluster = function _fnCreateHmIdCluster(clusters) {
  var hm = {};
  clusters.forEach(function (cluster, i) {
    for (var _iterator = cluster.points, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var point = _ref;
      hm[point.id] = i;
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

var _fnCreateEl = function _fnCreateEl(tag, className, cssText, id) {
  if (className === void 0) {
    className = '';
  }

  if (cssText === void 0) {
    cssText = '';
  }

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
      var elInfo = _MapFactory["default"].crInfo(props);

      (0, _reactDom.render)(elInfo, document.getElementById(this.idEl));
    }
  };

  wgInfo.updateCluster = function (cluster, color, from, to) {
    if (cluster) {
      var elClusterInfo = _MapFactory["default"].crClusterInfo({
        cluster: cluster,
        color: color,
        from: from,
        to: to
      });

      (0, _reactDom.render)(elClusterInfo, document.getElementById(this.idEl));
    }
  };

  return wgInfo;
};

var _fnCalcUpper = function _fnCalcUpper(clusters, index, maxValue) {
  if (clusters.length - 1 === index) {
    return maxValue;
  }

  var arrL = (0, _safeGet["default"])(clusters, "[" + index + "].points", [[0]]),
      arrH = (0, _safeGet["default"])(clusters, "[" + (index + 1) + "].points", [[0]]),
      upLow = arrL[arrL.length - 1][0],
      upUp = arrH[0] ? arrH[0][0] : upLow;
  return upLow + (upUp - upLow) / 2;
};

var _fnCreateRowEl = function _fnCreateRowEl(color, from, to, cluster, wg) {
  var _n = (0, _safeGet["default"])(cluster, "points.length", 0);

  var el = _fnCreateEl('p', '', "opacity: 0.7; background: " + color + "; padding: 5px 6px; cursor: pointer;");

  el.addEventListener('click', function (event) {
    wg.updateCluster(cluster, color, from, to);
  });
  el.innerHTML = "<span>" + from + "&ndash;" + to + "<span>\n                  <span style=\"float: right; color: black; padding-left: 16px\">" + _n + "</span>";
  return el;
};

var _fnCreateFooterEl = function _fnCreateFooterEl() {
  var el = _fnCreateEl('div');

  el.innerHTML = "<p style=\"opacity:0.65;background:green;padding: 3px 6px\">No Data</p>\n                  <p style=\"color:black;padding-top: 5px;\">Source: Eurostat</p>";
  return el;
};

var _fnCreateGradeControl = function _fnCreateGradeControl(minValue, maxValue, clusters, L, wg) {
  var gradeContorl = L.control({
    position: 'bottomleft'
  });

  gradeContorl.onAdd = function (map) {
    var _div = _fnCreateEl('div', 'control-grade');

    var _upperPrev, _upperNext;

    _upperPrev = _mathFn["default"].toFixed(minValue);
    clusters.forEach(function (cluster, index) {
      _upperNext = _mathFn["default"].toFixed(_fnCalcUpper(clusters, index, maxValue));

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

var _fnOnMouseOut = function _fnOnMouseOut(infoControl, e) {//infoControl.update()
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
      seriaSlice = (0, _objectWithoutPropertiesLoose2["default"])(configSlice, ["time"]);
  /* eslint-enable no-unused-vars */

  return points.map(function (point) {
    seriaSlice.geo = point.id;
    point.seria = _JsonStatFn["default"].crGeoSeria(statJson, seriaSlice);
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
      _JsonStatFn$createGeo = _JsonStatFn["default"].createGeoSlice(statJson, configSlice),
      dGeo = _JsonStatFn$createGeo.dGeo,
      sGeo = _JsonStatFn$createGeo.sGeo,
      time = _JsonStatFn$createGeo.time,
      _fnMergeGeoAndValue2 = _fnMergeGeoAndValue(sGeo, dGeo, geoJson),
      minValue = _fnMergeGeoAndValue2.minValue,
      maxValue = _fnMergeGeoAndValue2.maxValue,
      points = _fnMergeGeoAndValue2.points,
      _points = _fnAddGeoSeria(points, statJson, configSlice),
      _clusters = _kMeans["default"].crUnarySortedCluster(_points, NUMBER_OF_CLUSTERS, NUMBER_OF_ITERATION),
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
  var _geoJson = (0, _merge["default"])(true, {}, geoJson);

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
      return Promise.resolve().then(function () {
        return (0, _interopRequireWildcard2["default"])(require('leaflet'));
      }).then(function (L) {
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
        id: id + '_tile'
      }).addTo(map);
      return {
        jsonCube: jsonCube,
        zhMapSlice: zhMapSlice,
        L: L,
        map: map,
        mapId: id
      };
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
var _default = ChoroplethMap;
exports["default"] = _default;
//# sourceMappingURL=ChoroplethMap.js.map