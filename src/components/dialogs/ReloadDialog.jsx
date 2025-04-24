import {
  useCallback,
  useMemo
} from '../uiApi';

import FlatButton from '../zhn-m/FlatButton';
import ModalDialog from '../zhn-moleculs/ModalDialog';

const S_MODAL = {
  position: 'static',
  width: 350,
  height: 175,
  margin: '70px auto'
}
, S_ROOT = {
  color: 'grey',
  padding: '8px 0 0 16px',
  lineHeight: 1.7,
  fontWeight: 'bold'
}
, S_DATE = { color: '#80c040' };

const ReloadDialog = ({
  isShow,
  data,
  onClose
}) => {
  const _hReload = useCallback(() => {
    document.cookie="erc=1"
    window.location.reload(true)
  }, [])
  /*eslint-disable react-hooks/exhaustive-deps */
  , _commandButtons = useMemo(()=>[
      <FlatButton
        key="reload"
        caption="Yes, Reload"
        onClick={_hReload}
      />,
      <FlatButton
        key="no"
        caption="No"
        onClick={onClose}
      />
    ], [onClose])
  /* _hReload */
  /*eslint-enable react-hooks/exhaustive-deps */
  , { buildDate='' } = data || {};

  return (
    <ModalDialog
      style={S_MODAL}
      caption="Reload Web App"
      isShow={isShow}
      commandButtons={_commandButtons}
      withoutClose={true}
      onClose={onClose}
    >
      <div style={S_ROOT}>
        <p>Browser has loaded ERC from a cache.</p>
        <p>Reload web app ERC to the new build?</p>
        <p style={S_DATE}>
          {`New build ${buildDate} is available.`}
        </p>
      </div>
    </ModalDialog>
  );
}

/*
ReloadDialog.propTypes = {
  isShow: PropTypes.bool,
  data: PropTypes.shape({
    buildDate: PropTypes.string
  }),
  onClose: PropTypes.func
}
*/

export default ReloadDialog
