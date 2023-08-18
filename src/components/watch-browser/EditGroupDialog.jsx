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
    <TabPane id="egd" width={380} >
       <Tab title="Create">
         <GroupAddPane
            store={store}
            actionCompleted={WAT_EDIT_WATCH_COMPLETED}
            actionFailed={WAT_EDIT_WATCH_FAILED}
            forActionType={WAT_ADD_GROUP}
            msgOnIsEmptyName={emptyName}
            onCreate={addGroup}
            onClose={onClose}
          />
       </Tab>
       <Tab title="Rename">
         <GroupEditPane
            store={store}
            actionCompleted={WAT_EDIT_WATCH_COMPLETED}
            actionFailed={WAT_EDIT_WATCH_FAILED}
            forActionType={WAT_RENAME_GROUP}
            msgOnNotSelect={notSelected}
            msgOnIsEmptyName={emptyName}
            onRename={renameGroup}
            onClose={onClose}
         />
       </Tab>
       <Tab title="Delete">
         <GroupDeletePane
            store={store}
            actionCompleted={WAT_EDIT_WATCH_COMPLETED}
            forActionType={WAT_DELETE_GROUP}
            msgOnNotSelect={notSelected}
            onDelete={deleteGroup}
            onClose={onClose}
         />
       </Tab>
    </TabPane>
  </ModalDialog>
));

export default EditGroupDialog
