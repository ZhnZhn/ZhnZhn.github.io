import { useRef, useCallback, useMemo } from 'react';
//import PropTypes from "prop-types";
import memoEqual from '../hoc/memoEqual'

import Button from './Button'
import ModalDialog from '../zhn-moleculs/ModalDialog';
import MathCaptcha from '../zhn-moleculs/MathCaptcha';

import FactoryAction from '../../flux/actions/FactoryAction'

const MSG_PREFIX = "Would you like load item";
const MSG_SUFFIX = "from url?";

const S = {
  MODAL: {
    position: 'static',
    width: 400,
    height: 205,
    margin: '70px auto'
  },
  ROOT_DIV: {
    margin: 5
  },
  NAME: {
    color: '#a487d4',
    paddingLeft: 5,
    paddingRight: 5
  },
  DESCR: {
    color: 'gray',
    width: 400,
    paddingLeft: 10,
    paddingTop: 5,
    lineHeight: 1.4,
    fontWeight: 'bold',
    whiteSpace: 'pre'
  },
  CAPTCHA: {
    padding: 8,
    paddingBottom: 0
  }
};

const _DF_DATA = {};

const _getName = data => {  
  const { options } = data
  , { name, title } = options || {};
  return name || title || '';
};

const _areEqualProps = (prevProps, nextProps) =>
  nextProps.isShow === prevProps.isShow;

const AskDialog = memoEqual(({
  isShow,
  data=_DF_DATA,
  onClose
}) => {
  const _refCaptcha = useRef()
  , _hLoad = useCallback(() => {
      if (_refCaptcha.current.isOk()){
        const { options } = data;
        FactoryAction
          .crLoadQuery(options)
          .run()
        onClose()
      }
    }, [data, onClose])
 , _commandButtons = useMemo(() => [
     <Button.Flat
       caption="Yes, Load"
       //accessKey="s"
       isPrimary={true}
       onClick={_hLoad}
     />,
     <Button.Flat
       caption="No, Close"
       //accessKey="c"
       onClick={onClose}
     />
 ], [_hLoad, onClose])
 , _name = _getName(data);

  return (
    <ModalDialog
      style={S.MODAL}
      caption="Confirm Load"
      isShow={isShow}
      commandButtons={_commandButtons}
      withoutClose={true}
      onClose={onClose}
    >
       <div style={S.ROOT_DIV}>
          <p style={S.DESCR}>
             {MSG_PREFIX}
             <span style={S.NAME}>{_name}</span>
             {MSG_SUFFIX}
          </p>
          <MathCaptcha
            ref={_refCaptcha}
            style={S.CAPTCHA}
          />
       </div>
    </ModalDialog>
  );
}, _areEqualProps)

/*
AskDialog.propTypes = {
  isShow: PropTypes.bool,
  data: PropTypes.shape({
    options: PropTypes.shape({
      chartType: PropTypes.string,
      browserType: PropTypes.string
    })
  }),
  onClose: PropTypes.func
}
*/

export default AskDialog
