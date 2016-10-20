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

var _ScrollPane = require('./ScrollPane');

var _ScrollPane2 = _interopRequireDefault(_ScrollPane);

var _MenuListType = require('./MenuListType2');

var _MenuListType2 = _interopRequireDefault(_MenuListType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import MenuPart from './MenuPart';

var Styles = {
  browser: {
    paddingRight: '0'
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


    this.toolbarButtons = [{ caption: 'I', onClick: this._handlerClickInfo }];

    return {
      isShow: isInitShow ? true : false,
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
  render: function render() {
    var _props4 = this.props;
    var caption = _props4.caption;
    var children = _props4.children;
    var modalDialogType = _props4.modalDialogType;
    var ItemComp = _props4.ItemComp;
    var _state = this.state;
    var menuItems = _state.menuItems;
    var isShow = _state.isShow;


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
      _react2.default.createElement(
        _ScrollPane2.default,
        { style: Styles.scrollDiv },
        _react2.default.createElement(_MenuListType2.default, {
          model: menuItems,
          modalDialogType: modalDialogType,
          ItemComp: ItemComp
        }),
        children
      )
    );
  }
});

exports.default = MenuBrowserDynamic2;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn\MenuBrowserDynamic2.js.map