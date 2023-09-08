import { crStyle2 } from '../styleFn';
import memoIsShow from '../hoc/memoIsShow';
import useRefFocus from '../hooks/useRefFocus';

import useSettingsMenuMore from './useSettingsMenuMore';

import { setUiTheme } from '../styles/uiTheme';

import ModalDialog from '../zhn-moleculs/ModalDialog';
import TabPane from '../zhn-tab/TabPane';
import Tab from '../zhn-tab/Tab';
import PaneApiKey from './PaneApiKey';
import PaneOptions from './PaneOptions';

const S_MODAL = {
  position: 'static',
  width: 380,
  maxHeight: 446,
  margin: '70px auto 0px'
}
, S_MODAL_SMALL = { width: 295 }
, S_TITLE_API = { width: 82 }
, S_TITLE_OPTION = { width: 100 }
, S_BT = { color: '#232f3b' };

const CL_ROW = 'row__pane-topic not-selected';

const SettingsDialog = memoIsShow(({
  isShow,
  data,
  onClose
}) => {
  const [
    refFocusLast,
    setRefFocusLast
  ] = useRefFocus()
  , [
    isShowLabels,
    menuModel
  ] = useSettingsMenuMore(CL_ROW)
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
         btStyle={S_BT}
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
             onChangeTheme={setUiTheme}
          />
        </Tab>
      </TabPane>
    </ModalDialog>
  );
});

export default SettingsDialog
