import { TicTacToe } from "./Game";
import { Origins, Server } from "boardgame.io/server";

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

server.run(portNum)