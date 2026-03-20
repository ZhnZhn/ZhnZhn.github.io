import { isStr } from '../../utils/isTypeFn';
import { crRouter } from '../../utils/crRouter';
import {
  resolvePromise,
  throwErrOffline
} from '../../utils/asyncFn';

import {
  BT_STOCK_MARKETS,
  BT_NORWAY_STATISTICS,
  BT_SWEDEN_STAT,
  BT_UN_COMTRADE
} from '../../constants/BrowserType';
import {
  LT_UN,
  LT_AV
} from '../../constants/LoadType';

import DialogSelectN from '../../components/dialogs/DialogSelectN';
import { addLoadImpl } from './LoadImpl';

const _resolveDialogs = (
  module,
  loadType,
  router
) => {
  const df = module.default;
  addLoadImpl(loadType, df._a)
  return router[loadType] = resolvePromise(df);
};

const _router = crRouter({
  DF: resolvePromise(DialogSelectN),
  DialogSelectN: resolvePromise(DialogSelectN),

  _loadD(){
    /*eslint-disable no-undef */
    if ( process.env.NODE_ENV === '_development' ) {
      //
      return import("js/components/dialogs/Dialogs.js")
        .then(module => this.D = resolvePromise(module.default))
        .catch(throwErrOffline);
   /*eslint-enable no-undef */
   }
   return import(
      /* webpackChunkName: "dialogs" */
      /* webpackMode: "lazy" */
       "../../components/dialogs/Dialogs"
      )
     .then(module => this.D = resolvePromise(module.default))
     .catch(throwErrOffline);
  },
  getD(){
    return this.D || this._loadD();
  },
  get DialogQuery() {
    return this.getD().then(D => D.Query);
  },

  _loadUN() {
     /*eslint-disable no-undef */
     if ( process.env.NODE_ENV === '_development' ) {
       //
       return import("js/components/uncomtrade/UnDialogs.js")
         .then(module => _resolveDialogs(module, LT_UN, this))
         .catch(throwErrOffline);
    /*eslint-enable no-undef */
    }
    return import(
       /* webpackChunkName: "un-dialogs" */
       /* webpackMode: "lazy" */
        "../../components/uncomtrade/UnDialogs"
       )
      .then(module => _resolveDialogs(module, LT_UN, this))
      .catch(throwErrOffline);
  },
  getUN(){
    return this[LT_UN] || this._loadUN();
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
       return import("js/components/stock-markets/AvDialogs.js")
         .then(module => _resolveDialogs(module, LT_AV, this))
         .catch(throwErrOffline);
    /*eslint-enable no-undef */
     }
     return import(
         /* webpackChunkName: "av-dialogs" */
         /* webpackMode: "lazy" */
         "../../components/stock-markets/AvDialogs"
       )
      .then(module => _resolveDialogs(module, LT_AV, this))
      .catch(throwErrOffline);
  },
  getSM(){
    return this[LT_AV] || this._loadSM();
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
         .then(module => this.SD = resolvePromise(module.default))
         .catch(throwErrOffline);
    /*eslint-enable no-undef */
     }
     return import(
       /* webpackChunkName: "stat-dialogs" */
       /* webpackMode: "lazy" */
        "../../components/stat-dialogs/StatDialogs"
       )
      .then(module => this.SD = resolvePromise(module.default))
      .catch(throwErrOffline);
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
         .then(module => this.US = resolvePromise(module.default))
         .catch(throwErrOffline);
    /*eslint-enable no-undef */
    }
    return import(
       /* webpackChunkName: "us-economics-dialogs" */
       /* webpackMode: "lazy" */
        "../../components/us-economics/UsDialogs"
       )
      .then(module => this.US = resolvePromise(module.default))
      .catch(throwErrOffline);
  },
  getUS(){
    return this.US || this._loadUS();
  },
  get ZillowDialog() {
    return this.getUS().then(D => D.Zillow);
  },

  loadDialogs(browserType) {
    switch(browserType){      
      case BT_NORWAY_STATISTICS:
      case BT_SWEDEN_STAT:
         this._loadSD(); break;
      case BT_UN_COMTRADE:
        this._loadUN(); break;
      default: return;
    }
  }
});

export const getDialog = (
  type
) => isStr(type)
  ? _router[type]
  : _router.DF

export const loadDialogs = (
  browserType
) => {
  _router.loadDialogs(browserType)
}
