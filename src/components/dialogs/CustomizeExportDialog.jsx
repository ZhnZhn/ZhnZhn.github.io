import { Component } from 'react';

import ChartExportConfig from '../../charts/ChartExportConfig';

import ModalDialog from '../zhn-moleculs/ModalDialog';
import STYLE from '../styles/DialogStyles';
import ToolbarButtonCircle from './ToolbarButtonCircle';
import Button from './Button'

import ShowHide from '../zhn/ShowHide';
import InputText from '../zhn/InputText';
import InputSelect from '../zhn-select/InputSelect';

const _S = {
  LABEL: {
    display: 'inline-block',
    color: '#1b75bb',
    fontSize: '16px',
    fontWeight: 'bold'
  }
};

const S = {
  GAP_BETWEEN_GROUP: {
    marginTop: 10
  },
  LABEL: {
    ..._S.LABEL,
    width: 100,
    paddingRight: 5,
    textAlign: 'right'
  },
  LABEL_WIDTH : {
    ..._S.LABEL,
    paddingRight: 5,
    paddingLeft: 3
  },
  LABEL_HEIGHT: {
    paddingLeft: 6,
  },
  INPUT_NUMBER: {
    width: 60,
    height: 30,
    marginLeft: 0,
  },
  INPUT_TEXT: {
    width: 250,
    height: 30,
    marginLeft: 0
  }
};

const C = {
  APP_HTML: 'Web app ERC https://zhnzhn.github.io',
  DS_TOP_PADDING: 90,
  DS_FONT_SIZE: '10px',
  W_MIN: 351,
  W_MAX: 2001,
  H_MIN: 251,
  H_MAX: 1001
};

const _inRange = (v, min, max) => v>min && v<max;

const _crItemLabel = (html, top=-70, fontSize='9px') => ({
  html: html,
  style: {
    left: 0,
    top: top,
    color: '#909090',
    'font-size': fontSize
  }
});

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

  _getDimension = (chart) => {
    const { chartWidth, chartHeight } = chart
    , _width = this.inputWidth.getValue()
    , _height = this.inputHeight.getValue();
    return {
      width: _inRange(_width, C.W_MIN, C.W_MAX)
        ? _width
        : chartWidth,
      height: _inRange(_height, C.H_MIN, C.H_MAX)
        ? _height
        : chartHeight
    };
  }

  _hExport = () => {
    const { data, onClose } = this.props
    , { chart, fn } = data
    , { width, height } = this._getDimension(chart)
    , _customOption = ChartExportConfig.merge(
        true, {
          chart: { width, height },
          title: {
            text: this.inputTitle.getValue()
          },
          subtitle: {
            text: this.inputSubtitle.getValue()
          },
          labels: {
            items: [
              _crItemLabel(C.APP_HTML),
              _crItemLabel(
                `DataSource: ${chart.userOptions.zhConfig?.dataSource ?? ''}`,
                height - C.DS_TOP_PADDING, C.DS_FONT_SIZE
              )
            ]
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
           <div style={STYLE.ROW}>
              <span style={S.LABEL}>Dimension:</span>
              <span style={S.LABEL_WIDTH}>Width:</span>
              <InputText
                ref={this._refInputWidth}
                type="number"
                placeholder={chartWidth}
                initValue={chartWidth}
                style={S.INPUT_NUMBER}
                min={C.W_MIN}
                max={C.W_MAX}
              />
              <span style={{ ...S.LABEL_WIDTH, ...S.LABEL_HEIGHT}}>Height:</span>
              <InputText
                ref={this._refInputHeight}
                type="number"
                placeholder={chartHeight}
                initValue={chartHeight}
                style={S.INPUT_NUMBER}
                min={C.H_MIN}
                max={C.H_MAX}
              />
           </div>
         </ShowHide>
         <ShowHide isShow={isShowTitle}>
           <div style={{ ...STYLE.ROW, ...S.GAP_BETWEEN_GROUP }}>
             <span style={S.LABEL}>Title:</span>
             <InputText
               ref={this._refInputTitle}
               initValue={title}
               style={S.INPUT_TEXT}
             />
           </div>
           <div style={STYLE.ROW}>
             <span style={S.LABEL}>Subtitle:</span>
             <InputText
               ref={this._refInputSubtitle}
               initValue={subtitle}
               style={S.INPUT_TEXT}
             />
           </div>
         </ShowHide>
         <ShowHide isShow={isShowStyle}>
           <div style={{ ...STYLE.ROW, ...S.GAP_BETWEEN_GROUP}}>
             <span style={S.LABEL}>Style:</span>
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
