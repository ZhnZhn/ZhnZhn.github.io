import React, { useCallback, useMemo } from 'react'

import Button from './Button'
import ModalDialog from '../zhn-moleculs/ModalDialog';

const S = {
  MODAL: {
    position: 'static',
    width: 350,
    height: 175,
    margin: '70px auto'
  },
  ROOT: {
    color: 'gray',
    paddingTop: 8,
    paddingLeft: 16,
    lineHeight: 1.7,
    fontWeight: 'bold'
  },
  DATE: {
    color: '#80c040'
  },
  CLOSE: {
    color: '#232f3b'
  }
}

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
      <Button.Flat
        key="reload"
        caption="Yes, Reload"
        isPrimary={true}
        onClick={_hReload}
      />,
      <Button.Flat
        key="no"
        rootStyle={S.CLOSE}
        caption="No"
        onClick={onClose}
      />
    ], [onClose])
  /* _hReload */
  /*eslint-enable react-hooks/exhaustive-deps */
  , { buildDate='' } = data || {};

  return (
    <ModalDialog
      style={S.MODAL}
      caption="Reload Web App"
      isShow={isShow}
      commandButtons={_commandButtons}
      withoutClose={true}
      onClose={onClose}
    >
      <div style={S.ROOT}>
        <p>Browser has loaded ERC from a cache.</p>
        <p>Reload web app ERC to the new build?</p>
        <p style={S.DATE}>
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
