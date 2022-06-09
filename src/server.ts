import { TicTacToe } from "./Game";
import { Origins, Server } from "boardgame.io/server";

const server = Server({
    games: [TicTacToe],
    origins: [Origins.LOCALHOST]
})

server.run(8000)