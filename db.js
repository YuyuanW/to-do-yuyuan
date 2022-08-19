const homedir=  require('os').homedir() // System Home Diro Home Dir
const Home = process.env.home || homedir // System configuration Home Environment Variable Home Variable
const dbPath = require('path').join(Home,'.todo')
const fs = require('fs')

const db = {
    read(path=dbPath){
        return new Promise((resolve,reject)=>{
            fs.readFile(path,{encoding:'utf-8',flag:'a+'},(error,data)=>{
                if(error){
                  reject(error)
                }
                let list = []
                try {
                    list = JSON.parse(data.toString())
                } catch(error2){
                    list = []
                }
                resolve(list)   
            } ) 
        })   
    },
    write(list,path=dbPath){
        return new Promise((resolve,reject)=>{
            const string = JSON.stringify(list)
            fs.writeFile(path,string,{encoding:'utf-8',flag:'w+'},(err) => {
                if (err) reject(err);
                resolve()
            })
        })
    }
}

module.exports = db