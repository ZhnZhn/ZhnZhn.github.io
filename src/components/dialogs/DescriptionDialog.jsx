import React, { Component } from 'react';
import DOMPurify from 'dompurify';

import { fetchTxt } from '../../utils/fnFetch';
import ModalDialog from '../zhn-moleculs/ModalDialog';

const DESCR_EMPTY = '<p class="descr__part">Description Empty for this Datasource</p>';
const S = {
  DIALOG: {
    top: 54,
    left: 20,
    width: 'auto',
    marginLeft: 0,
    maxWidth: '89%'
  },
  DIV: {
    padding: 16
  }
};

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
      const { data } = this.props
      , { descrUrl } = data;
      this._loadDescr(descrUrl)
    }
  }

  _loadDescr = (descrUrl='') => {
     if (descrUrl) {
       fetchTxt({
         uri: descrUrl,
         onFetch: this._setDescrHtml
       })
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
         style={S.DIALOG}
         onClose={onClose}
       >
         <div
           style={S.DIV}
           dangerouslySetInnerHTML={{ __html: _html }}
         />
       </ModalDialog>
    );
  }
}

export default DescriptionDialog
