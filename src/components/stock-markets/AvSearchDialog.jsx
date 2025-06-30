import memoIsShow from '../hoc/memoIsShow';
import { useToggle } from '../hooks/useToggle';
import { useRefInit } from '../hooks/useProperty';
import useMenuMore from '../dialogs/hooks/useMenuMore';
import {
  TITLE_TOGGLE,
  useToolbar
} from '../dialogs/hooks/useToolbar';

import SearchAdapter from '../../adapters/av-sm/SearchAdapter';

import DraggableDialog from '../zhn-moleculs/DraggableDialog';
import Toolbar from '../dialogs/Toolbar';
import RowInputSearch from '../dialogs/rows/RowInputSearch';

const ERR_DESCR = 'API key from Alpha Vantage is required'
, ERR_CAPTION = "Without API Key";

const AvSearchDialog = memoIsShow(({
  isShow,
  caption,
  getKey,
  loadId,
  toTopLayer,
  onAbout,
  onError,
  onClose
}) => {
  const [
    isToolbar,
    menuMoreModel
  ] = useMenuMore(onAbout)
  , [
    isShowLabels,
    toggleLabels
  ] = useToggle(!0)
  , _toolbarButtons = useToolbar({
    titleToggle: TITLE_TOGGLE,
    toggleInputs: toggleLabels,
    onAbout,
  })
  , _searchApi = useRefInit(() => ({
     ...SearchAdapter,
     onError,
     crUrlOptions: () => {
       const apiKey = getKey(loadId);
       if (!apiKey) {
         onError(ERR_DESCR, ERR_CAPTION)
         return;
       }
       return { apiKey };
     }
  }))

  return (
    <DraggableDialog
      isShow={isShow}
      caption={caption}
      menuModel={menuMoreModel}
      toTopLayer={toTopLayer}
      onClose={onClose}
    >
       <Toolbar
         isShow={isToolbar}
         buttons={_toolbarButtons}
       />
       <RowInputSearch
         isShowLabels={isShowLabels}
         caption="Token"
         searchApi={_searchApi}
       />
    </DraggableDialog>
  );
});

export default AvSearchDialog
