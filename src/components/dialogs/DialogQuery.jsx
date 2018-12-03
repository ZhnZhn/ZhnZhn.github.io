import React, { Component } from 'react';
//import PropTypes from "prop-types";

import D from './DialogCell'
import crMenuMore from './MenuMore'
import Decor from './decorators/Decorators'

const ERR_MSG = 'Empty or Id format is not valid';

const _testId = (value) => {
  if (typeof value !== 'string' || !value ) {
    return false;
  } else if ( value.split('/').length !== 3 ){
    return false;
  }
  return true;
};

@Decor.withToolbar
@Decor.withLoad
class DialogQuery extends Component {
  constructor(props){
    super(props)

    this._menuMore = crMenuMore(this, {
      toggleToolBar: this._toggleWithToolbar,
      onAbout: this._clickInfoWithToolbar
    })
    const { noDate } = props;
    this.toolbarButtons = this._createType2WithToolbar(
       props, { noDate }
    )
    this._commandButtons = this._crCommandsWithLoad(this)

    this.state = {
       isToolbar: true,
       isShowLabels: true,
       isShowDate: true,
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    if (this.props !== nextProps){
       if (this.props.isShow === nextProps.isShow){
          return false;
       }
    }
    return true;
  }

  _handleLoad = () => {
    if (this._idInput && this._idInput.isValid()) {
      const { onLoad, loadFn } = this.props;
      onLoad(loadFn(this.props, {
        one: {
          value: this._idInput.getValue(),
          caption: "seriaId"
        }
      }));
    }
  }

  _refIdInput = c => this._idInput = c
  _refDates = c => this.datesFragment = c

  render(){
    const { caption, isShow,
            onShow, onFront, onClose,
            oneCaption, onePlaceholder,
            noDate, initFromDate, initToDate,
            msgOnNotValidFormat, onTestDate
          } = this.props
        , { isToolbar,
            isShowLabels, isShowDate,
          } = this.state;
    return (
      <D.DraggableDialog
          isShow={isShow}
          menuModel={this._menuMore}
          caption={caption}
          commandButtons={this._commandButtons}
          onShowChart={onShow}
          onFront={onFront}
          onClose={onClose}
      >
        <D.Toolbar
          isShow={isToolbar}
          buttons={this.toolbarButtons}
        />
        <D.RowPattern
          ref={this._refIdInput}
          isShow={isShow}
          isShowLabels={isShowLabels}
          placeholder={onePlaceholder}
          title={oneCaption}
          onTest={_testId}
          errorMsg={ERR_MSG}
        />
        {
          !noDate &&
          <D.ShowHide isShow={isShowDate}>
            <D.DatesFragment
               ref={this._refDates}
               isShowLabels={isShowLabels}
               initFromDate={initFromDate}
               initToDate={initToDate}
               msgOnNotValidFormat={msgOnNotValidFormat}
               onTestDate={onTestDate}
            />
          </D.ShowHide>
        }
     </D.DraggableDialog>
    );
  }
}

export default DialogQuery
