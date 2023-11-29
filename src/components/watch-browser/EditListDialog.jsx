import memoIsShow from '../hoc/memoIsShow';
import useRefFocus from '../hooks/useRefFocus';

import {
  WAT_CREATE_LIST,
  WAT_RENAME_LIST,
  WAT_DELETE_LIST
} from '../../flux/actions/WatchActions';

import {
  useMsEdit,
  getWatchGroups,
  getWatchListsByGroup,
  crList,
  renList,
  delList
} from '../../flux/watch-list/watchListStore';

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

const EditListDialog = memoIsShow(({
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
     caption="Watch Lists Edit"
     isShow={isShow}
     isWithButton={false}
     onClose={onClose}
  >
    <TabPane
      id="eld"
      width={380}
      useMsEdit={useMsEdit}
      getWatchGroups={getWatchGroups}
      msgOnNotSelect={notSelected}
      msgOnIsEmptyName={emptyName}
      onClose={onClose}
      setRefFocusLast={setRefFocusLast}
    >
       <Tab title="Create">
         <ListCreatePane
            forActionType={WAT_CREATE_LIST}
            onCreate={crList}
          />
       </Tab>
       <Tab title="Rename">
         <ListEditPane
            getWatchListsByGroup={getWatchListsByGroup}
            forActionType={WAT_RENAME_LIST}
            onRename={renList}
         />
       </Tab>
       <Tab title="Delete">
         <ListDeletePane
            getWatchListsByGroup={getWatchListsByGroup}
            forActionType={WAT_DELETE_LIST}
            onDelete={delList}
         />
       </Tab>
    </TabPane>
  </ModalDialog>
)
});

export default EditListDialog
