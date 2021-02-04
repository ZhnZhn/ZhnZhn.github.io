"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _useLoadOptions2 = _interopRequireDefault(require("../hooks/useLoadOptions"));

var _RowInputSelect = _interopRequireDefault(require("./RowInputSelect"));

var _ShowHide = _interopRequireDefault(require("../../zhn/ShowHide"));

var DF_MSG_ON_NOT_SELECRED = function DF_MSG_ON_NOT_SELECRED(item) {
  return item + " is not selected";
};

var NOOP = function NOOP() {};

var SelectOneTwo = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var isShowLabels = _ref.isShowLabels,
      _ref$isShow = _ref.isShow,
      isShow = _ref$isShow === void 0 ? true : _ref$isShow,
      _ref$isHideTwo = _ref.isHideTwo,
      isHideTwo = _ref$isHideTwo === void 0 ? false : _ref$isHideTwo,
      _ref$oneOptionNames = _ref.oneOptionNames,
      oneOptionNames = _ref$oneOptionNames === void 0 ? 'Items' : _ref$oneOptionNames,
      _ref$msgOnNotSelected = _ref.msgOnNotSelected,
      msgOnNotSelected = _ref$msgOnNotSelected === void 0 ? DF_MSG_ON_NOT_SELECRED : _ref$msgOnNotSelected,
      uri = _ref.uri,
      oneJsonProp = _ref.oneJsonProp,
      oneCaption = _ref.oneCaption,
      twoCaption = _ref.twoCaption,
      _ref$onSelectOne = _ref.onSelectOne,
      onSelectOne = _ref$onSelectOne === void 0 ? NOOP : _ref$onSelectOne;

  var _useLoadOptions = (0, _useLoadOptions2["default"])(isShow, uri, oneJsonProp),
      state = _useLoadOptions[0],
      loadOptions = _useLoadOptions[1],
      isLoading = state.isLoading,
      isLoadingFailed = state.isLoadingFailed,
      oneOptions = state.options,
      _useState = (0, _react.useState)([]),
      twoOptions = _useState[0],
      setTwoOptions = _useState[1],
      _refOne = (0, _react.useRef)(null),
      _refTwo = (0, _react.useRef)(null),
      _hSelectOne = (0, _react.useCallback)(function (one) {
    _refOne.current = one;
    _refTwo.current = null;
    setTwoOptions(one && one.columns || []);
    onSelectOne(one);
  }, []),
      _hSelectTwo = (0, _react.useCallback)(function (item) {
    _refTwo.current = item;
  }, []);
  /*eslint-disable react-hooks/exhaustive-deps */


  (0, _react.useImperativeHandle)(ref, function () {
    return {
      getValidation: function getValidation() {
        var msg = [];

        if (!_refOne.current) {
          msg.push(msgOnNotSelected(oneCaption));
        }

        if (!_refTwo.current) {
          msg.push(msgOnNotSelected(twoCaption));
        }

        if (msg.length > 0) {
          return {
            isValid: false,
            msg: msg
          };
        }

        return {
          isValid: true
        };
      },
      getValues: function getValues() {
        return {
          one: _refOne.current,
          two: _refTwo.current
        };
      }
    };
  }, []); //oneCaption, twoCaption

  /*eslint-enable react-hooks/exhaustive-deps */

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_RowInputSelect["default"], {
      isShowLabels: isShowLabels,
      caption: oneCaption,
      options: oneOptions,
      optionNames: oneOptionNames,
      isLoading: isLoading,
      isLoadingFailed: isLoadingFailed,
      onLoadOption: loadOptions,
      onSelect: _hSelectOne
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ShowHide["default"], {
      isShow: !isHideTwo,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowInputSelect["default"], {
        isShowLabels: isShowLabels,
        caption: twoCaption,
        options: twoOptions,
        onSelect: _hSelectTwo
      })
    })]
  });
});
var _default = SelectOneTwo;
exports["default"] = _default;
//# sourceMappingURL=SelectOneTwo.js.map