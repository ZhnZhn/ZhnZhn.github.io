
import DialogType3 from '../../components/dialogs/DialogType3';
import DialogType4A from '../../components/dialogs/DialogType4A';
import DialogType5 from '../../components/dialogs/DialogType5';
import DialogEurostat from '../../components/dialogs/DialogEurostat';

import UNCommodityTradeDialog from '../../components/quandl-browser/UNCommodityTradeDialog';
import BigMacDialog from '../../components/quandl-browser/BigMacDialog';
import Futures3Dialog from '../../components/quandl-browser/Futures3Dialog';
import FuturesWikiDialog from '../../components/quandl-browser/FuturesWikiDialog';
import JodiWorldOilDialog from '../../components/quandl-browser/JodiWorldOilDialog';
import EuroStatDialog from '../../components/quandl-browser/EuroStatDialog';

const RouterDialog = {
  'DEFAULT' : DialogType3,

  DialogType3 : DialogType3,
  DialogType4A : DialogType4A,
  DialogType5 : DialogType5,
  DialogEurostat : DialogEurostat,
  UNCommodityTradeDialog : UNCommodityTradeDialog,
  BigMacDialog : BigMacDialog,
  Futures3Dialog : Futures3Dialog,
  FuturesWikiDialog : FuturesWikiDialog,
  JodiWorldOilDialog : JodiWorldOilDialog,
  EuroStatDialog : EuroStatDialog
}

export default RouterDialog
