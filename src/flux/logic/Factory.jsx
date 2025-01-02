export { crAsyncBrowser } from "./fBrowser";

import { isArr } from "../../utils/isTypeFn";
import { bindTo } from "../../utils/bindTo";
import {
  getFromDate,
  getToDate,
  isYmd,
  isYmdOrEmpty,
  addDaysToYmd
} from "../../utils/dateFn";

import {
  YMD_DATE_OR_EMPTY,
  NOT_SELECTED,
  NOT_VALID_FORMAT
} from "../../constants/Msg";
import {
  LT_Q,
  LT_EU_STAT
} from "../../constants/LoadType";

import { isWideWidth } from "../../components/has";

import { showDescription } from "../actions/ComponentActions";

import {
  loadItem,
  showItemsContainer
} from "../stores/itemStore";
import { showAlertDialog } from "../stores/compStore";
import { getKey } from "../stores/settingStore";

import { getDialog } from "./RouterDialog";
import { getLoadFn } from "./RouterLoadFn";
import { getCrValue } from "./RouterFnValue";

const HAS_WIDE_WIDTH = isWideWidth(600)
, _assign = Object.assign
, _initFromDate = getFromDate(2)
, initToDate = getToDate();

const _crFnValue = (
  valueFn,
  valueFnPrefix
) => {
  const _crValue = getCrValue(valueFn);
  return _crValue
    ? valueFnPrefix
        ? bindTo(_crValue, valueFnPrefix)
        : _crValue
    : void 0;
};

const _crFromDate = (
  nInitFromDate,
) => nInitFromDate
  ? nInitFromDate === "1y+2d" //Coinpaprika
     ? addDaysToYmd(getFromDate(1), 2)
     : getFromDate(nInitFromDate)
  : _initFromDate;

const _crInitFromDate = ({
  isFdw,
  nInitFromDate
}) => isFdw && !HAS_WIDE_WIDTH
  ? _initFromDate
  : _crFromDate(nInitFromDate);

const _crDateProps = (dialogProps) => {
  const _props = dialogProps.isFd
    ? {
        errNotYmdOrEmpty: YMD_DATE_OR_EMPTY,
        isYmdOrEmpty
      }
    : void 0;
  return {
    initFromDate: _crInitFromDate(dialogProps),
    initToDate,
    onTestDate: isYmd,
    ..._props
  }
};

const _onError = (
  alertDescr,
  alertCaption="Request Error"
) => {
  showAlertDialog({
    alertDescr,
    alertCaption
  })
};

const _crClickAbout = ({
  rootUri,
  descr,
  descrUrl
}) => {
  const _descrUrl = descr && rootUri
    ? `${rootUri}${descr}.html`
    : descrUrl;
  return _descrUrl
    ? bindTo(showDescription, { descrUrl: _descrUrl })
    : void 0;
};

const D_SELECT_N = "DialogSelectN"
, D_STAT_N = "DialogStatN";

const _getDialogType = (
  dialogType, {
  selectProps,
  dims,
  dfProps
}) => dialogType
  || (isArr(selectProps) ? D_SELECT_N : void 0)
  || (isArr(dims) || (dfProps || {}).dfId ? D_STAT_N : void 0);

const _modifyDialogPropsByLoadId = (
  dialogProps,
  loadId
) => {
  if (!loadId){
    dialogProps.loadId = LT_Q;
  }
  if (loadId === LT_EU_STAT) {
    const { dfProps } = dialogProps
    , { mapFrequency } = dfProps || {};
    dialogProps.dfProps = _assign({}, dfProps, {
       mapFrequency:  mapFrequency || "M"
    })
  }
};

//dialogType, browserType, conf
export const crDialog = (
  browserType,
  dialogConf
) => {
   const {
     type:itemKey,
     dialogProps={},
     dialogType,
     dialogCaption,
     menuTitle
   } = dialogConf
   , {
     valueFn,
     valueFnPrefix,
     loadFnType,
     loadId,
     isGetKey
   } = dialogProps
   , _dialogType = _getDialogType(dialogType, dialogProps);

  _modifyDialogPropsByLoadId(dialogProps, loadId)

  return getDialog(_dialogType)
    .then(Comp => (<Comp
      {...dialogProps}
      //initFromDate, initToDate, onTestDate,
      //errNotYmdOrEmpty, isYmdOrEmpty
      {..._crDateProps(dialogProps)}
      key={itemKey}
      caption={dialogCaption || menuTitle}
      msgOnNotSelected={NOT_SELECTED}
      msgOnNotValidFormat={NOT_VALID_FORMAT}
      fnValue={_crFnValue(valueFn, valueFnPrefix)}
      getKey={isGetKey ? getKey : void 0}
      loadFn={getLoadFn(loadFnType, _dialogType)}
      onAbout={_crClickAbout(dialogProps)}
      onLoad={bindTo(loadItem, {chartType: itemKey, browserType, dialogConf})}
      onShow={bindTo(showItemsContainer, itemKey, browserType, dialogConf)}
      onError={isGetKey ? _onError : void 0}
    />));
}

export const crOptionDialog = ({
  dialogType
}) => getDialog(dialogType)
  .then(Comp => <Comp key={dialogType} />);
