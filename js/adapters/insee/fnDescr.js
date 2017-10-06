'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var S = {
  ROOT: 'style="display:inline-block;padding-right:8px;"',
  TITLE: 'style="color:#1b75bb;"'
};

var _crSpan = function _crSpan(title, value) {
  return '\n   <span ' + S.ROOT + '>\n     <span ' + S.TITLE + '>' + title + ':&nbsp;</span>\n     <span>' + value + '</span>\n   </span>\n  ';
};

var fnDescr = {
  toInfo: function toInfo(info, title) {
    var strDom = '';
    info.forEach(function (seria) {
      var title = seria.title,
          id = seria.id,
          updatedOn = seria.updatedOn,
          frequency = seria.frequency,
          unitMeasure = seria.unitMeasure,
          unitMult = seria.unitMult;

      strDom += '\n        <div style="color:black;">' + title + '</div>\n        <div>\n          ' + _crSpan('IDBANK', id) + '\n          ' + _crSpan('Frequency', frequency) + '\n          ' + _crSpan('UpdatedOn', updatedOn) + '\n        </div>\n        <div>\n          ' + _crSpan('UnitMeasure', unitMeasure) + '\n          ' + _crSpan('UnitMult', unitMult) + '\n        </div>\n        <div>\n          <a href="https://www.insee.fr/en/statistiques/serie/' + id + '">INSEE Data Link</a>\n        </div>\n        <br/>\n      ';
    });
    return {
      name: title,
      description: strDom
    };
  }
};

exports.default = fnDescr;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\insee\fnDescr.js.map