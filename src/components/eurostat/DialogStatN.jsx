import React, { Component } from 'react'

import crDateConfig from './crDateConfig'

import loadConfigs from './loadConfigs'

import D from '../dialogs/DialogCell'
import crMenuMore from '../dialogs/MenuMore'
import Decor from '../dialogs/decorators/Decorators';
import SpinnerLoading from '../zhn/SpinnerLoading'

import RouterOptions from './RouterOptions'
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

const { isCategory } = RouterOptions;

const _crIsId = id => `is${id}Select`;

const _isOpenAndPrevLoadFailed = (
  prevProps, props, state
) => props !== prevProps
  && !prevProps.isShow
  && props.isShow
  && state.isLoadFailed;

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
    this._items = []
    this._titles = []

    this.state = {
      ...this._isWithInitialState(),
      isLoading: true,
      isLoadFailed: false,
      isShowChart: true,
      isShowDate: false,
      ...crDateConfig('EMPTY'),
      isOptions: false,
      isToggle: false,
      configs: [],
      selectOptions: [],
      mapFrequency: props.mapFrequency,
      chartOptions: RouterOptions.crOptions(props)
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

  _setConfigs = ({
    configs,
    timeId,
    mapFrequency:mF,
    errMsg
  }) => {
    if (configs) {
      const { chartsType, mapFrequency } = this.props;
      this.setState({
       isLoading: false,
       isLoadFailed: false,
       timeId,
       configs,
       mapFrequency: mF || mapFrequency,
       selectOptions: configs
         .map(config => config.options),
       chartOptions: RouterOptions
         .crOptions({ configs, chartsType })
      })
    } else {
      this.setState({
       isLoading: false,
       isLoadFailed: true,
       validationMessages: [errMsg]
     })
   }
  }

 _loadDims = () => {
    const {
      dims, proxy, baseMeta,
      dfProps
    } = this.props;
    loadConfigs({ dims, proxy, baseMeta, ...dfProps })
      .then(this._setConfigs)
      .catch(err => {
        this._setConfigs({ errMsg: err.message })
      })
  }


  _updateForDate = (chartType) => {
    this.date = null;

    const { mapDateDf } = this.props
    , { mapFrequency } = this.state
    , _frequency = mapFrequency || MAP_FREQUENCY_DF
    , dateConfig = crDateConfig(_frequency, mapDateDf);

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
      , {
          timeId,
          chartType, selectOptions
        } = this.state
      , { seriaColor, seriaWidth } = colorComp
           ? colorComp.getConf()
           : {}
      , { dateDefault } = this.state
      , _props = { ...this.props, timeId }
      , loadOpt = this.props.loadFn(
         _props, {
          dialogOptions,
          chartType, seriaColor, seriaWidth,
          date, dateDefault,
          items: _items,
          titles: this._titles,
          selectOptions: selectOptions
        }
      );
      this.props.onLoad(loadOpt)
   }
   this.setState({ validationMessages })
  }

  _crValidationMessages = () => {
    const msg = []
    , { configs, isLoadFailed, chartType={} } = this.state
    , _isCategory = isCategory(chartType)
    , { dim } = chartType;
    if (!isLoadFailed) {
      configs.forEach((config, index) => {
         const { caption } = config;
         if (!(_isCategory && caption === dim)) {
           if (!this._items[index]) {
             msg.push(this.props.msgOnNotSelected(caption))
           }
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


  _fSelect = (index) => {
    return function(item) {
      this._items[index] = item
    };
  }

  _hSelectDate = (date) => {
    this.date = date;
  }

  _renderSelectInputs = () => {
    const { isShowLabels, configs } = this.state;
    return configs.map((conf, index) => {
      const { id, caption, options } = conf
      , _isShow = !this.state[_crIsId(id)];
      return (
        <D.ShowHide key={id} isShow={_isShow}>
          <D.RowInputSelect
            isShowLabels={isShowLabels}
            caption={caption}
            options={options}
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
            configs,
            chartOptions,
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
           selectProps={configs}
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
           chartOptions={chartOptions}
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
