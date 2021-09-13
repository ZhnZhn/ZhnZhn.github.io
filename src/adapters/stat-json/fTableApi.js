
const _crTidTop = (v) => ({
  code: "Tid",
  selection: {
    filter: "top",
    values: [''+v]
  }
});

const _checkTop = (isTop, strN, arr) => {
  if (isTop) {
    arr.push(_crTidTop(strN))
  }
};

const _crArrQuery = (items, loadId) => {
  const arrQuery = [];
  items.forEach(item => {
     const { slice } = item || {};
     for(const propName in slice){
       const code = loadId === "SIR"
         ? propName.toUpperCase()
         : propName
       arrQuery.push({
         code,
         selection: {
           filter: 'item',
           values: [slice[propName]]
           //filter: 'all',
           //values: ['*']
         }
       })
     }
  })
  return arrQuery;
};

const _isCategory = seriaType =>
   seriaType === "BAR_CLUSTER"
|| seriaType === "BAR_SET"
|| seriaType === "COLUMN_SET"
|| seriaType === "COLUMN_CLUSTER"
|| seriaType === "TREE_MAP"
|| seriaType === "TREE_MAP_CLUSTER"
|| seriaType === "TREE_MAP_2"
|| seriaType === "TREE_MAP_2_CLUSTER";

const _checkSeriaCategory = (arr, { dfC, seriaType }) => {
  if (dfC && _isCategory(seriaType)) {
    const _arr = arr.filter(item => item.code !== dfC);
    _arr.unshift({
      code: dfC,
      selection: {
       filter: "all",
       values: ["*"]
     }
    })
    return _arr;
  }
  return arr;
};

const _crOptionFetch = (arrQuery, option) => ({
  method: 'POST',
  body: JSON.stringify({
     query: _checkSeriaCategory(arrQuery, option),
     response: {
        format: "json-stat"
     }
  })
});

const _crVariablesDenm = items => items
 .map(({ slice }) => {
    const code = Object.keys(slice)[0];
    return {
      code,
      values: [slice[code]]
    };
 });

const _crOptionFetchDenm = ({ dfId, items }) => ({
  method: "POST",
  headers: {
   'Content-Type': "application/json",
  },
  body: JSON.stringify({
     lang: "en",
     table: dfId,
     format: "JSONSTAT",
     valuePresentation: "Default",
     timeOrder: "Ascending",
     variables: [
       ..._crVariablesDenm(items),
       { code: 'Tid', values: ["*"]}
     ]
  })
});



const _crIrlQuery = (option) => {
  const _q1 = {
    query: _crArrQuery(option.items, option.loadId),
    response: {
      format: "json-stat2",
      pivot: null
    }
  }
  //console.log(_q1)

  /*
  const query = {
	"query": [
		{
			"code": "STATISTIC",
			"selection": {
				"filter": "item",
				"values": [
					"CPM01C01",
					//"CPM01C01"
				]
			}
		},
		{
			"code": "TLIST(M1)",
			"selection": {
				"filter": "item",
				"values": [
					"202107"
				]
			}
		},
		{
			"code": "C01779V03424",
			"selection": {
				"filter": "item",
				"values": [
          "-"
					//"10"
				]
			}
		}
	],
	"response": {
		"format": "json-stat2",
		"pivot": null
	}
};
*/
  //console.log(JSON.stringify(_q1))
  //console.log(JSON.stringify(query))

  //console.log(JSON.stringify(_q1) === JSON.stringify(query))
  return {
    method: "POST",
    headers: {
     'Content-Type': "application/json",
    },
    body: JSON.stringify(_q1)
    //body: JSON.stringify(query)
  };
  //return '?query=' + JSON.stringify(query);
}

const fTableApi = (ROOT_URL) => ({
  getRequestUrl(option){
    if (option.url) { return option.url; }

    const { proxy='', dfId } = option
    , _dfId = option.loadId === 'SDN'
        ? ''
        : '/'+dfId
    //, _query = option.loadId === 'SWS'
    //    ? _crIrlQuery(option)
    //    : ''


    return (option.url = `${proxy}${ROOT_URL}${_dfId}`);
  },

  crOptionFetch(option){
    if (option.optionFetch) {
      return option.optionFetch;
    }
    if (option.loadId === "SIR") {
      return (option.optionFetch = _crIrlQuery(option));
    }
    if (option.loadId === 'SDN') {
      return (option.optionFetch = _crOptionFetchDenm(option));
    }

    const {
      items=[],
      isTop12, isTop6,
    } = option
    , arrQuery = _crArrQuery(items);

    _checkTop(isTop12, '12', arrQuery)
    _checkTop(isTop6, '6', arrQuery)

    return (option.optionFetch = _crOptionFetch(arrQuery, option));
  },

  checkResponse(){
    return true;
  }
});

export default fTableApi
