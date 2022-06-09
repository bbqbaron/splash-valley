import { Client } from "boardgame.io/react";
import { Local, SocketIO } from "boardgame.io/multiplayer";
import { TicTacToe } from "./Game";
import { TicTacToeBoard } from "./Board";

const MyClient = Client({
  game: TicTacToe,
  board: TicTacToeBoard,
  multiplayer: SocketIO({server: "localhost:8000"})
});

const App = () => (
  <div>
    <MyClient playerID="0"/>
    <MyClient playerID="1"/>
  </div>
)

export default App;
