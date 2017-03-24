
import DialogType3 from '../../components/dialogs/DialogType3';
import DialogType4 from '../../components/dialogs/DialogType4';
import DialogType4A from '../../components/dialogs/DialogType4A';
import DialogType5 from '../../components/dialogs/DialogType5';
import DialogEurostat from '../../components/dialogs/DialogEurostat';
import DialogEurostat2 from '../../components/dialogs/DialogEurostat2';
import DialogEurostat3 from '../../components/dialogs/DialogEurostat3';

import UNCommodityTradeDialog from '../../components/quandl-browser/UNCommodityTradeDialog';
import BigMacDialog from '../../components/quandl-browser/BigMacDialog';
import Futures3Dialog from '../../components/quandl-browser/Futures3Dialog';
import FuturesWikiDialog from '../../components/quandl-browser/FuturesWikiDialog';
import JodiWorldOilDialog from '../../components/quandl-browser/JodiWorldOilDialog';

import ChartConfigDialog from '../../components/chart-config/ChartConfigDialog'

const RouterDialog = {
  DEFAULT : DialogType3,

  DialogType3 : DialogType3,
  DialogType4 : DialogType4,
  DialogType4A : DialogType4A,
  DialogType5 : DialogType5,
  DialogEurostat : DialogEurostat,
  DialogEurostat2 : DialogEurostat2,
  DialogEurostat3 : DialogEurostat3,
  UNCommodityTradeDialog : UNCommodityTradeDialog,
  BigMacDialog : BigMacDialog,
  Futures3Dialog : Futures3Dialog,
  FuturesWikiDialog : FuturesWikiDialog,
  JodiWorldOilDialog : JodiWorldOilDialog,

  ChartConfigDialog : ChartConfigDialog
}

export default RouterDialog
