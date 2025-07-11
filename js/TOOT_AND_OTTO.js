import Player from "./Player.js";
import CellState from "./CellState.js";
import Winner from "./Winner.js";

export default class TootAndOtto {
     constructor() {
        // Regras do PDF: 4 linhas e 6 colunas
        this.ROWS = 4;
        this.COLS = 6;
        
        // O jogador "TOOT" (PLAYER1) começa primeiro
        this.turn = Player.PLAYER1;

        // Peças de cada jogador
        this.pieces = {
            [Player.PLAYER1]: { 'T': 6, 'O': 6 },
            [Player.PLAYER2]: { 'T': 6, 'O': 6 }
        };

        this.board = Array(this.ROWS).fill(0).map(() => Array(this.COLS).fill(CellState.EMPTY));
        this.winner = Winner.NONE;
    }
    getTurn() {
        return this.turn;
    }
    getGameState() {
        return {
            board: this.board,
            turn: this.turn,
            winner: this.winner,
            pieces: this.pieces
        };
    }
     play(col, pieceType) {
        if (this.winner !== Winner.NONE) {
            throw new Error("O jogo já acabou!");
        }

        if (this.pieces[this.turn][pieceType] <= 0) {
            throw new Error(`Você não tem mais peças '${pieceType}'.`);
        }
        
        // Encontra a linha mais baixa disponível na coluna
        let row = -1;
        for (let i = this.ROWS - 1; i >= 0; i--) {
            if (this.board[i][col] === CellState.EMPTY) {
                row = i;
                break;
            }
        }

        // Verifica se a coluna está cheia
        if (row === -1) {
            throw new Error("A coluna está cheia.");
        }

        // Posiciona a peça e atualiza a contagem
        this.board[row][col] = pieceType;
        this.pieces[this.turn][pieceType]--;
        
        // Verifica se há um vencedor
        this.winner = this.checkWinner();
        
        // Troca o turno se o jogo continuar
        if (this.winner === Winner.NONE) {
            this.turn = this.turn === Player.PLAYER1 ? Player.PLAYER2 : Player.PLAYER1;
        }

        return this.winner;
    }

    checkWinner() {
        let p1Win = false; // Vitória de TOOT
        let p2Win = false; // Vitória de OTTO
        const sequences = ["TOOT", "OTTO"];

        for (const seq of sequences) {
            const isToot = seq === "TOOT";
            for (let r = 0; r < this.ROWS; r++) {
                for (let c = 0; c <= this.COLS - 4; c++) {
                    if (this.board[r].slice(c, c + 4).join('') === seq) {
                        if (seq === "TOOT") p1Win = true;
                        else p2Win = true;
                    }
                }
            }

            // Verificação Vertical
            for (let c = 0; c < this.COLS; c++) {
                for (let r = 0; r <= this.ROWS - 4; r++) {
                    if (`${this.board[r][c]}${this.board[r+1][c]}${this.board[r+2][c]}${this.board[r+3][c]}` === seq) {
                        if (seq === "TOOT") p1Win = true;
                        else p2Win = true;
                    }
                }
            }

            // Verificação Diagonal (baixo)
            for (let r = 0; r <= this.ROWS - 4; r++) {
                for (let c = 0; c <= this.COLS - 4; c++) {
                    if (`${this.board[r][c]}${this.board[r+1][c+1]}${this.board[r+2][c+2]}${this.board[r+3][c+3]}` === seq) {
                        if (seq === "TOOT") p1Win = true;
                        else p2Win = true;
                    }
                }
            }

            // Verificação Diagonal (cima)
            for (let r = 3; r < this.ROWS; r++) {
                for (let c = 0; c <= this.COLS - 4; c++) {
                    if (`${this.board[r][c]}${this.board[r-1][c+1]}${this.board[r-2][c+2]}${this.board[r-3][c+3]}` === seq) {
                        if (seq === "TOOT") p1Win = true;
                        else p2Win = true;
                    }
                }
            }
        }

   // Se ambos os jogadores vencerem na mesma jogada, é empate
        if (p1Win && p2Win) return Winner.DRAW;
        if (p1Win) return Winner.PLAYER1;
        if (p2Win) return Winner.PLAYER2;

        // Verifica o empate se todas as peças tiverem sido jogadas
        const totalPiecesLeft = Object.values(this.pieces.PLAYER1).reduce((a, b) => a + b) + 
                                Object.values(this.pieces.PLAYER2).reduce((a, b) => a + b);
        if (totalPiecesLeft === 0) {
            return Winner.DRAW;
        }
        return Winner.NONE;
    }
}