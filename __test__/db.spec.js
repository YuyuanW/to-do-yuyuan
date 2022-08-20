const db = require('../db.js')
const fs = require('fs')
jest.mock('fs')


describe('db',()=>{
    it('can dirty',()=>{
        expect(fs.fuck()).toBe('fuck')
    })
})