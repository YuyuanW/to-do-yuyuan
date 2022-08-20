const fs = jest.genMockFromModule('fs')
const _fs = jest.requireActual('fs')

let readMocks = {}
let writeMocks = {}
fs.setReadMocks = (path,error,data)=>{
    readMocks[path] = [error,data]
}
fs.setWriteMocks = (path,fn)=>{
    writeMocks[path] = fn
}

fs.readFile = (path,options,callback)=>{
    if(callback===undefined){
        callback = options
    }
    if(path in readMocks){
        callback(...readMocks[path])
    }else{
        _fs.readFile(path,options,callback)
    }
}

fs.writeFile = (path,data,options,callback)=>{
    if(path in writeMocks){
        writeMocks[path](path,data,options,callback)
    }else{
        _fs.writeFile(path,data,options,callback)
    }
}

fs.clearMocks = ()=>{
    readMocks = {}
    writeMocks = {}
}

module.exports = fs