"use strict";

exports.__esModule = true;
exports.tooltipVolumeTdmyIf = exports.tooltipValueTdmyIf = exports.tooltipValueDmy = exports.tooltipTreeMap = exports.tooltipSplitRatio = exports.tooltipSparkTreeMap = exports.tooltipSparkStackedArea = exports.tooltipExValue = exports.tooltipExDividend = exports.tooltipDonut = exports.tooltipCategorySimple = exports.tooltipCategory = exports.tooltipAth = void 0;

var _tpSpline = require("./tp/tpSpline");

var _tpCategory = require("./tp/tpCategory");

var _tpScatter = require("./tp/tpScatter");

var _tpStock = require("./tp/tpStock");

var _tpSpark = require("./tp/tpSpark");

var _tpTreeMap = require("./tp/tpTreeMap");

var _tpDonut = require("./tp/tpDonut");

var _tpFn = require("./tp/tpFn");

const _addCloseHandler = (id, point) => {
  setTimeout(() => (0, _tpFn.addHideHandler)(id, point), 1);
};

const _fFormatter = option => function () {
  const {
    fnTemplate,
    onAfterRender = _addCloseHandler,
    fnDateFormat = _tpFn.toDmy,
    isWithColor,
    isWithValueText,
    isWithValue
  } = option,
        point = this,
        {
    series
  } = point,
        {
    zhValueText,
    name = 'Value'
  } = series.userOptions,
        date = fnDateFormat(point.x),
        color = isWithColor ? point.color || series.color : void 0,
        valueText = isWithValueText ? zhValueText || name : 'Value',
        value = isWithValue ? (0, _tpFn.toNumberFormat)(point.y) : null,
        id = (0, _tpFn.crTpId)();
  onAfterRender(id, point);
  return fnTemplate({
    id,
    date,
    color,
    valueText,
    value,
    point
  });
};

const tooltipValueDmy = _fFormatter({ ..._tpSpline.splineValueDmy
});

exports.tooltipValueDmy = tooltipValueDmy;

const tooltipValueTdmyIf = _fFormatter({ ..._tpSpline.splineValueTdmyIf
});

exports.tooltipValueTdmyIf = tooltipValueTdmyIf;

const tooltipCategorySimple = _fFormatter({ ..._tpCategory.categorySimple
});

exports.tooltipCategorySimple = tooltipCategorySimple;

const tooltipCategory = _fFormatter({ ..._tpCategory.categoryRemove
});

exports.tooltipCategory = tooltipCategory;

const tooltipExDividend = _fFormatter({ ..._tpScatter.scatterExDividend
});

exports.tooltipExDividend = tooltipExDividend;

const tooltipSplitRatio = _fFormatter({ ..._tpScatter.scatterSplitRatio
});

exports.tooltipSplitRatio = tooltipSplitRatio;

const tooltipExValue = _fFormatter({ ..._tpScatter.scatterExValue
});

exports.tooltipExValue = tooltipExValue;

const tooltipVolumeTdmyIf = _fFormatter({ ..._tpStock.stockVolumeTdmyIf
});

exports.tooltipVolumeTdmyIf = tooltipVolumeTdmyIf;

const tooltipAth = _fFormatter({ ..._tpStock.stockAth
});

exports.tooltipAth = tooltipAth;

const tooltipDonut = _fFormatter({ ..._tpDonut.donutValue
});

exports.tooltipDonut = tooltipDonut;

const tooltipSparkStackedArea = _fFormatter({ ..._tpSpark.sparkStackedArea
});

exports.tooltipSparkStackedArea = tooltipSparkStackedArea;

const tooltipSparkTreeMap = _fFormatter({ ..._tpSpark.sparkTreeMap
});

exports.tooltipSparkTreeMap = tooltipSparkTreeMap;

const tooltipTreeMap = _fFormatter({ ..._tpTreeMap.treeMapValue
});

exports.tooltipTreeMap = tooltipTreeMap;
//# sourceMappingURL=Tooltip.js.map