import React from "react";
import { Lobby } from "boardgame.io/react";
import { TicTacToe } from "../lib/game";
import { TicTacToeBoard } from "./board";

const App = () => (
    <div>
        <Lobby
            gameServer={`http://${window.location.hostname}:8001`}
            lobbyServer={`http://${window.location.hostname}:8001`}
            gameComponents={
                [
                    {
                        game: TicTacToe,
                        board: TicTacToeBoard
                    }
                ]
            }
        />

    </div>
)

export default App;
