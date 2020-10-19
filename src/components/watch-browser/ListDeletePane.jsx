import { Component } from 'react';
//import PropTypes from "prop-types";

import A from './Atoms'

class ListDeletePane extends Component {
  /*
  static propTypes = {
    store: PropTypes.shape({
      listen: PropTypes.func,
      getWatchGroups: PropTypes.func
    }),
    actionCompleted: PropTypes.string,
    forActionType: PropTypes.string,
    onRename: PropTypes.func,
    onClose: PropTypes.func
  }
  */

  constructor(props){
    super()
    this._primaryBt = (<A.Button.Primary
       caption="Delete"
       title="Delete List"
       onClick={this._handleDelete}
    />)
    this.state = {
      groupOptions : props.store.getWatchGroups(),
      validationMessages : []
    }
  }

  componentDidMount(){
    this.unsubscribe = this.props.store.listen(this._onStore)
  }
  componentWillUnmount(){
    this.unsubscribe()
  }
  _onStore = (actionType, data) => {
    const { actionCompleted, forActionType, store } = this.props;
    if (actionType === actionCompleted){
        if (data.forActionType === forActionType) {
          this._handleClear()
        }
        this.setState({ groupOptions : store.getWatchGroups() })
    }
  }

  _handleClear = () => {
    if (this.state.validationMessages.length>0){
      this.setState({ validationMessages: [] })
    }
  }

  _handleDelete = () => {
      const { onDelete, msgOnNotSelect } = this.props
          , { captionGroup, captionList } = this.selectGroupList.getValue();
      if (captionGroup && captionList){
        onDelete({ captionGroup, captionList })
      } else {
        const msg = [];
        if (!captionGroup) { msg.push(msgOnNotSelect('Group')) }
        if (!captionList)  { msg.push(msgOnNotSelect('List'))  }
        this.setState({ validationMessages: msg })
      }
  }

  render(){
    const { store, onClose } = this.props
        , { groupOptions, validationMessages } = this.state;
    return (
      <div>
         <A.FragmentSelectGroupList
           ref={c => this.selectGroupList = c}
           store={store}
           groupCaption="In Group:"
           groupOptions={groupOptions}
           listCaption="List:"
         />
         <A.ValidationMessages
            validationMessages={validationMessages}
         />
         <A.RowButtons
           Primary={this._primaryBt}
           onClear={this._handleClear}
           onClose={onClose}
         />
      </div>
    );
  }
}

export default ListDeletePane
