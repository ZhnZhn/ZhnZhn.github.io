import React, { Component } from 'react'

import crDateConfig from './crDateConfig'

import D from '../dialogs/DialogCell'
import crMenuMore from '../dialogs/MenuMore'
import Decor from '../dialogs/decorators/Decorators';
import SpinnerLoading from '../zhn/SpinnerLoading'

import RouterOptions from './RouterOptions'
import loadDims from './loadDims'

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

const _isOpenAndPrevLoadFailed = (
  prevProps, props, state
) => props !== prevProps
  && !prevProps.isShow
  && props.isShow
  && state.isLoadFailed;

const _fNotTimeDimension = timeId => config => config.id !== timeId;

@Decor.dialog
class DialogStatN extends Component {

  constructor(props){
    super(props)

    this._menuMore = crMenuMore(this, {
      toggleToolBar: this._toggleWithToolbar,
      onAbout: this._clickInfoWithToolbar
    })

    this.toolbarButtons = this._createType2WithToolbar(props)
    this._commandButtons = this._crCommandsWithLoad(this)
    this._chartOptions = RouterOptions.crOptions(props)
    this._items = []
    this._selectOptions = []

    this.state = {
      ...this._isWithInitialState(),
      isLoading: true,
      isLoadFailed: false,
      isShowDate: false,
      ...crDateConfig('EMPTY')
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
              configs: _configs
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

  _isCategory = () => {
    return RouterOptions.isCategory(this.chartType)
  }

  _updateForDate = () => {
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
       ...dateConfig
    });
  }

  _handleLoad = () => {
    const validationMessages = this._crValidationMessages();
    if (validationMessages.length === 0){
      const {
             _items,
             chartType, colorComp,
             date
            } = this
          , seriaColor = colorComp
              ? colorComp.getColor()
              : undefined
          , { dateDefault } = this.state;

      const loadOpt = this.props.loadFn(
        this.props, {
          //one, two, chartType, date, dateDefault,
          chartType, seriaColor,
          date, dateDefault,
          items: _items,
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
    this.chartType = chartType;
    if (this._isCategory()) {
      this._updateForDate();
    } else {
      this.setState({ isShowDate : false });
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
         , rest = { isShowLabels, caption, options };
      return (
        <D.RowInputSelect
          key={id}
          {...rest}
          onSelect={this._fSelect(index).bind(this)}
        />
      );
    })
  }

  render(){
    const {
            caption, isShow, onShow, onFront,
          } = this.props
        , {
            isToolbar,
            isShowLabels,
            isLoading, isLoadFailed,
            isShowDate, dateDefault, dateOptions,
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

         <D.RowChart
           isShowLabels={isShowLabels}
           options={this._chartOptions}
           onSelectChart={this._hSelectChartType}
           onRegColor={this._onRegColor}
         />
         <D.ShowHide isShow={isShowDate}>
           <D.RowInputSelect
              isShowLabels={isShowLabels}
              caption="For Date"
              placeholder={dateDefault}
              options={dateOptions}
              onSelect={this._hSelectDate}
           />
         </D.ShowHide>
         <D.ValidationMessages
             validationMessages={validationMessages}
         />
      </D.DraggableDialog>
    );
  }
}

export default DialogStatN
