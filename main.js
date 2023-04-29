const { app, BrowserWindow, ipcMain } = require("electron")
const path = require("path")

// const path = require("path")
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "src/preload.js"),
    },
  })
  win.webContents.openDevTools()

  win.loadFile("src/index.html")
  return win
}

app.whenReady().then(() => {
  ipcMain.on("read-file", (event, filePath) => {
    console.log("main filePath", filePath)
    const files = require("fs").readdirSync(filePath)
    console.log("main files", files)
    win.webContents.send("file-list", files, "xjkljl")
  })

  const win = createWindow()
  // on/off
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})
