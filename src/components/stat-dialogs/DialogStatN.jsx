import { Component } from 'react'

import loadConfigs from './loadConfigs'

import has from '../has'
import ChartTypes from '../dialogs/ChartTypes'
import SpinnerLoading from '../zhn/SpinnerLoading'
import ItemStack from '../zhn/ItemStack'
import D from '../dialogs/DialogCell'
const { Decor, crMenuMore, crDateConfig } = D

const MAP_FREQUENCY_DF = 'M'
, MSG_DIMS_NOT_LOADED = "Dims for request haven't been loaded.\nClose, open dialog for trying load again."
, MSG_DIMS_LOADING = "Dims is loading"

, S_SPINNER_LOADING = { margin: '16px auto 32px' }
, S_SPINNER_FAILED = {
  borderColor: '#f44336',
  animation: 'none'
};

const {
  isCategory,
  crOptions
 } = ChartTypes;

const _crIsId = id => `is${id}Select`;

const _loadDims = ({
  dims,
  proxy,
  baseMeta,
  dfProps
}, _setConfigs) => {
  loadConfigs({ dims, proxy, baseMeta, ...dfProps })
   .then(_setConfigs)
   .catch(err => {
     _setConfigs({ errMsg: err.message })
   })
 };

const _isOpenAndPrevLoadFailed = (
  prevProps, props, state
) => props !== prevProps
  && !prevProps.isShow
  && props.isShow
  && state.isLoadFailed;

const _crSelectItem = (
  conf,
  index, {
    isShowLabels,
    isRow,
    fSelect
  }
) => {
  const { id, caption, options } = conf
  , _isShow = !isRow[_crIsId(id)];
  return (
    <D.ShowHide key={id} isShow={_isShow}>
      <D.RowInputSelect
        isShowLabels={isShowLabels}
        caption={caption}
        options={options}
        onSelect={fSelect(index)}
      />
    </D.ShowHide>
  );
}

@Decor.dialog
class DialogStatN extends Component {

