"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _typeI = {
  createMapValue: function createMapValue(props, item) {
    var group = props.group,
        value = item.value;

    return group + "?indic=" + value;
  },
  createMapSlice: function createMapSlice(props, item) {
    var mapSlice = props.mapSlice,
        value = item.value;

    return (0, _extends3.default)({}, mapSlice, { indic: value });
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