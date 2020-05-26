
import { BrowserType as BT } from '../../constants/Type';

import D from '../../components/dialogs/Dialogs';

const MSG_OFFLINE = 'It seems you are offline';
const _resolve = Promise.resolve.bind(Promise);

const _router = {
  DEFAULT: D.Type3,

  DialogType3: D.Type3,
  DialogType4: D.Type4,
  DialogType4A: D.Type4A,
  DialogType5: D.Type5,
  DialogQuery: D.Query,

  get ChartConfigDialog() {
    /*eslint-disable no-undef */
    if ( process.env.NODE_ENV === '_development' ) {
      return import("js/components/chart-config/ChartConfigDialog.js")
        .then(module => module.default);
    }
    /*eslint-enable no-undef */
    return import(
       /* webpackChunkName: "config-dialog" */
       /* webpackMode: "lazy" */
       "../../components/chart-config/ChartConfigDialog"
     ).then(module => module.default);
  },

  _loadUN() {
     /*eslint-disable no-undef */
     if ( process.env.NODE_ENV === '_development' ) {
       return this.UN = import("js/components/uncomtrade/UnDialogs.js")
         .then(module => this.UN = _resolve(module.default))
         .catch(err => console.log(MSG_OFFLINE));
    /*eslint-enable no-undef */
    }
    return import(
       /* webpackChunkName: "un-dialogs" */
       /* webpackMode: "lazy" */
        "../../components/uncomtrade/UnDialogs"
       )
      .then(module => this.UN = _resolve(module.default))
      .catch(err => console.log(MSG_OFFLINE));
  },
  getUN(){
    return this.UN || this._loadUN();
  },
  get UnDialog5() {
    return this.getUN().then(D => D.UnDialog5);
  },


  _loadSM() {
     /*eslint-disable no-undef */
     if ( process.env.NODE_ENV === '_development' ) {
       return import("js/components/stock-markets/AlphaDialogs.js")
         .then(module => this.SM = _resolve(module.default))
         .catch(err => console.log(MSG_OFFLINE));
    /*eslint-enable no-undef */
     }
     return import(
         /* webpackChunkName: "alpha-dialogs" */
         /* webpackMode: "lazy" */
         "../../components/stock-markets/AlphaDialogs"
       )
      .then(module => this.SM = _resolve(module.default))
      .catch(err => console.log(MSG_OFFLINE));
  },
  getSM(){
    return this.SM || this._loadSM();
  },
  get AlphaIndicatorDialog() {
    return this.getSM().then(D => D.Indicator);
  },
  get AlphaSectorDialog() {
    return this.getSM().then(D => D.Sector);
  },
  get AlphaSearchDialog() {
    return this.getSM().then(D => D.Search);
  },
  get AlphaIntradayDialog() {
    return this.getSM().then(D => D.Intraday);
  },

  _loadES() {
     /*eslint-disable no-undef */
     if ( process.env.NODE_ENV === '_development' ) {
       return import("js/components/eurostat/EurostatDialogs.js")
         .then(module => this.ES = _resolve(module.default))
         .catch(err => console.log(MSG_OFFLINE));
    /*eslint-enable no-undef */
     }
     return import(
       /* webpackChunkName: "eurostat-dialogs" */
       /* webpackMode: "lazy" */
        "../../components/eurostat/EurostatDialogs"
       )
      .then(module => this.ES = _resolve(module.default))
      .catch(err => console.log(MSG_OFFLINE));
  },
  getES() {
    return this.ES || this._loadES();
  },
  get DialogSelectN() {
    return this.getES().then(D => D.SelectN);
  },
  get DialogStatN() {
    return this.getES().then(D => D.StatN);
  },

  _loadUSAE() {
     /*eslint-disable no-undef */
     if ( process.env.NODE_ENV === '_development' ) {
       return import("js/components/usa-economy/UsaeDialogs.js")
         .then(module => this.USAE = _resolve(module.default))
         .catch(err => console.log(MSG_OFFLINE));
    /*eslint-enable no-undef */
    }
    return import(
       /* webpackChunkName: "usa-economy-dialogs" */
       /* webpackMode: "lazy" */
        "../../components/usa-economy/UsaeDialogs"
       )
      .then(module => this.USAE = _resolve(module.default))
      .catch(err => console.log(MSG_OFFLINE));
  },
  getUSAE(){
    return this.USAE || this._loadUSAE();
  },
  get ZillowDialog() {
    return this.getUSAE().then(D => D.Zillow);
  },

  _loadQE() {
     /*eslint-disable no-undef */
     if ( process.env.NODE_ENV === '_development' ) {
       return import("js/components/quandl/QuandlDialogs.js")
         .then(module => this.QE = _resolve(module.default))
         .catch(err => console.log(MSG_OFFLINE));
    /*eslint-enable no-undef */
    }
    return import(
       /* webpackChunkName: "quandl-dialogs" */
       /* webpackMode: "lazy" */
        "../../components/quandl/QuandlDialogs"
       )
      .then(module => this.QE = _resolve(module.default))
      .catch(err => console.log(MSG_OFFLINE));
  },
  getQE() {
    return this.QE || this._loadQE();
  },
  get UNCommodityTradeDialog() {
    return this.getQE().then(D => D.UNCommodityTrade);
  },
  get Futures3Dialog() {
    return this.getQE().then(D => D.Futures3);
  },
  get FuturesWikiDialog() {
    return this.getQE().then(D => D.FuturesWiki);
  },
  get JodiWorldOilDialog() {
    return this.getQE().then(D => D.JodiWorldOil);
  },


  loadDialogs(browserType) {
    switch(browserType){
      case BT.STOCK_MARKETS:
        this._loadSM(); break;
      case BT.EUROSTAT:
      case BT.NORWAY_STATISTICS:
      case BT.SWEDEN_STAT:
         this._loadES(); break;
      case BT.QUANDL:
         this._loadQE(); break;
      case BT.UN_COMTRADE:
        this._loadUN(); break;
      default: return undefined;
    }
  }

}

const RouterDialog = {
  getDialog(type){
    if (type && typeof _router[type] !== undefined) {
      return Promise.resolve(_router[type]);
    } else {
      return Promise.resolve(_router['DEFAULT']);
    }
  },

  loadDialogs(browserType) {
    _router.loadDialogs(browserType)
  }
}


export default RouterDialog
