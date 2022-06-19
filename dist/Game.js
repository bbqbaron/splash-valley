"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicTacToe = exports.Color = exports.PieceType = void 0;
const core_1 = require("boardgame.io/core");
const ramda_1 = require("ramda");
var PieceType;
(function (PieceType) {
    PieceType[PieceType["Pawn"] = 0] = "Pawn";
    PieceType[PieceType["King"] = 1] = "King";
})(PieceType = exports.PieceType || (exports.PieceType = {}));
var Color;
(function (Color) {
    Color[Color["Black"] = 0] = "Black";
    Color[Color["White"] = 1] = "White";
})(Color = exports.Color || (exports.Color = {}));
exports.TicTacToe = {
    setup: () => ({
        cells: (0, ramda_1.prepend)([
            [PieceType.Pawn, Color.Black],
            [PieceType.Pawn, Color.Black],
            [PieceType.King, Color.Black],
            [PieceType.Pawn, Color.Black],
            [PieceType.Pawn, Color.Black],
        ], (0, ramda_1.append)([
            [PieceType.Pawn, Color.White],
            [PieceType.Pawn, Color.White],
            [PieceType.King, Color.White],
            [PieceType.Pawn, Color.White],
            [PieceType.Pawn, Color.White],
        ], (0, ramda_1.repeat)((0, ramda_1.repeat)(null, 5), 3))),
    }),
    endIf: (G, _ctx) => {
        const centerPiece = G.cells[2][2];
        if (centerPiece && centerPiece[0] === PieceType.King) {
            return {
                winner: (centerPiece[1] === Color.Black ? "0" : "1")
            };
        }
    },
    turn: {
        minMoves: 1,
        maxMoves: 1
    },
    name: "Kings_Valley",
    minPlayers: 2,
    maxPlayers: 2,
    moves: {
        sendPiece: (G, ctx, [x, y], [x2, y2]) => {
            var _a;
            const dx = x2 > x ? 1 : x2 == x ? 0 : -1;
            const dy = y2 > y ? 1 : y2 == y ? 0 : -1;
            const piece = G.cells[x][y];
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
                return core_1.INVALID_MOVE;
            }
            G.cells[x][y] = null;
            G.cells[tx][ty] = piece;
            // TODO does turn end if piece doesn't change position? can you pass?
            (_a = ctx.events) === null || _a === void 0 ? void 0 : _a.endTurn();
        },
    },
};
