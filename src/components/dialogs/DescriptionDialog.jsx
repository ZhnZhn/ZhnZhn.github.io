import React, { Component } from 'react';
import DOMPurify from 'dompurify';

import { fetchTxt } from '../../utils/fnFetch';
import ModalDialog from '../zhn-moleculs/ModalDialog';

const DESCR_EMPTY = '<p class="descr__part">Description Empty for this Datasource</p>';
const STYLE = {
  DIALOG : {
    top: '10%',
    left: '10%',
    width: 'auto',
    maxWidth: '89%'
  },
  DIV : {
    padding: '16px'
  }
}

const _isUpdateDescr = (
  prevProps, props
) => prevProps !== props
  && prevProps.isShow !== props.isShow
  && prevProps.data.descrUrl !== props.data.descrUrl;

class DescriptionDialog extends Component {
  static defaultProps = {
    data: {}
  }

  state = {
    descrHtml: ''
  }

  shouldComponentUpdate(nextProps, nextState){
    if (nextProps !== this.props
      && nextProps.isShow === this.props.isShow) {
      return false;
    }
    return true;
  }

  componentDidMount(){
    this._loadDescr(this.props.data.descrUrl)
  }

  componentDidUpdate(prevProps) {
    if ( _isUpdateDescr(prevProps, this.props) ) {
      this._loadDescr(this.props.data.descrUrl)
    }
  }

  _loadDescr = ( descrUrl='' ) => {
     if ( descrUrl ) {
       fetchTxt({ uri: descrUrl, onFetch: this._setDescrHtml})
     } else {
       this._setDescrHtml();
     }
  }
  _setDescrHtml = ({ json:text=DESCR_EMPTY }={}) => {
    this.setState({ descrHtml: text })
  }

  render(){
    const { isShow, onClose } = this.props
        , { descrHtml } = this.state
        , _html = DOMPurify.sanitize(descrHtml);
    return (
       <ModalDialog
         caption="Description for Datasource"
         isShow={isShow}
         style={STYLE.DIALOG}
         onClose={onClose}
       >
         <div
           style={STYLE.DIV}
           dangerouslySetInnerHTML={{ __html: _html }}
         />
       </ModalDialog>
    );
  }
}

export default DescriptionDialog
