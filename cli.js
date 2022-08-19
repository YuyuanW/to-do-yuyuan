#!/usr/bin/env node

const { action } = require('commander');
const  program  = require('commander');
const api = require('./index')
const pkg = require('./package.json')

program
  .option('-y, --yuyuan', 'yuyuan is rich')

program
  .version(pkg.version)

program
  .command('add')
  .description('add your daily tasks')
  .action((...args) => {
    const tasks = args.slice(0,-1)
    // console.log(tasks);
    api.add(tasks).then(()=>{console.log('添加成功')},()=>{console.log('添加失败')})
  }); 
program
  .command('clear')
  .description('clear your all tasks')
  .action(() => {
    api.clear().then(()=>{console.log('清除成功')},()=>{console.log('清除失败')})
    
  });  
if(process.argv.length===2){
  api.show()
}
program.parse(process.argv);

