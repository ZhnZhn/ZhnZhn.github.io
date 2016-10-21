'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Browser = require('./Browser');

var _Browser2 = _interopRequireDefault(_Browser);

var _CaptionRow = require('../CaptionRow');

var _CaptionRow2 = _interopRequireDefault(_CaptionRow);

var _ToolbarButtonCircle = require('../dialogs/ToolbarButtonCircle');

var _ToolbarButtonCircle2 = _interopRequireDefault(_ToolbarButtonCircle);

var _ShowHide = require('./ShowHide');

var _ShowHide2 = _interopRequireDefault(_ShowHide);

var _WrapperInputSearch = require('../zhn-select/WrapperInputSearch');

var _WrapperInputSearch2 = _interopRequireDefault(_WrapperInputSearch);

var _ScrollPane = require('./ScrollPane');

var _ScrollPane2 = _interopRequireDefault(_ScrollPane);

var _MenuListType = require('./MenuListType2');

var _MenuListType2 = _interopRequireDefault(_MenuListType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SEARCH_PLACEHOLDER = "Search By Symbol Or Name";

var Styles = {
  browser: {
    paddingRight: '0',
    minWidth: '300px'
  },
  scrollDiv: {
    overflowY: 'auto',
    height: '92%',
    //height: 'calc(100vh - 90px)',
    paddingRight: '10px'
  }
};

var MenuBrowserDynamic2 = _react2.default.createClass({
  displayName: 'MenuBrowserDynamic2',
  getInitialState: function getInitialState() {
    var isInitShow = this.props.isInitShow;


    this.toolbarButtons = [{ caption: 'I', onClick: this._handlerClickInfo }, { caption: 'S', onClick: this._handlerClickSearch }];

    return {
      isShow: isInitShow ? true : false,
      isShowSearch: false,
      isLoaded: false,
      menuItems: []
    };
  },
  componentWillMount: function componentWillMount() {
    this.unsubscribe = this.props.store.listen(this._onStore);
  },
  componentDidMount: function componentDidMount() {
    this._loadMenu();
  },
  componentWillUpdate: function componentWillUpdate(nextProps, nextState) {
    if (!nextState.isLoaded && nextState.isShow) {
      this._loadMenu();
    }
  },
  componentWillUnmount: function componentWillUnmount() {
    this.unsubscribe();
  },
  _loadMenu: function _loadMenu() {
    var _props = this.props;
    var browserType = _props.browserType;
    var caption = _props.caption;
    var sourceMenuUrl = _props.sourceMenuUrl;
    var onLoadMenu = _props.onLoadMenu;

    onLoadMenu({ browserType: browserType, caption: caption, sourceMenuUrl: sourceMenuUrl });
  },
  _onStore: function _onStore(actionType, data) {
    var _props2 = this.props;
    var browserType = _props2.browserType;
    var showAction = _props2.showAction;
    var loadCompletedAction = _props2.loadCompletedAction;

    if (actionType === showAction && data === browserType) {
      this._handlerShow();
    } else if (actionType === loadCompletedAction && data.browserType === browserType) {
      this.setState({ menuItems: data.json, isLoaded: true });
    }
  },
  _handlerHide: function _handlerHide() {
    this.setState({ isShow: false });
  },
  _handlerShow: function _handlerShow() {
    this.setState({ isShow: true });
  },
  _handlerClickInfo: function _handlerClickInfo() {
    var _props3 = this.props;
    var descrUrl = _props3.descrUrl;
    var onClickInfo = _props3.onClickInfo;

    onClickInfo({ descrUrl: descrUrl });
  },
  _handlerClickSearch: function _handlerClickSearch() {
    this.setState({ isShowSearch: !this.state.isShowSearch });
  },
  _handlerClickItem: function _handlerClickItem(item) {
    var _props4 = this.props;
    var modalDialogType = _props4.modalDialogType;
    var onShowLoadDialog = _props4.onShowLoadDialog;

    onShowLoadDialog(modalDialogType, item);
  },
  render: function render() {
    var _props5 = this.props;
    var caption = _props5.caption;
    var children = _props5.children;
    var ItemComp = _props5.ItemComp;
    var _state = this.state;
    var menuItems = _state.menuItems;
    var isShow = _state.isShow;
    var isShowSearch = _state.isShowSearch;
    var _wrapperSearch = menuItems.length !== 0 ? _react2.default.createElement(
      _ShowHide2.default,
      { isShow: isShowSearch },
      _react2.default.createElement(_WrapperInputSearch2.default, {
        placeholder: SEARCH_PLACEHOLDER,
        data: menuItems,
        onSelect: this._handlerClickItem
      })
    ) : undefined;

    return _react2.default.createElement(
      _Browser2.default,
      { isShow: isShow, style: Styles.browser },
      _react2.default.createElement(_CaptionRow2.default, {
        caption: caption,
        onClose: this._handlerHide
      }),
      _react2.default.createElement(_ToolbarButtonCircle2.default, {
        buttons: this.toolbarButtons
      }),
      _wrapperSearch,
      _react2.default.createElement(
        _ScrollPane2.default,
        { style: Styles.scrollDiv },
        _react2.default.createElement(_MenuListType2.default, {
          model: menuItems,
          ItemComp: ItemComp,
          onClickItem: this._handlerClickItem
        }),
        children
      )
    );
  }
});

exports.default = MenuBrowserDynamic2;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn\MenuBrowserDynamic2.js.map