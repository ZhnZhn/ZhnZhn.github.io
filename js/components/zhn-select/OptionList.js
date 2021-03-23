"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var OptionList = function OptionList(_ref) {
  var options = _ref.options,
      selectedIndex = _ref.selectedIndex,
      className = _ref.className,
      refOptionNode = _ref.refOptionNode,
      _onClick = _ref.onClick,
      propCaption = _ref.propCaption,
      ItemComp = _ref.ItemComp;
  return options.map(function (item, index) {
    return (
      /*#__PURE__*/

      /*eslint-disable jsx-a11y/click-events-have-key-events*/
      (0, _jsxRuntime.jsx)("div", {
        role: "option",
        "aria-selected": selectedIndex === index,
        tabIndex: "-1",
        className: className,
        ref: function ref(n) {
          return refOptionNode(n, index);
        },
        onClick: function onClick() {
          return _onClick(item, index, propCaption);
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(ItemComp, {
          item: item,
          propCaption: propCaption
        })
      }, index)
      /*eslint-enable jsx-a11y/click-events-have-key-events*/

    );
  });
};

var _default = OptionList;
exports["default"] = _default;
//# sourceMappingURL=OptionList.js.map