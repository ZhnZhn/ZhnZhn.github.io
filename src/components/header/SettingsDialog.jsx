import { memo, useRef, useCallback, useMemo } from 'react';
//import PropTypes from 'prop-types'

import useToggle from '../hooks/useToggle';

import Actions from '../../flux/actions/ComponentActions';

import has from '../has';
import A from '../Comp';
import PaneApiKey from './PaneApiKey';
import PaneOptions from './PaneOptions';

const S_MODAL = {
  position: 'static',
  width: 380,
  height: 446,
  margin: '70px auto 0px'
}, S_MODAL_SMALL = {
  width: 295
}, S_TITLE_API = {
  width: 82
}, S_TITLE_OPTION = {
  width: 110
}, S_BT = {
  color: '#232f3b'
};

const IS_WIDE_WIDTH = has.wideWidth()
, CL_ROW = 'row__pane-topic not-selected'
, _isFn = fn => typeof fn === 'function';

const useMenuMore = () => {
  const [isShowLabels, toggleLabels] = useToggle(IS_WIDE_WIDTH)
  /*eslint-disable react-hooks/exhaustive-deps */
  , menuModel = useMemo(() => ({
    titleCl: CL_ROW,
    pageWidth: 190,
    maxPages: 1,
    p0: [{
      cn: CL_ROW,
      onClick: toggleLabels,
      name: "Toggle Input Labels",
      isClose: true
    }]
  }), [])
  //toggleLabels
  /*eslint-enable react-hooks/exhaustive-deps */
  return [isShowLabels, menuModel];
};

const _isNotShouldRerender = (prevProps, nextProps) =>
  prevProps.isShow === nextProps.isShow;

const SettingsDialog = memo(({
  isShow,
  data,
  onClose
}) => {
  const _refModalDialog = useRef()
  /*eslint-disable react-hooks/exhaustive-deps */
  , _hClose = useCallback(() => {
    onClose()
    const _compDialog = _refModalDialog.current;
    if (_compDialog && _isFn(_compDialog.focusPrev)) {
      _compDialog.focusPrev()
    }
  }, [])
  // onClose
  /*eslint-enable react-hooks/exhaustive-deps */
  , [isShowLabels, menuModel] = useMenuMore()
  , _style = isShowLabels
      ? S_MODAL
      : {...S_MODAL, ...S_MODAL_SMALL}

  return (
    <A.ModalDialog
       ref={_refModalDialog}
       style={_style}
       caption="User Settings"
       menuModel={menuModel}
       isWithButton={false}
       isShow={isShow}
       onClose={_hClose}
    >
      <A.TabPane>
        <A.Tab title="ApiKeys">
          <PaneApiKey
             isShow={isShow}
             isShowLabels={isShowLabels}
             titleStyle={S_TITLE_API}
             btStyle={S_BT}
             data={data}
             onClose={_hClose}
           />
        </A.Tab>
        <A.Tab title="Options">
          <PaneOptions
            isShowLabels={isShowLabels}
            titleStyle={S_TITLE_OPTION}
            btStyle={S_BT}
            data={data}
            onChangeTheme={Actions.changeTheme}
            onClose={_hClose}
          />
        </A.Tab>
      </A.TabPane>
    </A.ModalDialog>
  );
}, _isNotShouldRerender);

/*
SettingsDialog.propTypes = {
  isShow: PropTypes.bool,
  data: PropTypes.shape({
    setQuandlKey: PropTypes.func,
    isAdminMode: PropTypes.func,
    isDrawDeltaExtrems: PropTypes.func
  }),
  onClose: PropTypes.func
}
*/

export default SettingsDialog
