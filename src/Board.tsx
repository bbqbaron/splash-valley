import { BoardProps } from 'boardgame.io/dist/types/packages/react';
import { Ctx } from 'boardgame.io';
import React, { useState } from 'react';
import { Piece, MyGameState, PieceType, Cell, Color } from './Game';
import { assoc, equals, map, range } from 'ramda';

interface MyGameProps extends BoardProps<MyGameState> {
    moves: {
        sendPiece(f: Cell, t: Cell): void
    }
}

export function TicTacToeBoard(props: MyGameProps) {
    console.log("uh", props)
    let { G, moves, ctx } = props;
    const [selectedCell, pickCell] = useState<[number, number] | null>(null);

    const cellStyle = {
        border: '1px solid #555',
        width: '50px',
        height: '50px',
        lineHeight: '50px',
        backgroundColor: 'gray',
        textAlign: 'center' as const,
    };

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
                            ((ctx.currentPlayer == "0" && self[1] == Color.Green)
                                || (ctx.currentPlayer == "1" && self[1] == Color.White));

                        // sorry for this mess; i miss clojure
                        // and haven't accepted that clean TS is just really annoying to write.
                        // why can't `if` be an expression FFS?
                        return <td key={x}><div style={
                            alreadySelected ?
                                assoc("backgroundColor", "black", cellStyle)
                                :
                                (self ? assoc("backgroundColor",
                                    ({
                                        [Color.White]: "white",
                                        [Color.Green]: "green",
                                    })[self[1]]
                                    , cellStyle) : cellStyle)}
                            onClick={
                                _ => {
                                    if (hasMyPiece)
                                        pickCell([x, y]);
                                    if (selectedCell && selectedPiece && !alreadySelected) {
                                        pickCell(null)
                                        moves.sendPiece(
                                            selectedCell, [x, y]
                                        )
                                    }
                                }
                            }>
                            {
                                self
                                    ?
                                    ({
                                        [PieceType.Pawn]: "P",
                                        [PieceType.King]: "K",
                                    })[self[0]]
                                    + ({
                                        [Color.White]: "W",
                                        [Color.Green]: "G",
                                    })[self[1]]
                                    : ""}
                        </div></td>;
                    },
                    range(0, 5)
                )}
            </tr>,
        range(0, 5)
    );

    return <div>
        <table id="board">
            <tbody>{rows}</tbody>
        </table>
    </div>;
}