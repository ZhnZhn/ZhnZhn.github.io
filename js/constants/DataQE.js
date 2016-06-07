'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _DateUtils = require('../utils/DateUtils');

var _DateUtils2 = _interopRequireDefault(_DateUtils);

var _DialogType = require('../components/dialogs/DialogType3');

var _DialogType2 = _interopRequireDefault(_DialogType);

var _DialogType3 = require('../components/dialogs/DialogType5');

var _DialogType4 = _interopRequireDefault(_DialogType3);

var _QuandlCommoditiesDialog = require('../components/quandl-browser/QuandlCommoditiesDialog');

var _QuandlCommoditiesDialog2 = _interopRequireDefault(_QuandlCommoditiesDialog);

var _UNCommodityTradeDialog = require('../components/quandl-browser/UNCommodityTradeDialog');

var _UNCommodityTradeDialog2 = _interopRequireDefault(_UNCommodityTradeDialog);

var _QuandlCurrencyDialog = require('../components/quandl-browser/QuandlCurrencyDialog');

var _QuandlCurrencyDialog2 = _interopRequireDefault(_QuandlCurrencyDialog);

var _BigMacDialog = require('../components/quandl-browser/BigMacDialog');

var _BigMacDialog2 = _interopRequireDefault(_BigMacDialog);

var _FuturesDialog = require('../components/quandl-browser/FuturesDialog');

