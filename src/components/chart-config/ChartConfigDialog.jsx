import React, { Component, PropTypes } from 'react'

import DraggableDialog from '../zhn-moleculs/DraggableDialog'
import TabPane from '../zhn/TabPane'
import Tab from '../zhn/Tab'
import ChartPane from './ChartPane'
import SeriaPane from './SeriaPane'

const STYLE = {
  TITLE : {
    paddingTop: '12px',
    paddingBottom: '6px',
    paddingLeft: '12px',
    color: '#a487d4',
    fontSize: '16px',
    fontWeight: 'bold'
  }
}

class ChartConfigDialog extends Component {
  static propTypes = {
    isShow: PropTypes.bool,
    optionData: PropTypes.shape({
      caption: PropTypes.string,
      chart: PropTypes.object
    }),
    onClose: PropTypes.func
  }


  shouldComponentUpdate(nextProps, nextState){
    if (nextProps !== this.props &&
        nextProps.isShow === this.props.isShow &&
        nextProps.optionData === this.props.optionData) {
      return false;
    }
    return true;
  }

  _handleClose = () => {
    this.props.onClose()
  }

  render(){
    const { isShow, optionData={} } = this.props
        , { caption, chart } = optionData;

    return (
      <DraggableDialog
          caption="Configure Chart"
          isShow={isShow}
          //commandButtons={_commandButtons}
          //onShowChart={onShow}
          onClose={this._handleClose}
      >
        <div style={STYLE.TITLE}>
          {caption}
        </div>

        <TabPane isUpdateInit={true}>
          <Tab title="Chart">
            <ChartPane chart={chart} />
          </Tab>
          <Tab title="Seria">
            <SeriaPane chart={chart} />
          </Tab>
        </TabPane>

      </DraggableDialog>
    );
  }
}

export default ChartConfigDialog
