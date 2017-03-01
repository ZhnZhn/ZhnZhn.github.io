"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var TransformFn = {
  fromLevel3: function fromLevel3(data) {
    var meta = data.meta,
        caption = meta.caption,
        level1 = meta.level1,
        level2 = meta.level2,
        level3 = meta.level3,
        _options = [];


    for (var i1 = 0, l1 = data[level1].length; i1 < l1; i1++) {
      var industry = data[level1][i1];
      for (var i2 = 0, l2 = industry[level2].length; i2 < l2; i2++) {
        var sector = industry[level2][i2];
        for (var i3 = 0, l3 = sector[level3].length; i3 < l3; i3++) {
          var item = sector[level3][i3];
          item.topic = industry[caption] + "/" + sector[caption];
          _options.push(item);
        }
      }
    }

    return _options;
  }
};

exports.default = TransformFn;
//# sourceMappingURL=TransformFn.js.map