//import PropTypes from "prop-types";
import { Component, createRef } from 'react';
import memoizeOne from 'memoize-one'

import {
  crChartOptions,
  isCategoryItem
} from './ChartOptionsFn';
import D from './DialogCell'
import SelectList from './SelectList'
const { Decor, crMenuMore, crDateConfig } = D

const DF_INIT_FROM_DATE = '2010-01-01'
const DF_MAP_FREQUENCY = 'EMPTY';
const TABLE_ID = 'table';

const _isRequireChartOptionsUpdate = (
  prevMapFrequency,
  nextMapFrequency
) => prevMapFrequency !== nextMapFrequency
  && (prevMapFrequency === 'M' || nextMapFrequency === 'M');

const _isEqualChartOptions = (
  nextArgs,
  prevArgs
) => nextArgs[0] === prevArgs[0]
  && nextArgs[1] === prevArgs[1]
  && !_isRequireChartOptionsUpdate(prevArgs[2], nextArgs[2]);

const _crIsId = id => `is${id}Select`;

const _crIsToggleInit = (selectProps) => {
  const _isToggleInit = {};
  selectProps.forEach(item => {
    _isToggleInit[_crIsId(item.id)] = true
  })
  return _isToggleInit;
};

const _getDfFrequencyConfig = ({
  mapFrequency=DF_MAP_FREQUENCY,
  mapDateDf
} = {}) => ({
  mapFrequency,
  mapDateDf
});

const _mergeFrequencyConfig = (
  item,
  dfProps
) => {
  const {
    mapFrequency,
    mapDateDf
  } = _getDfFrequencyConfig(dfProps);
  return [
    item.mapFrequency || mapFrequency,
    item.mapDateDf || mapDateDf
  ];
};

const _crStateForTableItem = (
  item,
  dfProps,
  prevMf,
  prevCht
) => {
  const [
    mapFrequency,
    mapDateDf
  ] = _mergeFrequencyConfig(item, dfProps)
  , chartType = _isRequireChartOptionsUpdate(prevMf, mapFrequency)
      ? void 0
      : prevCht;
  return {
    mapFrequency,
    mapDateDf,
    chartType
  };
};

const _getValidValue = (
  ref,
  dfValue
) => {
  const _compInst = ref.current;
  return  _compInst && _compInst.isValid()
    ? _compInst.getValue()
    : dfValue;
}

@Decor.dialog
class DialogSelectN extends Component {
  /*
  static propTypes = {
    isOpt: PropTypes.bool,
    isCh: PropTypes.bool,
    isShow: PropTypes.bool,
    isFd: PropTypes.bool,
    isShowFd: PropTypes.bool,
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

    onShow: PropTypes.func,
    onFront: PropTypes.func,
    loadFn: PropTypes.func,

    descrUrl: PropTypes.string,
    onClickInfo: PropTypes.func,

    onClose: PropTypes.func,
    onLoad: PropTypes.func
  }
 */

 static defaultProps = {
   isCh: true,
   isShowFd: true,
   selectProps: [],
   initFromDate: DF_INIT_FROM_DATE
 }

  constructor(props){
    super(props)

    this._items = []
    this._titles = [ 0 ]
    this._compSelect = {}
    //this.date = undefined;

    const {
      isOpt,
      isCh,
      isFd,
      isShowFd,
      selectProps,
      dfProps
    } = props;

    this._menuMore = crMenuMore(this, {
      toggleToolBar: this._toggleWithToolbar,
      onAbout: this._clickInfoWithToolbar
    })
    this.toolbarButtons = this._createType2WithToolbar(
      props, {
        noDate: true,
        isOptions: isOpt || isCh,
        isToggle: isFd || selectProps.length > 1
    })
    this._refFromDate = createRef()

    this._crChartOptionsMem = memoizeOne(crChartOptions, _isEqualChartOptions)
    this._crDateConfigMem = memoizeOne(crDateConfig);

    this.state = {
      ...this._isWithInitialState(),
      isOptions: false,
      isToggle: false,
      isShowFd: isShowFd,
      isShowChart: true,
      isShowDate: false,
      ..._crIsToggleInit(selectProps),
      ..._getDfFrequencyConfig(dfProps)
      //chartType
    }
  }

