const inquirer = require('inquirer'); 
const db = require('./db.js')

module.exports.add = async (taskName)=>{
  //读取list
  const list = await db.read()
  //写入taskName
  list.push({title:taskName,done:false})
  await db.write(list)

}

module.exports.clear = async ()=>{
  const list = []
  await db.write(list)
  return true
}

function markDone(list,index){
  list[index].done = true;
  db.write(list)
}

function markUndone(list,index){
  list[index].done = false;
  db.write(list)
}

function updateTitle(list,index){
  inquirer.prompt({
    type: 'input',
    name: 'newTitle',
    message: "请输入新的任务名："
  },).then(anss => {
    list[index].title = anss.newTitle
    db.write(list)
  });
}

function remove(list,index){
  list.splice(index,1)
  db.write(list)
}

function askForAction(list,index){
  const actions = {markDone,markUndone,updateTitle,remove}
  inquirer
      .prompt([
        {
          type: 'list',
          name: 'action',
          message: '请选择操作：',
          choices:  [
            {name:'退出',value:'quit'},
            {name:'已完成',value:'markDone'},
            {name:'未完成',value:'markUndone'},
            {name:'改标题',value:'updateTitle'},
            {name:'删除',value:'remove'},
          ]
        },
      ])
      .then((ans)=>{
          const action = actions[ans.action]
          action && action(list,index)
      })
}


function askForCreate(list){
  inquirer.prompt( {
    type: 'input',
    name: 'tasName',
    message: "请输入任务名："
  },).then(answ => {
    list.push({title:answ.tasName,done:false})
    db.write(list)
  });
}


function printTasks(list){
  inquirer
  .prompt([
    {
      type: 'list',
      name: 'index',
      message: '请选择你想要操作的任务：',
      choices:  [
        {name:'退出',value:'-1'},
        ...list.map((t,index)=>{return{name:`${t.done ? '[x]' : '[_]'} ${index+1}-${t.title}`,value:index}}),
        {name:'+ 创建任务',value:'-2'}
      ]
    },
  ])
  .then((answer) => {
    const index  = parseInt(answer.index)
    if(index >= 0){
      //askForAction
      askForAction(list,index)
    }else if(index === -2){
      // askForCreate
      askForCreate(list)
    }
  });
}


module.exports.show =  async ()=>{
  const list = await db.read()
  // printTasks
  printTasks(list)
}