const pics = ["SavedScreen0.png", "SavedScreen1.png", "SavedScreen2.png", "SavedScreen3.png", "SavedScreen4.png", "SavedScreen5.png", "SavedScreen6.png", "SavedScreen7.png", "SavedScreen8.png", "SavedScreen9.png"]
const fs = require('fs')
const http = require('http')
const express = require('express')
const app = express()
const { phasmophobiaDirectory, webPort } = require('./config.json')

const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})

const lastModifiedTimestamps = {}

function sendUpdatedPictureData(fileName, socket) {
  const filePath = `${phasmophobiaDirectory}/${fileName}`

  fs.stat(filePath, (err, stats) => {
    if (err) {
      console.error(`Error reading ${fileName}:`, err)
      return
    }

    const currentTimestamp = stats.mtime.getTime()
    const lastTimestamp = lastModifiedTimestamps[fileName] || 0

    if (currentTimestamp > lastTimestamp) {
      // If the image has been updated, read and send it
      fs.readFile(filePath, (readErr, data) => {
        if (readErr) {
          console.error(`Error reading ${fileName}:`, readErr)
          return
        }

        socket.emit('updatedPicture', { fileName, data: data.toString('base64') })
        lastModifiedTimestamps[fileName] = currentTimestamp
        console.log(`${fileName} data has been updated and sent via Socket.IO.`)
      })
    }
  })
}

function checkForUpdatedPictures() {
    pics.forEach((fileName) => {
    sendUpdatedPictureData(fileName, io)
  })
}

io.on('connection', (socket) => {
    console.log('a user connected')
    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})

setInterval(checkForUpdatedPictures, 250)

server.listen(webPort, () => {
  console.log(`Server listening on port ${webPort}`)
})