  _crDateConfig = () => {
    const { mapFrequency, mapDateDf } = this.state;
    return this._crDateConfigMem(mapFrequency, mapDateDf);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props !== nextProps
        && this.props.isShow === nextProps.isShow) {
      return false;
    }
    return true;
  }

  componentDidUpdate(prevProps, prevState) {
    const { mapFrequency, mapDateDf } = this.state;
    if (prevState.mapFrequency !== mapFrequency
        || prevState.mapDateDf !== mapDateDf) {
      this.date = void 0
    }
  }

  _isShowById = id => this.state[_crIsId(id)]

  _toggleStateBy = (propName) => {
    this.setState(prevState => ({
      [propName]: !prevState[propName]
    }))
  }

  _checkCaptionBy = (index) => {
    this._titles.push(index)
  }
  _uncheckCaption = (index) => {
     this._titles = this._titles
       .filter(v => v !== index)
  }


  _hSelectChartType = (chartType) => {
    const _nextState = isCategoryItem(chartType)
      ? { isShowDate: true, isShowFd: false }
      : { isShowDate: false };
    this.setState({ ..._nextState, chartType })
  }

  _onRegColor = (comp) => {
    this.colorComp = comp
  }

  _hSelectDate = (date) => {
    this.date = date;
  }
  _getDate = () => (this.date || {}).value
     || this._crDateConfig().dateDefault

  _handleLoad = () => {
    this._handleWithValidationLoad(
      this._createValidationMessages(),
      this._createLoadOption
    );
  }
  _createValidationMessages = () => {
    const {
      msgOnNotSelected,
      selectProps
    } = this.props
    , { chartType } = this.state
    , _max = selectProps.length
    , msg = [];

    let i = isCategoryItem(chartType) ? 1 : 0;
    for( ; i<_max; i++) {
      if (!this._items[i]) {
        msg.push(msgOnNotSelected(selectProps[i].caption))
      }
    }

    msg.isValid = (msg.length === 0)
    return msg;
  }

  _createLoadOption = () => {
    const {
      colorComp,
      dialogOptions
    } = this
    , { chartType } = this.state
    , { seriaColor, seriaWidth } = colorComp
        ? colorComp.getConf()
        : {};

    return this.props.loadFn(
      this.props, {
        items: [...this._items],
        titles: this._titles,
        dialogOptions,
        chartType,
        seriaColor,
        seriaWidth,
        isCategory: isCategoryItem(chartType),
        fromDate: _getValidValue(this._refFromDate, ''),
        date: this._getDate()
        /*
        selectOptions: [
          compSelect1.getOptions(),
          compSelect2.getOptions()
        ]
        */
      }
    );
  }

  _hClose = () => {
    this._handleWithValidationClose()
  }


  _hSelect = (id, index, item) => {
    this._items[index] = item
    if (item) {
      item.id = id
      if (id === TABLE_ID) {
        const { dfProps } = this.props
        , {
          mapFrequency,
          chartType
        } = this.state;
        this.setState(_crStateForTableItem(
          item,
          dfProps,
          mapFrequency,
          chartType
        ))
      }
    }
  }
  _refSelect = (id, comp) => {
    this._compSelect[id] = comp
  }


  render(){
    const {
      caption,
      isShow,
      onShow,
      onFront,
      selectProps,
      chartsType,
      isFd,
      isCh,
      noDate,
      noForDate,
      initFromDate,
      errNotYmdOrEmpty,
      isYmdOrEmpty
    } = this.props
    , {
      chartType,
      isToolbar,
      isOptions,
      isToggle,
      isShowLabels,
      isShowFd,
      isShowChart,
      isShowDate,
      validationMessages,
      mapFrequency
    } = this.state
    , _chartOptions = this._crChartOptionsMem(selectProps, chartsType, mapFrequency)
    , {
      dateDefault,
      dateOptions
    } = this._crDateConfig()
    , _isCategory = isCategoryItem(chartType)
    , _isRowFd = isFd && !_isCategory
    , _noForDate = noForDate || !_isCategory;

    return(
      <D.DraggableDialog
         isShow={isShow}
         caption={caption}
         menuModel={this._menuMore}
         onLoad={this._handleLoad}
         onShowChart={onShow}
         onFront={onFront}
         onClose={this._hClose}
      >
           <D.Toolbar
             isShow={isToolbar}
             buttons={this.toolbarButtons}
           />
           <D.ModalOptions
             isShow={isOptions}
             toggleOption={this._toggleOptionWithToolbar}
             onClose={this._hideOptionsWithToolbar}
           />
           <D.ModalToggle
             isShow={isToggle}
             noForDate={_noForDate}
             selectProps={selectProps}
             isFd={_isRowFd}
             isShowFd={isShowFd}
             isCh={isCh}
             isShowChart={isShowChart}
             isShowDate={isShowDate}
             crIsId={_crIsId}
             onToggle={this._toggleStateBy}
             onCheckCaption={this._checkCaptionBy}
             onUnCheckCaption={this._uncheckCaption}
             onClose={this._hideToggleWithToolbar}
           />
           <SelectList
             isShow={isShow}
             isShowLabels={isShowLabels}
             selectProps={selectProps}
             refSelect={this._refSelect}
             isShowById={this._isShowById}
             hSelect={this._hSelect}
           />
           {_isRowFd && <D.ShowHide isShow={isShowFd}>
               <D.RowDate
                innerRef={this._refFromDate}
                isShowLabels={isShowLabels}
                title="From Date:"
                initialValue={initFromDate}
                errorMsg={errNotYmdOrEmpty}
                onTest={isYmdOrEmpty}
               />
             </D.ShowHide>
           }
           { isCh && <D.RowChartDate
               chartType={chartType}
               isShowLabels={isShowLabels}
               isShowChart={isShowChart}
               chartOptions={_chartOptions}
               onSelectChart={this._hSelectChartType}
               onRegColor={this._onRegColor}
               noDate={noDate}
               isShowDate={isShowDate}
               dateDefault={dateDefault}
               dateOptions={dateOptions}
               onSelecDate={this._hSelectDate}
             />
           }
           <D.ValidationMessages
               validationMessages={validationMessages}
           />
      </D.DraggableDialog>
    );
  }
}

export default DialogSelectN
