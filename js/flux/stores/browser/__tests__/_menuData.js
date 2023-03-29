"use strict";

exports.__esModule = true;
exports.default = void 0;
describe('_menuData', () => {
  test('', () => expect('').toBe(''));
});
const items = {
  B1: {
    dialogProps: {
      rootUri: './data/',
      b1: 'b1',
      ba: 'b1'
    }
  },
  B2: {
    extends: 'B1',
    dialogProps: {
      b2: 'b2',
      ba: 'b2',
      selectProps: [['b2', 'B2', 'b2']]
    }
  },
  B3: {
    extends: 'B2',
    dialogType: 'DialogTypeB3',
    dialogProps: {
      b3: 'b3',
      ba: 'ba',
      selectProps: [['b3', 'B3', 'b3']],
      dfProps: {
        dfB3: 'dfB3'
      }
    }
  },
  ID_TOPIC_1: {
    type: 'ID_TOPIC_1',
    addProps: 'B3',
    dialogProps: {
      selectProps: [['topic1', 'Topic1', 'topics1', 2]],
      dfProps: {
        dfT1: 'dfT1'
      }
    }
  },
  ID_TOPIC_2: {
    type: 'ID_TOPIC_2',
    addProps: 'B2',
    dialogProps: {
      selectProps: [['topic2', 'Topic2', 'topics2']],
      dfProps: {
        dfT2: 'dfT2'
      }
    }
  },
  ID_TOPIC_3: {
    type: 'ID_TOPIC_3',
    addProps: 'B1',
    dialogProps: {
      dfProps: {
        dfT3: 'dfT3'
      }
    }
  }
};
const result = {
  ID_TOPIC_1: {
    type: 'ID_TOPIC_1',
    addProps: 'B3',
    dialogType: 'DialogTypeB3',
    dialogProps: {
      rootUri: './data/',
      b1: 'b1',
      b2: 'b2',
      b3: 'b3',
      ba: 'ba',
      selectProps: [{
        id: 'b2',
        caption: 'B2',
        uri: './data/b2.json',
        jsonProp: undefined
      }, {
        id: 'topic1',
        caption: 'Topic1',
        uri: './data/topics1.json',
        jsonProp: undefined
      }, {
        id: 'b3',
        caption: 'B3',
        uri: './data/b3.json',
        jsonProp: undefined
      }],
      dfProps: {
        dfB3: 'dfB3',
        dfT1: 'dfT1'
      }
    }
  },
  ID_TOPIC_2: {
    type: 'ID_TOPIC_2',
    addProps: 'B2',
    dialogProps: {
      rootUri: './data/',
      b1: 'b1',
      b2: 'b2',
      ba: 'b2',
      selectProps: [{
        id: 'b2',
        caption: 'B2',
        uri: './data/b2.json',
        jsonProp: undefined
      }, {
        id: 'topic2',
        caption: 'Topic2',
        uri: './data/topics2.json',
        jsonProp: undefined
      }],
      dfProps: {
        dfT2: 'dfT2'
      }
    }
  },
  ID_TOPIC_3: {
    type: 'ID_TOPIC_3',
    addProps: 'B1',
    dialogProps: {
      rootUri: './data/',
      b1: 'b1',
      ba: 'b1',
      dfProps: {
        dfT3: 'dfT3'
      }
    }
  }
};
var _default = {
  items,
  result
};
exports.default = _default;
//# sourceMappingURL=_menuData.js.map