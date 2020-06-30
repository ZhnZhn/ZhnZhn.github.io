
describe('mockDateBeforeAll', ()=>{
  test('', () => expect('').toBe(''))
})

 const mockDateBeforeAll = (y, m, d, hours, minutes, seconds) => {
   const FIXED_DATE = new Date(y,m,d, hours, minutes, seconds);
   /*eslint-disable no-undef*/
   const NATIVE_DATE_IMP = Date.bind(global.Date)
   beforeAll(() => {
     const _Date = Date
     //2020-01-01 12:00:01
     global.Date = jest.fn(() => FIXED_DATE)
     global.Date.UTC = jest.fn(_Date.UTC)
   })
   it('show mocked date', ()=>{
     console.log('Mocked Date', new Date().toISOString())
     console.log(Date.UTC(2020, 0, 1), 1577836800000, '2020-01-01 UTC-0')
   })
   afterAll(()=>{
     global.Date = NATIVE_DATE_IMP
     global.Date.UTC = NATIVE_DATE_IMP.UTC
     console.log('Current Date', new Date().toISOString())
   })
 }

 export default mockDateBeforeAll
