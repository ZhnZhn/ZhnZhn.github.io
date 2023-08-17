import { crStyle2 } from '../styleFn';
import memoIsShow from '../hoc/memoIsShow';
import useSettingsMenuMore from './useSettingsMenuMore';

import {
  ComponentActions
} from '../../flux/actions/ComponentActions';

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
    isShowLabels,
    menuModel
  ] = useSettingsMenuMore(CL_ROW)
  , _style = crStyle2(
    S_MODAL,
    !isShowLabels &&  S_MODAL_SMALL
  );

  return (
    <ModalDialog
       style={_style}
       caption="User Settings"
       menuModel={menuModel}
       isWithButton={false}
       isShow={isShow}
       onClose={onClose}
    >
      <TabPane>
        <Tab title="ApiKeys">
          <PaneApiKey
             isShow={isShow}
             isShowLabels={isShowLabels}
             titleStyle={S_TITLE_API}
             btStyle={S_BT}
             data={data}
             onClose={onClose}
           />
        </Tab>
        <Tab title="Options">
          <PaneOptions
            isShowLabels={isShowLabels}
            titleStyle={S_TITLE_OPTION}
            btStyle={S_BT}
            data={data}
            onChangeTheme={ComponentActions.changeTheme}
            onClose={onClose}
          />
        </Tab>
      </TabPane>
    </ModalDialog>
  );
});

export default SettingsDialog
