const board = Array(15)
  .fill()
  .map(() => Array(15).fill(0));
const playerStone = "black"; // 플레이어의 돌 색상 (검은색)
const computerStone = "white"; // 컴퓨터의 돌 색상 (하얀색)
let currentPlayer = playerStone;
let winnerDeclared = false; // 승리자가 선언되었는지 확인하는 변수

const boardElements = document.querySelectorAll("#board > div");
const boardSize = 15; // 게임 보드의 크기

boardElements.forEach((element, index) => {
  element.addEventListener("click", () => {
    if (!winnerDeclared && currentPlayer === playerStone) {
      const col = index % boardSize;
      const row = Math.floor(index / boardSize);
      placeStone(row, col, playerStone);
    }
  });
});

function computerMove() {
  if (!winnerDeclared) {
    const emptySpots = [];
    const playerSpots = [];

    // 플레이어가 놓은 돌 주변의 위치 수집-
    for (let row = 0; row < boardSize; row++) {
      for (let col = 0; col < boardSize; col++) {
        if (board[row][col] === playerStone) {
          for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              const newRow = row + i;
              const newCol = col + j;
              if (
                newRow >= 0 &&
                newRow < boardSize &&
                newCol >= 0 &&
                newCol < boardSize
              ) {
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
    for (let row = 0; row < boardSize; row++) {
      for (let col = 0; col < boardSize; col++) {
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
      placeStone(row, col, computerStone);
    }
  }
}

function placeStone(row, col, stone) {
  if (board[row][col] === 0) {
    board[row][col] = stone;
    const stoneElement = document.createElement("span");
    stoneElement.className = "stone";
    stoneElement.style.backgroundColor = stone;
    // 돌을 정확한 위치로 배치
    stoneElement.style.left = col * 50 + "px";
    stoneElement.style.top = row * 50 + "px";
    boardElements[row * boardSize + col].appendChild(stoneElement);
    currentPlayer = currentPlayer === playerStone ? computerStone : playerStone;

    // 승리 확인을 여기서 수행
    if (checkWin(row, col, stone)) {
      winnerDeclared = true;
      console.log("승리!");
      alert(`${stone === playerStone ? "플레이어" : "컴퓨터"}가 승리했습니다!`);
    }

    if (!winnerDeclared && currentPlayer === computerStone) {
      setTimeout(computerMove, 1000);
    }
  }
}

function checkWin(row, col, stone) {
  const directions = [
    [1, 0], // 가로
    [0, 1], // 세로
    [1, 1], // 대각선
    [1, -1], // 역대각선
  ];

  for (const [dx, dy] of directions) {
    for (const sign of [-1, 1]) {
      let count = 1;

      for (let i = 1; i < 5; i++) {
        const newRow = row + sign * i * dx;
        const newCol = col + sign * i * dy;

        if (
          newRow >= 0 &&
          newRow < boardSize &&
          newCol >= 0 &&
          newCol < boardSize
        ) {
          if (board[newRow][newCol] === stone) {
            count++;
          } else {
            break;
          }
        } else {
          break;
        }
      }

      if (count >= 5) {
        return true; // 5개 이상이면 승리
      }
    }
  }

  return false;
}
// 추가된 부분: 쌍삼룰 방지 함수
function hasDoubleThree(row, col, stone) {
  // 가능한 모든 쌍삼 패턴 확인
  const patterns = [
    // 1번 패턴
    [
      [-1, -1, 2, 2, 3, 3],
      [-1, 1, -2, 2, -3, 3],
      [1, -1, -2, -2, -3, -3],
      [1, 1, 2, 2, 3, 3],
    ],
    // 2번 패턴
    [
      [-1, -1, 1, -1, -1, 1],
      [-1, -1, -1, 1, 1, 1],
      [-1, -1, -1, 1, 1, 1],
      [1, -1, 1, 1, -1, 1],
    ],
  ];

  for (const pattern of patterns) {
    let match = false;
    for (const p of pattern) {
      let matchCount = 0;
      let emptyCount = 0;
      for (const [dx2, dy2] of [p.slice(0, 2), p.slice(2, 4), p.slice(4, 6)]) {
        const newRow = row + dx2;
        const newCol = col + dy2;
        if (
          newRow >= 0 &&
          newRow < boardSize &&
          newCol >= 0 &&
          newCol < boardSize
        ) {
          if (board[newRow][newCol] === stone) {
            matchCount++;
          } else if (board[newRow][newCol] === 0) {
            emptyCount++;
          }
        }
      }
      if (matchCount === 2 && emptyCount === 3) {
        match = true;
        break;
      }
    }
    if (match) {
      alert("쌍삼룰 위반으로 게임 종료!");
      restartGame(); // 게임 재시작
      return true;
    }
  }

  return false;
}
