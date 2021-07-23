"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _tpSpline = _interopRequireDefault(require("./tp/tpSpline"));

var _tpCategory = _interopRequireDefault(require("./tp/tpCategory"));

var _tpScatter = _interopRequireDefault(require("./tp/tpScatter"));

var _tpStock = _interopRequireDefault(require("./tp/tpStock"));

var _tpSpark = _interopRequireDefault(require("./tp/tpSpark"));

var _tpTreeMap = _interopRequireDefault(require("./tp/tpTreeMap"));

var _tpDonut = _interopRequireDefault(require("./tp/tpDonut"));

var _tpFn = _interopRequireDefault(require("./tp/tpFn"));

const {
  crTpId,
  toNumberFormat,
  toDmy,
  addHideHandler
} = _tpFn.default;

const _fnAddHandlerClose = function (id, point) {
  setTimeout(() => addHideHandler(id, point), 1);
};

const _fFormatter = option => function () {
  const {
    fnTemplate,
    onAfterRender = _fnAddHandlerClose,
    fnDateFormat = toDmy,
    isWithColor,
    isWithValueText,
    isWithValue
  } = option,
        point = this,
        series = point.series,
        date = fnDateFormat(point.x),
        color = isWithColor ? point.color || series.color : void 0,
        {
    zhValueText,
    name = 'Value'
  } = series.userOptions,
        _id = crTpId(),
        valueText = isWithValueText ? zhValueText || name : 'Value',
        value = isWithValue ? toNumberFormat(point.y) : null;

  onAfterRender(_id, point);
  return fnTemplate({
    id: _id,
    date,
    color,
    valueText,
    value,
    point
  });
};

const Tooltip = {
  vDmy: _fFormatter({ ..._tpSpline.default.vDmy
  }),
  vTdmyIf: _fFormatter({ ..._tpSpline.default.vTdmyIf
  }),
  vTdmy: _fFormatter({ ..._tpSpline.default.vTdmy
  }),
  categorySimple: _fFormatter({ ..._tpCategory.default.simple
  }),
  category: _fFormatter({ ..._tpCategory.default.remove
  }),
  exDividend: _fFormatter({ ..._tpScatter.default.exDividend
  }),
  splitRatio: _fFormatter({ ..._tpScatter.default.splitRatio
  }),
  exValue: _fFormatter({ ..._tpScatter.default.exValue
  }),
  eps: _fFormatter({ ..._tpScatter.default.eps
  }),
  volume: _fFormatter({ ..._tpStock.default.volume
  }),
  volumeTdmy: _fFormatter({ ..._tpStock.default.volumeTdmy
  }),
  volumeTdmyIf: _fFormatter({ ..._tpStock.default.volumeTdmyIf
  }),
  ath: _fFormatter({ ..._tpStock.default.ath
  }),
  donut: _fFormatter({ ..._tpDonut.default.value
  }),
  sparkStackedArea: _fFormatter({ ..._tpSpark.default.stackedArea
  }),
  sparkTreeMap: _fFormatter({ ..._tpSpark.default.treeMap
  }),
  treeMap: _fFormatter({ ..._tpTreeMap.default.value
  })
};
var _default = Tooltip;
exports.default = _default;
//# sourceMappingURL=Tooltip.js.map