"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _memoIsShow = _interopRequireDefault(require("../hoc/memoIsShow"));
var _useHasBeenOpen = _interopRequireDefault(require("../hooks/useHasBeenOpen"));
var _useProperty = require("../hooks/useProperty");
var _WatchActions = require("../../flux/actions/WatchActions");
var _watchListStore = require("../../flux/watch-list/watchListStore");
var _MsgWatch = require("../../constants/MsgWatch");
var _ModalDialog = _interopRequireDefault(require("../zhn-moleculs/ModalDialog"));
var _FlatButton = _interopRequireDefault(require("../zhn-m/FlatButton"));
var _ValidationMessages = _interopRequireDefault(require("../zhn/ValidationMessages"));
var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from "prop-types";

const S_DIALOG = {
    width: 300
  },
  S_CAPTION = {
    width: 70
  },
  SELECT_WIDTH = "202";
const AddToWatchDialog = (0, _memoIsShow.default)(_ref => {
  let {
    isShow,
    data,
    onClose
  } = _ref;
  const _hasBeenOpen = (0, _useHasBeenOpen.default)(isShow),
    [setGroupCaption, getGroupCaption] = (0, _useProperty.useProperty)(null),
    [setListCaption, getListCaption] = (0, _useProperty.useProperty)(null),
    [validationMessages, setValidationMessages] = (0, _uiApi.useState)([]),
    [state, setState] = (0, _uiApi.useState)(() => ({
      groupOptions: (0, _watchListStore.getWatchGroups)(),
      listOptions: []
    })),
    {
      groupOptions,
      listOptions
    } = state

    /*eslint-disable react-hooks/exhaustive-deps */,
    _hSelectGroup = (0, _uiApi.useCallback)(group => {
      const {
        caption,
        lists
      } = group || {};
      if (caption) {
        setGroupCaption(caption);
        setState(prevState => ({
          ...prevState,
          listOptions: lists || []
        }));
      } else {
        setGroupCaption(null);
      }
    }, [])
    //setGroupCaption
    /*eslint-enable react-hooks/exhaustive-deps */

    /*eslint-disable react-hooks/exhaustive-deps */,
    _hSelectList = (0, _uiApi.useCallback)(list => {
      const {
        caption
      } = list || {};
      setListCaption(caption || null);
    }, [])
    //setListCaption
    /*eslint-enable react-hooks/exhaustive-deps */,
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
        (0, _watchListStore.addWatchItem)({
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
    _commandButtons = [/*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
      caption: "Add",
      title: "Add Item To Watch List",
      isPrimary: true,
      onClick: _hAdd
    }, "add")],
    _hClose = (0, _uiApi.useCallback)(() => {
      setValidationMessages(prevVms => prevVms.length > 0 ? [] : prevVms);
      onClose();
    }, [onClose]);
  (0, _watchListStore.useMsEdit)(msEdit => {
    if (msEdit && msEdit.forActionType === _WatchActions.WAT_ADD_ITEM) {
      if (msEdit.messages) {
        setValidationMessages(msEdit.messages);
      } else {
        setValidationMessages(prevVms => prevVms.length > 0 ? [] : prevVms);
        onClose();
      }
    }
  });

  /*eslint-disable react-hooks/exhaustive-deps */
  (0, _uiApi.useEffect)(() => {
    if (_hasBeenOpen) {
      const groups = (0, _watchListStore.getWatchGroups)(),
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
          const _listOptions = (0, _watchListStore.getWatchListsByGroup)(_groupCaption);
          return listOptions !== _listOptions ? (setListCaption(null), {
            ...prevState,
            listOptions: _listOptions
          }) : prevState;
        });
      }
    }
  }, [_hasBeenOpen]);
  //getGroupCaption, setGroupCaption, setListCaption
  //groupOptions, listOptions
  /*eslint-enable react-hooks/exhaustive-deps */

  const {
    caption
  } = data || {};
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ModalDialog.default, {
    style: S_DIALOG,
    caption: "Add To Watch List",
    isShow: isShow,
    commandButtons: _commandButtons,
    onClose: _hClose,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowText, {
      captionStyle: S_CAPTION,
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
var _default = exports.default = AddToWatchDialog;
//# sourceMappingURL=AddToWatchDialog.js.map