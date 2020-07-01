"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _isArr = Array.isArray,
    _fIsItem = function _fIsItem(propName, propValue) {
  return function (item) {
    return item[propName] === propValue;
  };
},
    _findArrIndexBy = function _findArrIndexBy(arr, propName, propValue) {
  return arr.findIndex(_fIsItem(propName, propValue));
};

var fnArr = {
  findIndexByProp: function findIndexByProp(propName) {
    return function (arr, propValue) {
      return _isArr(arr) ? _findArrIndexBy(arr, propName, propValue) : -1;
    };
  },
  isSameByProp: function isSameByProp(propName) {
    return function (arr, propValue) {
      return _isArr(arr) ? _findArrIndexBy(arr, propName, propValue) === -1 ? false : true : false;
    };
  },
  isInArrStr: function isInArrStr(arr) {
    return function (str) {
      if (!_isArr(arr)) {
        return false;
      }

      var i;

      for (i = 0; i < arr.length; i++) {
        if (str === arr[i]) {
          return true;
        }
      }

      return false;
    };
  }
  /*
  isStrInArr: (str) => (arr) => {
     if (!_isArr(arr)){
       return false;
     }
     let i;
     for(i=0;i<arr.length;i++){
       if (str === arr[i]){
         return true;
       }
     }
     return false;
  }
  */

};
var _default = fnArr;
exports["default"] = _default;
//# sourceMappingURL=fnArr.js.map