import { Component } from 'react';
//import PropTypes from "prop-types";

import ChartActions, { CHAT_LOAD } from '../../flux/actions/ChartActions';

import D from './DialogCell';
import ModalDialog from '../zhn-moleculs/ModalDialog';
import NasdaqLink from '../native-links/NasdaqLink';

const S_ROOT_NOT_LABELS = { width: 280 }
, S_CAPTION = {
  display: 'inline-block',
  maxWidth: 295
}
, S_LINK_SHOW_HIDE = { marginBottom: 10 }
, S_LINK_ROOT = {
  display: 'flex',
  alignItems: 'center',
  margin: '8px 5px 0 5px',
  lineHeight: 1.5,
  fontWeight: 'bold'
}
, S_LINK_CAPTION = {
  color: '#1b75bb',
  display: 'inline-block',
  width: 100,
  paddingRight: 5,
  textAlign: 'right',
  fontSize: '16px'
}
, S_LINK = { paddingTop: 0 }
, S_LINK_NOT_LABELS = { marginLeft: 8 };


const IEX_SOURCES = [
  { a: '1 Month', b: '1m'},
  { a: '3 Months', b: '3m'},
  { a: '6 Months', b: '6m'},
  { a: '1 Year', b: '1y'},
  { a: '2 Years', b: '2y'}
].map(({a, b}) => ({
  caption: 'IEX Cloud: ' + a , value: 'IEX',
  dfProps: {
    dfType: 'chart',
    dfPeriod: b
  }
}));

const SOURCE_OPTIONS = [
  {
    caption: 'Alpha Vantage: Daily (100)' ,
    value: 'AL',
    dfProps: {
      dfSubId: 'I',
      dfFn: 'TIME_SERIES_DAILY',
      interval: 'Daily',
      outputsize: 'compact'
    }
  },
  ...IEX_SOURCES
];

const DF_SOURCE = SOURCE_OPTIONS[0];

const _isFn = fn => typeof fn === 'function';
const _getItemId = props => ((props.data || {}).item || {}).id;
const _createInitialState = props => ({
  itemId: _getItemId(props),
  isShowLink: false,
});


class StocksBySectorDialog extends Component {
  /*
   static propTypes = {
     isShow: PropTypes.bool,
     data: PropTypes.object,
     store: PropTypes.object,
     onClose: PropTypes.func
   }
  */

   constructor(props){
     super(props)

     this.toolbarButtons =  [
        {
          caption: 'L',
          title: 'Click to toggle labels',
          onClick: this._hClickLabels
        },{
         caption: 'O',
         title: 'Click to toggle options',
         onClick: this._hClickLink
       }
     ]
     this._commandButtons = [
       <D.Button.Load
         key="load"
         onClick={this._hLoad}
       />,
       <D.Button.Show
         key="show"
         onClick={this._hShow}
       />
     ]
     this.state = {
       ..._createInitialState(props),
       isShowLabels: true
     }
   }

   static getDerivedStateFromProps(nextProps, prevState) {
     if ( _getItemId(nextProps) !== prevState.itemId ) {
       return _createInitialState(nextProps);
     }
     return null;
   }

   shouldComponentUpdate(nextProps, nextState){
     if (nextProps !== this.props && nextProps.isShow === this.props.isShow) {
       return false;
     }
     return true;
   }

   _hClickLabels = () => {
     this.setState(prevState => ({
      isShowLabels: !prevState.isShowLabels
     }))
   }
  _hClickLink = () => {
    this.setState(prevState => ({
      isShowLink: !prevState.isShowLink
    }))
  }

  _hShow = () => {
    const { data } = this.props;
    if (data && _isFn(data.onShow)) {
      data.onShow()
    }
  }

  _hSelectDataSource = (item) => {
    this._dataSource = item
  }
  _getDataSource = () => this._dataSource || DF_SOURCE

  _hLoad = () => {
    const { data, onClose } = this.props
    , { item, browserType, chartContainerType, dialogProps } = data
    , { id, text } = item || {}
    , { caption, value, dfProps } = this._getDataSource();

    ChartActions[CHAT_LOAD](
      {
        chartType: chartContainerType, browserType
      },{
         title: text,
         value: id,
         item: item,
         loadId: value,
         id: id,
         _itemKey: `${id}_${value}`,
         linkFn: 'NASDAQ',
         dataSource: caption,
         ...dialogProps,
         ...dfProps
       }
    )
    onClose()
  }

  render(){
    const { isShow, data, onClose } = this.props
    , { item } = data || {}
    , { text } = item || {}
    , {
        isShowLabels,
        isShowLink,
      } = this.state
    , _style = isShowLabels
         ? null
         : S_ROOT_NOT_LABELS
    , _linkStyle = isShowLabels
         ? S_LINK
         : {...S_LINK, ...S_LINK_NOT_LABELS};

    return (
      <ModalDialog
         caption={text}
         style={_style}
         styleCaption={S_CAPTION}
         isShow={isShow}
         commandButtons={this._commandButtons}
         onClose={onClose}
      >
        <D.ToolbarButtonCircle
          buttons={this.toolbarButtons}
        />
        <D.RowInputSelect
           isShowLabels={isShowLabels}
           caption="Source"
           placeholder={DF_SOURCE.caption}
           options={SOURCE_OPTIONS}
           onSelect={this._hSelectDataSource}
        />
        <D.ShowHide isShow={isShowLink} style={S_LINK_SHOW_HIDE}>
          <div style={S_LINK_ROOT}>
            {
              isShowLabels && <span style={S_LINK_CAPTION}>
                Link:
              </span>
            }
            <NasdaqLink
               style={_linkStyle}
               item={item}
               caption="NASDAQ"
             />
          </div>
        </D.ShowHide>
      </ModalDialog>
    );
  }
}

export default StocksBySectorDialog
