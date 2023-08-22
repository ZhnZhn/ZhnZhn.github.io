import memoIsShow from '../hoc/memoIsShow';

import {
  WAT_EDIT_WATCH_COMPLETED,
  WAT_EDIT_WATCH_FAILED,
  WAT_ADD_GROUP,
  WAT_RENAME_GROUP,
  WAT_DELETE_GROUP,
  WatchActions
} from '../../flux/actions/WatchActions';

import {
  notSelected,
  emptyName
} from '../../constants/MsgWatch';

import ModalDialog from '../zhn-moleculs/ModalDialog';
import TabPane from '../zhn-tab/TabPane';
import Tab from '../zhn-tab/Tab';
import GroupAddPane from './GroupAddPane';
import GroupEditPane from './GroupEditPane';
import GroupDeletePane from './GroupDeletePane';

const addGroup = WatchActions[WAT_ADD_GROUP]
, renameGroup = WatchActions[WAT_RENAME_GROUP]
, deleteGroup = WatchActions[WAT_DELETE_GROUP];

const EditGroupDialog = memoIsShow(({
  isShow,
  store,
  onClose
}) => (
  <ModalDialog
     caption="Watch Groups Edit"
     isShow={isShow}
     isWithButton={false}
     onClose={onClose}
  >
    <TabPane
       id="egd"
       width={380}
       store={store}
       actionCompleted={WAT_EDIT_WATCH_COMPLETED}
       actionFailed={WAT_EDIT_WATCH_FAILED}
       msgOnNotSelect={notSelected}
       msgOnIsEmptyName={emptyName}
       onClose={onClose}
    >
       <Tab title="Create">
         <GroupAddPane
            forActionType={WAT_ADD_GROUP}
            onCreate={addGroup}
          />
       </Tab>
       <Tab title="Rename">
         <GroupEditPane
            forActionType={WAT_RENAME_GROUP}
            onRename={renameGroup}
         />
       </Tab>
       <Tab title="Delete">
         <GroupDeletePane
            forActionType={WAT_DELETE_GROUP}
            onDelete={deleteGroup}
         />
       </Tab>
    </TabPane>
  </ModalDialog>
));

export default EditGroupDialog
