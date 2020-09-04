import React, { Component } from 'react';
//import PropTypes from "prop-types";

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
    paddingLeft : 10,
    paddingTop: 5,
    lineHeight: 1.4,
    fontWeight: 'bold',
    whiteSpace: 'pre'
  },
  CAPTCHA: {
    padding: 8,
    paddingBottom: 0
  }
}

class AskDialog extends Component {
   /*
   static propTypes = {
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

  constructor(props){
    super(props);

    this._refCaptcha = React.createRef()
    this._commandButtons = [
        <Button.Flat
          caption="Yes, Load"
          //accessKey="s"
          isPrimary={true}
          onClick={this._handleLoad}
        />,
        <Button.Flat
          caption="No, Close"
          //accessKey="c"
          onClick={props.onClose}
        />
    ]
  }

  _handleLoad = () => {
    const { data={}, onClose } = this.props
        , { options={} } = data;
    if (this._refCaptcha.current.isOk()){
       FactoryAction
         .crLoadQuery(options)
         .run()
      onClose()
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    if (nextProps !== this.props && nextProps.isShow === this.props.isShow) {
      return false;
    }
    return true;
  }

  render(){
    const { isShow, data={}, onClose } = this.props
        , { options={} } = data
        , { name='' } = options;
    return (
      <ModalDialog
        style={S.MODAL}
        caption="Confirm Load"
        isShow={isShow}
        commandButtons={this._commandButtons}
        withoutClose={true}
        onClose={onClose}
      >
         <div style={S.ROOT_DIV}>
            <p style={S.DESCR}>
               {MSG_PREFIX}
               <span style={S.NAME}>{name}</span>
               {MSG_SUFFIX}
            </p>
            <MathCaptcha
              ref={this._refCaptcha}
              style={S.CAPTCHA}
            />
         </div>
      </ModalDialog>
    )
  }
}

export default AskDialog
