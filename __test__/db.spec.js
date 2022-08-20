const db = require('../db.js')
const fs = require('fs')
const { NULL } = require('sass')
jest.mock('fs')


describe('db',()=>{
    afterEach(()=>{
        fs.clearMocks()
    })
    it('can read', async()=>{
        const data = [{title:'hi',done:true}]
        fs.setReadMocks('/xxx',null,JSON.stringify(data))
        const list = await db.read('/xxx')
        expect(list).toStrictEqual(data)
    })
    it('can write',async ()=>{
        let file
        fs.setWriteMocks('/yyy',(path,data,options,callback)=>{
            file = data
            callback(null)
        })
        const list = [{title:'买可乐',done:true},{title:'买橙汁',done:true}]
        await db.write(list,'/yyy')
        expect(file).toBe(JSON.stringify(list))

    })
})