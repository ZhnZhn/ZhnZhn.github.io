import React, { Component } from 'react';
//import PropTypes from "prop-types";

import ChartActions from '../../flux/actions/ChartActions';

import D from './DialogCell'
import ModalDialog from '../zhn-moleculs/ModalDialog';
import NasdaqLink from '../native-links/NasdaqLink';

const S = {
  ROOT_NOT_LABELS: {
    width: 280
  },
  CAPTION_SPAN : {
    display: 'inline-block',
    maxWidth: 295
  },
  SOURCE_ROOT : {
    lineHeight: 1.5,
    marginBottom: 0
  },
  LINK_SHOW_HIDE : {
    marginBottom: 10
  },
  LINK_ROOT: {
    marginTop: 0,
    marginBottom : 0,
    lineHeight: 1.5,
    fontWeight: 'bold'
  },
  LINK_CAPTION : {
    color: '#1b75bb',
    display: 'inline-block',
    textAlign: 'right',
    width: 100,
    paddingRight: 5,
    fontSize: '16px'
  },
  LINK_NOT_LABELS: {
    marginLeft: 8
  }
};

const SOURCE_OPTIONS = [
  {
    caption: 'Alpha Vantage: Daily (100)' ,
    value: 'AL_I',
    dfProps: {
      indicator: 'TIME_SERIES_DAILY',
      interval: 'Daily',
      outputsize: 'compact'
    }
  },{
    caption: 'Barchart: 6 Months' , value: 'B'
  },{
    caption: 'IEX Platform: 2 Years' , value: 'IEX',
    dfProps: {
      dfType: "chart",
      dfPeriod: "2y"
    }
  }
];

const _isFn = fn => typeof fn === 'function';

const _getItemId = (props) => props
  && props.data
  && props.data.item
  && props.data.item.id;

const _createInitialState = (props) => {
   const itemId = _getItemId(props);
    return {
      itemId: itemId,
      isShowLink: false,
    };
};

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
  _getDataSource = () => this._dataSource || SOURCE_OPTIONS[2]

  _hLoad = () => {
    const { data, onClose } = this.props
    , { item={}, browserType, chartContainerType, dialogProps } = data
    , { id, text } = item
    , { caption, value, dfProps } = this._getDataSource();

    ChartActions.loadStock(
      {
        chartType: chartContainerType, browserType
      },{
         title: text,
         value: id,
         ticket: id,
         item: item,
         loadId: value,
         id: id,
         linkFn: 'NASDAQ',
         dataSource: caption,
         ...dialogProps,
         ...dfProps
       }
    )
    onClose()
  }

  render(){
    const { isShow, data={}, onClose } = this.props
    , { item={} } = data
    , { text } = item
    , {
        isShowLabels,
        isShowLink,
      } = this.state
    , _style = isShowLabels
         ? null
         : S.ROOT_NOT_LABELS
    , _linkStyle = isShowLabels
         ? null
         : S.LINK_NOT_LABELS;

    return (
      <ModalDialog
         caption={text}
         style={_style}
         styleCaption={S.CAPTION_SPAN}
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
           placeholder="IEX Platform: 2 Years"
           options={SOURCE_OPTIONS}
           onSelect={this._hSelectDataSource}
        />
        <D.ShowHide isShow={isShowLink} style={S.LINK_SHOW_HIDE}>
          <D.Row.Plain style={S.LINK_ROOT}>
            {
              isShowLabels && <span style={S.LINK_CAPTION}>
                Link:
              </span>
            }
            <NasdaqLink
               style={_linkStyle}
               item={item}
               caption="NASDAQ"
             />
          </D.Row.Plain>
        </D.ShowHide>
      </ModalDialog>
    );
  }
}

export default StocksBySectorDialog
