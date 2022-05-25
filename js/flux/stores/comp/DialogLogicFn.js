"use strict";

exports.__esModule = true;
exports.showOptionDialog = exports.showItemDialog = void 0;

var _Factory = require("../../logic/Factory");

const showItemDialog = (store, slice, _ref) => {
  let {
    type,
    browserType,
    dialogConfOr
  } = _ref;
  return slice[type] ? Promise.resolve({
    key: type
  }) : (0, _Factory.crDialog)(browserType, store.getDialogConf(dialogConfOr, type)).then(Comp => {
    slice[type] = true;
    return {
      key: type,
      Comp
    };
  });
};

exports.showItemDialog = showItemDialog;

const showOptionDialog = (slice, options) => {
  const {
    type,
    data
  } = options;

  if (slice[type]) {
    return Promise.resolve({
      key: type,
      data
    });
  } else {
    options.dialogType = type;
    return (0, _Factory.crOptionDialog)(options).then(Comp => {
      slice[type] = true;
      return {
        key: type,
        Comp,
        data
      };
    });
  }
};

exports.showOptionDialog = showOptionDialog;
//# sourceMappingURL=DialogLogicFn.js.map