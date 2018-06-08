
import { BrowserType as BT } from '../../constants/Type'

import D from '../../components/dialogs/Dialogs';
import QD from '../../components/quandl-browser/Dialogs';

import UnDialog5 from '../../components/uncomtrade/UnDialog5';

const MSG_OFFLINE = 'It seems you are offline';

const _router = {
  DEFAULT : D.Type3,

  DialogType3 : D.Type3,
  DialogType4 : D.Type4,
  DialogType4A : D.Type4A,
  DialogType5 : D.Type5,

  UNCommodityTradeDialog : QD.UNCommodityTrade,
  Futures3Dialog : QD.Futures3,
  FuturesWikiDialog : QD.FuturesWiki,
  JodiWorldOilDialog : QD.JodiWorldOil,
  ZillowDialog : QD.Zillow,

  UnDialog5: UnDialog5,

  get ChartConfigDialog() {
    /*eslint-disable no-undef */
    if ( process.env.NODE_ENV === 'development') {
      return import("js/components/chart-config/ChartConfigDialog.js")
        .then(module => module.default)
    }
    /*eslint-enable no-undef */
    return import(
       /* webpackChunkName: "config-dialog" */
       /* webpackMode: "lazy" */
       "../../components/chart-config/ChartConfigDialog"
     ).then(module => module.default)
  },


  _loadSM() {
     /*eslint-disable no-undef */
     if ( process.env.NODE_ENV === 'development') {
       this.SM = import("js/components/stock-markets/AlphaDialogs.js")
         .then(module => module.default )
         .catch(err => console.log(MSG_OFFLINE))
    /*eslint-enable no-undef */
     } else {
      this.SM = import(
           /* webpackChunkName: "alpha-dialogs" */
           /* webpackMode: "lazy" */
           "../../components/stock-markets/AlphaDialogs"
         )
        .then(module => module.default )
        .catch(err => console.log(MSG_OFFLINE))
      }
  },
  get AlphaIndicatorDialog() {
    return this.SM.then( D => D.Indicator);
  },
  get AlphaSectorDialog() {
    return this.SM.then( D => D.Sector);
  },
  get AlphaIntradayDialog() {
    return this.SM.then( D => D.Intraday);
  },

  _loadES() {
     /*eslint-disable no-undef */
     if ( process.env.NODE_ENV === 'development') {
       return this.ES = import("js/components/eurostat/EurostatDialogs.js")
         .then(module => module.default )
         .catch(err => console.log(MSG_OFFLINE));
    /*eslint-enable no-undef */
     } else {
      return this.ES = import(
         /* webpackChunkName: "eurostat-dialogs" */
         /* webpackMode: "lazy" */
          "../../components/eurostat/EurostatDialogs"
         )
        .then(module => module.default )
        .catch(err => console.log(MSG_OFFLINE));
      }
  },
  get DialogEurostat() {
    return this.ES.then( D => D.Eurostat )
  },
  get DialogEurostat2() {
    return this.ES.then( D => D.Eurostat2 )
  },
  get DialogEurostat3() {
    return this.ES.then( D => D.Eurostat3 )
  },
  get DialogEurostat3A() {
    return this.ES.then( D => D.Eurostat3A )
  },
  get DialogStatN() {
    const ES = this.ES || this._loadES()
    return ES.then( D => D.StatN );
  },

  loadDialogs(browserType) {
    switch(browserType){
      case BT.STOCK_MARKETS:
        this._loadSM(); break;
      case BT.EUROSTAT:
      case BT.NORWAY_STATISTICS:
      case BT.SWEDEN_STAT:
         this._loadES(); break;
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
