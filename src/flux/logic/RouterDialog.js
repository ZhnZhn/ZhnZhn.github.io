import {
  BT_STOCK_MARKETS,
  BT_NORWAY_STATISTICS,
  BT_SWEDEN_STAT,
  BT_NDL,
  BT_UN_COMTRADE
} from '../../constants/BrowserType';

import D from '../../components/dialogs/Dialogs';

const MSG_OFFLINE = 'It seems you are offline';
const _resolve = Promise.resolve.bind(Promise);

const _router = {
  DF: D.Type3,

  DialogSelectN: D.SelectN,
  DialogType3: D.Type3,

  _loadGD(){
    /*eslint-disable no-undef */
    if ( process.env.NODE_ENV === '_development' ) {
      //
      return import("js/components/dialogs/GeneralDialogs.js")
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
       //
       return import("js/components/uncomtrade/UnDialogs.js")
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
  get UnDialogAgg() {
    return this.getUN().then(D => D.UnDialogAgg);
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
         /* webpackChunkName: "av-dialogs" */
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
  get AlphaTopDialog() {
    return this.getSM().then(D => D.Top);
  },
  get AlphaSearchDialog() {
    return this.getSM().then(D => D.Search);
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

  _loadUS() {
     /*eslint-disable no-undef */
     if ( process.env.NODE_ENV === '_development' ) {
       return import("js/components/us-economics/UsDialogs.js")
         .then(module => this.US = _resolve(module.default))
         .catch(err => console.log(MSG_OFFLINE));
    /*eslint-enable no-undef */
    }
    return import(
       /* webpackChunkName: "us-economics-dialogs" */
       /* webpackMode: "lazy" */
        "../../components/us-economics/UsDialogs"
       )
      .then(module => this.US = _resolve(module.default))
      .catch(err => console.log(MSG_OFFLINE));
  },
  getUS(){
    return this.US || this._loadUS();
  },
  get ZillowDialog() {
    return this.getUS().then(D => D.Zillow);
  },

  _loadNDL() {
     /*eslint-disable no-undef */
     if ( process.env.NODE_ENV === '_development' ) {
       return import("js/components/ndl/NdlDialogs.js")
         .then(module => this.NDL = _resolve(module.default))
         .catch(err => console.log(MSG_OFFLINE));
    /*eslint-enable no-undef */
    }
    return import(
       /* webpackChunkName: "ndl-dialogs" */
       /* webpackMode: "lazy" */
        "../../components/ndl/NdlDialogs"
       )
      .then(module => this.NDL = _resolve(module.default))
      .catch(err => console.log(MSG_OFFLINE));
  },
  getNDL() {
    return this.NDL || this._loadNDL();
  },
  get UNCommodityTradeDialog() {
    return this.getNDL().then(D => D.UNCommodityTrade);
  },
  get Futures3Dialog() {
    return this.getNDL().then(D => D.Futures3);
  },
  get FuturesWikiDialog() {
    return this.getNDL().then(D => D.FuturesWiki);
  },
  get JodiWorldOilDialog() {
    return this.getNDL().then(D => D.JodiWorldOil);
  },


  loadDialogs(browserType) {
    switch(browserType){
      case BT_STOCK_MARKETS:
        this._loadSM(); break;
      case BT_NORWAY_STATISTICS:
      case BT_SWEDEN_STAT:
         this._loadSD(); break;
      case BT_NDL:
         this._loadNDL(); break;
      case BT_UN_COMTRADE:
        this._loadUN(); break;
      default: return;
    }
  }

}

export const getDialog = (
  type
) => _resolve(
  (type && _router[type])
  || _router.DF
)

export const loadDialogs = (
  browserType
) => {
  _router.loadDialogs(browserType)
}
