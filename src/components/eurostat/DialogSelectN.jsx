import React, { Component } from 'react';
//import PropTypes from "prop-types";

import crDateConfig from './crDateConfig'

import D from '../dialogs/DialogCell'
import crMenuMore from '../dialogs/MenuMore'
import Decor from '../dialogs/decorators/Decorators'
import withForDate from './withForDate'

import RouterOptions from './RouterOptions'
import ModalOptions from './ModalOptions'
import ModalToggle from './ModalToggle'

const  DF_MAP_FREQUENCY = 'M';

const _crIsId = id => `is${id}Select`;

const _crIsToggleInit = (selectProps) => {
  let _isToggleInit = {};
  selectProps.forEach(item => {
    _isToggleInit[_crIsId(item.id)] = true
  })
  return _isToggleInit;
};

@Decor.withToolbar
@Decor.withValidationLoad
@Decor.withLoad
@withForDate
class DialogSelectN extends Component {
  /*
  static propTypes = {
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
   selectProps: []
 }

  constructor(props){
    super(props)

    this._items = []
    this._compSelect = {}
    this.date = undefined;
    this.chartType = undefined;

    this._menuMore = crMenuMore(this, {
      toggleToolBar: this._toggleWithToolbar,
      onAbout: this._clickInfoWithToolbar
    })
    this._toggleChart = this._toggleStateBy
      .bind(this, 'isShowChart')
    this._toggleDate = this._toggleStateBy
      .bind(this, 'isShowDate')

    this.toolbarButtons = this._createType2WithToolbar(
      props, { noDate: true, isOptions: true, isToggle: true }
    )
    this._commandButtons = this._crCommandsWithLoad(this)
    this._chartOptions = RouterOptions.crOptions(props)

    this.state = {
      isToolbar: true,
      isOptions: false,
      isToggle: false,
      isShowLabels: true,
      isShowChart: true,
      isShowDate: false,
      ...crDateConfig('EMPTY'),
      validationMessages: [],
      ..._crIsToggleInit(props.selectProps)
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

  _toggleStateBy = (propName) => {
    this.setState(prevState => ({
      [propName]: !prevState[propName]
    }))
  }

  _isCategory = () => {
    return RouterOptions.isCategory(this.chartType)
  }

  _updateForDate = () => {
    this.date = undefined;
    const { dfProps={} } = this.props
    , { mapFrequency, mapDateDf } = dfProps
    , _frequency = mapFrequency || DF_MAP_FREQUENCY
    , dateConfig = crDateConfig(_frequency, mapDateDf);

    this.setState({
       isShowDate: true,
       ...dateConfig
    });
  }


  _hSelectChartType = (chartType) => {
    this.chartType = chartType;
    if (this._isCategory()) {
      this._updateForDate();
    } else {
      this.setState({ isShowDate: false });
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
    , _max = selectProps.length
    , msg = [];

    let i = this._isCategory() ? 1 : 0;
    for( ; i<_max; i++) {
      if (!this._items[i]) {
        msg.push(msgOnNotSelected(selectProps[i].caption))
      }
    }

    msg.isValid = (msg.length === 0)
       ? true : false;
    return msg;
  }

  _createLoadOption = () => {
    const {
      chartType,
      colorComp,
      dialogOptions
    } = this
    , seriaColor = colorComp
        ? colorComp.getColor()
        : undefined
    , date = this._getDateWithForDate()
    , isCategory = RouterOptions.isCategory(chartType)
    , items = isCategory
        ? this._items.slice(1)
        : this._items;

    return this.props.loadFn(
      this.props, {
        items,
        dialogOptions,
        chartType, seriaColor,
        isCategory,
        date
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
    if (item) { item.id = id }
    this._items[index] = item
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
      noDate, noForDate
    } = this.props
    , {
      isToolbar, isOptions, isToggle,
      isShowLabels,
      isShowChart, isShowDate,
      dateDefault, dateOptions,
      validationMessages
    } = this.state;

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
           <ModalOptions
             isShow={isOptions}
             toggleOption={this._toggleOptionWithToolbar}
             onClose={this._hideOptionsWithToolbar}
           />
           <ModalToggle
             isShow={isToggle}
             noForDate={noForDate}
             selectProps={selectProps}
             isShowChart={isShowChart}
             isShowDate={isShowDate}
             crIsId={_crIsId}
             onToggle={this._toggleStateBy}
             toggleChart={this._toggleChart}
             toggleDate={this._toggleDate}
             onClose={this._hideToggleWithToolbar}
           />
           {this._renderSelects(selectProps, isShow, isShowLabels)}
           <D.ShowHide isShow={isShowChart}>
             <D.RowChart
               isShowLabels={isShowLabels}
               options={this._chartOptions}
               onSelectChart={this._hSelectChartType}
               onRegColor={this._onRegColor}
             />
           </D.ShowHide>
           {
             !noDate &&
             <D.ShowHide isShow={isShowDate}>
               <D.RowInputSelect
                  isShowLabels={isShowLabels}
                  caption="For Date"
                  placeholder={dateDefault}
                  options={dateOptions}
                  onSelect={this._hSelectDate}
               />
             </D.ShowHide>
           }
           <D.ValidationMessages
               validationMessages={validationMessages}
           />
      </D.DraggableDialog>
    );
  }
}

export default DialogSelectN
