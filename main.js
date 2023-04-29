const { app, BrowserWindow, ipcMain } = require("electron")
const path = require("path")

// const path = require("path")
function createWindow() {
  const win = new BrowserWindow({
    // 窗口的宽高
    width: 800,
    height: 600,
    webPreferences: {
      // 预加载js代码，用于注册ipc事件，与主进程通信。
      preload: path.join(__dirname, "src/preload.js"),
    },
  })
  win.webContents.openDevTools()

  // 以文件协议加载html文件，也就是 file://xxx/yyy/index.html
  win.loadFile("src/index.html")
  return win
}

// 当app初始化完成的时候
app.whenReady().then(() => {
  // 注册ipc事件
  ipcMain.on("read-file", (event, filePath) => {
    console.log("main filePath", filePath)
    const files = require("fs").readdirSync(filePath)
    console.log("main files", files)
    // 发送文件夹读取结果
    win.webContents.send(
      /*事件的名字*/ "file-list",
      /*参数1*/ files,
      /*参数2*/ "xjkljl",
    )
  })

  // 创建窗口
  const win = createWindow()
  // on/off
  // app.on("activate", () => {
  //   if (BrowserWindow.getAllWindows().length === 0) {
  //     createWindow()
  //   }
  // })
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})
