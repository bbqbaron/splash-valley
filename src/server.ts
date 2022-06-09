import { TicTacToe } from "./Game";
import { Origins, Server } from "boardgame.io/server";

const server = Server({
    games: [TicTacToe],
    origins: [Origins.LOCALHOST,
    Origins.LOCALHOST_IN_DEVELOPMENT]
})

server.run(8001)