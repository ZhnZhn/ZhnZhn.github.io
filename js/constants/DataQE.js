'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _QuandlWikiStock = require('../services/qe/QuandlWikiStock');

var _QuandlWikiStock2 = _interopRequireDefault(_QuandlWikiStock);

var _QuandlTokioStock = require('../services/qe/QuandlTokioStock');

var _QuandlTokioStock2 = _interopRequireDefault(_QuandlTokioStock);

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

var _QuandlFuturesChinaDceDialog = require('../components/quandl-browser/QuandlFuturesChinaDceDialog');

var _QuandlFuturesChinaDceDialog2 = _interopRequireDefault(_QuandlFuturesChinaDceDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DataQE = {

    QE_COMMODITY_PRICE: {
        type: 'QE_COMMODITY_PRICE',
        dialogCaption: 'Commodity Price',
        chartContainerCaption: 'Quandl Commodity Prices',
        dialogComp: _QuandlCommoditiesDialog2.default
    },
    QE_CURRENCY_HISTORY: {
        type: 'QE_CURRENCY_HISTORY',
        dialogCaption: 'Currency History',
        chartContainerCaption: 'Quandl Currency Histories',
        dialogComp: _QuandlCurrencyDialog2.default
    },
    QE_WORLDBANK_PRICE: {
        type: 'QE_WORLDBANK_PRICE',
        dialogCaption: 'WorlBank Price',
        chartContainerCaption: 'Quandl World Bank Economic',
        dialogComp: _QuandlWorldBankEconomicDialog2.default,
        dialogProps: {
            initFromDate: _DateUtils2.default.getFromDate(7)
        }
    },

    QE_WIKI_STOCK: {
        type: 'QE_WIKI_STOCK',
        dialogCaption: 'Wiki Stocks',
        chartContainerCaption: 'Quandl WIKI Stocks',
        fnOption: _QuandlWikiStock2.default.getTickets
    },
    QE_TOKIO_STOCK: {
        type: 'QE_TOKIO_STOCK',
        dialogCaption: 'Tokio Stocks',
        chartContainerCaption: 'Quandl Tokio Stocks',
        fnOption: _QuandlTokioStock2.default.getTickets
    },

    QE_CHINA_DCE_FUTURE: {
        type: 'QE_CHINA_DCE_FUTURE',
        dialogCaption: 'China DCE Future',
        chartContainerCaption: 'Quandl China DCE Futures',
        dialogComp: _QuandlFuturesChinaDceDialog2.default
    }

};

exports.default = DataQE;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\constants\DataQE.js.map