var _FuturesDialog2 = _interopRequireDefault(_FuturesDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DataQE = {

    QE_COMMODITY_PRICE: {
        type: 'QE_COMMODITY_PRICE',
        menuTitle: 'Commodity Prices',
        dialogCaption: 'Commodity Price',
        chartContainerCaption: 'Quandl Commodity Prices',
        dialogComp: _QuandlCommoditiesDialog2.default,
        dataColumn: 1
    },
    QE_COMMODITY_TRADE: {
        type: 'QE_COMMODITY_TRADE',
        menuTitle: 'UN Commodity Trade',
        dialogCaption: 'United Nations Commodity Trade',
        chartContainerCaption: 'Quandl United Nations Commodity Trade',
        dialogComp: _UNCommodityTradeDialog2.default,
        dialogProps: {
            initFromDate: _DateUtils2.default.getFromDate(10),
            countryURI: './data/quandl/country-area.json',
            countryJsonProp: 'countries',
            commodityURI: './data/quandl/commodity-items.json',
            commodityJsonProp: 'items',
            fnValue: function fnValue(item, country) {
                return 'UCOM/' + item + '_' + country;
            }
        },
        dataColumn: 1
    },
    QE_GLOBAL_INDICATOR: {
        type: 'QE_GLOBAL_INDICATOR',
        menuTitle: 'UN Global Indicator',
        dialogCaption: 'United Nations Global Indicator',
        chartContainerCaption: 'Quandl United Nations Global Indicator',
        dialogComp: _DialogType4.default,
        dialogProps: {
            initFromDate: _DateUtils2.default.getFromDate(10),
            oneCaption: 'Country',
            oneURI: './data/quandl/country-area.json',
            oneJsonProp: 'countries',
            twoCaption: 'Indicators',
            twoURI: './data/quandl/un-global-indicators.json',
            twoJsonProp: 'indicators',
            threeCaption: 'Metric',
            fnValue: function fnValue(country, item) {
                return 'UGID/' + item + '_' + country;
            }
        },
        dataColumn: 1
    },
    QE_CURRENCY_HISTORY: {
        type: 'QE_CURRENCY_HISTORY',
        menuTitle: 'Currency Histories',
        dialogCaption: 'Currency History',
        chartContainerCaption: 'Quandl Currency Histories',
        dialogComp: _QuandlCurrencyDialog2.default,
        dialogProps: {
            fnValue: function fnValue(source, currency) {
                return source + '/' + currency;
            }
        },
        dataColumn: 1
    },
    QE_WORLDBANK_PRICE: {
        type: 'QE_WORLDBANK_PRICE',
        menuTitle: 'WB Economic Metrics',
        dialogCaption: 'WorlBank Economic Metric',
        chartContainerCaption: 'Quandl World Bank Economic Metrics',
        dialogComp: _DialogType4.default,
        dialogProps: {
            isTreeItem: true,
            initFromDate: _DateUtils2.default.getFromDate(7),
            oneCaption: 'Country',
            oneURI: './data/quandl/iso3-countries.json',
            oneJsonProp: 'countries',
            twoCaption: 'Group',
            twoURI: './data/quandl/wb-metric-groups.json',
            twoJsonProp: 'groups',
            threeCaption: 'Metric',
            fnValue: function fnValue(country, metric) {
                return 'WWDI/' + country + '_' + metric;
            }
        },
        dataColumn: 1
    },
    QE_CPI_INFLATION: {
        type: 'QE_CPI_INFLATION',
        menuTitle: 'CPI & Inflation',
        dialogCaption: 'CPI & Inflation',
        chartContainerCaption: 'Consumer Price Index and Inflation',
        dialogProps: {
            initFromDate: _DateUtils2.default.getFromDate(7),
            itemCaption: 'Metric:',
            fnItemCaption: function fnItemCaption(value) {
                return value.split('/')[1];
            }
        },
        optionURI: './data/quandl/rate-cpi-inflation.json',
        optionsJsonProp: 'codes',
        optionNames: 'Codes',
        dataColumn: 1
    },
    QE_BIG_MAC: {
        type: 'QE_BIG_MAC',
        menuTitle: 'Big Mac Index',
        dialogCaption: 'Economist Big Mac Index',
        chartContainerCaption: 'Quandl Economist Big Mac Index',
        dialogComp: _BigMacDialog2.default,
        dialogProps: {
            initFromDate: _DateUtils2.default.getFromDate(12),
            countryURI: './data/quandl/big-mac-countries.json',
            countryJsonProp: 'countries',
            fnValue: function fnValue(country) {
                return 'ECONOMIST/BIGMAC_' + country;
            }
        },
        dataColumn: 1
    },

    QE_WIKI_STOCK: {
        type: 'QE_WIKI_STOCK',
        menuTitle: 'WIKI',
        dialogCaption: 'Wiki Stocks',
        chartContainerCaption: 'Quandl WIKI Stocks',
        optionURI: './data/quandl/wiki.json',
        optionsJsonProp: 'tickets',
        dataColumn: 4
    },
    QE_TOKIO_STOCK: {
        type: 'QE_TOKIO_STOCK',
        menuTitle: 'Tokio',
        dialogCaption: 'Tokio Stocks',
        chartContainerCaption: 'Quandl Tokio Stocks',
        optionURI: './data/quandl/tokio.json',
        optionsJsonProp: 'tickets',
        dataColumn: 4
    },

    QE_CHINA_DCE_FUTURE: {
        type: 'QE_CHINA_DCE_FUTURE',
        menuTitle: 'China DCE',
        dialogCaption: 'China DCE Futures',
        chartContainerCaption: 'Quandl China DCE Futures',
        dialogComp: _FuturesDialog2.default,
        optionURI: './data/quandl/china_dce_futures.json',
        optionsJsonProp: 'futures',
        dataColumn: 4
    },
    QE_CHINA_ZCE_FUTURE: {
        type: 'QE_CHINA_ZCE_FUTURE',
        menuTitle: 'China ZCE',
        dialogCaption: 'China ZCE Futures',
        chartContainerCaption: 'Quandl China ZCE Futures',
        dialogComp: _FuturesDialog2.default,
        optionURI: './data/quandl/china_zce_futures.json',
        optionsJsonProp: 'futures',
        dataColumn: 5
    }

};

exports.default = DataQE;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\constants\DataQE.js.map