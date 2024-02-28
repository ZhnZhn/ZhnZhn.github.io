"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../../uiApi");
var _useLoadOptions = _interopRequireDefault(require("../hooks/useLoadOptions"));
var _RowInputSelect = _interopRequireDefault(require("./RowInputSelect"));
var _ShowHide = _interopRequireDefault(require("../../zhn/ShowHide"));
var _jsxRuntime = require("react/jsx-runtime");
const DF_MSG_ON_NOT_SELECRED = item => `${item} is not selected`;
const FN_NOOP = () => {};
const SelectOneTwo = (0, _uiApi.forwardRef)((_ref, ref) => {
  let {
    isShowLabels,
    isShow = true,
    isHideTwo = false,
    oneOptionNames = 'Items',
    msgOnNotSelected = DF_MSG_ON_NOT_SELECRED,
    uri,
    oneJsonProp = "items",
    oneCaption,
    twoCaption,
    propCaption,
    onSelectOne = FN_NOOP,
    onSelect = FN_NOOP
  } = _ref;
  const [state, loadOptions] = (0, _useLoadOptions.default)(isShow, uri, oneJsonProp),
    {
      isLoading,
      isLoadingFailed,
      options: oneOptions
    } = state,
    [twoOptions, setTwoOptions] = (0, _uiApi.useState)([]),
    _refOne = (0, _uiApi.useRef)(null),
    _refTwo = (0, _uiApi.useRef)(null)

    /*eslint-disable react-hooks/exhaustive-deps */,
    _hSelectOne = (0, _uiApi.useCallback)(one => {
      (0, _uiApi.setRefValue)(_refOne, one);
      (0, _uiApi.setRefValue)(_refTwo, null);
      setTwoOptions(one && one.columns || []);
      onSelectOne(one);
    }, [])
    //onSelectOne
    /*eslint-enable react-hooks/exhaustive-deps */

    /*eslint-disable react-hooks/exhaustive-deps */,
    _hSelectTwo = (0, _uiApi.useCallback)(item => {
      (0, _uiApi.setRefValue)(_refTwo, item);
      onSelect(item);
    }, []);
  //onSelect
  /*eslint-enable react-hooks/exhaustive-deps */

  /*eslint-disable react-hooks/exhaustive-deps */
  (0, _uiApi.useImperativeHandle)(ref, () => ({
    getValidation: () => {
      const msg = [];
      if (!(0, _uiApi.getRefValue)(_refOne)) {
        msg.push(msgOnNotSelected(oneCaption));
      }
      if (!(0, _uiApi.getRefValue)(_refTwo)) {
        msg.push(msgOnNotSelected(twoCaption));
      }
      return msg.length > 0 ? {
        isValid: false,
        msg
      } : {
        isValid: true
      };
    },
    getValues: () => ({
      one: (0, _uiApi.getRefValue)(_refOne),
      two: (0, _uiApi.getRefValue)(_refTwo)
    })
  }), []);
  //oneCaption, twoCaption
  /*eslint-enable react-hooks/exhaustive-deps */

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_RowInputSelect.default, {
      isShowLabels: isShowLabels,
      caption: oneCaption,
      options: oneOptions,
      optionNames: oneOptionNames,
      propCaption: propCaption,
      isLoading: isLoading,
      isLoadingFailed: isLoadingFailed,
      onLoadOption: loadOptions,
      onSelect: _hSelectOne
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ShowHide.default, {
      isShow: !isHideTwo,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowInputSelect.default, {
        isShowLabels: isShowLabels,
        caption: twoCaption,
        options: twoOptions,
        propCaption: propCaption,
        onSelect: _hSelectTwo
      })
    })]
  });
});
var _default = exports.default = SelectOneTwo;
//# sourceMappingURL=SelectOneTwo.js.map