import { ComponentActions } from '../../flux/actions/ComponentActions';
import { WatchActions } from '../../flux/actions/WatchActions';
import {
  MDT_EDIT_WATCH_GROUP,
  MDT_EDIT_WATCH_LIST,
  MDT_LOAD_ITEM
} from '../../constants/ModalDialogType';

export const showDialogEditGroups = () =>
  ComponentActions.showModalDialog(MDT_EDIT_WATCH_GROUP);

export const showDialogEditLists = () =>
  ComponentActions.showModalDialog(MDT_EDIT_WATCH_LIST);

export const showDialogWatchItem = (item) =>
  ComponentActions.showModalDialog(MDT_LOAD_ITEM, item);

export const removeWatchItem = (option, evt) => {
  evt.stopPropagation()
  WatchActions.removeItem(option)
}
