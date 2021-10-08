import { useRef, useCallback, useMemo } from 'react';
//import PropTypes from "prop-types";
import crModalDialog  from './fns/crModalDialog';

import Button from './Button'
import ModalDialog from '../zhn-moleculs/ModalDialog';
import MathCaptcha from '../zhn-moleculs/MathCaptcha';

import FactoryAction from '../../flux/actions/FactoryAction'

const MSG_PREFIX = "Would you like load item"
, MSG_SUFFIX = "from url?"

, S_MODAL = {
  position: 'static',
  width: 400,
  height: 205,
  margin: '70px auto'
}
, S_ROOT_DIV = { margin: 5 }
, S_NAME = {
  color: '#a487d4',
  padding: '0 5px'
},
S_DESCR = {
  color: 'gray',
  width: 400,
  padding: '5px 0 0 10px',
  lineHeight: 1.4,
  fontWeight: 'bold',
  whiteSpace: 'pre'
}
, S_CAPTCHA = { padding: '8px 8px 0 8px' };

const _DF_DATA = {};

const _getName = data => {
  const { options } = data
  , { name, title } = options || {};
  return name || title || '';
};

const AskDialog = crModalDialog(({
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
       key="k1"
       caption="Yes, Load"
       //accessKey="s"
       isPrimary={true}
       onClick={_hLoad}
     />,
     <Button.Flat
       key="k2"
       caption="No, Close"
       //accessKey="c"
       onClick={onClose}
     />
 ], [_hLoad, onClose])
 , _name = _getName(data);

  return (
    <ModalDialog
      style={S_MODAL}
      caption="Confirm Load"
      isShow={isShow}
      commandButtons={_commandButtons}
      withoutClose={true}
      onClose={onClose}
    >
       <div style={S_ROOT_DIV}>
          <p style={S_DESCR}>
             {MSG_PREFIX}
             <span style={S_NAME}>{_name}</span>
             {MSG_SUFFIX}
          </p>
          <MathCaptcha
            ref={_refCaptcha}
            style={S_CAPTCHA}
          />
       </div>
    </ModalDialog>
  );
});

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
