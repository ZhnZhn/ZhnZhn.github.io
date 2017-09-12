
import DialogType3 from '../../components/dialogs/DialogType3';
import DialogType4 from '../../components/dialogs/DialogType4';
import DialogType4A from '../../components/dialogs/DialogType4A';
import DialogType5 from '../../components/dialogs/DialogType5';
import DialogEurostat from '../../components/dialogs/DialogEurostat';
import DialogEurostat2 from '../../components/dialogs/DialogEurostat2';
import DialogEurostat3 from '../../components/dialogs/DialogEurostat3';

import UNCommodityTradeDialog from '../../components/quandl-browser/UNCommodityTradeDialog';
import Futures3Dialog from '../../components/quandl-browser/Futures3Dialog';
import FuturesWikiDialog from '../../components/quandl-browser/FuturesWikiDialog';
import JodiWorldOilDialog from '../../components/quandl-browser/JodiWorldOilDialog';
import ZillowDialog from '../../components/quandl-browser/ZillowDialog';

import AlphaIndicatorDialog from '../../components/quandl-browser/AlphaIndicatorDialog';
import AlphaSectorDialog from '../../components/quandl-browser/AlphaSectorDialog';
import AlphaIntradayDialog from '../../components/quandl-browser/AlphaIntradayDialog';

import UnDialog5 from '../../components/uncomtrade/UnDialog5';

const _router = {
  DEFAULT : DialogType3,

  DialogType3 : DialogType3,
  DialogType4 : DialogType4,
  DialogType4A : DialogType4A,
  DialogType5 : DialogType5,
  DialogEurostat : DialogEurostat,
  DialogEurostat2 : DialogEurostat2,
  DialogEurostat3 : DialogEurostat3,
  UNCommodityTradeDialog : UNCommodityTradeDialog,
  Futures3Dialog : Futures3Dialog,
  FuturesWikiDialog : FuturesWikiDialog,
  JodiWorldOilDialog : JodiWorldOilDialog,
  ZillowDialog : ZillowDialog,
  AlphaIndicatorDialog: AlphaIndicatorDialog,
  AlphaSectorDialog: AlphaSectorDialog,
  AlphaIntradayDialog: AlphaIntradayDialog,

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
  }

}

const RouterDialog = {
  getDialog(type){
    if (type && typeof _router[type] !== undefined) {
      return Promise.resolve(_router[type]);
    } else {
      return Promise.resolve(_router['DEFAULT']);
    }
  }
}


export default RouterDialog
