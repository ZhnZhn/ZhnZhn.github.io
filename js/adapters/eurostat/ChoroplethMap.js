"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _reactDom = require("react-dom");

var _JsonStatFn = _interopRequireDefault(require("./JsonStatFn"));

var _kMeans = _interopRequireDefault(require("../../math/k-means"));

var _mathFn = _interopRequireDefault(require("../../math/mathFn"));

var _merge = _interopRequireDefault(require("../../utils/merge"));

var _MapFactory = _interopRequireDefault(require("../../components/factories/MapFactory"));

var _excluded = ["time"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var URL_EU_GEOJSON = 'data/geo/eu-stat.geo.json',
    NUMBER_OF_CLUSTERS = 6,
    NUMBER_OF_ITERATION = 100,
    COLORS = ['#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#08519c', '#08306b', '#74c476'];

var _isArr = Array.isArray,
    _assign = Object.assign,
    _crElement = function _crElement(tag) {
  return document.createElement(tag);
},
    _getElementById = function _getElementById(id) {
  return document.getElementById(id);
},
    _crPromise = function _crPromise(value) {
  return Promise.resolve(value);
};

var _findFeature = function _findFeature(features, id) {
  if (!_isArr(features)) {
    return;
  }

  for (var i = 0; i < features.length; i++) {
    var _features$i;

    if ((features == null ? void 0 : (_features$i = features[i]) == null ? void 0 : _features$i.properties.id) === id) {
      return features[i];
    }
  }

  return;
};

var _mergeGeoAndValue = function _mergeGeoAndValue(sGeo, dGeo, json) {
  var points = [];
  var minValue = Number.POSITIVE_INFINITY,
      maxValue = Number.NEGATIVE_INFINITY;
  sGeo.forEach(function (cell, index) {
    var feature = _findFeature(json.features, dGeo.id[index]),
        value = cell.value,
        status = cell.status;

    if (feature && value) {
      feature.properties.value = value;
      var point = [value, 0];
      point.status = status;
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

var _crHmIdCluster = function _crHmIdCluster(clusters) {
  var hm = {};
  clusters.forEach(function (cluster, i) {
    for (var _iterator = _createForOfIteratorHelperLoose(cluster.points), _step; !(_step = _iterator()).done;) {
      var point = _step.value;
      hm[point.id] = i;
    }
  });
  return hm;
};

var _mergeGeoJsonAndClusters = function _mergeGeoJsonAndClusters(geoJson, hmIdCluster, maxCluster) {
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

var _crStyle = function _crStyle(feature) {
  return {
    "color": 'green',
    "fillColor": COLORS[feature.properties.cluster],
    "weight": 1,
    "fillOpacity": 0.7,
    "opacity": 0.65
  };
};

var _crEl = function _crEl(tag, className, cssText, id) {
  if (className === void 0) {
    className = '';
  }

  if (cssText === void 0) {
    cssText = '';
  }

  var el = _crElement(tag);

  el.className = className;
  el.style.cssText = cssText;

  if (id) {
    el.id = id;
  }

  return el;
};

var _crInfoControl = function _crInfoControl(L, mapId) {
  return _assign(L.control(), {
    onAdd: function onAdd(map) {
      this.idEl = mapId + '_info-control';
      this.divEl = _crEl('div', 'control-info', '', this.idEl);
      return this.divEl;
    },
    update: function update(props) {
      if (props) {
        var elInfo = _MapFactory.default.crInfo(props);

        (0, _reactDom.render)(elInfo, _getElementById(this.idEl));
      }
    },
    updateCluster: function updateCluster(cluster, color, from, to) {
      if (cluster) {
        var elClusterInfo = _MapFactory.default.crClusterInfo({
          cluster: cluster,
          color: color,
          from: from,
          to: to
        });

        (0, _reactDom.render)(elClusterInfo, _getElementById(this.idEl));
      }
    }
  });
};

var _calcUpper = function _calcUpper(clusters, index, maxValue) {
  var _clusters$index$point, _clusters$index, _clusters$points;

  if (clusters.length - 1 === index) {
    return maxValue;
  }

  var arrL = (_clusters$index$point = clusters == null ? void 0 : (_clusters$index = clusters[index]) == null ? void 0 : _clusters$index.points) != null ? _clusters$index$point : [[0]],
      arrH = (_clusters$points = clusters == null ? void 0 : clusters[index + 1].points) != null ? _clusters$points : [[0]],
      upLow = arrL[arrL.length - 1][0],
      upUp = arrH[0] ? arrH[0][0] : upLow;
  return upLow + (upUp - upLow) / 2;
};

var _crRowEl = function _crRowEl(color, from, to, cluster, wg) {
  var _cluster$points$lengt, _cluster$points;

  var _n = (_cluster$points$lengt = cluster == null ? void 0 : (_cluster$points = cluster.points) == null ? void 0 : _cluster$points.length) != null ? _cluster$points$lengt : 0,
      el = _crEl('p', '', "opacity: 0.7; background: " + color + "; padding: 5px 6px; cursor: pointer;");

  el.addEventListener('click', function (event) {
    wg.updateCluster(cluster, color, from, to);
  });
  el.innerHTML = "<span>" + from + "&ndash;" + to + "<span>\n                  <span style=\"float: right; color: black; padding-left: 16px\">" + _n + "</span>";
  return el;
};

var _crFooterEl = function _crFooterEl() {
  var el = _crEl('div');

  el.innerHTML = "<p style=\"opacity:0.65;background:green;padding: 3px 6px\">No Data</p>\n                  <p style=\"color:black;padding-top: 5px;\">Source: Eurostat</p>";
  return el;
};

var _crGradeControl = function _crGradeControl(minValue, maxValue, clusters, L, wg) {
  var gradeContorl = L.control({
    position: 'bottomleft'
  });

  gradeContorl.onAdd = function (map) {
    var _div = _crEl('div', 'control-grade');

    var _upperPrev, _upperNext;

    _upperPrev = _mathFn.default.toFixed(minValue);
    clusters.forEach(function (cluster, index) {
      _upperNext = _mathFn.default.toFixed(_calcUpper(clusters, index, maxValue));

      _div.appendChild(_crRowEl(COLORS[index], _upperPrev, _upperNext, cluster, wg));

      _upperPrev = _upperNext;
    });

    _div.appendChild(_crFooterEl());

    return _div;
  };

  return gradeContorl;
};

var _onMouseOver = function _onMouseOver(infoControl, e) {
  var _layer = e.target;
  infoControl.update(_layer.feature.properties);
};
/*
const  _onMouseOut = function(infoControl, e){
  //infoControl.update()
}
*/


var _fnOnEachFeature = function _fnOnEachFeature(infoControl, feature, layer) {
  layer.on({
    mouseover: _onMouseOver.bind(null, infoControl) //mouseout: _onMouseOut.bind(null, infoControl)

  });
};

var _addGeoSeria = function _addGeoSeria(points, statJson, configSlice) {
  /* eslint-disable no-unused-vars */
  var time = configSlice.time,
      seriaSlice = (0, _objectWithoutPropertiesLoose2.default)(configSlice, _excluded);
  /* eslint-enable no-unused-vars */

  return points.map(function (point) {
    seriaSlice.geo = point.id;
    point.seria = _JsonStatFn.default.crGeoSeria(statJson, seriaSlice);
    return point;
  });
};

var _crChoroplethMap = function _crChoroplethMap(option) {
  var statJson = option.jsonCube,
      geoJson = option.geoJson,
      configSlice = option.zhMapSlice,
      map = option.map,
      L = option.L,
      mapId = option.mapId,
      dfTime = option.time,
      _JsonStatFn$createGeo = _JsonStatFn.default.createGeoSlice(statJson, configSlice, dfTime),
      dGeo = _JsonStatFn$createGeo.dGeo,
      sGeo = _JsonStatFn$createGeo.sGeo,
      time = _JsonStatFn$createGeo.time,
      _mergeGeoAndValue2 = _mergeGeoAndValue(sGeo, dGeo, geoJson),
      minValue = _mergeGeoAndValue2.minValue,
      maxValue = _mergeGeoAndValue2.maxValue,
      points = _mergeGeoAndValue2.points,
      _points = _addGeoSeria(points, statJson, configSlice),
      _clusters = _kMeans.default.crUnarySortedCluster(_points, NUMBER_OF_CLUSTERS, NUMBER_OF_ITERATION),
      _hmIdCluster = _crHmIdCluster(_clusters);

  _mergeGeoJsonAndClusters(geoJson, _hmIdCluster, NUMBER_OF_CLUSTERS);

  var infoControl = _crInfoControl(L, mapId);

  infoControl.addTo(map);
  L.geoJSON(geoJson, {
    style: _crStyle,
    onEachFeature: _fnOnEachFeature.bind(null, infoControl)
  }).addTo(map);

  if (_points.length > 1) {
    var gradeControl = _crGradeControl(minValue, maxValue, _clusters, L, infoControl);

    gradeControl.addTo(map);
  }

  option.time = time;
  return option;
};

var _crGeoJson = function _crGeoJson(geoJson) {
  var _geoJson = (0, _merge.default)(true, {}, geoJson);

  _geoJson.features.forEach(function (feature) {
    feature.properties.value = null;
  });

  return _geoJson;
};

var ChoroplethMap = {
  hmUrlGeoJson: {},
  L: undefined,
  mapOption: {
    doubleClickZoom: false,
    zoomSnap: 0.5,
    minZoom: 1,
    maxZoom: 4
  },
  getLeaflet: function getLeaflet() {
    var _this = this;

    if (this.L) {
      return _crPromise(this.L);
    } else {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('leaflet'));
      }).then(function (L) {
        return _this.L = L;
      });
    }
  },
  getGeoJson: function getGeoJson(url) {
    var _this2 = this;

    var geoJson = this.hmUrlGeoJson[url];

    if (geoJson) {
      return _crPromise(_crGeoJson(geoJson));
    } else {
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (geoJson) {
        return _this2.hmUrlGeoJson[url] = geoJson;
      });
    }
  },
  draw: function draw(options) {
    var _this3 = this;

    return this._loadCss().then(function () {
      return _this3._draw(options);
    });
  },
  _loadCss: function _loadCss() {
    var _this4 = this;

    return this._isCss ? _crPromise() : new Promise(function (resolve, reject) {
      var _linkEl = _assign(_crElement("link"), {
        rel: "stylesheet",
        href: "css/leaflet.css",
        onload: function onload() {
          _this4._isCss = true;
          resolve();
        },
        onerror: function onerror() {
          _linkEl.remove();

          reject();
        }
      }); // Insert it at the end of the head in a legacy-friendly manner


      var _document = document,
          head = _document.head,
          childNodes = head.childNodes;
      head.insertBefore(_linkEl, childNodes[childNodes.length - 1].nextSibling);
    });
  },
  _draw: function _draw(_ref) {
    var _this5 = this;

    var id = _ref.id,
        jsonCube = _ref.jsonCube,
        zhMapSlice = _ref.zhMapSlice,
        time = _ref.time;
    return this.getLeaflet().then(function (L) {
      var map = L.map(id, _this5.mapOption).setView([58.00, 10.00], 3);
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
        time: time,
        L: L,
        map: map,
        mapId: id
      };
    }).then(function (option) {
      return _this5.getGeoJson(URL_EU_GEOJSON).then(function (geoJson) {
        option.geoJson = geoJson;
        return option;
      });
    }).then(function (option) {
      return _crPromise(_crChoroplethMap(option));
    });
  }
};
var _default = ChoroplethMap;
exports.default = _default;
//# sourceMappingURL=ChoroplethMap.js.map