  constructor(props){
    super(props)

    this._menuMore = crMenuMore(this, {
      toggleToolBar: this._toggleWithToolbar,
      onAbout: this._clickInfoWithToolbar
    })
    this.toolbarButtons = this._createType2WithToolbar(props, {
      noDate: true,
      isOptions: true,
      isToggle: true
    })
    this._commandButtons = this._crCommandsWithLoad(this)
    this._items = []
    this._titles = []

    this.state = {
      isLoading: true,
      isLoadFailed: false,
      isToolbar: true,
      isShowLabels: has.wideWidth(),
      isRow: {
        isShowChart: true,
        isShowDate: false
      },
      ...crDateConfig('EMPTY'),
      //isToggle: false,
      //isOptions: false,
      configs: [],
      selectOptions: [],
      mapFrequency: props.mapFrequency,
      chartOptions: crOptions(props),
      //chartType
      validationMessages: []
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
    _loadDims(this.props, this._setConfigs)
  }

  componentDidUpdate(prevProps) {
    if ( _isOpenAndPrevLoadFailed(
      prevProps, this.props, this.state
    )) {
      this.setState({
        isLoading: true,
        isLoadFailed: false
      })
      _loadDims(this.props, this._setConfigs)
    }
  }

  _toggleIsRow = (propName) => {
    this.setState(prevState => {
      const { isRow } = prevState;
      isRow[propName] = !isRow[propName]
      prevState.isRow = {...isRow}
      return {...prevState};
    })
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
       chartOptions: crOptions({ configs, chartsType })
      })
    } else {
      this.setState({
       isLoading: false,
       isLoadFailed: true,
       validationMessages: [errMsg]
     })
   }
  }


  _setIsShowDate = (state, value) => {
    const { isRow } = state;
    isRow.isShowDate = value
    state.isRow = {...isRow}
  }

  _updateForDate = (chartType) => {
    this.date = null;

    const { mapDateDf } = this.props
    , { mapFrequency } = this.state
    , _frequency = mapFrequency || MAP_FREQUENCY_DF
    , dateConfig = crDateConfig(_frequency, mapDateDf);

    this.setState(prevState => {
       this._setIsShowDate(prevState, true)
       return {
         ...prevState,
         ...dateConfig,
         chartType
       };
    });
  }

  _handleLoad = () => {
    const validationMessages = this._crValidationMessages();
    if (validationMessages.length === 0){
      const {
         _items,
         _titles,
         dialogOptions,
         colorComp,
         date
        } = this
      , { seriaColor, seriaWidth } = colorComp
             ? colorComp.getConf()
             : {}
      , {
          dateDefault,
          timeId,
          chartType, selectOptions
        } = this.state
      , { loadFn, onLoad } = this.props
      , _props = { ...this.props, timeId }
      , loadOpt = loadFn(
         _props, {
          dialogOptions,
          chartType, seriaColor, seriaWidth,
          date, dateDefault,
          items: _items,
          titles: _titles,
          selectOptions: selectOptions
        }
      );
      onLoad(loadOpt)
   }
   this.setState({ validationMessages })
  }

  _crValidationMessages = () => {
    const msg = []
    , {
      isLoadFailed,
      isLoading,
      configs,
      chartType
    } = this.state
    , _isCategory = isCategory(chartType)
    , { dim } = chartType || {};
    if (isLoadFailed) {
      msg.push(MSG_DIMS_NOT_LOADED)
      return msg;
    }
    if (isLoading) {
      msg.push(MSG_DIMS_LOADING)
      return msg;
    }

    configs.forEach((config, index) => {
       const { caption } = config;
       if (!(_isCategory && caption === dim)) {
         if (!this._items[index]) {
           msg.push(this.props.msgOnNotSelected(caption))
         }
       }
    })

    return msg;
  }

  _hClose = () => {
    this.props.onClose()
    this.setState(prevState => ({
      validationMessages: []
    }))
  }

  _hSelectChartType = (chartType) => {
    if (isCategory(chartType)) {
      this._updateForDate(chartType);
    } else {
      this.setState(prevState => {
        this._setIsShowDate(prevState, false)
        return {
          ...prevState,
          chartType
        }
      });
    }
  }
  _onRegColor = (comp) => {
    this.colorComp = comp
  }


  _fSelect = (index) => {
    return (function(item) {
      this._items[index] = item
         ? {...item}
         : void 0
    }).bind(this);
  }

  _hSelectDate = (date) => {
    this.date = date;
  }

  render(){
    const {
      isShow,
      caption,
      onShow,
      onFront,
    } = this.props
    , {
        chartType,
        isToolbar,
        isOptions, isToggle,
        isShowLabels,
        isLoading, isLoadFailed,
        dateDefault, dateOptions,
        isRow,
        configs,
        chartOptions,
        validationMessages
     } = this.state
     , {
         isShowChart,
         isShowDate
       } = isRow
     , _spinnerStyle = isLoading
         ? S_SPINNER_LOADING
         : isLoadFailed
            ? {...S_SPINNER_LOADING, ...S_SPINNER_FAILED}
            : void 0;

    return (
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
           selectProps={configs}
           isShowChart={isShowChart}
           isShowDate={isShowDate}
           crIsId={_crIsId}
           onToggle={this._toggleIsRow}
           onCheckCaption={this._checkCaptionBy}
           onUnCheckCaption={this._uncheckCaption}
           onClose={this._hideToggleWithToolbar}
         />
         {
           _spinnerStyle
             ? <SpinnerLoading style={_spinnerStyle} />
             : <ItemStack
                  items={configs}
                  crItem={_crSelectItem}
                  isShowLabels={isShowLabels}
                  isRow={isRow}
                  fSelect={this._fSelect}
               />
         }
         <D.RowChartDate
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
