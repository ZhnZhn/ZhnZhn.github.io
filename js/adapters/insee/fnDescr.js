"use strict";

exports.__esModule = true;
exports.crInfo = void 0;
var _CL = require("../CL");
const _crPropName = title => title[0].toLowerCase() + title.slice(1);
const _crSpan = (title, seria, value) => "<span class=\"" + _CL.CL_PR_8 + "\">\n  <span class=\"" + _CL.CL_DARK_BLUE + "\">" + title + ":&nbsp;</span>\n  <span>" + (value == null ? seria[_crPropName(title)] : value) + "</span>\n</span>";
const crInfo = (title, subtitle, seriesParams) => ({
  name: subtitle ? title + ': ' + subtitle : title,
  description: seriesParams.reduce((strDom, seria) => strDom + "\n       <div class=\"" + _CL.CL_BLACK + "\">" + seria.title + "</div>\n       <div>\n         " + _crSpan('IDBANK', seria, seria.id) + "\n         " + _crSpan('Frequency', seria) + "\n         " + _crSpan('UpdatedOn', seria) + "\n       </div>\n       <div>\n         " + _crSpan('UnitMeasure', seria) + "\n         " + _crSpan('UnitMult', seria) + "\n       </div>\n       <div>\n         <a href=\"https://www.insee.fr/en/statistiques/serie/" + seria.id + "\">INSEE Data Link</a>\n       </div>\n       <br/>\n    ", '')
});
exports.crInfo = crInfo;
//# sourceMappingURL=fnDescr.js.map