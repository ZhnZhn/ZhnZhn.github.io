import { Component } from 'react'
//import PropTypes from 'prop-types'

import Actions from '../../flux/actions/ComponentActions'


import A from '../Comp'
import PaneApiKey from './PaneApiKey'
import PaneOptions from './PaneOptions'

const S = {
  MODAL: {
    position : 'static',
    width: 380,
    height: 446,
    margin: '70px auto 0px'
  },
  TITLE_API: {
    width: 80
  },
  TITLE_OPTION: {
    width: 110
  },
  BT: {
    color: '#232f3b'
  }
};

const _isFn = fn => typeof fn === 'function';

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

  _hClose = () => {
    this.props.onClose()
    if (this._modal
        && _isFn(this._modal.focusPrev) ) {
      this._modal.focusPrev()
    }
  }

  _refModal = n => this._modal = n

  render(){
    const { isShow, data } = this.props;
    return (
         <A.ModalDialog
            ref={this._refModal}
            caption="User Settings"
            style={S.MODAL}
            isWithButton={false}
            isShow={isShow}
            onClose={this._hClose}
         >
           <A.TabPane>
             <A.Tab title="ApiKeys">
               <PaneApiKey
                  isShow={isShow}
                  titleStyle={S.TITLE_API}
                  btStyle={S.BT}
                  data={data}
                  onClose={this._hClose}
                />
             </A.Tab>
             <A.Tab title="Options">
               <PaneOptions
                 titleStyle={S.TITLE_OPTION}
                 btStyle={S.BT}
                 data={data}
                 onChangeTheme={Actions.changeTheme}
                 onClose={this._hClose}
               />
             </A.Tab>
           </A.TabPane>
         </A.ModalDialog>
    );
  }
}

export default SettingsDialog
