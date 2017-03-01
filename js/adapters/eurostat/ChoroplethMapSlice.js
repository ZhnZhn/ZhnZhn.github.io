"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeI = {
  createMapValue: function createMapValue(props, item) {
    var group = props.group,
        value = item.value;

    return group + "?indic=" + value;
  },
  createMapSlice: function createMapSlice(props, item) {
    var mapSlice = props.mapSlice,
        value = item.value;

    return _extends({}, mapSlice, { indic: value });
  }
};
var _typeZ = {
  createMapValue: function createMapValue(props, item) {
    var value = item.value;

    return value + "?";
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


    if (_fnCreate) {
      return _fnCreate(props, item);
    } else {
      return undefined;
    }
  },
  createMapSlice: function createMapSlice(props, item) {
    var mapType = props.mapType,
        _fnCreate = _rMapSlice[mapType];


    if (_fnCreate) {
      return _fnCreate(props, item);
    } else {
      return undefined;
    }
  }
};

exports.default = ChoroplethMapSlice;
//# sourceMappingURL=ChoroplethMapSlice.js.map