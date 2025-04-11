import memoIsShow from '../hoc/memoIsShow';
import { useToggle } from '../hooks/useToggle';
import { useRefInit } from '../hooks/useProperty';
import useMenuMore from '../dialogs/hooks/useMenuMore';
import useToolbar from '../dialogs/hooks/useToolbar';

import SearchAdapter from '../../adapters/av-sm/SearchAdapter';
import D from '../dialogs/DialogCell';

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
  ] = useToggle(true)
  , _toolbarButtons = useToolbar({
    toggleLabels,
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
    <D.DraggableDialog
         isShow={isShow}
         caption={caption}
         menuModel={menuMoreModel}
         toTopLayer={toTopLayer}
         onClose={onClose}
     >
       <D.Toolbar
          isShow={isToolbar}
          buttons={_toolbarButtons}
       />
       <D.RowInputSearch
         isShowLabels={isShowLabels}
         caption="Token"
         searchApi={_searchApi}
       />
    </D.DraggableDialog>
  );
})

export default AvSearchDialog
