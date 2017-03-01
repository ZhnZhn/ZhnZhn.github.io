'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Tooltip = require('./Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _ChartFn = require('./ChartFn');

var _ChartFn2 = _interopRequireDefault(_ChartFn);

var _Chart = require('./Chart');

var _Chart2 = _interopRequireDefault(_Chart);

var _Color = require('../constants/Color');

var _Color2 = _interopRequireDefault(_Color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _legendVolume = {
    enabled: true,
    align: 'left',
    verticalAlign: 'top',
    x: 124,
    y: -8,
    floating: true,

    symbolHeight: 12,
    symbolWidth: 12,
    symbolRadius: 6,

    itemStyle: {
        color: _Color2.default.CHART_TITLE,
        fontSize: '16px'
    },
    itemHoverStyle: {
        color: _Color2.default.LEGEND_ITEM_HOVER
    },
    itemHiddenStyle: {
        color: _Color2.default.LEGEND_ITEM_HIDDEN
    }
};

var WithIndicatorConfig = {
    fBaseIndicatorConfig: function fBaseIndicatorConfig() {
        var config = _Chart2.default.fBaseConfig(),
            chart = config.chart,
            yAxis = config.yAxis;


        config.navigation = {
            buttonOptions: {
                y: 20
            },
            menuStyle: {
                position: 'relative',
                top: '-24px',
                left: '28px'
            }
        };

        chart.height = 160;
        chart.spacingTop = 8;
        chart.spacingBottom = 10;

        yAxis.startOnTick = true;
        yAxis.endOnTick = true;
        yAxis.tickPixelInterval = 60;

        return config;
    },
    fIndicatorMfiConfig: function fIndicatorMfiConfig(id, parentId, title, data) {
        var config = this.fBaseIndicatorConfig();
        config.title = _Chart2.default.fTitleIndicator(title);

        var chart = config.chart;
        chart.xDeltaCrossLabel = 4;
        chart.yDeltaCrossLabel = -10;

        var seria = config.series[0];

        seria.zhSeriaId = parentId + '_' + id;
        seria.zhValueText = id;
        seria.data = data;
        seria.name = "Spline";
        seria.type = "spline";
        seria.color = "green";
        seria.point = _Chart2.default.fEventsMouseOver(_ChartFn2.default.handlerMouserOverPoint);

        return config;
    },
    fIndicatorVolumeConfig: function fIndicatorVolumeConfig(chartId, dataColumn, data) {
        var config = this.fBaseIndicatorConfig();
        config.title = _Chart2.default.fTitleIndicator('Volume Chart:');
        config.legend = _legendVolume;

        var chart = config.chart;
        chart.xDeltaCrossLabel = 4;
        chart.yDeltaCrossLabel = -10;

        config.yAxis.endOnTick = false;
        config.yAxis.tickPixelInterval = 40;

        var seria = config.series[0];
        seria.zhSeriaId = chartId + '_VolumeArea';
        seria.zhValueText = "Volume";
        seria.data = data;
        seria.name = "Spline";
        seria.point = _Chart2.default.fEventsMouseOver(_ChartFn2.default.handlerMouserOverPoint);

        config.series.push({
            zhSeriaId: chartId + '_VolumeColumn',
            zhValueText: "Volume",
            turboThreshold: 20000,
            type: "column",
            name: "Column",
            data: dataColumn,

            visible: false,
            borderWidth: 0,
            pointPlacement: 'on',
            groupPadding: 0.1,
            states: {
                hover: {
                    enabled: true,
                    brightness: 0.07
                }
            },
            tooltip: _Chart2.default.fTooltip(_Tooltip2.default.fnVolumePointFormatter)
        });

        return config;
    },
    fIndicatorATHConfig: function fIndicatorATHConfig(chartId, data) {
        var config = this.fBaseIndicatorConfig();
        config.title = _Chart2.default.fTitleIndicator('ATH Chart');

        var seria = config.series[0];
        seria.zhSeriaId = chartId + "_ATH";
        seria.zhValueText = "ATH";
        seria.name = "ATH";
        seria.visible = true;
        seria.type = "column";
        seria.borderWidth = 0;
        seria.pointPlacement = 'on';
        seria.minPointLength = 4;
        seria.groupPadding = 0.1;
        seria.data = data;

        seria.tooltip = _Chart2.default.fTooltip(_Tooltip2.default.fnATHPointFormatter);

        return config;
    },
    fIndicatorHighLowConfig: function fIndicatorHighLowConfig(chartId, data) {
        var config = this.fBaseIndicatorConfig();
        config.title = _Chart2.default.fTitleIndicator('HighLow Chart');

        var seria = config.series[0];
        seria.zhSeriaId = chartId + '_HL';
        seria.zhValueText = "HL";
        seria.name = "HL";
        seria.visible = true;
        seria.type = "arearange";
        seria.color = '#2D7474';
        seria.data = data;

        seria.tooltip = _Chart2.default.fTooltip(_Tooltip2.default.fnHighLowPointFormatter);

        return config;
    }
};

exports.default = WithIndicatorConfig;
//# sourceMappingURL=WithIndicatorConfig.js.map