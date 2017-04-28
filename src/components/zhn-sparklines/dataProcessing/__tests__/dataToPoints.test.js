import dataToPoints from '../dataToPoints'

//fork https://github.com/borisyankov/react-sparklines/blob/master/__tests__/dataToPoints.js

describe('dataToPoints', ()=>{

  test('should return an array', () => {
        expect(Array.isArray(dataToPoints({ data: [] }))).toBe(true)
        expect(Array.isArray(dataToPoints({ data: [1, 2, 3] }))).toBe(true)
        expect(Array.isArray(dataToPoints({ data: [1, null, undefined] }))).toBe(true)
  });

  test('should return only `limit` items', () => {
        expect(dataToPoints({ data: [1,2,3,4,5] }).length).toBe(5);
        expect(dataToPoints({ data: [1,2,3,4,5], limit: 2 }).length).toBe(2);
        expect(dataToPoints({ data: [1,2,3,4,5], limit: 5 }).length).toBe(5);
        expect(dataToPoints({ data: [1,2,3,4,5], limit: 10 }).length).toBe(5);
    });

  test('should return proper values for 1 value', () => {
       expect(dataToPoints({ data: [1] })).toEqual([
         { x: 0, y: 0.5 }
        ])
   });

   test('should return proper values 2+ values', () => {
        expect(dataToPoints({ data: [1,1] })).toEqual([
            {x: 0, y: 0.5},
            {x: 1, y: 0.5}
        ])

        expect(dataToPoints({ data: [0,1] })).toEqual([
            {x: 0, y: 1},
            {x: 1, y: 0}
        ])

        expect(dataToPoints({ data: [1,0] })).toEqual([
            {x: 0, y: 0},
            {x: 1, y: 1}
        ])

        expect(dataToPoints({ data: [0,1,2] })).toEqual([
            {x: 0, y: 1},
            {x: 0.5, y: 0.5},
            {x: 1, y: 0}
        ])
    });

    test('should inerpolate values properly', () => {
        expect(dataToPoints({data: [0,1,2], width: 10, height: 10 })).toEqual([
            {x: 0, y: 10},
            {x: 5, y: 5},
            {x: 10, y: 0}
        ])
    });

    test('should take min and max into account', () => {
       expect(dataToPoints({ data: [1,2,3,4], width: 6, height: 10, max: 2, min: 3 })).toEqual([
           {x: 0, y: -10},
           {x: 2, y: 0},
           {x: 4, y: 10},
           {x: 6, y: 20}
       ])
   });

   test('should return y == height for 0 and null values', () => {
        expect(dataToPoints({ data: [0] })).toEqual([
            {x: 0, y: 0.5}
        ])
        expect(dataToPoints({ data: [0, null, 0] })).toEqual([
            {x: 0, y: 0.5},
            {x: 0.5, y: 0.5},
            {x: 1, y: 0.5}
        ])
    });
})
