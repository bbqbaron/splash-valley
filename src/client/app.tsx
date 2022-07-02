import React from "react";
import { Lobby } from "boardgame.io/react";
import { TicTacToe } from "../lib/game";
import { TicTacToeBoard } from "./board";

const App = () => (
    <div>
        <Lobby
            gameServer={`https://${window.location.hostname}`}
            lobbyServer={`https://${window.location.hostname}`}
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
