'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _DateUtils = require('../utils/DateUtils');

var _DateUtils2 = _interopRequireDefault(_DateUtils);

var _DialogType = require('../components/dialogs/DialogType3');

var _DialogType2 = _interopRequireDefault(_DialogType);

var _QuandlCommoditiesDialog = require('../components/quandl-browser/QuandlCommoditiesDialog');

var _QuandlCommoditiesDialog2 = _interopRequireDefault(_QuandlCommoditiesDialog);

var _QuandlCurrencyDialog = require('../components/quandl-browser/QuandlCurrencyDialog');

var _QuandlCurrencyDialog2 = _interopRequireDefault(_QuandlCurrencyDialog);

var _QuandlWorldBankEconomicDialog = require('../components/quandl-browser/QuandlWorldBankEconomicDialog');

var _QuandlWorldBankEconomicDialog2 = _interopRequireDefault(_QuandlWorldBankEconomicDialog);

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
    QE_CURRENCY_HISTORY: {
        type: 'QE_CURRENCY_HISTORY',
        menuTitle: 'Currency Histories',
        dialogCaption: 'Currency History',
        chartContainerCaption: 'Quandl Currency Histories',
        dialogComp: _QuandlCurrencyDialog2.default,
        dataColumn: 1
    },
    QE_WORLDBANK_PRICE: {
        type: 'QE_WORLDBANK_PRICE',
        menuTitle: 'Economic Metrics',
        dialogCaption: 'WorlBank Price',
        chartContainerCaption: 'Quandl World Bank Economic',
        dialogComp: _QuandlWorldBankEconomicDialog2.default,
        dialogProps: {
            initFromDate: _DateUtils2.default.getFromDate(7)
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