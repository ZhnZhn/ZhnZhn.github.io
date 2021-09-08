import { memo, useRef, useCallback } from 'react';
//import PropTypes from 'prop-types'

import Actions from '../../flux/actions/ComponentActions';

import A from '../Comp';
import PaneApiKey from './PaneApiKey';
import PaneOptions from './PaneOptions';

const S = {
  MODAL: {
    position: 'static',
    width: 380,
    height: 446,
    margin: '70px auto 0px'
  },
  TITLE_API: {
    width: 80
  },
  TITLE_OPTION: {
    width: 110
  },
  BT: {
    color: '#232f3b'
  }
};

const _isFn = fn => typeof fn === 'function';

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

  return (
    <A.ModalDialog
       ref={_refModalDialog}
       caption="User Settings"
       style={S.MODAL}
       isWithButton={false}
       isShow={isShow}
       onClose={_hClose}
    >
      <A.TabPane>
        <A.Tab title="ApiKeys">
          <PaneApiKey
             isShow={isShow}
             titleStyle={S.TITLE_API}
             btStyle={S.BT}
             data={data}
             onClose={_hClose}
           />
        </A.Tab>
        <A.Tab title="Options">
          <PaneOptions
            titleStyle={S.TITLE_OPTION}
            btStyle={S.BT}
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
