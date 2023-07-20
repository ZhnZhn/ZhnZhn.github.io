"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useProperty = _interopRequireDefault(require("../hooks/useProperty"));
var _useSelectItem = _interopRequireDefault(require("./hooks/useSelectItem"));
var _RowInputSelect = _interopRequireDefault(require("./RowInputSelect"));
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from "prop-types";

const SelectGroupList = (0, _uiApi.forwardRef)((props, ref) => {
  const [_setPrevProps, _getPrevProps] = (0, _useProperty.default)(props),
    {
      store,
      groupCaption,
      groupOptions,
      listCaption
    } = props,
    _refGroupCaption = (0, _uiApi.useRef)(),
    [_refListCaption, _hSelectList] = (0, _useSelectItem.default)(),
    [listOptions, setListOptions] = (0, _uiApi.useState)([])
    /*eslint-disable react-hooks/exhaustive-deps */,
    _hSelectGroup = (0, _uiApi.useCallback)(item => {
      const {
        caption
      } = item || {};
      if (item && caption) {
        (0, _uiApi.setRefValue)(_refGroupCaption, caption);
        (0, _uiApi.setRefValue)(_refListCaption, null);
        setListOptions(item.lists || []);
      } else {
        (0, _uiApi.setRefValue)(_refGroupCaption, null);
      }
    }, []);
  //_refListCaption
  /*eslint-enable react-hooks/exhaustive-deps */

  /*eslint-disable react-hooks/exhaustive-deps */
  (0, _uiApi.useEffect)(() => {
    const _prevProps = _getPrevProps();
    if (_prevProps !== props) {
      if (_prevProps.groupOptions !== groupOptions) {
        (0, _uiApi.setRefValue)(_refGroupCaption, null);
        (0, _uiApi.setRefValue)(_refListCaption, null);
        setListOptions([]);
      } else if ((0, _uiApi.getRefValue)(_refGroupCaption)) {
        const _listOptions = store.getWatchListsByGroup(_refGroupCaption.current);
        if (_listOptions !== listOptions) {
          (0, _uiApi.setRefValue)(_refListCaption, null);
          setListOptions(_listOptions);
        }
      }
      _setPrevProps(props);
    }
  }, [props]);
  //_getPrevProps, _setPrevProps, _refListCaption
  //groupOptions, listCaption, store
  /*eslint-enable react-hooks/exhaustive-deps */

  (0, _uiApi.useImperativeHandle)(ref, () => ({
    getValue: () => ({
      captionGroup: (0, _uiApi.getRefValue)(_refGroupCaption),
      captionList: (0, _uiApi.getRefValue)(_refListCaption)
    })
  }));
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_RowInputSelect.default, {
      caption: groupCaption,
      options: groupOptions,
      onSelect: _hSelectGroup
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowInputSelect.default, {
      caption: listCaption,
      options: listOptions,
      onSelect: _hSelectList
    })]
  });
});

/*
SelectGroupList.propTypes = {
  store: PropTypes.shape({
    listen: PropTypes.func,
    getWatchListsByGroup: PropTypes.func
  }),
  groupCaption: PropTypes.string,
  groupOptions: PropTypes.array,
  listCaption: PropTypes.string
}
*/
var _default = SelectGroupList;
exports.default = _default;
//# sourceMappingURL=SelectGroupList.js.map