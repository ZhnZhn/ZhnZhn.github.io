
import DialogType3 from '../../components/dialogs/DialogType3';
import DialogType4 from '../../components/dialogs/DialogType4';
import DialogType4A from '../../components/dialogs/DialogType4A';
import DialogType5 from '../../components/dialogs/DialogType5';

import UNCommodityTradeDialog from '../../components/quandl-browser/UNCommodityTradeDialog';
import Futures3Dialog from '../../components/quandl-browser/Futures3Dialog';
import FuturesWikiDialog from '../../components/quandl-browser/FuturesWikiDialog';
import JodiWorldOilDialog from '../../components/quandl-browser/JodiWorldOilDialog';
import ZillowDialog from '../../components/quandl-browser/ZillowDialog';

import UnDialog5 from '../../components/uncomtrade/UnDialog5';

const MSG_OFFLINE = 'It seems you are offline';

const _router = {
  DEFAULT : DialogType3,

  DialogType3 : DialogType3,
  DialogType4 : DialogType4,
  DialogType4A : DialogType4A,
  DialogType5 : DialogType5,

  UNCommodityTradeDialog : UNCommodityTradeDialog,
  Futures3Dialog : Futures3Dialog,
  FuturesWikiDialog : FuturesWikiDialog,
  JodiWorldOilDialog : JodiWorldOilDialog,
  ZillowDialog : ZillowDialog,

  UnDialog5: UnDialog5,

  get ChartConfigDialog() {
    /*eslint-disable no-undef */
    if ( process.env.NODE_ENV === 'development') {
      return import("js/components/chart-config/ChartConfigDialog.js")
        .then(module => { return module.default; })
    }
    /*eslint-enable no-undef */
    return import(
       /* webpackChunkName: "config-dialog" */
       /* webpackMode: "lazy" */
       "../../components/chart-config/ChartConfigDialog"
     ).then(module => { return module.default; })
  },


  _loadAD() {
     /*eslint-disable no-undef */
     if ( process.env.NODE_ENV === 'development') {
       this.AD = import("js/components/stock-markets/AlphaDialogs.js")
         .then(module => module.default )
         .catch(err => console.log(MSG_OFFLINE))
    /*eslint-enable no-undef */
     } else {
      this.AD = import(
           /* webpackChunkName: "alpha-dialogs" */
           /* webpackMode: "lazy" */
           "../../components/stock-markets/AlphaDialogs"
         )
        .then(module => module.default )
        .catch(err => console.log(MSG_OFFLINE))
      }
  },
  get AlphaIndicatorDialog() {
    return this.AD.then( D => D.Indicator);
  },
  get AlphaSectorDialog() {
    return this.AD.then( D => D.Sector);
  },
  get AlphaIntradayDialog() {
    return this.AD.then( D => D.Intraday);
  },

  _loadESD() {
     /*eslint-disable no-undef */
     if ( process.env.NODE_ENV === 'development') {
       this.ESD = import("js/components/eurostat/EurostatDialogs.js")
         .then(module => module.default )
         .catch(err => console.log(MSG_OFFLINE))
    /*eslint-enable no-undef */
     } else {
      this.ESD = import(
           /* webpackChunkName: "eurostat-dialogs" */
           /* webpackMode: "lazy" */
           "../../components/eurostat/EurostatDialogs"
         )
        .then(module => module.default )
        .catch(err => console.log(MSG_OFFLINE))
      }
  },
  get DialogEurostat() {
    return this.ESD.then( D => D.Eurostat )
  },
  get DialogEurostat2() {
    return this.ESD.then( D => D.Eurostat2 )
  },
  get DialogEurostat3() {
    return this.ESD.then( D => D.Eurostat3 )
  },

  loadDialogs(dialogsId) {
    switch(dialogsId){
      case 'ALPHA': this._loadAD(); break;
      case 'EUROSTAT': this._loadESD(); break;
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

  loadDialogs(dialogsId) {
    _router.loadDialogs(dialogsId)
  }
}


export default RouterDialog
