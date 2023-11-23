import { bindTo } from '../storeApi';
import { showModalDialog } from '../stores/compStore';

import {
  MDT_DESCRIPTION,
  MDT_SETTINGS,
  MDT_PASTE_TO,
  MDT_ZOOM,
  MDT_RELOAD,
  MDT_ALERT,
  MDT_ASK,
  MDT_CUSTOMIZE_EXPORT,
  MDT_ADD_TO_WATCH
} from '../../constants/ModalDialogType';

const CA = {};

Object.assign(CA, {
  showDescription: bindTo(showModalDialog, MDT_DESCRIPTION),
  showSettings: bindTo(showModalDialog, MDT_SETTINGS),
  showPasteTo: bindTo(showModalDialog, MDT_PASTE_TO),
  zoom: bindTo(showModalDialog, MDT_ZOOM),
  showReload: bindTo(showModalDialog, MDT_RELOAD),
  showAlert: bindTo(showModalDialog, MDT_ALERT),
  showAsk: bindTo(showModalDialog, MDT_ASK),
  showCustomizeExport: bindTo(showModalDialog, MDT_CUSTOMIZE_EXPORT),
  showAddToWatch: bindTo(showModalDialog, MDT_ADD_TO_WATCH)
})

export const ComponentActions = CA
