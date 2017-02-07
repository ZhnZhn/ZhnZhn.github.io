import React, { Component } from 'react';
import DOMPurify from 'purify';

import { fnFetchText } from '../../utils/fn';
import ModalDialog from '../zhn/ModalDialog';

const DESCR_EMPTY = '<p class="descr__part">Description Empty for this Datasource</p>';
const Style = {
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
  state = {
    descrHtml: ''
  }

  constructor(props){
    super();
  }

  componentWillReceiveProps(nextProps){
    if (
        nextProps !== this.props
        && nextProps.isShow !== this.props.isShow
        && nextProps.data.descrUrl !== this.props.data.descrUrl
    ) {
      this._loadDescr(nextProps.data.descrUrl);
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    if (nextProps !== this.props && nextProps.isShow === this.props.isShow) {
      return false;
    }
    return true;
  }

  componentDidMount(){
    this._loadDescr(this.props.data.descrUrl);
  }

  _loadDescr = ( descrUrl='' ) => {
     if ( descrUrl ) {
       fnFetchText({ uri: descrUrl, onFetch: this._setDescrHtml})
     } else {
       this._setDescrHtml();
     }
  }
  _setDescrHtml = ({ text=DESCR_EMPTY }={}) => {
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
         style={ Style.DIALOG }
         onClose={onClose}
       >
         <div
            style={ Style.DIV }
            dangerouslySetInnerHTML={{ __html: _html }}
         >
         </div>
       </ModalDialog>
    )
  }
}

DescriptionDialog.defaultProps = { data: {} };
DescriptionDialog.displayName = 'DescriptionDialog';

export default DescriptionDialog
