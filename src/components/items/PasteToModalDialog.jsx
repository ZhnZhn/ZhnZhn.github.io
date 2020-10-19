import { Component } from 'react'

import ModalDialog from '../zhn-moleculs/ModalDialog'
import FlatButton from '../zhn-m/FlatButton'

import SeriesPane from './SeriesPane'


const S = {
  MODAL: {
    position: 'static',
    width: 365,
    height: 340,
    margin: '70px auto 0px'
  },
  SCROLL_PANE: {
    overflowY: 'auto',
    height: 250,
    paddingRight: 10
  }
};

class PasteToModalDialog extends Component {
  static defaultProps = {
    data: {}
  }

  constructor(props){
    super(props)

    this._commandButtons = [
      <FlatButton
        key="paste"
        caption="Paste & Close"
        isPrimary={true}
        onClick={this._hPasteTo}
      />
    ]
  }

  shouldComponentUpdate(nextProps, nextState){
    if ( nextProps !== this.props
      && nextProps.isShow === this.props.isShow
    ) {
      return false;
    }
    return true;
  }

  _hPasteTo = () => {
    const { data, onClose } = this.props
    , { toChart } = data;
    if (toChart) {
      this._compSeries
        .getValues()
        .forEach(conf => {
          //color, data, userMin, userMax, yIndex
          toChart.zhAddSeriaToYAxis(conf)
        })
    }
    onClose()
  }

  _refCompSeries = comp => this._compSeries = comp

  render(){
    const {
        isShow, data, onClose
      } = this.props
    , { fromChart, toChart } = data;
    return (
      <ModalDialog
        style={S.MODAL}
        caption="Paste Series To"
        isShow={isShow}
        commandButtons={this._commandButtons}
        onClose={onClose}
      >
        <SeriesPane
           ref={this._refCompSeries}
           rootStyle={S.SCROLL_PANE}
           fromChart={fromChart}
           toChart={toChart}
        />
      </ModalDialog>
    );
  }
}

export default PasteToModalDialog
