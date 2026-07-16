"use strict";

exports.__esModule = true;
exports.crInfo = void 0;
var _arrFn = require("../../utils/arrFn");
const _crPairToken = (caption, value) => value ? `${caption}: ${value}` : '';
const crInfo = (title, subtitle, seriesParams) => {
  const _descr = seriesParams?.[0],
    _seriesId = _descr?.id;
  return {
    name: (0, _arrFn.joinByColon)(title, subtitle),
    descr: _descr ? [_descr.title, `${_crPairToken('IDBANK', _seriesId)} ${_crPairToken('Frequency', _descr.frequency)} ${_crPairToken('UpdatedOn', _descr.updatedOn)}`, `${_crPairToken('UnitMeasure', _descr.unitMeasure)} ${_crPairToken('UnitMult', _descr.unitMult)}`] : void 0,
    href: _seriesId ? [`https://www.insee.fr/en/statistiques/serie/${_seriesId}`, "INSEE Data Link"] : void 0
  };
};
exports.crInfo = crInfo;
//# sourceMappingURL=fnDescr.js.map