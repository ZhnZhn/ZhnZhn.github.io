
/*
{
 code: 'Tid',
 selection: {
   filter: 'all',
   values: ['*']
 }
}
*/

const crQueryItem = (code, filter, value) => ({
  code,
  selection: {
    filter,
    values: [value]
  }
})

export default crQueryItem
