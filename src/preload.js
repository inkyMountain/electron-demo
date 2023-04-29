const electron = require("electron")
const { contextBridge } = require("electron")

const ipcAPI = {
  readDir: () => {
    return new Promise((resolve) => {
      // 准备好接受主进程传来的文件列表
      electron.ipcRenderer.on("file-list", (event, files, str) => {
        // 返回给方法的调用者
        resolve(files)
      })
      // 触发读取文件事件
      electron.ipcRenderer.send(
        "read-file",
        // 改成你要读取的目录
        // "/Users/chenyitao/dev/demos/electron-demo",
        "C:\\xxx\\yyy\\zzz", // zzz 是一个文件夹
      )
    })
  },
}

// 往渲染进程的window对象上注入一些api，让渲染进程可以调用主进程的能力。
contextBridge.exposeInMainWorld("ipcAPI", ipcAPI)
