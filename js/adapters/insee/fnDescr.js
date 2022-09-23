"use strict";

exports.__esModule = true;
exports.default = void 0;

var _CL = require("../CL");

const _crSpan = (title, value) => "\n <span class=\"" + _CL.CL_PR_8 + "\">\n  <span class=\"" + _CL.CL_DARK_BLUE + "\">" + title + ":&nbsp;</span>\n  <span>" + value + "</span>\n </span>\n";

const fnDescr = {
  toInfo(info, title) {
    let _strDom = '';
    info.forEach(seria => {
      const {
        title,
        id,
        updatedOn,
        frequency,
        unitMeasure,
        unitMult
      } = seria;
      _strDom += "\n        <div class=\"" + _CL.CL_BLACK + "\">" + title + "</div>\n        <div>\n          " + _crSpan('IDBANK', id) + "\n          " + _crSpan('Frequency', frequency) + "\n          " + _crSpan('UpdatedOn', updatedOn) + "\n        </div>\n        <div>\n          " + _crSpan('UnitMeasure', unitMeasure) + "\n          " + _crSpan('UnitMult', unitMult) + "\n        </div>\n        <div>\n          <a href=\"https://www.insee.fr/en/statistiques/serie/" + id + "\">INSEE Data Link</a>\n        </div>\n        <br/>\n      ";
    });
    return {
      name: title,
      description: _strDom
    };
  }

};
var _default = fnDescr;
exports.default = _default;
//# sourceMappingURL=fnDescr.js.map