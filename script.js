document.addEventListener('DOMContentLoaded', () => {
    // 游戏常量
    const GRID_SIZE = 4;
    const GRID_CONTAINER = document.getElementById('grid-container');
    const SCORE_ELEMENT = document.getElementById('score');
    const BEST_SCORE_ELEMENT = document.getElementById('best-score');
    const MESSAGE_ELEMENT = document.getElementById('message');
    const RESET_BUTTON = document.getElementById('reset-btn');
    const UNDO_BUTTON = document.getElementById('undo-btn');
    
    // 游戏状态变量
    let score = 0;
    let bestScore = parseInt(localStorage.getItem('bestScore')) || 0;
    let grid = [];
    let gameOver = false;
    let history = [];
    
    // 初始化游戏
    function initGame() {
        // 重置状态
        grid = [];
        gameOver = false;
        score = 0;
        history = [];
        
        // 创建空网格
        for (let i = 0; i < GRID_SIZE; i++) {
            grid.push([0, 0, 0, 0]);
        }
        
        // 清空网格容器
        GRID_CONTAINER.innerHTML = '';
        
        // 创建网格单元格
        for (let i = 0; i < GRID_SIZE; i++) {
            for (let j = 0; j < GRID_SIZE; j++) {
                const cell = document.createElement('div');
                cell.classList.add('grid-cell');
                GRID_CONTAINER.appendChild(cell);
            }
        }
        
        // 添加初始两个方块
        addRandomTile();
        addRandomTile();
        
        // 更新UI
        updateView();
        updateScores();
        MESSAGE_ELEMENT.textContent = '';
    }
    
    // 在随机空位置添加一个方块（2或4）
    function addRandomTile() {
        const emptyCells = [];
        
        // 查找所有空单元格
        for (let i = 0; i < GRID_SIZE; i++) {
            for (let j = 0; j < GRID_SIZE; j++) {
                if (grid[i][j] === 0) {
                    emptyCells.push({ row: i, col: j });
                }
            }
        }
        
        // 如果有空单元格，随机选择一个放置新方块
        if (emptyCells.length > 0) {
            const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            grid[randomCell.row][randomCell.col] = Math.random() < 0.9 ? 2 : 4;
        }
    }
    
    // 更新游戏视图
    function updateView() {
        // 移除现有卡片
        document.querySelectorAll('.tile').forEach(tile => {
            tile.remove();
        });
        
        // 添加新的卡片
        const tileSize = GRID_CONTAINER.clientWidth / GRID_SIZE;
        
        for (let row = 0; row < GRID_SIZE; row++) {
            for (let col = 0; col < GRID_SIZE; col++) {
                const value = grid[row][col];
                if (value !== 0) {
                    const tile = document.createElement('div');
                    tile.classList.add('tile');
                    tile.classList.add(`tile-${value}`);
                    tile.textContent = value;
                    
                    // 设置位置
                    tile.style.width = `${tileSize - 10}px`;
                    tile.style.height = `${tileSize - 10}px`;
                    tile.style.top = `${row * (tileSize) + 5}px`;
                    tile.style.left = `${col * (tileSize) + 5}px`;
                    
                    GRID_CONTAINER.appendChild(tile);
                }
            }
        }
    }
    
    // 更新分数显示
    function updateScores() {
        SCORE_ELEMENT.textContent = score;
        BEST_SCORE_ELEMENT.textContent = bestScore;
    }
    
    // 移动方块（核心游戏逻辑）
    function move(direction) {
        // 保存当前状态到历史记录
        saveState();
        
        const oldGrid = JSON.parse(JSON.stringify(grid));
        let moved = false;
        let moveScore = 0;
        
        // 根据移动方向处理
        switch (direction) {
            case 'left':
                for (let row = 0; row < GRID_SIZE; row++) {
                    // 移动方块
                    const newRow = [];
                    for (let col = 0; col < GRID_SIZE; col++) {
                        if (grid[row][col] !== 0) {
                            newRow.push(grid[row][col]);
                        }
                    }
                    
                    // 合并方块
                    for (let i = 0; i < newRow.length - 1; i++) {
                        if (newRow[i] === newRow[i + 1]) {
                            newRow[i] *= 2;
                            moveScore += newRow[i];
                            newRow.splice(i + 1, 1);
                        }
                    }
                    
                    // 填充右侧空白
                    while (newRow.length < GRID_SIZE) {
                        newRow.push(0);
                    }
                    
                    // 检查是否有移动
                    if (JSON.stringify(grid[row]) !== JSON.stringify(newRow)) {
                        moved = true;
                        grid[row] = newRow;
                    }
                }
                break;
                
            case 'right':
                for (let row = 0; row极端的row < GRID_SIZE; row++) {
                    // 移动方块
                    const newRow = [];
                    for (let col = GRID_SIZE - 1; col >= 0; col--) {
                        if (grid[row][col] !== 0) {
                            newRow.push(grid[row][col]);
                        }
                    }
                    
                    // 合并方块
                    for (let i = 0; i < newRow.length - 1; i++) {
                        if (newRow[i] === new极端的row[i + 1]) {
                            newRow[i] *= 2;
                            moveScore += newRow[i];
                            newRow.splice(i + 1, 1);
                        }
                    }
                    
                    // 填充左侧空白
                    while (newRow.length < GRID_SIZE) {
                        newRow.push(0);
                    }
                    
                    // 反转数组并更新行
                    const reversedRow = newRow.reverse();
                    if (JSON.stringify(grid[row]) !== JSON.stringify(reversedRow)) {
                        moved = true;
                        grid[row] = reversedRow;
                    }
                }
                break;
                
            case 'up':
                for (let col = 0; col < GRID_SIZE; col++) {
                    // 移动方块
                    const newCol = [];
                    for (let row = 0; row < GRID_SIZE; row++) {
                        if (grid[row][col] !== 0) {
                            newCol.push(grid[row][col]);
                        }
                    }
                    
                    // 合并方块
                    for (let i = 0; i < newCol.length - 1; i++) {
                        if (newCol[i] === newCol[i + 1]) {
                            newCol[i] *= 2;
                            moveScore += newCol[i];
                            newCol.splice(i + 1, 1);
                        }
                    }
                    
                    // 填充下方空白
                    while (newCol.length < GRID_SIZE) {
                        newCol.push(0);
                    }
                    
                    // 检查是否有移动
                    let hasChanged = false;
                    for (let row = 0; row < GRID_SIZE; row++) {
                        if (grid[row][col] !== newCol[row]) {
                            hasChanged = true;
                            break;
                        }
                    }
                    
                    if (hasChanged) {
                        moved = true;
                        for (let row = 0; row < GRID_SIZE; row++) {
                            grid[row][col] = newCol[row];
                        }
                    }
                }
                break;
                
            case 'down':
                for (let col = 0; col < GRID_SIZE; col++) {
                    // 移动方块
                    const newCol = [];
                    for (let row = GRID_SIZE - 1; row >= 0; row--) {
                        if (grid[row][col] !== 0) {
                            newCol.push(grid[row][col]);
                        }
                    }
                    
                    // 合并方块
                    for (let i = 0; i < newCol.length - 1; i++) {
                        if (newCol[i] === newCol[i + 1]) {
                            newCol[i] *= 2;
                            moveScore += newCol[i];
                            newCol.splice(i + 1, 1);
                        }
                    }
                    
                    // 填充上方空白
                    while (newCol.length < GRID_SIZE) {
                        newCol.push(0);
                    }
                    
                    // 反转并检查更新
                    const reversedCol = newCol.reverse();
                    let hasChanged = false;
                    for (let row = 0; row < GRID_SIZE; row++) {
                        if (grid[row][col] !== reversedCol[row]) {
                            hasChanged = true;
                            break;
                        }
                    }
                    
                    if (hasChanged) {
                        moved = true;
                        for (let row = 0; row < GRID_SIZE; row++) {
                            grid[row][col] = reversedCol[row];
                        }
                    }
                }
                break;
        }
        
        // 如果有移动，添加新方块并更新UI
        if (moved) {
            addRandomTile();
            score += moveScore;
            
            // 检查游戏是否胜利
            if (checkWin()) {
                MESSAGE_ELEMENT.innerHTML = '恭喜！你创建了<span style="color:#FFD966"> 2048 </span>方块！';
                MESSAGE_ELEMENT.innerHTML += '<br><span style="font-size:0.9em">继续游戏挑战更高分</span>';
            }
            
            // 检查游戏是否结束
            gameOver = checkGameOver();
            if (gameOver) {
                MESSAGE_ELEMENT.innerHTML = '游戏结束！<br><span style="font-size:0.9em">按"新游戏"重新开始</span>';
            }
            
            // 更新最高分
            if (score > bestScore) {
                bestScore = score;
                localStorage.setItem('bestScore', bestScore);
            }
            
            updateScores();
            updateView();
        }
    }
    
    // 检查是否胜利（创建了2048方块）
    function checkWin() {
        for (let row = 0; row < GRID_SIZE; row++) {
            for (let col = 0; col < GRID_SIZE; col++) {
                if (grid[row][col] === 2048) {
                    return true;
                }
            }
        }
        return false;
    }
    
    // 检查游戏是否结束
    function checkGameOver() {
        // 检查是否有空单元格
        for (let row = 0; row < GRID_SIZE; row++) {
            for (let col = 0; col < GRID_SIZE; col++) {
                if (grid[row][col] === 0) {
                    return false;
                }
            }
        }
        
        // 检查是否存在可合并的相邻方块
        for (let row = 0; row < GRID_SIZE; row++) {
            for (let col = 0; col < GRID_SIZE; col++) {
                const current = grid[row][col];
                
                // 检查右侧方块
                if (col < GRID_SIZE - 1 && grid[row][col + 1] === current) {
                    return false;
                }
                
                // 检查下方方块
                if (row < GRID_SIZE - 1 && grid[row + 1][col] === current) {
                    return false;
                }
            }
        }
        
        return true;
    }
    
    // 保存游戏状态到历史记录
    function saveState() {
        const state = {
            grid: JSON.parse(JSON.stringify(grid)),
            score: score,
            gameOver: gameOver
        };
        history.push(state);
        
        // 限制历史记录长度
        if (history.length > 5) {
            history.shift();
        }
    }
    
    // 撤销上一步操作
    function undoMove() {
        if (history.length > 1) {
            history.pop(); // 移除当前状态
            const prevState = history[history.length - 1];
            grid = JSON.parse(JSON.stringify(prevState.grid));
            score = prevState.score;
            gameOver = prevState.gameOver;
            
            updateView();
            updateScores();
            
            if (gameOver) {
                MESSAGE_ELEMENT.innerHTML = '游戏结束！<br><span style="font-size:0.9em">按"新游戏"重新开始</span>';
            } else {
                MESSAGE_ELEMENT.textContent = '';
            }
        }
    }
    
    // 键盘事件监听
    document.addEventListener('keydown', (event) => {
        if (gameOver) return;
        
        switch (event.key) {
            case 'ArrowUp':
                move('up');
                break;
            case 'ArrowDown':
                move('down');
                break;
            case 'ArrowLeft':
                move('left');
                break;
            case 'ArrowRight':
                move('right');
                break;
        }
    });
    
    // 按钮事件监听
    RESET_BUTTON.addEventListener('click', initGame);
    UNDO_BUTTON.addEventListener('click', undoMove);
    
    // 初始化触摸滑动事件（移动设备支持）
    let touchStartX, touchStartY;
    
    document.addEventListener('touchstart', (event) => {
        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
    }, false);
    
    document.addEventListener('touchend', (event) => {
        if (gameOver || !touchStartX || !touchStartY) return;
        
        const touchEndX = event.changedTouches[0].clientX;
        const touchEndY = event.changedTouches[0].clientY;
        
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;
        
        // 确定滑动方向
        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX > 50) {
                move('right');
            } else if (diffX < -50) {
                move('left');
            }
        } else {
            if (diffY > 50) {
                move('down');
            } else if (diffY < -50) {
                move('up');
            }
        }
        
        touchStartX = null;
        touchStartY = null;
    }, false);
    
    // 初始化游戏
    initGame();
});
