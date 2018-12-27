import React, { Component } from 'react';
//import PropTypes from "prop-types";

import crDateConfig from './crDateConfig'

import D from '../dialogs/DialogCell'
import crMenuMore from '../dialogs/MenuMore'
import Decor from '../dialogs/decorators/Decorators';
import withForDate from './withForDate'

import RouterOptions from './RouterOptions';

const  DF_MAP_FREQUENCY = 'M';

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

    this.toolbarButtons = this._createType2WithToolbar(props)
    this._commandButtons = this._crCommandsWithLoad(this)
    this._chartOptions = RouterOptions.crOptions(props)

    this.state = {
      isToolbar: true,
      isShowLabels: true,
      isShowDate: false,
      ...crDateConfig('EMPTY'),
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
    } = this
    , seriaColor = colorComp
        ? colorComp.getColor()
        : undefined
    , date = this._getDateWithForDate();

    return this.props.loadFn(
      this.props, {
        items: this._items,
        chartType, seriaColor,
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
        const { id, uri, jsonProp, caption } = item;
        return (
          <D.SelectWithLoad
            key={id}
            ref={this._refSelect.bind(null, id)}
            isShow={isShow}
            isShowLabels={isShowLabels}
            caption={caption}
            uri={uri}
            jsonProp={jsonProp}
            onSelect={this._hSelect.bind(null, id, index)}
          />
        );
      });
  }

  render(){
    const {
      caption, isShow,
      onShow, onFront,
      selectProps,
      noDate
    } = this.props
    , {
      isToolbar,
      isShowLabels, isShowDate,
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
           {this._renderSelects(selectProps, isShow, isShowLabels)}
           <D.RowChart
             isShowLabels={isShowLabels}
             options={this._chartOptions}
             onSelectChart={this._hSelectChartType}
             onRegColor={this._onRegColor}
           />
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
