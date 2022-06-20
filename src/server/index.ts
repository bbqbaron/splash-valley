import { TicTacToe } from "../lib/game";
import { Origins, Server } from "boardgame.io/server";
import { createReadStream } from 'fs';

const server = Server({
    games: [TicTacToe],
    origins: [Origins.LOCALHOST,
    Origins.LOCALHOST_IN_DEVELOPMENT]
})

let port = process.env.PORT;
let portNum = 3000;
if (port) {
    portNum = parseInt(port);
}

server.router.get("/", (ctx) => {
    ctx.type = 'html'
    ctx.body = createReadStream('public/index.html');
})

server.router.get("/public/index.js", (ctx) => {
    ctx.type = 'text/javascript'
    ctx.body = createReadStream('public/index.js');
})

server.run(portNum)