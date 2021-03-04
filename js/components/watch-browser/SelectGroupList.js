"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _useProperty2 = _interopRequireDefault(require("../hooks/useProperty"));

var _useSelectItem2 = _interopRequireDefault(require("./hooks/useSelectItem"));

var _RowInputSelect = _interopRequireDefault(require("./RowInputSelect"));

//import PropTypes from "prop-types";
var SelectGroupList = /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
  var _useProperty = (0, _useProperty2["default"])(props),
      _setPrevProps = _useProperty[0],
      _getPrevProps = _useProperty[1],
      store = props.store,
      groupCaption = props.groupCaption,
      groupOptions = props.groupOptions,
      listCaption = props.listCaption,
      _refGroupCaption = (0, _react.useRef)(),
      _useSelectItem = (0, _useSelectItem2["default"])(),
      _refListCaption = _useSelectItem[0],
      _hSelectList = _useSelectItem[1],
      _useState = (0, _react.useState)([]),
      listOptions = _useState[0],
      setListOptions = _useState[1],
      _hSelectGroup = (0, _react.useCallback)(function (item) {
    var _ref = item || {},
        caption = _ref.caption;

    if (item && caption) {
      _refGroupCaption.current = caption;
      _refListCaption.current = null;
      setListOptions(item.lists || []);
    } else {
      _refGroupCaption.current = null;
    }
  }, []); //_refListCaption

  /*eslint-enable react-hooks/exhaustive-deps */

  /*eslint-disable react-hooks/exhaustive-deps */


  (0, _react.useEffect)(function () {
    var _prevProps = _getPrevProps();

    if (_prevProps !== props) {
      if (_prevProps.groupOptions !== groupOptions) {
        _refGroupCaption.current = null;
        _refListCaption.current = null;
        setListOptions([]);
      } else if (_refGroupCaption.current) {
        var _listOptions = store.getWatchListsByGroup(_refGroupCaption.current);

        if (_listOptions !== listOptions) {
          _refListCaption.current = null;
          setListOptions(_listOptions);
        }
      }

      _setPrevProps(props);
    }
  }, [props]); //_getPrevProps, _setPrevProps, _refListCaption
  //groupOptions, listCaption, store

  /*eslint-enable react-hooks/exhaustive-deps */

  (0, _react.useImperativeHandle)(ref, function () {
    return {
      getValue: function getValue() {
        return {
          captionGroup: _refGroupCaption.current,
          captionList: _refListCaption.current
        };
      }
    };
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_RowInputSelect["default"], {
      caption: groupCaption,
      options: groupOptions,
      onSelect: _hSelectGroup
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowInputSelect["default"], {
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
exports["default"] = _default;
//# sourceMappingURL=SelectGroupList.js.map