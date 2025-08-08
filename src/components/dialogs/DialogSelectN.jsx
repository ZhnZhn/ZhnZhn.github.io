//import PropTypes from "prop-types";
import {
  useRef,
  useCallback,
  getRefValue,
  getInputValue,
  getInputValidValue,
  IfTrue
} from '../uiApi';

import memoIsShow from '../hoc/memoIsShow';
import { useToggle } from '../hooks/useToggle';
import { useProperty } from '../hooks/useProperty';
import useEventCallback from '../hooks/useEventCallback';

import useIsShowInput from './hooks/useIsShowInput';
import useSelectChartType from './hooks/useSelectChartType';
import useChartConfig from './hooks/useChartConfig';
import useModalToggle from './hooks/useModalToggle';
import useDialog from './hooks/useDialog';
import useDialogOptions from './hooks/useDialogOptions';
import useTitles from './hooks/useTitles';
import useSelectItem from './hooks/useSelectItem';

import { isCategoryItem } from './ChartOptionsFn';

import DraggableDialog from '../zhn-moleculs/DraggableDialog';
import ShowHide from '../zhn/ShowHide';
import ValidationMessages from '../zhn/ValidationMessages';
import FocusFirstCombobox from '../zhn-moleculs/FocusFirstCombobox';

import Toolbar from './Toolbar';
import SelectList from './SelectList';
import ModalOptions from './modals/ModalOptions';
import ModalToggle from './modals/ModalToggle';
import RowChartDate from './rows/RowChartDate';
import RowDate from './rows/RowDate';

import {
  getItemValue,
  crMsgs
} from './dialogFn';

const DF_INIT_FROM_DATE = '2010-01-01'
, DF_SELECT_PROPS  = [];

