import { useCallback } from '../uiApi';
import { crStyle2 } from '../styleFn';

import memoIsShow from '../hoc/memoIsShow';
import useRefFocus from '../hooks/useRefFocus';
import useRerender from '../hooks/useRerender';

import useSettingsMenuMore from './useSettingsMenuMore';

import { setUiTheme } from '../styles/uiTheme';

import ModalDialog from '../zhn-moleculs/ModalDialog';
import TabPane from '../zhn-tab/TabPane';
import Tab from '../zhn-tab/Tab';
import PaneApiKey from './PaneApiKey';
import PaneOptions from './PaneOptions';

import { CL_ROW_PANE_TOPIC } from '../styleFn';

const S_MODAL = {
  position: 'static',
  width: 380,
  maxHeight: 446,
  margin: '70px auto 0px'
}
, S_MODAL_SMALL = { width: 295 }
, S_TITLE_API = { width: 82 }
, S_TITLE_OPTION = { width: 100 };

const SettingsDialog = memoIsShow(({
  isShow,
  data,
  onClose
}) => {
  const [
    refFocusLast,
    setRefFocusLast
  ] = useRefFocus()
  , rerender = useRerender()
  /*eslint-disable react-hooks/exhaustive-deps */
  , _setUiTheme = useCallback(item => {
    setUiTheme(item)
    rerender()
  }, [])
  // rerender
  /*eslint-enable react-hooks/exhaustive-deps */
  , [
    isShowLabels,
    menuModel
  ] = useSettingsMenuMore(CL_ROW_PANE_TOPIC)
  , _style = crStyle2(
    S_MODAL,
    !isShowLabels && S_MODAL_SMALL
  );

  return (
    <ModalDialog
       refFocusLast={refFocusLast}
       style={_style}
       caption="User Settings"
       menuModel={menuModel}
       isWithButton={false}
       isShow={isShow}
       onClose={onClose}
    >
      <TabPane
         id="sd"
         isShow={isShow}
         setRefFocusLast={setRefFocusLast}
         isShowLabels={isShowLabels}
         data={data}
         onClose={onClose}
      >
        <Tab title="ApiKeys">
          <PaneApiKey
             titleStyle={S_TITLE_API}
           />
        </Tab>
        <Tab title="Options">
          <PaneOptions
             titleStyle={S_TITLE_OPTION}
             onChangeTheme={_setUiTheme}
          />
        </Tab>
      </TabPane>
    </ModalDialog>
  );
});

export default SettingsDialog
