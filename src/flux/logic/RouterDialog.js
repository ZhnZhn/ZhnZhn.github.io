
import { BrowserType as BT } from '../../constants/Type';

import D from '../../components/dialogs/Dialogs';

const MSG_OFFLINE = 'It seems you are offline';
const _resolve = Promise.resolve.bind(Promise);

const _router = {
  DEFAULT: D.Type3,

  DialogSelectN: D.SelectN,
  DialogType3: D.Type3,
  
  _loadGD(){
    /*eslint-disable no-undef */
    if ( process.env.NODE_ENV === '_development' ) {
      return this.GD = import("js/components/dialogs/GeneralDialogs.js")
        .then(module => this.GD = _resolve(module.default))
        .catch(err => console.log(MSG_OFFLINE));
   /*eslint-enable no-undef */
   }
   return import(
      /* webpackChunkName: "general-dialogs" */
      /* webpackMode: "lazy" */
       "../../components/dialogs/GeneralDialogs"
      )
     .then(module => this.GD = _resolve(module.default))
     .catch(err => console.log(MSG_OFFLINE));
  },
  getGD(){
    return this.GD || this._loadGD();
  },
  get DialogQuery() {
    return this.getGD().then(D => D.Query);
  },
  get DialogType4() {
    return this.getGD().then(D => D.Type4);
  },
  get DialogType4A() {
    return this.getGD().then(D => D.Type4A);
  },
  get DialogType5() {
    return this.getGD().then(D => D.Type5);
  },

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

  _loadSD() {
     /*eslint-disable no-undef */
     if ( process.env.NODE_ENV === '_development' ) {
       return import("js/components/stat-dialogs/StatDialogs.js")
         .then(module => this.SD = _resolve(module.default))
         .catch(err => console.log(MSG_OFFLINE));
    /*eslint-enable no-undef */
     }
     return import(
       /* webpackChunkName: "stat-dialogs" */
       /* webpackMode: "lazy" */
        "../../components/stat-dialogs/StatDialogs"
       )
      .then(module => this.SD = _resolve(module.default))
      .catch(err => console.log(MSG_OFFLINE));
  },
  getSD() {
    return this.SD || this._loadSD();
  },
  get DialogStatN() {
    return this.getSD().then(D => D.StatN);
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
      case BT.NORWAY_STATISTICS:
      case BT.SWEDEN_STAT:
         this._loadSD(); break;
      case BT.QUANDL:
         this._loadQE(); break;
      case BT.UN_COMTRADE:
        this._loadUN(); break;
      default: return;
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
