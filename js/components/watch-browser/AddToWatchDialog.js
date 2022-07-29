"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _uiApi = require("../uiApi");

var _memoIsShow = _interopRequireDefault(require("../hoc/memoIsShow"));

var _usePrevValue = _interopRequireDefault(require("../hooks/usePrevValue"));

var _useProperty = _interopRequireDefault(require("../hooks/useProperty"));

var _useListen = _interopRequireDefault(require("../hooks/useListen"));

var _WatchActions = require("../../flux/actions/WatchActions");

var _MsgWatch = require("../../constants/MsgWatch");

var _ModalDialog = _interopRequireDefault(require("../zhn-moleculs/ModalDialog"));

var _Button = _interopRequireDefault(require("./Button"));

var _ValidationMessages = _interopRequireDefault(require("../zhn/ValidationMessages"));

var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from "prop-types";
const addItem = _WatchActions.WatchActions[_WatchActions.WAT_ADD_ITEM],
      S_DIALOG = {
  width: 300
},
      S_CAPTION = {
  width: 70
},
      SELECT_WIDTH = "216";
const AddToWatchDialog = (0, _memoIsShow.default)(props => {
  const [setGroupCaption, getGroupCaption] = (0, _useProperty.default)(null),
        [setListCaption, getListCaption] = (0, _useProperty.default)(null),
        _prevProps = (0, _usePrevValue.default)(props),
        {
    isShow,
    store,
    data,
    onClose
  } = props,
        [validationMessages, setValidationMessages] = (0, _uiApi.useState)([]),
        [state, setState] = (0, _uiApi.useState)(() => ({
    groupOptions: store.getWatchGroups(),
    listOptions: []
  })),
        {
    groupOptions,
    listOptions
  } = state
  /*eslint-disable react-hooks/exhaustive-deps */
  ,
        _hSelectGroup = (0, _uiApi.useCallback)(group => {
    const {
      caption,
      lists
    } = group || {};

    if (caption) {
      setGroupCaption(caption);
      setState(prevState => ({ ...prevState,
        listOptions: lists || []
      }));
    } else {
      setGroupCaption(null);
    }
  }, []) //setGroupCaption

  /*eslint-enable react-hooks/exhaustive-deps */

  /*eslint-disable react-hooks/exhaustive-deps */
  ,
        _hSelectList = (0, _uiApi.useCallback)(list => {
    const {
      caption
    } = list || {};
    setListCaption(caption || null);
  }, []) //setListCaption

  /*eslint-enable react-hooks/exhaustive-deps */
  ,
        _getValidationMessages = () => {
    const msg = [];

    if (!getGroupCaption()) {
      msg.push((0, _MsgWatch.notSelected)('Group'));
    }

    if (!getListCaption()) {
      msg.push((0, _MsgWatch.notSelected)('List'));
    }

    return msg;
  },
        _hAdd = () => {
    const _vms = _getValidationMessages();

    if (_vms.length === 0) {
      const {
        caption,
        config
      } = data,
            groupCaption = getGroupCaption(),
            listCaption = getListCaption();
      addItem({
        caption,
        groupCaption,
        listCaption,
        config
      });
      setValidationMessages(prevVms => prevVms.length > 0 ? [] : prevVms);
    } else {
      setValidationMessages(_vms);
    }
  },
        _commandButtons = [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default.Flat, {
    caption: "Add",
    title: "Add Item To Watch List",
    isPrimary: true,
    onClick: _hAdd
  }, "add")],
        _hClose = (0, _uiApi.useCallback)(() => {
    setValidationMessages(prevVms => prevVms.length > 0 ? [] : prevVms);
    onClose();
  }, [onClose]);

  (0, _useListen.default)((actionType, data) => {
    if (actionType === _WatchActions.WAT_EDIT_WATCH_COMPLETED && data.forActionType === _WatchActions.WAT_ADD_ITEM) {
      setValidationMessages(prevVms => prevVms.length > 0 ? [] : prevVms);
      onClose();
    } else if (actionType === _WatchActions.WAT_EDIT_WATCH_FAILED && data.forActionType === _WatchActions.WAT_ADD_ITEM) {
      setValidationMessages(data.messages);
    }
  });
  /*eslint-disable react-hooks/exhaustive-deps */

  (0, _uiApi.useEffect)(() => {
    if (_prevProps && _prevProps !== props && _prevProps.isShow !== isShow) {
      const groups = store.getWatchGroups(),
            _groupCaption = getGroupCaption();

      if (groups !== groupOptions) {
        setGroupCaption(null);
        setListCaption(null);
        setState({
          groupOptions: groups,
          listOptions: []
        });
      } else if (_groupCaption) {
        setState(prevState => {
          const _listOptions = store.getWatchListsByGroup(_groupCaption);

          return listOptions !== _listOptions ? (setListCaption(null), { ...prevState,
            listOptions: _listOptions
          }) : prevState;
        });
      }
    }
  }); //_prevProps, props, isShow, store
  //getGroupCaption, setGroupCaption, setListCaption
  //groupOptions, listOptions

  /*eslint-enable react-hooks/exhaustive-deps */

  const {
    caption
  } = data;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ModalDialog.default, {
    style: S_DIALOG,
    caption: "Add To Watch List",
    isShow: isShow,
    commandButtons: _commandButtons,
    onClose: _hClose,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.Row.Text, {
      styleCaption: S_CAPTION,
      caption: "Item:",
      text: caption
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowInputSelect, {
      caption: "Group",
      captionStyle: S_CAPTION,
      width: SELECT_WIDTH,
      options: groupOptions,
      onSelect: _hSelectGroup
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowInputSelect, {
      caption: "List",
      captionStyle: S_CAPTION,
      width: SELECT_WIDTH,
      onSelect: _hSelectList,
      options: listOptions
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ValidationMessages.default, {
      validationMessages: validationMessages
    })]
  });
});
/*
AddToWatchDialog.propTypes = {
  isShow  : PropTypes.bool,
  data    : PropTypes.object,
  store   : PropTypes.shape({
    listen: PropTypes.func,
    getWatchGroups: PropTypes.func,
    getWatchListsByGroup: PropTypes.func
  }),
  onClose : PropTypes.func
}
*/

var _default = AddToWatchDialog;
exports.default = _default;
//# sourceMappingURL=AddToWatchDialog.js.map