import React, { Component } from 'react';

import ChartExportConfig from '../../charts/ChartExportConfig';

import ModalDialog from '../zhn-moleculs/ModalDialog';
import STYLE from '../styles/DialogStyles';
import ToolbarButtonCircle from './ToolbarButtonCircle';
import Button from './Button'

import ShowHide from '../zhn/ShowHide';
import InputText from '../zhn/InputText';
import InputSelect from '../zhn-select/InputSelect';

const S = {
  GAP_BETWEEN_GROUP: {
    marginTop: 10
  },
  LABEL_WIDTH : {
    display: 'inline-block',
    color: '#1b75bb',
    width: 100,
    paddingRight: 5,
    textAlign: 'right',
    fontSize: '16px',
    fontWeight: 'bold'
  },
  LABEL_HEIGHT : {
    display: 'inline-block',
    color: '#1b75bb',
    paddingRight: 5,
    paddingLeft: 3,
    fontSize: '16px',
    fontWeight: 'bold'
  },
  INPUT_NUMBER: {
    height: 30,
    marginLeft: 0,
  },
  INPUT_TEXT: {
    width: 250,
    height: 30,
    marginLeft: 0
  }
};

class CustomizeExportDialog extends Component {

  static defaultProps = {
    data: {}
  }

  constructor(props){
    super(props)
    this.exportStyle = {}
    this.toolbarButtons = [
      { caption: 'D', onClick: this._hClickDimension },
      { caption: 'T', onClick: this._hClickTitle },
      { caption: 'S', onClick: this._hClickStyle }
    ]
    this.optionStyles = ChartExportConfig.createOptionStyles()
    this._commandButtons = [
         <Button.Flat
            key="export"
            caption="Export"
            //accessKey="x"
            isPrimary={true}
            onClick={this._hExport}
         />
    ];
    this.state = {
      isShowDimension: true,
      isShowTitle: true,
      isShowStyle: true
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    if (nextProps !== this.props
        && nextProps.isShow === this.props.isShow) {
      return false;
    }
    return true;
  }

  _hClickDimension = () => {
    this.setState(prevState => ({
      isShowDimension: !prevState.isShowDimension
    }))
  }
  _hClickTitle = () => {
    this.setState(prevState => ({
      isShowTitle: !prevState.isShowTitle
    }))
  }
  _hClickStyle = () => {
    this.setState(prevState => ({
      isShowStyle: !prevState.isShowStyle
    }))
  }

  _hSelectStyle = (item) => {
    this.exportStyle = item
      && item.value || {};
  }

  _hExport = () => {
    const { data, onClose } = this.props
    , { chart, fn } = data
    , _customOption = ChartExportConfig.merge(
      true, {
        chart: {
          width: this.inputWidth.getValue(),
          height: this.inputHeight.getValue()
        },
        title: {
          text: this.inputTitle.getValue()
        },
        subtitle: {
          text: this.inputSubtitle.getValue()
        }
      }, this.exportStyle
    );

    fn.apply(chart, [null, _customOption]);
    onClose();
  }

  _refInputWidth = c => this.inputWidth = c
  _refInputHeight = c => this.inputHeight = c
  _refInputTitle = c => this.inputTitle = c
  _refInputSubtitle = c => this.inputSubtitle = c

  render(){
    const {isShow, data, onClose} = this.props
    , { chart } = data
    , { chartWidth, chartHeight, options } = chart
    , title = options.title.text
    , subtitle = options.subtitle.text
    , {
        isShowDimension, isShowTitle, isShowStyle
      } = this.state;

    return (
      <ModalDialog
        caption="Customize Export Chart"
        isShow={isShow}
        commandButtons={this._commandButtons}
        onClose={onClose}
      >
         <ToolbarButtonCircle
           buttons={this.toolbarButtons}
         />
         <ShowHide isShow={isShowDimension}>
           <div style={STYLE.rowDiv}>
              <span style={S.LABEL_WIDTH}>Dimension:</span>
              <span style={S.LABEL_HEIGHT}>Width:</span>
              <InputText
                ref={this._refInputWidth}
                initValue={chartWidth}
                style={S.INPUT_NUMBER}
              />
              <span style={S.LABEL_HEIGHT}>Height:</span>
              <InputText
                ref={this._refInputHeight}
                initValue={chartHeight}
                style={S.INPUT_NUMBER}
              />
           </div>
         </ShowHide>
         <ShowHide isShow={isShowTitle}>
           <div style={{ ...STYLE.rowDiv, ...S.GAP_BETWEEN_GROUP }}>
             <span style={S.LABEL_WIDTH}>Title:</span>
             <InputText
               ref={this._refInputTitle}
               initValue={title}
               style={S.INPUT_TEXT}
             />
           </div>
           <div style={STYLE.rowDiv}>
             <span style={S.LABEL_WIDTH}>Subtitle:</span>
             <InputText
               ref={this._refInputSubtitle}
               initValue={subtitle}
               style={S.INPUT_TEXT}
             />
           </div>
         </ShowHide>
         <ShowHide isShow={isShowStyle}>
           <div style={{ ...STYLE.rowDiv, ...S.GAP_BETWEEN_GROUP}}>
             <span style={S.LABEL_WIDTH}>Style:</span>
             <InputSelect
               width="250"
               options={this.optionStyles}
               placeholder="Default"
               onSelect={this._hSelectStyle}
             />
           </div>
         </ShowHide>
      </ModalDialog>
    );
  }
}

export default CustomizeExportDialog
