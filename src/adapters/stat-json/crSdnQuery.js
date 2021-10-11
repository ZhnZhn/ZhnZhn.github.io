
const _crVariables = items => items
 .map(({ slice }) => {
    const code = Object.keys(slice)[0];
    return {
      code,
      values: [slice[code]]
    };
 });

const crSdnQuery = ({ dfId, items }) => ({
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
       ..._crVariables(items),
       { code: 'Tid', values: ["*"]}
     ]
  })
});

export default crSdnQuery
