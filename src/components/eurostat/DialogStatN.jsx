import React, { Component } from 'react'

import crDateConfig from './crDateConfig'

import D from '../dialogs/DialogCell'
import crMenuMore from '../dialogs/MenuMore'
import Decor from '../dialogs/decorators/Decorators';
import SpinnerLoading from '../zhn/SpinnerLoading'

import RouterOptions from './RouterOptions'
import loadDims from './loadDims'
import ModalOptions from './ModalOptions'
import ModalToggle from './ModalToggle'
import RowChart from './RowChart'

const MAP_FREQUENCY_DF = 'M'
    , MSG_DIMS_NOT_LOADED = "Dims for request haven't been loaded.\nClose, open dialog for trying load again.";

const S = {
  SPINNER_LOADING : {
    position: 'relative',
    display: 'block',
    textAlign: 'middle',
    margin: '16px auto 32px',
    width: 32,
    height: 32
  },
  SPINNER_FAILED: {
    borderColor: '#f44336',
    animation: 'none'
  }
};

const _crIsId = id => `is${id}Select`;

const _isOpenAndPrevLoadFailed = (
  prevProps, props, state
) => props !== prevProps
  && !prevProps.isShow
  && props.isShow
  && state.isLoadFailed;

const _fNotTimeDimension = timeId => config => config.id !== timeId;

const _isCategory = (chartType) => RouterOptions
  .isCategory(chartType);

@Decor.dialog
class DialogStatN extends Component {

