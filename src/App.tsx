import { Client, Lobby } from "boardgame.io/react";
import { Local, SocketIO } from "boardgame.io/multiplayer";
import { TicTacToe } from "./Game";
import { TicTacToeBoard } from "./Board";

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
