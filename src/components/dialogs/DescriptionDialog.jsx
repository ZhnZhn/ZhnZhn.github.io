import React, { Component } from 'react';
import DOMPurify from 'purify';

import { fetchTxt } from '../../utils/fnFetch';
import ModalDialog from '../zhn-moleculs/ModalDialog';

const DESCR_EMPTY = '<p class="descr__part">Description Empty for this Datasource</p>';
const STYLE = {
  DIALOG : {
    top: '10%',
    left: '10%',
    width:'auto',
    maxWidth:'80%'
  },
  DIV : {
    padding:16
  }
}

class DescriptionDialog extends Component {
  static defaultProps = {
    data: {}
  }

  constructor(props){
    super()
    this.state = {
      descrHtml: ''
    }
  }

  componentWillReceiveProps(nextProps){
    if (
        nextProps !== this.props
        && nextProps.isShow !== this.props.isShow
        && nextProps.data.descrUrl !== this.props.data.descrUrl
    ) {
      this._loadDescr(nextProps.data.descrUrl)
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    if (nextProps !== this.props && nextProps.isShow === this.props.isShow) {
      return false;
    }
    return true;
  }

  componentDidMount(){
    this._loadDescr(this.props.data.descrUrl)
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
         >
         </div>
       </ModalDialog>
    );
  }
}

export default DescriptionDialog
