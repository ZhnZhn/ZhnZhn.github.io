import React, { Component } from 'react'
//import PropTypes from 'prop-types'

import Actions from '../../flux/actions/ComponentActions'

import ModalDialog from '../zhn-moleculs/ModalDialog'
import TabPane from '../zhn/TabPane'
import Tab from '../zhn/Tab'
import PaneApiKey from './PaneApiKey'
import PaneOptions from './PaneOptions'

const S = {
  MODAL: {
    position : 'static',
    width: '380px',
    height: '320px',
    margin: '70px auto 0px'
  },
  TITLE_API: {
    width: '80px'
  },
  TITLE_OPTION: {
    width: '110px'
  },
  BT: {
    color: '#232f3b'
  }
};

class SettingsDialog extends Component {
  /*
  static propTypes = {
    isShow: PropTypes.bool,
    data: PropTypes.shape({
      setQuandlKey: PropTypes.func,
      isAdminMode: PropTypes.func,
      isDrawDeltaExtrems: PropTypes.func
    }),
    onClose: PropTypes.func
  }
  */

  shouldComponentUpdate(nextProps, nextState){
    if (nextProps !== this.props
        && nextProps.isShow === this.props.isShow
    ) {
      return false;
    }
    return true;
  }

  render(){
    const { isShow, data, onClose } = this.props;
    return (
         <ModalDialog
            caption="User Settings"
            style={S.MODAL}
            isWithButton={false}
            isShow={isShow}
            onClose={onClose}
         >
           <TabPane isUpdateInit={true}>
             <Tab title="ApiKeys">
               <PaneApiKey
                  titleStyle={S.TITLE_API}
                  btStyle={S.BT}
                  data={data}
                  onClose={onClose}
                />
             </Tab>
             <Tab title="Options">
               <PaneOptions
                 titleStyle={S.TITLE_OPTION}
                 btStyle={S.BT}
                 data={data}
                 onChangeTheme={Actions.changeTheme}
                 onClose={onClose}
               />
             </Tab>
           </TabPane>
         </ModalDialog>
    );
  }
}

export default SettingsDialog
