import React, { Component } from 'react';
//import PropTypes from "prop-types";

import Actions, { WatchActionTypes as WAT } from '../../flux/actions/WatchActions';

import Msg from '../../constants/MsgWatch';

import ModalDialog from '../zhn-moleculs/ModalDialog';
import TabPane from '../zhn/TabPane';
import Tab from '../zhn/Tab';
import ListCreatePane from './ListCreatePane';
import ListEditPane from './ListEditPane';
import ListDeletePane from './ListDeletePane';

const { createList, renameList, deleteList } = Actions;
const {
  EDIT_WATCH_COMPLETED, EDIT_WATCH_FAILED,
  CREATE_LIST, RENAME_LIST, DELETE_LIST
} = WAT;
const { notSelected, emptyName } = Msg;

class EditListDialog extends Component {
  /*
  static propTypes = {
    isShow : PropTypes.bool,
    store : PropTypes.object,
    onClose : PropTypes.func
  }
  */

  shouldComponentUpdate(nextProps, nextState){
    if (nextProps !== this.props && nextProps.isShow === this.props.isShow) {
      return false;
    }
    return true;
  }

  render(){
    const { isShow, store, onClose } = this.props;
    return (
      <ModalDialog
         caption="Watch Lists Edit"
         isShow={isShow}
         isWithButton={false}
         onClose={onClose}
      >
        <TabPane width="380px" >
           <Tab title="Create">
             <ListCreatePane
                store={store}
                actionCompleted={EDIT_WATCH_COMPLETED}
                actionFailed={EDIT_WATCH_FAILED}
                forActionType={CREATE_LIST}
                msgOnNotSelect={notSelected}
                msgOnIsEmptyName={emptyName}
                onCreate={createList}
                onClose={onClose} />
           </Tab>
           <Tab title="Rename">
             <ListEditPane
                store={store}
                actionCompleted={EDIT_WATCH_COMPLETED}
                actionFailed={EDIT_WATCH_FAILED}
                forActionType={RENAME_LIST}
                msgOnNotSelect={notSelected}
                msgOnIsEmptyName={emptyName}
                onRename={renameList}
                onClose={onClose}
             />
           </Tab>
           <Tab title="Delete">
             <ListDeletePane
                store={store}
                actionCompleted={EDIT_WATCH_COMPLETED}
                actionFailed={EDIT_WATCH_FAILED}
                forActionType={DELETE_LIST}
                msgOnNotSelect={notSelected}
                onDelete={deleteList}
                onClose={onClose}
             />
           </Tab>
        </TabPane>
      </ModalDialog>
    )
  }
}

export default EditListDialog
