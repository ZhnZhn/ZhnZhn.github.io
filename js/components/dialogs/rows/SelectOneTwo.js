"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _useLoadOptions = _interopRequireDefault(require("../hooks/useLoadOptions"));

var _RowInputSelect = _interopRequireDefault(require("./RowInputSelect"));

var _ShowHide = _interopRequireDefault(require("../../zhn/ShowHide"));

var _jsxRuntime = require("react/jsx-runtime");

const DF_MSG_ON_NOT_SELECRED = item => item + " is not selected";

const NOOP = () => {};

const SelectOneTwo = /*#__PURE__*/(0, _react.forwardRef)((_ref, ref) => {
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
    onSelectOne = NOOP
  } = _ref;

  const [state, loadOptions] = (0, _useLoadOptions.default)(isShow, uri, oneJsonProp),
        {
    isLoading,
    isLoadingFailed,
    options: oneOptions
  } = state,
        [twoOptions, setTwoOptions] = (0, _react.useState)([]),
        _refOne = (0, _react.useRef)(null),
        _refTwo = (0, _react.useRef)(null)
  /*eslint-disable react-hooks/exhaustive-deps */
  ,
        _hSelectOne = (0, _react.useCallback)(one => {
    _refOne.current = one;
    _refTwo.current = null;
    setTwoOptions(one && one.columns || []);
    onSelectOne(one);
  }, []) //onSelectOne

  /*eslint-enable react-hooks/exhaustive-deps */
  ,
        _hSelectTwo = (0, _react.useCallback)(item => {
    _refTwo.current = item;
  }, []);
  /*eslint-disable react-hooks/exhaustive-deps */


  (0, _react.useImperativeHandle)(ref, () => ({
    getValidation: () => {
      const msg = [];

      if (!_refOne.current) {
        msg.push(msgOnNotSelected(oneCaption));
      }

      if (!_refTwo.current) {
        msg.push(msgOnNotSelected(twoCaption));
      }

      if (msg.length > 0) {
        return {
          isValid: false,
          msg
        };
      }

      return {
        isValid: true
      };
    },
    getValues: () => ({
      one: _refOne.current,
      two: _refTwo.current
    })
  }), []); //oneCaption, twoCaption

  /*eslint-enable react-hooks/exhaustive-deps */

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_RowInputSelect.default, {
      isShowLabels: isShowLabels,
      caption: oneCaption,
      options: oneOptions,
      optionNames: oneOptionNames,
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
        onSelect: _hSelectTwo
      })
    })]
  });
});
var _default = SelectOneTwo;
exports.default = _default;
//# sourceMappingURL=SelectOneTwo.js.map