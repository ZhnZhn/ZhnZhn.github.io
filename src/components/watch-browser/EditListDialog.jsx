import memoIsShow from '../hoc/memoIsShow';

import {
  WAT_EDIT_WATCH_COMPLETED,
  WAT_EDIT_WATCH_FAILED,
  WAT_CREATE_LIST,
  WAT_RENAME_LIST,
  WAT_DELETE_LIST,
  WatchActions
} from '../../flux/actions/WatchActions';

import {
  notSelected,
  emptyName
} from '../../constants/MsgWatch';

import ModalDialog from '../zhn-moleculs/ModalDialog';
import TabPane from '../zhn-tab/TabPane';
import Tab from '../zhn-tab/Tab';
import ListCreatePane from './ListCreatePane';
import ListEditPane from './ListEditPane';
import ListDeletePane from './ListDeletePane';

const createList = WatchActions[WAT_CREATE_LIST]
, renameList = WatchActions[WAT_RENAME_LIST]
, deleteList = WatchActions[WAT_DELETE_LIST];

const EditListDialog = memoIsShow(({
  isShow,
  store,
  onClose
}) =>(
  <ModalDialog
     caption="Watch Lists Edit"
     isShow={isShow}
     isWithButton={false}
     onClose={onClose}
  >
    <TabPane
      id="eld"
      width={380}
      store={store}
      actionCompleted={WAT_EDIT_WATCH_COMPLETED}
      actionFailed={WAT_EDIT_WATCH_FAILED}
      msgOnNotSelect={notSelected}
      msgOnIsEmptyName={emptyName}
      onClose={onClose}
    >
       <Tab title="Create">
         <ListCreatePane
            forActionType={WAT_CREATE_LIST}
            onCreate={createList}
          />
       </Tab>
       <Tab title="Rename">
         <ListEditPane
            forActionType={WAT_RENAME_LIST}
            onRename={renameList}
         />
       </Tab>
       <Tab title="Delete">
         <ListDeletePane
            forActionType={WAT_DELETE_LIST}
            onDelete={deleteList}
         />
       </Tab>
    </TabPane>
  </ModalDialog>
));

export default EditListDialog
