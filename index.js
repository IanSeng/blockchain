const http = require("http");
const WebSocketServer = require("websocket").server
let connection = null

const httpserver = http.createServer((req, res) => {
    console.log("we have received a request!");
})

const websocket = new WebSocketServer({
    "httpServer": httpserver
   
})

websocket.on("request", request => {
    connection = request.accept(null, request.origin)
    connection.on("onopen", () => console.log("open!!!"))
    connection.on("onclose", () => console.log("closed!!!"))
    connection.on("onmessage", messae => {
        console.log(`Received message ${messae}`)
    })
})
httpserver.listen(8080, () => console.log("My server is listening to port 8080"))