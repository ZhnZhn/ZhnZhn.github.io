"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _ComponentActions = _interopRequireDefault(require("../../actions/ComponentActions"));

var _ChartActions = _interopRequireWildcard(require("../../actions/ChartActions"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const _crItemHandlers = (dT, bT) => ({
  onClick: _ComponentActions.default.showDialog.bind(null, dT, bT),
  onBadgeClick: _ChartActions.default[_ChartActions.CHAT_SHOW].bind(null, dT, bT),
  onBadgeClose: _ComponentActions.default.closeChartContainer2.bind(null, dT)
});

const _crItem = (item, menuItems, browserType) => {
  const {
    id,
    isNew = false
  } = item;
  return {
    id: id,
    title: menuItems[id].menuTitle,
    isNew: isNew,
    counter: 0,
    isOpen: false,
    ..._crItemHandlers(id, browserType)
  };
};

const _crItems = (items = [], menuItems, browserType) => items.map(item => item.id ? _crItem(item, menuItems, browserType) : {
  caption: item.caption,
  items: _crItems(item.items, menuItems, browserType)
});

const crMenu = (menu = [], menuItems, browserType) => {
  return menu.map(menuPart => {
    const {
      caption,
      isInitOpen,
      items
    } = menuPart,
          _items = _crItems(items, menuItems, browserType);

    return {
      caption,
      isInitOpen,
      items: _items
    };
  });
};

var _default = crMenu;
exports.default = _default;
//# sourceMappingURL=crMenu.js.map