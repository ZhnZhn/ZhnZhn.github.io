"use strict";

exports.__esModule = true;
exports.default = void 0;
const MAX_WORD_LENGTH = 11,
  MAX_LONG_LENGTH = 30,
  _isOneLongWord = caption => caption.length > MAX_WORD_LENGTH && caption.indexOf(' ') === -1,
  _crCaptionTuple = (caption, toIndex, endToken) => [caption.slice(0, toIndex) + endToken, caption];

// [caption, title]
const crRowCaption = caption => typeof caption !== 'string' ? [] : _isOneLongWord(caption) ? _crCaptionTuple(caption, MAX_WORD_LENGTH, '.') : caption.length > MAX_LONG_LENGTH ? _crCaptionTuple(caption, MAX_LONG_LENGTH, '...') : [caption];
var _default = exports.default = crRowCaption;
//# sourceMappingURL=crRowCaption.js.map