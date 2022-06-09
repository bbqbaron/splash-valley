import { Ctx } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";
import { append, prepend, repeat } from "ramda";

export enum PieceType {
    Pawn,
    King,
}

export enum Color {
    Green,
    White,
}
export type Cell = [number, number];
// TODO give piece an owner, not a color
export type Piece = [PieceType, Color];
type Entry = Piece | null;
type Row = [Entry, Entry, Entry, Entry, Entry];
type Board = [Row, Row, Row, Row, Row];
export interface MyGameState {
    cells: Board;
}

export const TicTacToe = {
    setup: (): MyGameState => ({
        cells: prepend(
            [
                [PieceType.Pawn, Color.Green],
                [PieceType.Pawn, Color.Green],
                [PieceType.King, Color.Green],
                [PieceType.Pawn, Color.Green],
                [PieceType.Pawn, Color.Green],
            ] as Row,
            append(
                [
                    [PieceType.Pawn, Color.White],
                    [PieceType.Pawn, Color.White],
                    [PieceType.King, Color.White],
                    [PieceType.Pawn, Color.White],
                    [PieceType.Pawn, Color.White],
                ] as Row,
                repeat(repeat(null, 5), 3) as [Row, Row, Row]
            )
        ) as Board,
    }),

    endIf: (G: MyGameState, _ctx: Ctx) => {
        const centerPiece = G.cells[2][2];

        if (centerPiece && centerPiece[0] === PieceType.King) {
            return {
                winner: (
                    centerPiece[1] === Color.Green ? "0" : "1"
                )
            }
        }
    },

    turn: {
        minMoves: 1,
        maxMoves: 1
    },

    moves: {
        sendPiece: (G: MyGameState, ctx: Ctx, [x, y]: Cell, [x2, y2]: Cell) => {
            const dx = x2 > x ? 1 : x2 == x ? 0 : -1;
            const dy = y2 > y ? 1 : y2 == y ? 0 : -1;
            const piece = G.cells[x][y]!;

            let tx = x;
            let ty = y;
            while (true) {
                let tx2 = tx + dx;
                let ty2 = ty + dy;
                // no off-boarding
                if (!(0 <= tx2 && tx2 <= 4 && 0 <= ty2 && ty2 <= 4)) {
                    break;
                }

                // no collisions
                if (G.cells[tx2][ty2]) {
                    break;
                }

                tx = tx2;
                ty = ty2;
            }
            // no pawns in center _as final stop_
            if (piece[0] == PieceType.Pawn && tx == 2 && ty == 2) {
                return INVALID_MOVE;
            }

            G.cells[x][y] = null;
            G.cells[tx][ty] = piece;
            // TODO does turn end if piece doesn't change position? can you pass?
            ctx.events?.endTurn();
        },
    },
};
