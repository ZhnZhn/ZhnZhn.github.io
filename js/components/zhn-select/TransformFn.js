"use strict";

exports.__esModule = true;
exports.transformFromLevel3 = void 0;

const transformFromLevel3 = data => {
  if (data.length === 0) {
    return [];
  }

  const {
    meta
  } = data,
        {
    caption,
    level1,
    level2,
    level3
  } = meta,
        _options = [];
  let industry, sector, item, i1, i2, i3;

  for (i1 = 0; i1 < data[level1].length; i1++) {
    industry = data[level1][i1];

    for (i2 = 0; i2 < industry[level2].length; i2++) {
      sector = industry[level2][i2];

      for (i3 = 0; i3 < sector[level3].length; i3++) {
        item = sector[level3][i3];
        item.topic = industry[caption] + "/" + sector[caption];

        _options.push(item);
      }
    }
  }

  return _options;
};

exports.transformFromLevel3 = transformFromLevel3;
//# sourceMappingURL=TransformFn.js.map