import { memo } from 'react';
//import PropTypes from "prop-types";

import Actions, { WatchActionTypes as WAT } from '../../flux/actions/WatchActions';

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

const { createList, renameList, deleteList } = Actions;
const {
  EDIT_WATCH_COMPLETED, EDIT_WATCH_FAILED,
  CREATE_LIST, RENAME_LIST, DELETE_LIST
} = WAT;

const _areEqual = (prevProps, nextProps) => prevProps
  .isShow === nextProps.isShow;

const EditListDialog = memo(({
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
    <TabPane width={380} >
       <Tab title="Create">
         <ListCreatePane
            store={store}
            actionCompleted={EDIT_WATCH_COMPLETED}
            actionFailed={EDIT_WATCH_FAILED}
            forActionType={CREATE_LIST}
            msgOnNotSelect={notSelected}
            msgOnIsEmptyName={emptyName}
            onCreate={createList}
            onClose={onClose}
          />
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
), _areEqual)

/*
EditListDialog.propTypes = {
  isShow : PropTypes.bool,
  store : PropTypes.object,
  onClose : PropTypes.func
}
*/

export default EditListDialog
