"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require("babel-runtime/helpers/extends");

var _extends4 = _interopRequireDefault(_extends3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _typeI = {
  createMapValue: function createMapValue(props, item) {
    var group = props.group,
        _props$mapPropName = props.mapPropName,
        mapPropName = _props$mapPropName === undefined ? "indic" : _props$mapPropName;

    return group + "?" + mapPropName + "=" + item.value;
  },
  createMapSlice: function createMapSlice(props, item) {
    var mapSlice = props.mapSlice,
        _props$mapPropName2 = props.mapPropName,
        mapPropName = _props$mapPropName2 === undefined ? "indic" : _props$mapPropName2;

    return (0, _extends4.default)({}, mapSlice, (0, _defineProperty3.default)({}, mapPropName, item.value));
  }
};
var _typeZ = {
  createMapValue: function createMapValue(props, item) {
    return item.value + "?";
  },
  createMapSlice: function createMapSlice() {
    return {};
  }
};

var _rMapValue = {
  "I": _typeI.createMapValue,
  "Z": _typeZ.createMapValue
};
var _rMapSlice = {
  "I": _typeI.createMapSlice,
  "Z": _typeZ.createMapSlice
};

var ChoroplethMapSlice = {
  createMapValue: function createMapValue(props, item) {
    var mapType = props.mapType,
        _fnCreate = _rMapValue[mapType];

    return _fnCreate ? _fnCreate(props, item) : undefined;
  },
  createMapSlice: function createMapSlice(props, item) {
    var mapType = props.mapType,
        _fnCreate = _rMapSlice[mapType];

    return _fnCreate ? _fnCreate(props, item) : undefined;
  }
};

exports.default = ChoroplethMapSlice;
//# sourceMappingURL=ChoroplethMapSlice.js.map