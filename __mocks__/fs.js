const fs = jest.genMockFromModule('fs')


fs.fuck = ()=>{
    console.log('fuck')
    return 'fuck'
}

module.exports = fs