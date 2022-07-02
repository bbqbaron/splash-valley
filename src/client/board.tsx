import { BoardProps } from 'boardgame.io/dist/types/packages/react';
import React, { useState } from 'react';
import { MyGameState, PieceType, Cell, Color } from '../lib/game';
import { equals, map, range } from 'ramda';

interface MyGameProps extends BoardProps<MyGameState> {
    moves: {
        sendPiece(f: Cell, t: Cell): void
    }
}

const playerName = (id: "0" | "1") => ({
    ["0"]: "Black", ["1"]: "White"
})[id];

export function TicTacToeBoard(props: MyGameProps) {
    let { G, moves, ctx, playerID } = props;
    const [selectedCell, pickCell] = useState<[number, number] | null>(null);

    const cellStyle: React.CSSProperties = {
        width: '50px',
        height: '50px',
        lineHeight: '50px',
        textAlign: 'center' as const,
    };

    const pieceStyle: React.CSSProperties = {
        borderRadius: "50%",
    }

    const rows = map(
        y =>
            <tr key={y}>
                {map(
                    x => {
                        const self = G.cells[x][y];
                        const alreadySelected = equals(selectedCell, [x, y]);
                        const selectedPiece = selectedCell ? G.cells[selectedCell[0]][selectedCell[1]] : null;
                        const hasMyPiece =
                            self &&
                            ((ctx.currentPlayer == "0" && self[1] == Color.Black)
                                || (ctx.currentPlayer == "1" && self[1] == Color.White));

                        // sorry for this mess; i miss clojure
                        // and haven't accepted that clean TS is just really annoying to write.
                        // why can't `if` be an expression FFS?
                        return <td key={x}><div style={
                            {
                                ...cellStyle,
                                backgroundColor: "#0b0",
                                "border": alreadySelected ? "3px solid black" : "3px solid #0b0"
                            }
                        }
                            onClick={
                                _ => {
                                    if (hasMyPiece)
                                        pickCell([x, y]);
                                    if (selectedCell && selectedPiece && !alreadySelected) {
                                        pickCell(null)
                                        const dx = Math.abs(selectedCell[0] - x);
                                        const dy = Math.abs(selectedCell[1] - y);
                                        const ratioOk = dx == 0 || dy == 0 || dx == dy;
                                        if (ratioOk) {
                                            moves.sendPiece(
                                                selectedCell, [x, y]
                                            )
                                        }
                                    }
                                }
                            }>
                            {
                                self ?
                                    (<div style={{
                                        ...pieceStyle,
                                        backgroundColor: ({ [Color.Black]: "black", [Color.White]: "white" })[self[1]]
                                    }}>
                                        <strong
                                            style={{
                                                color: ({ [Color.Black]: "white", [Color.White]: "black" })[self[1]]
                                            }}>{
                                                ({
                                                    [PieceType.Pawn]: "P",
                                                    [PieceType.King]: "K",
                                                })[self[0]]
                                            }</strong>
                                    </div>) : null
                            }
                        </div></td>;
                    },
                    range(0, 5)
                )}
            </tr>,
        range(0, 5)
    );

    let winner;
    if (ctx.gameover) {
        switch (ctx.gameover.winner) {
            case "0":
                winner = "Black";
                break;
            case "1":
                winner = "White";
                break;
        }
    }

    return <div>
        {winner ?
            (`WINNER: ${winner}`)
            :
            <>
                <p>It's {ctx.currentPlayer == "0" ? "Black" : "White"}'s turn
                    (you're {playerName(playerID as "0" | "1")})</p>
            </>}
        <table id="board">
            <tbody>{rows}</tbody>
        </table>
    </div>;
}