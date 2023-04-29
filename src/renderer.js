const button = document.querySelector("#button")
button?.addEventListener("click", () => {
  button.innerHTML = "点击完成"
})

setTimeout(() => {
  window.ipcAPI.readDir().then((files) => {
    document.write(files.toString())
  })
}, 2000)
