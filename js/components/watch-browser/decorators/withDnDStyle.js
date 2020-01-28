"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var BORDER = 'border' // dragStart
,
    BORDER_BOTTOM = 'border-bottom' // backup
,
    BORDER_LEFT = 'border-left' // dragEnter
//, START_BORDER_STYLE = "1px solid yellow"
//, ENTER_BORDER_LEFT_STYLE = "4px solid #1b2836"
//, ENTER_BORDER_LEFT_STYLE = "4px solid green"
,
    ENTER_BORDER_LEFT_STYLE_DENY = "4px solid red";
var sourcePermissions, nodeDragTarget, borderBottom, borderLeftEnter;

var _crEnterBorderLeftStyle = function _crEnterBorderLeftStyle(borderColor) {
  if (borderColor === void 0) {
    borderColor = "green";
  }

  return "4px solid " + borderColor;
};

var dragStartWithDnDStyle = function dragStartWithDnDStyle(ev, permissions) {
  ev.persist();
  nodeDragTarget = ev.currentTarget;
  var style = ev.currentTarget.style;
  borderBottom = style.getPropertyValue(BORDER_BOTTOM); //style.setProperty(BORDER, START_BORDER_STYLE);

  sourcePermissions = permissions;
};

var dropWithDnDStyle = function dropWithDnDStyle(ev) {
  var styleTarget = nodeDragTarget.style,
      styleSource = ev.currentTarget.style;
  styleSource.removeProperty(BORDER_LEFT);
  styleTarget.removeProperty(BORDER);
  styleTarget.setProperty(BORDER_BOTTOM, borderBottom);
};

var dragEnterWithDnDStyle = function dragEnterWithDnDStyle(ev, sourceType, borderColor) {
  var style = ev.currentTarget.style;
  borderLeftEnter = style.getPropertyValue(BORDER_LEFT);

  if (sourcePermissions.indexOf(sourceType) !== -1) {
    //style.setProperty(BORDER_LEFT, ENTER_BORDER_LEFT_STYLE)
    style.setProperty(BORDER_LEFT, _crEnterBorderLeftStyle(borderColor));
  } else {
    style.setProperty(BORDER_LEFT, ENTER_BORDER_LEFT_STYLE_DENY);
  }
};

var dragLeaveWithDnDStyle = function dragLeaveWithDnDStyle(ev) {
  var style = ev.currentTarget.style;
  style.removeProperty(BORDER_LEFT);
  style.setProperty(BORDER_LEFT, borderLeftEnter);
};

var withDnDStyle = function withDnDStyle(target) {
  Object.assign(target.prototype, {
    dragStartWithDnDStyle: dragStartWithDnDStyle,
    dropWithDnDStyle: dropWithDnDStyle,
    dragEnterWithDnDStyle: dragEnterWithDnDStyle,
    dragLeaveWithDnDStyle: dragLeaveWithDnDStyle
  });
};

var _default = withDnDStyle;
exports["default"] = _default;
//# sourceMappingURL=withDnDStyle.js.map