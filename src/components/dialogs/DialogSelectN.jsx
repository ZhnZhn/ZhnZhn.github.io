import { Component, createRef } from 'react';
//import PropTypes from "prop-types";

import ChartTypes from './ChartTypes'
import D from './DialogCell'
const { Decor, crMenuMore, crDateConfig } = D

const DF_INIT_FROM_DATE = '2010-01-01'
const DF_MAP_FREQUENCY = 'M';
const TABLE_ID = 'table';

const {
  crOptions,
  isCategory
} = ChartTypes;

const _crIsId = id => `is${id}Select`;

const _crIsToggleInit = (selectProps) => {
  const _isToggleInit = {};
  selectProps.forEach(item => {
    _isToggleInit[_crIsId(item.id)] = true
  })
  return _isToggleInit;
};

const _getDfFrequencyConfig = (props) => {
  const { dfProps={} } = props
  , {
    mapFrequency=DF_MAP_FREQUENCY,
    mapDateDf
  } = dfProps;
  return { mapFrequency, mapDateDf };
};

const _isRequireChartOptionsUpdate = (
  oldFrequency,
  { mapFrequency }
) => oldFrequency !== mapFrequency
  && (oldFrequency === 'M' || mapFrequency === 'M');

@Decor.dialog
@Decor.withForDate
class DialogSelectN extends Component {
  /*
  static propTypes = {
    isOpt: PropTypes.bool,
    isCh: PropTypes.bool,
    isShow: PropTypes.bool,
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
   selectProps: [],
   initFromDate: DF_INIT_FROM_DATE
 }

  constructor(props){
    super(props)

    this._items = []
    this._titles = [ 0 ]
    this._compSelect = {}
    //this.date = undefined;

    const { isOpt, isCh, isFd, selectProps } = props;
    this._setFrequencyConfig(
      _getDfFrequencyConfig(props)
    )

    this._menuMore = crMenuMore(this, {
      toggleToolBar: this._toggleWithToolbar,
      onAbout: this._clickInfoWithToolbar
    })
    this.toolbarButtons = this._createType2WithToolbar(
      props, { noDate: true, isOptions: isOpt || isCh,
      isToggle: isFd || selectProps.length > 1
    })
    this._refFromDate = createRef()
    this._commandButtons = this._crCommandsWithLoad(this)
    this._chartOptions = crOptions(props)

    this.state = {
      ...this._isWithInitialState(),
      isOptions: false,
      isToggle: false,
      isShowFd: true,
      isShowChart: true,
      isShowDate: false,
      ...crDateConfig('EMPTY'),
      ..._crIsToggleInit(selectProps)
      //chartType
    }
  }

  _setFrequencyConfig({ mapFrequency, mapDateDf }){
    this._mapFrequency = mapFrequency
    this._mapDateDf = mapDateDf
  }

  shouldComponentUpdate(nextProps, nextState){
    if (this.props !== nextProps){
       if (this.props.isShow === nextProps.isShow){
          return false;
       }
    }
    return true;
  }

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

  _crDateConfig = () => {
    const { _mapFrequency, _mapDateDf } = this;
    return crDateConfig(_mapFrequency, _mapDateDf);
  }

  _updateForDate = (chartType) => {
    this.date = void 0;
    this.setState({
       isShowFd: false,
       isShowDate: true,
       chartType,
       ...this._crDateConfig()
    });
  }


  _hSelectChartType = (chartType) => {
    if (isCategory(chartType)) {
      this._updateForDate(chartType);
    } else {
      this.setState({
        chartType,
        isShowDate: false
      });
    }
  }
  _onRegColor = (comp) => {
    this.colorComp = comp
  }

  _hSelectDate = (date) => {
    this.date = date;
  }

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

    let i = isCategory(chartType) ? 1 : 0;
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
        : {}
    , date = this._getDateWithForDate()
    , _isCategory = isCategory(chartType)
    , items = _isCategory
        ? this._items.slice(1)
        : [...this._items]
    , _compFd = this._refFromDate.current
    , fromDate = _compFd && _compFd.isValid()
       ? _compFd.getValue()
       : '';

    return this.props.loadFn(
      this.props, {
        items,
        titles: this._titles,
        dialogOptions,
        chartType, seriaColor, seriaWidth,
        isCategory: _isCategory,
        fromDate, date
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


  _crFrequencyConfig = (item) => {
    const { mapFrequency, mapDateDf } = _getDfFrequencyConfig(this.props)
    , _frequency = item.mapFrequency || mapFrequency
    , _dateDf = item.mapDateDf || mapDateDf;
    return this._mapFrequency !== _frequency
      || this._mapDateDf !== _dateDf
      ? {
          mapFrequency: _frequency,
          mapDateDf: _dateDf
        }
      : void 0;
  }

  _checkForTableId = (id, item) => {
    if (id === TABLE_ID) {
      const _conf = this._crFrequencyConfig(item);
      if (_conf) {
       if(_isRequireChartOptionsUpdate(this._mapFrequency, _conf)){
         this._chartOptions = crOptions(this.props, _conf)
       }
       this._setFrequencyConfig(_conf)
       this.setState(this._crDateConfig())
      }
    }
  }

  _hSelect = (id, index, item) => {
    this._items[index] = item
    if (item) {
      item.id = id
      this._checkForTableId(id, item)
    }
  }
  _refSelect = (id, comp) => {
    this._compSelect[id] = comp
  }

  _renderSelects = (selectProps, isShow, isShowLabels) => {
      return selectProps.map((item, index) => {
        const {
          id,
          //uri, jsonProp, caption, isWithInput
          ...restItem
        } = item;
        const _isShow = this.state[_crIsId(id)];
        return (
          <D.ShowHide key={id} isShow={_isShow}>
            <D.SelectWithLoad
              {...restItem}
              ref={this._refSelect.bind(null, id)}
              isShow={isShow}
              isShowLabels={isShowLabels}
              onSelect={this._hSelect.bind(null, id, index)}
            />
          </D.ShowHide>
        );
      });
  }

  render(){
    const {
      caption, isShow,
      onShow, onFront,
      selectProps,
      isFd, isCh, noDate, noForDate,
      initFromDate,
      errNotYmdOrEmpty,
      isYmdOrEmpty
    } = this.props
    , {
      chartType,
      isToolbar, isOptions, isToggle,
      isShowLabels,
      isShowFd, isShowChart, isShowDate,
      dateDefault, dateOptions,
      validationMessages
    } = this.state
    , _isCategory = isCategory(chartType)
    , _isRowFd = isFd && !_isCategory
    , _noForDate = noForDate || !_isCategory;
    return(
      <D.DraggableDialog
         isShow={isShow}
         caption={caption}
         menuModel={this._menuMore}
         commandButtons={this._commandButtons}
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
           {this._renderSelects(selectProps, isShow, isShowLabels)}
           {_isRowFd && <D.ShowHide isShow={isShowFd}>
               <D.RowDate
                innerRef={this._refFromDate}
                isShowLabels={isShowLabels}
                labelTitle="From Date:"
                initValue={initFromDate}
                errorMsg={errNotYmdOrEmpty}
                onTestDate={isYmdOrEmpty}
               />
             </D.ShowHide>
           }
           { isCh && <D.RowChartDate
               chartType={chartType}
               isShowLabels={isShowLabels}
               isShowChart={isShowChart}
               chartOptions={this._chartOptions}
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
