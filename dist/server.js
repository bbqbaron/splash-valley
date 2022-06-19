"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = require("./Game");
const server_1 = require("boardgame.io/server");
const server = (0, server_1.Server)({
    games: [Game_1.TicTacToe],
    origins: [server_1.Origins.LOCALHOST,
        server_1.Origins.LOCALHOST_IN_DEVELOPMENT]
});
server.run(8001);
