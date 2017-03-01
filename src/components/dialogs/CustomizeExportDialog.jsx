import React, { Component } from 'react';
import merge from 'lodash.merge';

import ChartExportConfig from '../../charts/ChartExportConfig';

import ModalDialog from '../zhn/ModalDialog';
import DialogStyles from '../styles/DialogStyles'
import ToolbarButtonCircle from './ToolbarButtonCircle';
import ActionButton from '../zhn/ActionButton';

import ShowHide from '../zhn/ShowHide';
import InputText from '../zhn/InputText';
import InputSelect from '../zhn/InputSelect';

const styles = DialogStyles;

const STYLE = {
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
  state = {
    isShowDimension : true,
    isShowTitle : true,
    isShowStyle : true
  }

  constructor(props){
    super();
    this.exportStyle = {};
    this.toolbarButtons = [
      { caption: 'D', onClick: this._handleClickDimension },
      { caption: 'T', onClick: this._handleClickTitle },
      { caption: 'S', onClick: this._handleClickStyle }
    ];
    this.optionStyles = ChartExportConfig.createOptionStyles();
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
    const _customOption = merge(_inputOption, this.exportStyle);

    fn.apply(chart, [null, _customOption]);
    onClose();
  }

  render(){
    const {isShow, data, onClose} = this.props
        , { chart } = data
        , { chartWidth, chartHeight, options } = chart
        , title = options.title.text
        , subtitle = options.subtitle.text
        , { isShowDimension, isShowTitle, isShowStyle } = this.state
        , commandButtons =[
             <ActionButton
                key="a"
                type="TypeC"
                caption="Export"
                onClick={this._handleExport}
             />
          ];

    return (
      <ModalDialog
        caption="Customize Export Chart"
        isShow={isShow}
        commandButtons={commandButtons}
        onClose={onClose}
      >
         <ToolbarButtonCircle
           buttons={this.toolbarButtons}
         />
         <ShowHide isShow={isShowDimension}>
         <div style={styles.rowDiv} key="1">
            <span style={STYLE.LABEL_WIDTH}>Dimension:</span>
            <span style={STYLE.LABEL_HEIGHT}>Width:</span>
            <InputText
              ref={ c => this.inputWidth = c }
              initValue={chartWidth}
              style = {STYLE.INPUT_NUMBER}
            />
            <span style={STYLE.LABEL_HEIGHT}>Height:</span>
            <InputText
              ref={ c => this.inputHeight = c }
              initValue={chartHeight}
              style = {STYLE.INPUT_NUMBER}
            />
         </div>
         </ShowHide>
         <ShowHide isShow={isShowTitle}>
         <div style={Object.assign({}, styles.rowDiv, STYLE.GAP_BETWEEN_GROUP)} key="2">
           <span style={STYLE.LABEL_WIDTH}>Title:</span>
           <InputText
             ref={ c => this.inputTitle = c }
             initValue={title}
             style={STYLE.INPUT_TEXT}
           />
         </div>
         <div style={styles.rowDiv} key="3">
           <span style={STYLE.LABEL_WIDTH}>Subtitle:</span>
           <InputText
             ref={ c => this.inputSubtitle = c }
             initValue={subtitle}
             style={STYLE.INPUT_TEXT}
           />
         </div>
         </ShowHide>
         <ShowHide isShow={isShowStyle}>
         <div style={Object.assign({}, styles.rowDiv, STYLE.GAP_BETWEEN_GROUP)} key="4">
           <span style={STYLE.LABEL_WIDTH}>Style:</span>
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

CustomizeExportDialog.displayName = 'CustomizeExportDialog';

export default CustomizeExportDialog