  constructor(props){
    super(props)

    this._menuMore = crMenuMore(this, {
      toggleToolBar: this._toggleWithToolbar,
      onAbout: this._clickInfoWithToolbar
    })
    this.toolbarButtons = this._createType2WithToolbar(props, {
      noDate: true, isOptions: true, isToggle: true
    })
    this._commandButtons = this._crCommandsWithLoad(this)
    this._chartOptions = RouterOptions.crOptions(props)
    this._items = []
    this._titles = []
    this._selectOptions = []

    this.state = {
      ...this._isWithInitialState(),
      isLoading: true,
      isLoadFailed: false,
      isShowChart: true,
      isShowDate: false,
      ...crDateConfig('EMPTY'),
      isOptions: false,
      isToggle: false,
      captions: []
      //chartType
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    if (this.props !== nextProps){
       if (this.props.isShow === nextProps.isShow){
          return false;
       }
    }
    return true;
  }

  componentDidMount() {
    this._loadDims()
  }

  componentDidUpdate(prevProps) {
    if ( _isOpenAndPrevLoadFailed(
      prevProps, this.props, this.state
    )) {
      this.setState({
        isLoading: true,
        isLoadFailed: false
      })
      this._loadDims()
    }
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

 _loadDims = () => {
    const {
      proxy, baseMeta,
      dims, timeId, dfProps={}, noTime
    } = this.props
    , { dfId } = dfProps;
    loadDims({ id: dfId, proxy, baseMeta, dims, noTime, timeId })
      .then(result => {
         const { configs, errMsg } = result;
         if (configs) {
           //id
           const _configs = configs.filter(_fNotTimeDimension(timeId));
           this._selectOptions = _configs
             .map(config => config.options)
           this.setState({
              isLoading: false,
              isLoadFailed: false,
              configs: _configs,
              captions: _configs.map(({id, caption}) => ({ id, caption }))
            })
        } else {
          this.setState({
            isLoading: false,
            isLoadFailed: true,
            validationMessages: [ errMsg ]
          })
        }
      })
  }


  _updateForDate = (chartType) => {
    this.date = null;
    const frequency = (this._items[1])
             ? (this.props.mapFrequency)
                  ? this.props.mapFrequency
                  : (this.two.mapFrequency)
                       ? this.two.mapFrequency
                       : MAP_FREQUENCY_DF
             : null
         , { mapDateDf } = this.props
         , dateConfig = (frequency)
              ? crDateConfig(frequency, mapDateDf)
              : crDateConfig('Y', mapDateDf)

    this.setState({
       isShowDate: true,
       ...dateConfig,
       chartType
    });
  }

  _handleLoad = () => {
    const validationMessages = this._crValidationMessages();
    if (validationMessages.length === 0){
      const {
         _items,
         dialogOptions,
         colorComp,
         date
        } = this
      , { chartType } = this.state
      , { seriaColor, seriaWidth } = colorComp
           ? colorComp.getConf()
           : {}
      , { dateDefault } = this.state
      , loadOpt = this.props.loadFn(
        this.props, {
          dialogOptions,
          chartType, seriaColor, seriaWidth,
          date, dateDefault,
          items: _items,
          titles: this._titles,
          selectOptions: this._selectOptions
        }
      );
      this.props.onLoad(loadOpt)
   }
   this.setState({ validationMessages })
  }

  _crValidationMessages = () => {
    const msg = []
        , { configs, isLoadFailed } = this.state;
    if (!isLoadFailed) {
      configs.forEach((config, index) => {
         const { caption } = config;
         if (!this._items[index]) {
           msg.push(this.props.msgOnNotSelected(caption))
         }
      })
    } else {
      msg.push(MSG_DIMS_NOT_LOADED)
    }
    return msg;
  }

  _handleClose = () => {
    this._handleWithValidationClose();
  }

  _hSelectChartType = (chartType) => {

    if (_isCategory(chartType)) {
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


  _fSelect = (index) => {
    return function(item) {
      this._items[index] = item
    };
  }

  _hSelectDate = (date) => {
    this.date = date;
  }

  _renderSelectInputs = () => {
    const { isShowLabels, configs } = this.state
    return configs.map((conf, index) => {
      const { id, caption, options } = conf
      , rest = { isShowLabels, caption, options }
      , _isShow = !this.state[_crIsId(id)];
      return (
        <D.ShowHide key={id} isShow={_isShow}>
          <D.RowInputSelect
            {...rest}
            onSelect={this._fSelect(index).bind(this)}
          />
        </D.ShowHide>
      );
    })
  }

  render(){
    const {
            caption, isShow, onShow, onFront,
          } = this.props
        , {
            chartType,
            isToolbar,
            isOptions, isToggle,
            isShowLabels,
            isLoading, isLoadFailed,
            isShowChart,
            isShowDate, dateDefault, dateOptions,
            captions,
            validationMessages
          } = this.state
        , _spinnerStyle = !isLoadFailed
             ? S.SPINNER_LOADING
             : { ...S.SPINNER_LOADING, ...S.SPINNER_FAILED};

    return (
      <D.DraggableDialog
           isShow={isShow}
           caption={caption}
           menuModel={this._menuMore}
           commandButtons={this._commandButtons}
           onShowChart={onShow}
           onFront={onFront}
           onClose={this._handleClose}
       >
         <D.Toolbar
           isShow={isToolbar}
           buttons={this.toolbarButtons}
         />
         <ModalOptions
           isShow={isOptions}
           toggleOption={this._toggleOptionWithToolbar}
           onClose={this._hideOptionsWithToolbar}
         />
         <ModalToggle
           isShow={isToggle}
           selectProps={captions}
           isShowChart={isShowChart}
           isShowDate={isShowDate}
           crIsId={_crIsId}
           onToggle={this._toggleStateBy}
           onCheckCaption={this._checkCaptionBy}
           onUnCheckCaption={this._uncheckCaption}
           onClose={this._hideToggleWithToolbar}
         />
         {
           (isLoading || isLoadFailed) &&
           <SpinnerLoading
             style={_spinnerStyle}
           />
         }
         {
           !isLoading &&
           !isLoadFailed &&
           this._renderSelectInputs()
         }
         <RowChart
           chartType={chartType}
           isShowLabels={isShowLabels}
           isShowChart={isShowChart}
           chartOptions={this._chartOptions}
           onSelectChart={this._hSelectChartType}
           onRegColor={this._onRegColor}
           isShowDate={isShowDate}
           dateDefault={dateDefault}
           dateOptions={dateOptions}
           onSelecDate={this._hSelectDate}
         />
         <D.ValidationMessages
             validationMessages={validationMessages}
         />
      </D.DraggableDialog>
    );
  }
}

export default DialogStatN
