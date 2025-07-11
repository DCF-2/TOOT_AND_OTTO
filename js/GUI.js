import TootAndOtto from "./TOOT_AND_OTTO.js";
import CellState from './CellState.js';

class GUI {
    constructor() {
        this.game = null;
    }
    play(ev) {
        const col = ev.target.closest('td').cellIndex;
        const pieceType = document.querySelector('input[name="piece"]:checked').value;

        try {
            this.game.play(col, pieceType);
            this.updateBoard(); 
            this.updateGameInfo();
        } catch (ex) {
            this.setMessage(ex.message);
        }
    }
    updateGameInfo() {
        const state = this.game.getGameState();
        const p1_pieces = state.pieces.PLAYER1;
        const p2_pieces = state.pieces.PLAYER2;
        document.getElementById("p1-pieces").textContent = `T: ${p1_pieces.T}, O: ${p1_pieces.O}`;
        document.getElementById("p2-pieces").textContent = `T: ${p2_pieces.T}, O: ${p2_pieces.O}`;
        const winner = state.winner;
        if (winner !== 'NONE') {
            let winMsg = "Empate!";
            if(winner === 'PLAYER1') winMsg = "TOOT Ganhou!";
            if(winner === 'PLAYER2') winMsg = "OTTO Ganhou!";
            this.setMessage(`Fim de jogo! ${winMsg}`);
            // Desativa cliques no tabuleiro após o fim do jogo.
            document.querySelector("tbody").style.pointerEvents = 'none';
            this.incrementScore(winner); // Aumenta a pontuação
            this.updateScoreboard();   // Atualiza o placar na tela

        } else {
            const turnMsg = state.turn === 'PLAYER1' ? "Vez de TOOT (Jogador 1)" : "Vez de OTTO (Jogador 2)";
            this.setMessage(turnMsg);
        }
    }
    setMessage(message) {
        document.getElementById("message").textContent = message;
    }
    updateBoard() {
        const board = this.game.getGameState().board;
        const tbody = document.querySelector("tbody");
        tbody.innerHTML = ""; 

        board.forEach(row => {
            const tr = tbody.insertRow();
            row.forEach(cellValue => {
                const td = tr.insertCell();
                if (cellValue !== CellState.EMPTY) {
                    td.textContent = cellValue; 
                    td.className = `piece-${cellValue}`; 
                }
                td.onclick = this.play.bind(this); 
            });
        });
    }
    init() {
        this.game = new TootAndOtto();
        document.querySelector("tbody").style.pointerEvents = 'auto'; 
        this.updateBoard();
        this.updateGameInfo();
    }
    
    start() {
        document.getElementById("start").onclick = this.init.bind(this);
        this.init();
        this.updateScoreboard();
    }
    updateScoreboard() {
        // Pega os scores salvos ou cria um objeto novo se não existir
        let scores = JSON.parse(localStorage.getItem('tootAndOttoScores')) || { PLAYER1: 0, PLAYER2: 0 };
        
        document.getElementById('p1-score').textContent = scores.PLAYER1;
        document.getElementById('p2-score').textContent = scores.PLAYER2;
    }
    incrementScore(winner) {
        if (winner === 'DRAW' || winner === 'NONE') {
            return; // Não faz nada em caso de empate
        }

        let scores = JSON.parse(localStorage.getItem('tootAndOttoScores')) || { PLAYER1: 0, PLAYER2: 0 };
        scores[winner]++;
        localStorage.setItem('tootAndOttoScores', JSON.stringify(scores));
    }
}

let gui = new GUI();
gui.start();