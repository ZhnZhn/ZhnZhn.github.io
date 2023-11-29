export { saveWatchList } from '../../flux/watch-list/watchListStore';

import {
  showModalDialog
} from '../../flux/stores/compStore';
import {
  deleteWatchItem
} from '../../flux/watch-list/watchListStore';
import {
  MDT_EDIT_WATCH_GROUP,
  MDT_EDIT_WATCH_LIST,
  MDT_LOAD_ITEM
} from '../../constants/ModalDialogType';

export const showDialogEditGroups = () => showModalDialog(MDT_EDIT_WATCH_GROUP)
export const showDialogEditLists = () => showModalDialog(MDT_EDIT_WATCH_LIST)
export const showDialogWatchItem = (
  item
) => showModalDialog(MDT_LOAD_ITEM, item);

export const removeWatchItem = (option, evt) => {
  evt.stopPropagation()
  deleteWatchItem(option)
}
