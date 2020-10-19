import { Component } from 'react';
//import PropTypes from "prop-types";

import Actions, { WatchActionTypes as WAT } from '../../flux/actions/WatchActions';

import MsgWatch from '../../constants/MsgWatch';

import ModalDialog from '../zhn-moleculs/ModalDialog';
import TabPane from '../zhn/TabPane';
import Tab from '../zhn/Tab';
import GroupAddPane from './GroupAddPane';
import GroupEditPane from './GroupEditPane';
import GroupDeletePane from './GroupDeletePane';

const { addGroup, renameGroup, deleteGroup } = Actions;
const {
  EDIT_WATCH_COMPLETED, EDIT_WATCH_FAILED,
  ADD_GROUP, RENAME_GROUP, DELETE_GROUP
} = WAT;
const { notSelected, emptyName } = MsgWatch;

class EditGroupDialog extends Component {
  /*
  static propTypes = {
    isShow: PropTypes.bool,
    store: PropTypes.object,
    onClose: PropTypes.func
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
         caption="Watch Groups Edit"
         isShow={isShow}
         isWithButton={false}
         onClose={onClose}
      >
        <TabPane width={380} >
           <Tab title="Create">
             <GroupAddPane
                store={store}
                actionCompleted={EDIT_WATCH_COMPLETED}
                actionFailed={EDIT_WATCH_FAILED}
                forActionType={ADD_GROUP}
                msgOnIsEmptyName={emptyName}
                onCreate={addGroup}
                onClose={onClose}
              />
           </Tab>
           <Tab title="Rename">
             <GroupEditPane
                store={store}
                actionCompleted={EDIT_WATCH_COMPLETED}
                actionFailed={EDIT_WATCH_FAILED}
                forActionType={RENAME_GROUP}
                msgOnNotSelect={notSelected}
                msgOnIsEmptyName={emptyName}
                onRename={renameGroup}
                onClose={onClose}
             />
           </Tab>
           <Tab title="Delete">
             <GroupDeletePane
                store={store}
                actionCompleted={EDIT_WATCH_COMPLETED}
                forActionType={DELETE_GROUP}
                msgOnNotSelect={notSelected}
                onDelete={deleteGroup}
                onClose={onClose}
             />
           </Tab>
        </TabPane>
      </ModalDialog>
    )
  }
}

export default EditGroupDialog
