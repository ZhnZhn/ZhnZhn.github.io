import memoIsShow from '../hoc/memoIsShow';
import useRefFocus from '../hooks/useRefFocus';

import {
  WAT_ADD_GROUP,
  WAT_RENAME_GROUP,
  WAT_DELETE_GROUP
} from '../../flux/actions/WatchActions';

import {
  useMsEdit,
  getWatchGroups,
  crGroup,
  renGroup,
  delGroup
} from '../../flux/watch-list/watchListStore'

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

const EditGroupDialog = memoIsShow(({
  isShow,
  onClose
}) => {
  const [
    refFocusLast,
    setRefFocusLast
  ] = useRefFocus();
  return (
  <ModalDialog
     refFocusLast={refFocusLast}
     caption="Watch Groups Edit"
     isShow={isShow}
     isWithButton={false}
     onClose={onClose}
  >
    <TabPane
       id="egd"
       width={380}
       useMsEdit={useMsEdit}
       getWatchGroups={getWatchGroups}
       msgOnNotSelect={notSelected}
       msgOnIsEmptyName={emptyName}
       onClose={onClose}
       setRefFocusLast={setRefFocusLast}
    >
       <Tab title="Create">
         <GroupAddPane
            forActionType={WAT_ADD_GROUP}
            onCreate={crGroup}
          />
       </Tab>
       <Tab title="Rename">
         <GroupEditPane
            forActionType={WAT_RENAME_GROUP}
            onRename={renGroup}
         />
       </Tab>
       <Tab title="Delete">
         <GroupDeletePane
            forActionType={WAT_DELETE_GROUP}
            onDelete={delGroup}
         />
       </Tab>
    </TabPane>
  </ModalDialog>
)
});

export default EditGroupDialog
