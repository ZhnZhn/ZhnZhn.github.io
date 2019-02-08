'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var fnSelector = {
  _getDocs: function _getDocs(json) {
    return json.series.docs;
  },
  _getPropBy: function _getPropBy(json, propName) {
    return fnSelector._getDocs(json)[0][propName] || '';
  },

  getPeriodAndValue: function getPeriodAndValue(json) {
    var docs = fnSelector._getDocs(json);
    return {
      period: docs[0].period,
      value: docs[0].value
    };
  },

  getTitle: function getTitle(json) {
    return fnSelector._getPropBy(json, 'dataset_name');
  },
  getSubtitle: function getSubtitle(json) {
    return fnSelector._getPropBy(json, 'series_name');
  }
};

exports.default = fnSelector;
//# sourceMappingURL=fnSelector.js.map