const DialogSelectN = memoIsShow((
  props
) => {
  const {
    isCh=!0,
    isShow,
    //isOpt,
    isFd,
    selectProps=DF_SELECT_PROPS,
    dfProps,
    //chartsType,
    //msgOnNotSelected,

    //caption,
    //noDate,
    //initFromDate,
    //errNotYmdOrEmpty,
    //isYmdOrEmpty,
    //loadId,

    //toTopLayer,

    //loadFn,
    //onLoad,
    //onShow
  } = props
  , {
    dfRt
  } = dfProps || {}
  , [
    _isShowChart,
    _toggleIsShowChart
  ] = useToggle(!0)
  , [
    _toggleInputById,
    _isShowInputById
  ] = useIsShowInput(selectProps)
  , [
    _isShowFd,
    _toggleIsShowFd,
    _chartType,
    _hSelectChartType
  ] = useSelectChartType()
  , [
    _setPropertyRoundTo,
    _getPropertyRoundTo
  ] = useProperty(dfRt)
  , _refFromDate = useRef()
  , _refSeriaColor = useRef()
  , [
    _setPropertyDate,
    _getPropertyDate
  ] = useProperty()

  /*eslint-disable react-hooks/exhaustive-deps */
  , _onUpdateChartConfig = useCallback(() => {
     _setPropertyDate()
     _hSelectChartType()
  }, [])
  // setPropertyDate, _hSelectChartType
  /*eslint-enable react-hooks/exhaustive-deps */

  , [
    _chartOptions,
    _dateOptions,
    _dateDefault,
    _updateChartConfig
  ] = useChartConfig(
     selectProps,
     props.chartsType,
     props.loadId,
     dfProps,
    _onUpdateChartConfig
  )
  , [
    _isToggle,
    _toggleInputs,
    _hideToggle,
    _isShowLabels,
    _toggleLabels
  ] = useModalToggle()
  , [
    _refDialogOptions,
    _isShowOptions,
    _toggleOptions,
    _hideOptions,
    _toggleDialogOption
  ] = useDialogOptions()
  , [
    _isToolbar,
    _menuMoreModel,
    _toolbarButtons,
    _validationMessages,
    _setValidationMessages,
    _hClose
  ] = useDialog(props, {
    toggleInputs: isFd || selectProps.length > 1
       ? _toggleInputs
       : void 0,
    toggleOptions: props.isOpt || isCh
       ? _toggleOptions
       : void 0
  }, _toggleLabels)
  , [
    _refTitles,
    _addTitleIndex,
    _removeTitleIndex
  ] = useTitles()
  , [
    _refItems,
    _hSelect,
    _tupleFilter
  ] = useSelectItem(_updateChartConfig)
  , _hLoad = useEventCallback(() => {
      const msgs = crMsgs(
        _chartType,
        getRefValue(_refItems),
        selectProps,
        props.msgOnNotSelected
      );

      if (msgs.length === 0) {
        props.onLoad(props.loadFn(props, {
          // seriaColor, seriaWidth
          ...getInputValue(_refSeriaColor),
          chartType: _chartType,
          isCategory: isCategoryItem(_chartType),
          items: [...getRefValue(_refItems)],
          titles: getRefValue(_refTitles),
          dialogOptions: getRefValue(_refDialogOptions),
          fromDate: getInputValidValue(_refFromDate, ''),
          date: getItemValue(_getPropertyDate()) || _dateDefault,
          _rt: _getPropertyRoundTo()
        }))
      }
      _setValidationMessages(msgs)
  })
  , _isCategory = isCategoryItem(_chartType)
  , _isRowFd = isFd && !_isCategory
  , _isShowFromDate = _isRowFd && _isShowFd
  , _initialValueFromDate = isFd
       ? props.initFromDate || DF_INIT_FROM_DATE
       : void 0
  , _isShowDate = _isShowChart && _isCategory;

  return (
    <DraggableDialog
      isFocusBtMenu={!1}
      isShow={isShow}
      caption={props.caption}
      menuModel={_menuMoreModel}
      toTopLayer={props.toTopLayer}
      onLoad={_hLoad}
      onShow={props.onShow}
      onClose={_hClose}
   >
      <Toolbar
        isShow={_isToolbar}
        buttons={_toolbarButtons}
      />
      <ModalOptions
        isShow={_isShowOptions}
        dfRt={dfRt}
        onRoundTo={_setPropertyRoundTo}
        toggleOption={_toggleDialogOption}
        onClose={_hideOptions}
      />
      <ModalToggle
        isShow={_isToggle}
        selectProps={selectProps}
        isShowLabels={_isShowLabels}
        isFd={_isRowFd}
        isShowFd={_isShowFd}
        isCh={isCh}
        isShowChart={_isShowChart}
        onToggleLabels={_toggleLabels}
        onToggle={_toggleInputById}
        onCheckCaption={_addTitleIndex}
        onUnCheckCaption={_removeTitleIndex}
        onToggleFd={_toggleIsShowFd}
        onToggleChart={_toggleIsShowChart}
        onClose={_hideToggle}
      />
      <FocusFirstCombobox is={isShow}>
        <SelectList
          isShow={isShow}
          isShowLabels={_isShowLabels}
          selectProps={selectProps}
          isShowById={_isShowInputById}
          hSelect={_hSelect}
          tupleFilter={_tupleFilter}
        />
      </FocusFirstCombobox>
      <ShowHide isShow={_isShowFromDate}>
        <RowDate
          refEl={_refFromDate}
          isShowLabels={_isShowLabels}
          title="From Date"
          initialValue={_initialValueFromDate}
          errorMsg={props.errNotYmdOrEmpty}
          onTest={props.isYmdOrEmpty}
        />
      </ShowHide>

      <IfTrue v={isCh}>
        <RowChartDate
          refSeriaColor={_refSeriaColor}
          chartType={_chartType}
          isShowLabels={_isShowLabels}
          isShowChart={_isShowChart}
          chartOptions={_chartOptions}
          onSelectChart={_hSelectChartType}
          noDate={props.noDate}
          isShowDate={_isShowDate}
          dateDefault={_dateDefault}
          dateOptions={_dateOptions}
          onSelectDate={_setPropertyDate}
        />
      </IfTrue>
      <ValidationMessages
        validationMessages={_validationMessages}
      />
    </DraggableDialog>
  );
})

/*
DialogSelectN.propTypes = {
  isShow: PropTypes.bool,
  isOpt: PropTypes.bool,
  isCh: PropTypes.bool,
  isFd: PropTypes.bool,
  caption: PropTypes.string,
  selectProps: PropTypes.arrayOf(
     PropTypes.shape({
        id: PropTypes.string,
        caption: PropTypes.string,
        uri: PropTypes.string,
        jsonProp: PropTypes.string
     })
  ),

  noDate: PropTypes.string,
  dfProps: PropTypes.shape({
    mapFrequency: PropTypes.oneOf(['M', 'Q', 'Y']),
    mapDateDf: PropTypes.number,
  }),
  msgOnNotSelected: PropTypes.func,

  loadFn: PropTypes.func,
  onLoad: PropTypes.func,

  onShow: PropTypes.func,
  toTopLayer: PropTypes.func,
  onClose: PropTypes.func,
  onAbout: PropTypes.func,
}
*/

export default DialogSelectN
