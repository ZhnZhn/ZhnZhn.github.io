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
  GAP_BETWEEN_GROUP : {
    marginTop: '10px'
  },
  LABEL_WIDTH : {
    color: '#1B75BB',
    display: 'inline-block',
    textAlign: 'right',
    width: '100px',
    paddingRight: '5px',
    fontSize: '16px',
    fontWeight: 'bold'
  },
  LABEL_HEIGHT : {
    color: '#1B75BB',
    display: 'inline-block',
    paddingRight: '5px',
    paddingLeft: '3px',
    fontSize: '16px',
    fontWeight: 'bold'
  },
  INPUT_NUMBER : {
    marginLeft: '0px',
    height : '30px'
  },
  INPUT_TEXT : {
    width: '250px',
    marginLeft: '0px',
    height : '30px'
  }
}

class CustomizeExportDialog extends Component {

  constructor(props){
    super()
    this.exportStyle = {}
    this.toolbarButtons = [
      { caption: 'D', onClick: this._handleClickDimension },
      { caption: 'T', onClick: this._handleClickTitle },
      { caption: 'S', onClick: this._handleClickStyle }
    ]
    this.optionStyles = ChartExportConfig.createOptionStyles()
    this._commandButtons = [
         <Button.Flat
            caption="Export"
            //accessKey="x"
            isPrimary={true}
            onClick={this._handleExport}
         />
    ];
    this.state = {
      isShowDimension : true,
      isShowTitle : true,
      isShowStyle : true
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    if (nextProps !== this.props && nextProps.isShow === this.props.isShow) {
      return false;
    }
    return true;
  }

  _handleClickDimension = () => {
    this.setState({ isShowDimension: !this.state.isShowDimension });
  }
  _handleClickTitle = () => {
    this.setState({ isShowTitle: !this.state.isShowTitle });
  }
  _handleClickStyle = () => {
    this.setState({ isShowStyle: !this.state.isShowStyle });
  }

  _handleSelectStyle = (item) => {
    this.exportStyle = item.value;
  }

  _handleExport = () => {
    const { data, onClose } = this.props
        , { chart, fn } = data

    const _inputOption = {
      chart : {
        width : this.inputWidth.getValue(),
        height : this.inputHeight.getValue()
      },
      title : {
        text : this.inputTitle.getValue()
      },
      subtitle : {
        text : this.inputSubtitle.getValue()
      }
    }
    //const _customOption = merge(_inputOption, this.exportStyle);
    const _customOption = ChartExportConfig.merge(
      true, _inputOption, this.exportStyle
    );

    fn.apply(chart, [null, _customOption]);
    onClose();
  }

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
                ref={ c => this.inputWidth = c }
                initValue={chartWidth}
                style={S.INPUT_NUMBER}
              />
              <span style={S.LABEL_HEIGHT}>Height:</span>
              <InputText
                ref={ c => this.inputHeight = c }
                initValue={chartHeight}
                style={S.INPUT_NUMBER}
              />
           </div>
         </ShowHide>
         <ShowHide isShow={isShowTitle}>
           <div style={{ ...STYLE.rowDiv, ...S.GAP_BETWEEN_GROUP }}>
             <span style={S.LABEL_WIDTH}>Title:</span>
             <InputText
               ref={ c => this.inputTitle = c }
               initValue={title}
               style={S.INPUT_TEXT}
             />
           </div>
           <div style={STYLE.rowDiv}>
             <span style={S.LABEL_WIDTH}>Subtitle:</span>
             <InputText
               ref={ c => this.inputSubtitle = c }
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
               onSelect={this._handleSelectStyle}
             />
           </div>
         </ShowHide>
      </ModalDialog>
    )
  }
}

export default CustomizeExportDialog
