import { Component } from 'react';

import { fetchTxt } from '../../utils/fnFetch';
import Comp from '../Comp'

const { ModalDialog, Load, DivHtml } = Comp;

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

const _isNewShow = (prevProps, props ) => prevProps !== props
 && prevProps.isShow !== props.isShow;

const _isUpdateDescr = (
  prevProps, props, state
) => {
  if (_isNewShow(prevProps, props)
      && props.isShow
      && state.isLoadFailed) {
    return true;
  }
  return _isNewShow(prevProps, props)
    && prevProps.data.descrUrl !== props.data.descrUrl;
};

class DescriptionDialog extends Component {
  static defaultProps = {
    data: {}
  }

  state = {
    isLoading: false,
    isLoadFailed: false,
    errMsg: '',
    descrHtml: '',
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
    if ( _isUpdateDescr(prevProps, this.props, this.state) ) {
      const { data } = this.props
      , { descrUrl } = data;
      this._loadDescr(descrUrl)
    }
  }

  _loadDescr = (descrUrl='') => {
     if (descrUrl) {
       this.setState({
         isLoading: true
       }, () => fetchTxt({
         uri: descrUrl,
         onFetch: this._setDescrHtml,
         onCatch: this._onFailed
       }))
     } else {
       this._setDescrHtml();
     }
  }
  _setDescrHtml = ({ json:text=DESCR_EMPTY }={}) => {
    this.setState({
      isLoading: false,
      isLoadFailed: false,
      errMsg: '',
      descrHtml: text
    })
  }
  _onFailed = ({ error }={}) => {
    this.setState({
      isLoading: false,
      isLoadFailed: true,
      errMsg: error.message
    })
  }

  render(){
    const {
      isShow,
      onClose
    } = this.props
    , {
      isLoading,
      isLoadFailed,
      errMsg,
      descrHtml
    } = this.state;
    return (
       <ModalDialog
         caption="About Datasource"
         isShow={isShow}
         style={S.DIALOG}
         onClose={onClose}
       >
         {isLoading ? <Load.Loading />
            : isLoadFailed ? <Load.LoadFailed errMsg={errMsg} />
            : <DivHtml style={S.DIV} str={descrHtml} />
         }
       </ModalDialog>
    );
  }
}

export default DescriptionDialog
