"use strict";

exports.__esModule = true;
exports.default = void 0;
const MAX_WORD_LENGTH = 11,
  MAX_LONG_LENGTH = 32;

// [caption, title]
const crRowCaption = caption => typeof caption !== 'string' ? [] : caption.length > MAX_WORD_LENGTH && caption.indexOf(' ') === -1 ? [caption.slice(0, MAX_WORD_LENGTH) + '.', caption] : caption.length > MAX_LONG_LENGTH ? [caption.slice(0, MAX_LONG_LENGTH) + '...', caption] : [caption];
var _default = crRowCaption;
exports.default = _default;
//# sourceMappingURL=crRowCaption.js.map