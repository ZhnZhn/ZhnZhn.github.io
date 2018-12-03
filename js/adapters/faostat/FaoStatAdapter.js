'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ConfigBuilder = require('../../charts/ConfigBuilder');

var _ConfigBuilder2 = _interopRequireDefault(_ConfigBuilder);

var _Tooltip = require('../../charts/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _fnAdapter = require('./fnAdapter');

var _fnAdapter2 = _interopRequireDefault(_fnAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var crId = _fnAdapter2.default.crId,
    crSubtitle = _fnAdapter2.default.crSubtitle,
    crTitle = _fnAdapter2.default.crTitle,
    toDataPoints = _fnAdapter2.default.toDataPoints,
    crZhConfig = _fnAdapter2.default.crZhConfig,
    toInfo = _fnAdapter2.default.toInfo,
    crValueMoving = _fnAdapter2.default.crValueMoving,
    crSeriaData = _fnAdapter2.default.crSeriaData,
    checkToSeries = _fnAdapter2.default.checkToSeries;


var FaoStatAdapter = {
  crKey: crId,

  toConfig: function toConfig(json, option) {
    var _id = crId(option),
        _title = crTitle(json, option),
        _subtitle = crSubtitle(json, option),
        _points = toDataPoints(json, option),
        config = (0, _ConfigBuilder2.default)().areaConfig({ spacingTop: 25 }).addCaption(_title, _subtitle).addPoints(_id, _points).addTooltip(_Tooltip2.default.fnBasePointFormatter).add({
      info: toInfo(json, _title, _subtitle),
      valueMoving: crValueMoving(_points),
      zhConfig: crZhConfig(_id, option)
    }).toConfig();
    return { config: config };
  },
  toSeries: function toSeries(json, option) {
    if (!checkToSeries(option)) {
      throw new Error('ZH_1000');
    }
    var _data = crSeriaData(json, option),
        _id = crId(option),
        parentId = option.parentId,
        oneCaption = option.oneCaption;

    return (0, _ConfigBuilder2.default)().initSeria().add({
      data: _data,
      zhSeriaId: parentId + '_' + _id,
      zhValueText: oneCaption,
      zhItemCaption: oneCaption
    }).toSeria();
  }
};

exports.default = FaoStatAdapter;
//# sourceMappingURL=FaoStatAdapter.js.map