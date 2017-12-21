import React, { Component } from 'react'

import DateUtils from '../../utils/DateUtils';

import D from '../dialogs/DialogCell'
import Decor from '../dialogs/decorators/Decorators';
import SpinnerLoading from '../zhn/SpinnerLoading'

import RouterOptions from './RouterOptions'
import loadDims from './loadDims'

const  DATE_PLACEHOLDER = 'Before Select Metric'
     , MAP_FREQUENCY_DF = 'M'
     , MSG_DIMS_NOT_LOADED = "Dims for request haven't been loaded.\nClose, open dialog for trying load again.";


const S = {
  SPINNER_LOADING : {
    position: 'relative',
    display: 'block',
    textAlign: 'middle',
    margin: '16px auto 32px',
    width: '32px',
    height: '32px'
  },
  SPINNER_FAILED: {
    borderColor: '#f44336',
    animation: 'none'
  }
};

@Decor.withToolbar
@Decor.withValidationLoad
class DialogStatN extends Component {

  constructor(props){
    super()

    this.toolbarButtons = this._createType2WithToolbar(props)
    this._commandButtons = [
      <D.Button.Load onClick={this._handleLoad} />
    ];
    this._chartOptions = RouterOptions.crOptions(props)
    this._items = []
    this._selectOptions = []

    this.state = {
      isShowLabels: true,
      isLoading: true,
      isLoadFailed: false,
      isShowDate: false,
      dateDefault: DATE_PLACEHOLDER,
      dateOptions: [],
      validationMessages: []
    }
  }

  componentWillReceiveProps(nextProps){
    if (this.props !== nextProps &&
        !this.props.isShow &&
        nextProps.isShow &&
        this.state.isLoadFailed
    ){
      this.setState({
        isLoading: true,
        isLoadFailed: false
      })
      this._loadDims()
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

  _loadDims = () => {
    const { proxy, baseMeta, dims, dfProps={} } = this.props
        , { dfId } = dfProps;

    loadDims({ id: dfId, proxy, baseMeta, dims })
      .then(result => {
         const { configs, errMsg } = result;
         if (configs) {
           this._selectOptions = configs
             .map(config => config.options)
           this.setState({
              isLoading: false,
              isLoadFailed: false,
              configs: configs
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
             //(this.two)
             ? (this.props.mapFrequency)
                  ? this.props.mapFrequency
                  : (this.two.mapFrequency)
                       ? this.two.mapFrequency
                       : MAP_FREQUENCY_DF
             : null
         , { mapDateDf } = this.props
         , config = (frequency)
             ? DateUtils.createEurostatSelect(frequency, mapDateDf)
             : DateUtils.createEurostatSelect('Y', mapDateDf)
             //: { dateDefault : DATE_PLACEHOLDER , options : [] };

    this.setState({
       isShowDate : true,
       dateDefault : config.dateDefault,
       dateOptions : config.options
    });
  }

  _handleLoad = () => {
    const validationMessages = this._crValidationMessages();
    if (validationMessages.length === 0){
      const { _items, chartType, date } = this
          , { dateDefault } = this.state;

      const loadOpt = this.props.loadFn(
        this.props, {
          //one, two, chartType, date, dateDefault,
          chartType, date, dateDefault,
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
           caption={caption}
           isShow={isShow}
           commandButtons={this._commandButtons}
           onShowChart={onShow}
           onFront={onFront}
           onClose={this._handleClose}
       >
         <D.ToolbarButtonCircle
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

         <D.RowInputSelect
           isShowLabels={isShowLabels}
           caption="Chart"
           placeholder="Default: Area"
           options={this._chartOptions}
           onSelect={this._hSelectChartType}
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
