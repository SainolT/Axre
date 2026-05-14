// 井字棋游戏逻辑
class TicTacToeGame {
    constructor() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = false;
        this.gameMode = 'pvp'; // pvp 或 pve
        this.aiDifficulty = 'medium';
        this.scores = { X: 0, O: 0, ties: 0 };
        this.history = [];
        this.soundEnabled = true;
        this.animationsEnabled = true;
        
        this.winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // 横线
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // 竖线
            [0, 4, 8], [2, 4, 6]              // 斜线
        ];
        
        this.initElements();
        this.initEventListeners();
        this.loadFromStorage();
        this.updateDisplay();
    }
    
    initElements() {
        this.gameBoard = document.getElementById('gameBoard');
        this.gameStatus = document.getElementById('gameStatus');
        this.currentTurn = document.getElementById('currentTurn');
        this.playerXScore = document.getElementById('playerXScore');
        this.playerOScore = document.getElementById('playerOScore');
        this.historyList = document.getElementById('historyList');
        
        this.newGameBtn = document.getElementById('newGameBtn');
        this.resetScoreBtn = document.getElementById('resetScoreBtn');
        this.gameModeSelect = document.getElementById('gameMode');
        this.aiDifficultySelect = document.getElementById('aiDifficulty');
        this.soundToggle = document.getElementById('soundToggle');
        this.animationsToggle = document.getElementById('animationsToggle');
    }
    
    initEventListeners() {
        // 新游戏按钮
        this.newGameBtn.addEventListener('click', () => this.startNewGame());
        
        // 重置分数按钮
        this.resetScoreBtn.addEventListener('click', () => this.resetScores());
        
        // 游戏模式切换
        this.gameModeSelect.addEventListener('change', (e) => {
            this.gameMode = e.target.value;
            if (this.gameActive) this.startNewGame();
            this.saveToStorage();
        });
        
        // AI难度切换
        this.aiDifficultySelect.addEventListener('change', (e) => {
            this.aiDifficulty = e.target.value;
            this.saveToStorage();
        });
        
        // 音效切换
        this.soundToggle.addEventListener('change', (e) => {
            this.soundEnabled = e.target.checked;
            this.saveToStorage();
        });
        
        // 动画切换
        this.animationsToggle.addEventListener('change', (e) => {
            this.animationsEnabled = e.target.checked;
            this.saveToStorage();
        });
        
        // 游戏单元格点击事件
        this.gameBoard.addEventListener('click', (e) => {
            const cell = e.target.closest('.cell');
            if (!cell || !this.gameActive) return;
            
            const index = parseInt(cell.dataset.index);
            if (this.board[index] === '') {
                this.makeMove(index);
            }
        });
        
        // 键盘快捷键支持
        document.addEventListener('keydown', (e) => {
            if (e.key === 'n' || e.key === 'N') this.startNewGame();
            if (e.key === 'r' || e.key === 'R') this.resetScores();
            if (e.key === 'Escape') this.gameActive = false;
        });
    }
    
    startNewGame() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        
        this.updateBoard();
        this.updateStatus('玩家 X 的回合');
        this.updateTurnIndicator();
        
        if (this.animationsEnabled) {
            this.animateNewGame();
        }
        
        if (this.soundEnabled) {
            this.playSound('start');
        }
    }
    
    makeMove(index) {
        if (!this.gameActive || this.board[index] !== '') return;
        
        // 玩家移动
        this.board[index] = this.currentPlayer;
        
        if (this.animationsEnabled) {
            this.animateMove(index);
        }
        
        if (this.soundEnabled) {
            this.playSound('move');
        }
        
        this.updateBoard();
        
        // 检查游戏是否结束
        if (this.checkWin()) {
            this.handleWin();
            return;
        }
        
        if (this.checkDraw()) {
            this.handleDraw();
            return;
        }
        
        // 切换玩家
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.updateTurnIndicator();
        this.updateStatus(`玩家 ${this.currentPlayer} 的回合`);
        
        // 如果是AI模式且轮到AI
        if (this.gameMode === 'pve' && this.currentPlayer === 'O' && this.gameActive) {
            setTimeout(() => this.makeAiMove(), 600);
        }
    }
    
    makeAiMove() {
        if (!this.gameActive) return;
        
        let moveIndex;
        
        switch (this.aiDifficulty) {
            case 'easy':
                moveIndex = this.getRandomMove();
                break;
            case 'medium':
                moveIndex = this.getMediumAiMove();
                break;
            case 'hard':
                moveIndex = this.getHardAiMove();
                break;
            default:
                moveIndex = this.getRandomMove();
        }
        
        if (moveIndex !== -1) {
            setTimeout(() => this.makeMove(moveIndex), 300);
        }
    }
    
    getRandomMove() {
        const emptyCells = this.board
            .map((cell, index) => cell === '' ? index : -1)
            .filter(index => index !== -1);
        
        if (emptyCells.length === 0) return -1;
        
        return emptyCells[Math.floor(Math.random() * emptyCells.length)];
    }
    
    getMediumAiMove() {
        // 尝试获胜
        for (let i = 0; i < this.board.length; i++) {
            if (this.board[i] === '') {
                this.board[i] = 'O';
                if (this.checkWin()) {
                    this.board[i] = '';
                    return i;
                }
                this.board[i] = '';
            }
        }
        
        // 阻止对手获胜
        for (let i = 0; i < this.board.length; i++) {
            if (this.board[i] === '') {
                this.board[i] = 'X';
                if (this.checkWin()) {
                    this.board[i] = '';
                    return i;
                }
                this.board[i] = '';
            }
        }
        
        // 优先占据中心
        if (this.board[4] === '') return 4;
        
        // 随机移动
        return this.getRandomMove();
    }
    
    getHardAiMove() {
        // 使用Minimax算法
        const bestMove = this.minimax(this.board, 'O');
        return bestMove.index;
    }
    
    minimax(board, player) {
        const emptyCells = board
            .map((cell, index) => cell === '' ? index : -1)
            .filter(index => index !== -1);
        
        // 检查终端状态
        const tempGame = new TicTacToeGame();
        tempGame.board = [...board];
        
        if (tempGame.checkWin('X')) return { score: -10 };
        if (tempGame.checkWin('O')) return { score: 10 };
        if (emptyCells.length === 0) return { score: 0 };
        
        const moves = [];
        
        for (let i = 0; i < emptyCells.length; i++) {
            const index = emptyCells[i];
            const move = { index };
            
            board[index] = player;
            
            if (player === 'O') {
                const result = this.minimax(board, 'X');
                move.score = result.score;
            } else {
                const result = this.minimax(board, 'O');
                move.score = result.score;
            }
            
            board[index] = '';
            moves.push(move);
        }
        
        let bestMove;
        if (player === 'O') {
            let bestScore = -Infinity;
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score > bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score < bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }
        
        return moves[bestMove];
    }
    
    checkWin(player = null) {
        const targetPlayer = player || this.currentPlayer;
        
        for (let combination of this.winningCombinations) {
            const [a, b, c] = combination;
            if (this.board[a] === targetPlayer && 
                this.board[b] === targetPlayer && 
                this.board[c] === targetPlayer) {
                
                // 标记获胜的单元格
                if (this.animationsEnabled) {
                    combination.forEach(index => {
                        const cell = this.gameBoard.children[index];
                        cell.classList.add('winning-cell');
                    });
                }
                
                return combination;
            }
        }
        
        return false;
    }
    
    checkDraw() {
        return this.board.every(cell => cell !== '') && !this.checkWin('X') && !this.checkWin('O');
    }
    
    handleWin() {
        const winner = this.currentPlayer;
        this.scores[winner]++;
        
        this.gameActive = false;
        
        const winnerText = this.gameMode === 'pve' && winner === 'O' ? 'AI获胜!' : `玩家 ${winner} 获胜!`;
        this.updateStatus(winnerText);
        this.updateScores();
        
        this.addToHistory({
            winner: winner,
            moves: this.board.filter(cell => cell !== '').length,
            time: new Date().toLocaleTimeString()
        });
        
        if (this.soundEnabled) {
            this.playSound('win');
        }
    }
    
    handleDraw() {
        this.scores.ties++;
        
        this.gameActive = false;
        this.updateStatus('平局!');
        this.updateScores();
        
        this.addToHistory({
            winner: 'tie',
            moves: 9,
            time: new Date().toLocaleTimeString()
        });
        
        if (this.soundEnabled) {
            this.playSound('draw');
        }
    }
    
    resetScores() {
        if (confirm('确定要重置所有分数和历史记录吗？')) {
            this.scores = { X: 0, O: 0, ties: 0 };
            this.history = [];
            this.updateScores();
            this.updateHistory();
            this.saveToStorage();
            
            if (this.soundEnabled) {
                this.playSound('reset');
            }
        }
    }
    
    updateBoard() {
        const cells = this.gameBoard.children;
        
        for (let i = 0; i < cells.length; i++) {
            const cell = cells[i];
            cell.className = 'cell';
            
            if (this.board[i] === 'X') {
                cell.classList.add('x');
            } else if (this.board[i] === 'O') {
                cell.classList.add('o');
            }
        }
    }
    
    updateStatus(message) {
        this.gameStatus.textContent = message;
    }
    
    updateTurnIndicator() {
        const playerName = this.currentPlayer === 'X' ? '玩家 X' : 
                          (this.gameMode === 'pvp' ? '玩家 O' : 'AI');
        this.currentTurn.innerHTML = `<i class="fas fa-user"></i><span>当前回合：${playerName}</span>`;
    }
    
    updateScores() {
        this.playerXScore.textContent = this.scores.X;
        this.playerOScore.textContent = this.scores.O;
    }
    
    addToHistory(game) {
        this.history.unshift(game);
        if (this.history.length > 10) {
            this.history.pop();
        }
        this.updateHistory();
        this.saveToStorage();
    }
    
    updateHistory() {
        this.historyList.innerHTML = '';
        
        if (this.history.length === 0) {
            this.historyList.innerHTML = `
                <div class="history-empty">
                    <i class="fas fa-history"></i>
                    <p>暂无游戏记录</p>
                </div>
            `;
            return;
        }
        
        this.history.forEach((game, index) => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            
            const winnerText = game.winner === 'tie' ? '平局' : 
                             (this.gameMode === 'pve' && game.winner === 'O' ? 'AI获胜' : `玩家 ${game.winner} 获胜`);
            
            historyItem.innerHTML = `
                <div class="history-result">
                    <span class="history-winner">${winnerText}</span>
                    <span class="history-time">${game.time}</span>
                </div>
                <div class="history-moves">${game.moves} 步</div>
            `;
            
            this.historyList.appendChild(historyItem);
        });
    }
    
    animateNewGame() {
        const cells = this.gameBoard.children;
        
        for (let i = 0; i < cells.length; i++) {
            const cell = cells[i];
            cell.style.opacity = '0';
            cell.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                cell.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                cell.style.opacity = '1';
                cell.style.transform = 'scale(1)';
            }, i * 50);
        }
    }
    
    animateMove(index) {
        const cell = this.gameBoard.children[index];
        cell.style.transform = 'scale(0)';
        
        setTimeout(() => {
            cell.style.transition = 'transform 0.3s ease';
            cell.style.transform = 'scale(1)';
        }, 10);
    }
    
    playSound(type) {
        // 创建简单的Web Audio API音效
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            let frequency = 440; // 默认频率
            
            switch (type) {
                case 'start':
                    frequency = 523.25; // C5
                    break;
                case 'move':
                    frequency = this.currentPlayer === 'X' ? 659.25 : 493.88; // E5 或 B4
                    break;
                case 'win':
                    frequency = 783.99; // G5
                    break;
                case 'draw':
                    frequency = 587.33; // D5
                    break;
                case 'reset':
                    frequency = 349.23; // F4
                    break;
            }
            
            oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (error) {
            console.log('音效播放失败:', error);
        }
    }
    
    loadFromStorage() {
        try {
            const saved = localStorage.getItem('ticTacToe');
            if (saved) {
                const data = JSON.parse(saved);
                this.scores = data.scores || this.scores;
                this.history = data.history || this.history;
                this.gameMode = data.gameMode || this.gameMode;
                this.aiDifficulty = data.aiDifficulty || this.aiDifficulty;
                this.soundEnabled = data.soundEnabled !== undefined ? data.soundEnabled : this.soundEnabled;
                this.animationsEnabled = data.animationsEnabled !== undefined ? data.animationsEnabled : this.animationsEnabled;
                
                // 更新UI元素
                this.gameModeSelect.value = this.gameMode;
                this.aiDifficultySelect.value = this.aiDifficulty;
                this.soundToggle.checked = this.soundEnabled;
                this.animationsToggle.checked = this.animationsEnabled;
            }
        } catch (error) {
            console.log('加载存储数据失败:', error);
        }
    }
    
    saveToStorage() {
        try {
            const data = {
                scores: this.scores,
                history: this.history,
                gameMode: this.gameMode,
                aiDifficulty: this.aiDifficulty,
                soundEnabled: this.soundEnabled,
                animationsEnabled: this.animationsEnabled
            };
            
            localStorage.setItem('ticTacToe', JSON.stringify(data));
        } catch (error) {
            console.log('保存数据失败:', error);
        }
    }
    
    updateDisplay() {
        this.updateScores();
        this.updateHistory();
        this.updateTurnIndicator();
        this.updateStatus('点击"新游戏"开始');
    }
}

// 初始化游戏
document.addEventListener('DOMContentLoaded', () => {
    window.ticTacToeGame = new TicTacToeGame();
    console.log('井字棋游戏已加载！');
});