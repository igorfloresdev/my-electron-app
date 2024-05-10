// main.js file is the entry point defined in package.json for electron, this is the main process

// Importing two modules, app is responsible to control application's event lifecycle and BrowserWindow to
// create and manages app windows
const { app, BrowserWindow, ipcMain } = require("electron"); // camelCase = Non instantiable Module, CamelCase = Instantiable Code
const path = require("node:path"); // Node PATH API import module

// createWindow function loads index.html into a new BrowserWindow instance
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // This line Attach script to renderer process in the BrowserWindow constructor
    },
  });
  win.loadFile("index.html");
};

// Calling createWindow to open the window, this can only be created after the app module's ready event is fired
// this event can be waited by using app.whenReady() API. Call createWindow() after whenReady() resolve it's Promise.
app.whenReady().then(() => {
  //Set up your handle listener in the main process. We do this before loading the HTML file so that the handler
  // is guaranteed to be ready before you send out the invoke call from the renderer
  ipcMain.handle("ping", () => "pong");

  //app.WhenReady is a helper for app.on('ready)
  createWindow();
});

// Quit when all windows are closed. (window and linux)
app.on("window-all-closed", () => {
  if (process.plataform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
