const electron = require("electron")
const { contextBridge } = require("electron")

const ipcAPI = {
  readDir: () => {
    return new Promise((resolve) => {
      electron.ipcRenderer.on("file-list", (event, files, str) => {
        resolve(files)
      })
      electron.ipcRenderer.send(
        "read-file",
        // 改成你要读取的目录
        // "/Users/chenyitao/dev/demos/electron-demo",
        "C:\\xxx\\yyy\\zzz", // zzz 是一个文件夹
      )
    })
  },
}

contextBridge.exposeInMainWorld("ipcAPI", ipcAPI)
