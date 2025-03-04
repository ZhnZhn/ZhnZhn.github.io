"use strict";

exports.__esModule = true;
exports.result_idTuple = exports.result_dfAddProps = exports.result = exports.items_idTuple = exports.items_dfAddProps = exports.items = exports.df_idTuple = exports.df_dfAddProps = void 0;
describe('_menuData', () => {
  test('', () => expect('').toBe(''));
});
const items = exports.items = {
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
const result = exports.result = {
  ID_TOPIC_1: {
    type: 'ID_TOPIC_1',
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
const items_idTuple = exports.items_idTuple = {
  AAA_B: {
    dialogProps: {
      a1: 'a1',
      b1: 'b1'
    }
  }
};
const df_idTuple = exports.df_idTuple = {
  idTuple: {
    AAA_B: [["AAA_BB_1", "Topic 1", "t1"], ["AAA_BB_2", "Topic 2", "t2"]]
  }
};
const result_idTuple = exports.result_idTuple = {
  AAA_BB_1: {
    type: 'AAA_BB_1',
    menuTitle: 'Topic 1',
    dialogProps: {
      a1: 'a1',
      b1: 'b1',
      dfProps: {
        dfId: 't1'
      }
    }
  },
  AAA_BB_2: {
    type: 'AAA_BB_2',
    menuTitle: 'Topic 2',
    dialogProps: {
      a1: 'a1',
      b1: 'b1',
      dfProps: {
        dfId: 't2'
      }
    }
  }
};
const items_dfAddProps = exports.items_dfAddProps = {
  AAA_B: {
    dialogProps: {
      a1: 'a1',
      b1: 'b1'
    }
  },
  AAA_BB_3: {
    type: 'AAA_BB_3',
    menuTitle: 'Topic 3',
    dialogProps: {
      c1: 'c1'
    }
  }
};
const df_dfAddProps = exports.df_dfAddProps = {
  dfAddProps: 'AAA_B'
};
const result_dfAddProps = exports.result_dfAddProps = {
  AAA_BB_3: {
    type: 'AAA_BB_3',
    menuTitle: 'Topic 3',
    dialogProps: {
      a1: 'a1',
      b1: 'b1',
      c1: 'c1',
      dfProps: {}
    }
  }
};
//# sourceMappingURL=_menuData.js.map