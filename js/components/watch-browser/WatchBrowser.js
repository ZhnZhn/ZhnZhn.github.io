'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Type = require('../../constants/Type');

var _ComponentActions = require('../../flux/actions/ComponentActions');

var _Browser = require('../zhn/Browser');

var _Browser2 = _interopRequireDefault(_Browser);

var _CaptionRow = require('../CaptionRow');

var _CaptionRow2 = _interopRequireDefault(_CaptionRow);

var _OpenClose = require('../zhn/OpenClose2');

var _OpenClose2 = _interopRequireDefault(_OpenClose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var showAction = _ComponentActions.ComponentActionTypes.SHOW_BROWSER,
    browserType = _Type.BrowserType.WATCH_LIST;

var WatchBrowser = _react2.default.createClass({
  displayName: 'WatchBrowser',
  getInitialState: function getInitialState() {
    var store = this.props.store;

    return {
      isShow: false,
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
    }
  },

  _handlerHide: function _handlerHide() {
    this.setState({ isShow: false });
  },
  _handlerShow: function _handlerShow() {
    this.setState({ isShow: true });
  },
  _renderLists: function _renderLists(lists) {
    return lists.map(function (list, index) {
      return _react2.default.createElement(_OpenClose2.default, {
        key: index,
        fillOpen: '#80c040',
        style: { paddingLeft: '20px' },
        caption: list.title,
        isClose: true
      });
    });
  },
  _renderWatchList: function _renderWatchList(watchList) {
    var _this = this;

    return watchList.groups.map(function (group, index) {
      return _react2.default.createElement(
        _OpenClose2.default,
        {
          key: index,
          caption: group.title,
          isClose: true
        },
        group.lists && _this._renderLists(group.lists)
      );
    });
  },
  render: function render() {
    var _state = this.state;
    var isShow = _state.isShow;
    var watchList = _state.watchList;

    return _react2.default.createElement(
      _Browser2.default,
      { isShow: isShow },
      _react2.default.createElement(_CaptionRow2.default, {
        caption: 'Watch List',
        onClose: this._handlerHide
      }),
      this._renderWatchList(watchList)
    );
  }
});

exports.default = WatchBrowser;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\watch-browser\WatchBrowser.js.map