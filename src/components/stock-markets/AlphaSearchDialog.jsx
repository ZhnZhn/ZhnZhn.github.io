import memoIsShow from '../hoc/memoIsShow';
import useToggle from '../hooks/useToggle';
import useRefInit from '../hooks/useRefInit';
import useMenuMore from '../dialogs/hooks/useMenuMore';
import useToolbar from '../dialogs/hooks/useToolbar';

import SearchAdapter from '../../adapters/alpha/SearchAdapter';
import D from '../dialogs/DialogCell';

const ERR_DESCR = 'API key from Alpha Vantage is required'
, ERR_CAPTION = "Without API Key";

const AlphaSearchDialog = memoIsShow(({
  isShow,
  caption,
  getKey,
  loadId,
  onError,
  onFront,
  onClose,
  onClickInfo
}) => {
  const [
    isToolbar,
    menuMoreModel
  ] = useMenuMore(onClickInfo)
  , [
    isShowLabels,
    toggleLabels
  ] = useToggle(true)
  , _toolbarButtons = useToolbar({
    toggleLabels,
    onClickInfo,
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
         onFront={onFront}
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

export default AlphaSearchDialog
