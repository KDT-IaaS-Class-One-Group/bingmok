const board = Array(14)
  .fill()
  .map(() => Array(14).fill(0));
const playerStone = "white"; // 플레이어의 돌 색상 (하얀색)
const computerStone = "black"; // 컴퓨터의 돌 색상 (검은색)
let currentPlayer = playerStone;

const boardElements = document.querySelectorAll("#board > div");
boardElements.forEach((element, index) => {
  element.addEventListener("click", () => {
    if (currentPlayer === playerStone) {
      const row = Math.floor(index / 14);
      const col = index % 14;
      placeStone(row, col, playerStone);
      if (checkWin(row, col, playerStone)) {
        alert("플레이어가 승리했습니다!");
      }
    }
  });
});

function computerMove() {
  const emptySpots = [];
  const playerSpots = [];

  // 플레이어가 놓은 돌 주변의 위치 수집
  for (let row = 0; row < 14; row++) {
    for (let col = 0; col < 14; col++) {
      if (board[row][col] === playerStone) {
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            const newRow = row + i;
            const newCol = col + j;
            if (newRow >= 0 && newRow < 14 && newCol >= 0 && newCol < 14) {
              if (board[newRow][newCol] === 0) {
                playerSpots.push({ row: newRow, col: newCol });
              }
            }
          }
        }
      }
    }
  }

  // 모든 빈 칸 위치 수집
  for (let row = 0; row < 14; row++) {
    for (let col = 0; col < 14; col++) {
      if (board[row][col] === 0) {
        emptySpots.push({ row, col });
      }
    }
  }

  // 플레이어가 놓은 돌 주변에 우선적으로 놓도록 선택
  const possibleSpots = playerSpots.length > 0 ? playerSpots : emptySpots;

  if (possibleSpots.length > 0) {
    const randomIndex = Math.floor(Math.random() * possibleSpots.length);
    const { row, col } = possibleSpots[randomIndex];

    // 1초 딜레이 후 돌을 놓도록 설정
    setTimeout(() => {
      placeStone(row, col, computerStone);
    }, 1000);
  }
}

function placeStone(row, col, stone) {
  if (board[row][col] === 0) {
    board[row][col] = stone;
    const stoneElement = document.createElement("span");
    stoneElement.className = "stone";
    stoneElement.style.backgroundColor = stone;
    boardElements[row * 14 + col].appendChild(stoneElement);
    currentPlayer = currentPlayer === playerStone ? computerStone : playerStone;
    if (currentPlayer === computerStone) {
      computerMove();
    }
  }
}

function checkWin(row, col, stone) {
  const directions = [
    [1, 0],
    [0, 1],
    [1, 1],
    [1, -1], // 가로, 세로, 대각선 방향
  ];

  for (const [dx, dy] of directions) {
    let count = 1;

    for (let i = 1; i < 5; i++) {
      const newRow = row + i * dx;
      const newCol = col + i * dy;

      if (newRow >= 0 && newRow < 14 && newCol >= 0 && newCol < 14) {
        if (board[newRow][newCol] === stone) {
          count++;
        } else {
          break;
        }
      } else {
        break;
      }
    }

    if (count === 5) {
      if (!winnerDeclared) {
        winnerDeclared = true;
        alert(
          `${stone === playerStone ? "플레이어" : "컴퓨터"}가 승리했습니다!`
        );
      }
      return true;
    }
  }

  return false;
}
