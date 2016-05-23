'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Type = require('../../constants/Type');

var _ComponentActions = require('../../flux/actions/ComponentActions');

var _ComponentActions2 = _interopRequireDefault(_ComponentActions);

var _WatchActions = require('../../flux/actions/WatchActions');

var _WatchActions2 = _interopRequireDefault(_WatchActions);

var _Browser = require('../zhn/Browser');

var _Browser2 = _interopRequireDefault(_Browser);

var _CaptionRow = require('../CaptionRow');

var _CaptionRow2 = _interopRequireDefault(_CaptionRow);

var _ButtonCircle = require('../zhn/ButtonCircle');

var _ButtonCircle2 = _interopRequireDefault(_ButtonCircle);

var _ScrollPane = require('../zhn/ScrollPane');

var _ScrollPane2 = _interopRequireDefault(_ScrollPane);

var _OpenClose = require('../zhn/OpenClose2');

var _OpenClose2 = _interopRequireDefault(_OpenClose);

var _SvgClose = require('../SvgClose');

var _SvgClose2 = _interopRequireDefault(_SvgClose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var showAction = _ComponentActions.ComponentActionTypes.SHOW_BROWSER,
    browserType = _Type.BrowserType.WATCH_LIST,
    updateViewAction = _ComponentActions.ComponentActionTypes.UPDATE_WATCH_BROWSER;

var styles = {
  browser: {
    paddingRight: 0
  },
  btCircle: {
    marginLeft: '10px'
  },
  scrollDiv: {
    overflowY: 'auto',
    height: '92%',
    paddingRight: '10px'
  },
  groupDiv: {
    marginLeft: '8px',
    paddingLeft: '12px',
    borderLeft: '1px solid yellow',
    lineHeight: 2
  },
  itemDiv: {
    position: 'relative',
    paddingRight: '40px',
    lineHeight: 1.4,
    paddingTop: '5px',
    paddingBottom: '5px'
  },
  itemSpan: {
    display: 'inline-block',
    verticalAlign: 'middle',
    width: '100%',
    maxWidth: '250px',
    textOverflow: 'ellipsis',
    overflow: 'hidden'

  },
  itemNotSelected: {
    borderBottom: '1px solid rgba(128, 192, 64, 0.6)',
    marginRight: '10px'
  },
  svgClose: {
    position: 'absolute',
    right: 0
  }
};

var WatchBrowser = _react2.default.createClass({
  displayName: 'WatchBrowser',
  getInitialState: function getInitialState() {
    var store = this.props.store;

    return {
      isShow: false,
      isModeEdit: false,
      watchList: store.getWatchList()
    };
  },


  componentWillMount: function componentWillMount() {
    this.unsubscribe = this.props.store.listen(this._onStore);
  },
  componentWillUnmount: function componentWillUnmount() {
    this.unsubscribe();
  },
  _onStore: function _onStore(actionType, data) {
    var store = this.props.store;

    if (actionType === showAction && data === browserType) {
      this._handlerShow();
    } else if (actionType === updateViewAction) {
      this.setState({ watchList: data });
    }
  },

  _handlerHide: function _handlerHide() {
    this.setState({ isShow: false });
  },
  _handlerShow: function _handlerShow() {
    this.setState({ isShow: true });
  },
  _handlerSaveWatch: function _handlerSaveWatch() {
    _WatchActions2.default.saveWatch();
  },
  _handlerToggleEditMode: function _handlerToggleEditMode() {
    this.setState({ isModeEdit: !this.state.isModeEdit });
  },
  _handlerRemoveItem: function _handlerRemoveItem(option, event) {
    event.stopPropagation();
    _WatchActions2.default.removeItem(option);
  },
  _renderWatchList: function _renderWatchList(watchList) {
    var _this = this;

    return watchList.groups.map(function (group, index) {
      var caption = group.caption;
      var lists = group.lists;

      return _react2.default.createElement(
        _OpenClose2.default,
        {
          key: index,
          caption: caption,
          isClose: true
        },
        lists && _this._renderLists(lists, caption)
      );
    });
  },
  _renderLists: function _renderLists(lists, groupCaption) {
    var _this2 = this;

    return lists.map(function (list, index) {
      var caption = list.caption;
      var items = list.items;

      return _react2.default.createElement(
        _OpenClose2.default,
        {
          key: index,
          fillOpen: '#80c040',
          style: styles.groupDiv,
          styleNotSelected: styles.itemNotSelected,
          caption: caption,
          isClose: true
        },
        items && _this2._renderItems(items, groupCaption, caption)
      );
    });
  },
  _renderItems: function _renderItems(items, groupCaption, listCaption) {
    var _this3 = this;

    var isModeEdit = this.state.isModeEdit;

    return items.map(function (item, index) {
      var _className = index % 2 ? 'row__topic__even not-selected' : 'row__topic__odd not-selected';
      var caption = item.caption;
      var id = item.id;
      var _btClose = isModeEdit ? _react2.default.createElement(_SvgClose2.default, {
        style: styles.svgClose,
        onClose: _this3._handlerRemoveItem.bind(null, { groupCaption: groupCaption, listCaption: listCaption, caption: caption })
      }) : undefined;
      return _react2.default.createElement(
        'div',
        {
          key: id,
          className: _className,
          onClick: _ComponentActions2.default.showModalDialog.bind(null, _Type.ModalDialog.LOAD_ITEM, item),
          style: styles.itemDiv
        },
        _react2.default.createElement(
          'span',
          { style: styles.itemSpan },
          caption
        ),
        _btClose
      );
    });
  },
  render: function render() {
    var _state = this.state;
    var isShow = _state.isShow;
    var isModeEdit = _state.isModeEdit;
    var watchList = _state.watchList;

    var _captionEV = isModeEdit ? 'E' : 'V';
    return _react2.default.createElement(
      _Browser2.default,
      { isShow: isShow, style: { paddingRight: 0 } },
      _react2.default.createElement(
        _CaptionRow2.default,
        {
          caption: 'Watch List',
          onClose: this._handlerHide
        },
        _react2.default.createElement(_ButtonCircle2.default, {
          caption: 'S',
          style: styles.btCircle,
          onClick: this._handlerSaveWatch
        }),
        _react2.default.createElement(_ButtonCircle2.default, {
          caption: _captionEV,
          style: styles.btCircle,
          onClick: this._handlerToggleEditMode
        })
      ),
      _react2.default.createElement(
        _ScrollPane2.default,
        { style: styles.scrollDiv },
        watchList && this._renderWatchList(watchList)
      )
    );
  }
});

exports.default = WatchBrowser;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\watch-browser\WatchBrowser.js.map