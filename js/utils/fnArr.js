"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var fnArr = {

  findIndexByProp: function findIndexByProp(propName) {
    return function (arr, propValue) {
      if (!Array.isArray(arr)) {
        return -1;
      }

      return arr.findIndex(function (item) {
        return item[propName] === propValue;
      });
    };
  },

  isSameByProp: function isSameByProp(propName) {
    return function (arr, propValue) {
      if (!Array.isArray(arr)) {
        return false;
      }

      return arr.findIndex(function (item) {
        return item[propName] === propValue;
      }) === -1 ? false : true;
    };
  },

  isInArrStr: function isInArrStr(arr) {
    return function (str) {
      if (!Array.isArray(arr)) {
        return false;
      }
      var i = void 0;
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
     if (!Array.isArray(arr)){
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

exports.default = fnArr;
//# sourceMappingURL=fnArr.js.map