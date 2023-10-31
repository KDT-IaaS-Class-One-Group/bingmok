// Array() 생성자 함수는 주어진 길이(length)로 새로운 배열 생성
// fill()은 배열의 모든 요소를 지정한 값(value)으로 설정 -> 빈칸이므로 undefined 값 반환
// map()은 배열의 각 요소에 대해 콜백 함수를 실행하고 그 결과로 새로운 배열을 생성 → 1차원 배열을 map() 메서드를 사용하여 그대로 복사한 새로운 배열 반환
const board = Array(15)
  .fill()
  .map(() => Array(15).fill(0));

const boardSize = 15;
const playerStone = "black"; // 플레이어의 돌 색상 (검은색)
const computerStone = "white"; // 컴퓨터의 돌 색상 (하얀색)
let currentPlayer = playerStone;
let winnerDeclared = false; // 승리자가 선언되었는지 확인하는 변수
const boardElements = document.querySelectorAll("#board > div");

// 게임의 승자가 없고, 현재 플레이어가 검정색 돌일 때 placestone 함수 실행 (클릭한 위치에 돌이 생성)
boardElements.forEach((element, index) => {
  element.addEventListener("click", () => {
    if (!winnerDeclared && currentPlayer === playerStone) {
      // index를 boardSize로 나눈 나머지를 계산하는 연산으로, 이를 통해 클릭된 셀이 몇 번째 열에 위치하는지를 결정
      const col = index % boardSize;
      // index를 boardSize로 나눈 결과를 내림(floor)하여 클릭된 셀이 몇 번째 행에 위치하는지를 결정
      const row = Math.floor(index / boardSize);
      placeStone(row, col, playerStone);
    }
  });
});



function computerMove() {
  if (!winnerDeclared) { // 현재 게임에 승자가 아직 선언되지 않았을 때, 컴퓨터가 수를 두도록 하는 조건
    const emptySpots = []; // 빈 칸 위치
    const playerSpots = []; // 플레이어가 돌을 둔 위치를 저장하는 두 배열을 선언
    
    // 플레이어가 놓은 돌 주변의 위치 수집
		// 보드의 모든 행과 열을 반복
    for (let row = 0; row < boardSize; row++) {
      for (let col = 0; col < boardSize; col++) {
        // 현재 위치에 있는 돌이 플레이어의 돌인지 확인
        if (board[row][col] === playerStone) {
          // 현재 위치 주변의 8방향을 반복
          for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              // 현재 위치에서 8방향으로 이동한 새로운 행과 열의 위치를 계산
              const newRow = row + i;
              const newCol = col + j;
              // 계산한 새로운 위치가 게임 보드 내에 있는 유효한 위치인지 확인
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
      // 게임 보드에서 모든 빈 칸의 위치를 찾아내어 emptySpots 배열에 저장 -> 컴퓨터가 다음 수를 둘 위치를 선택할 때 emptySpots 배열을 활용하여 빈 칸 중 하나를 선택
      for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
          if (board[row][col] === 0) {
            // 만약 현재 위치가 빈 칸이라면, { row, col } 형식의 객체를 생성하고, 이 객체는 현재 위치의 행(row)과 열(col) 정보를 가짐
            // emptySpots 배열에 push 메서드를 사용하여 추가 -> 빈 칸의 위치를 저장하는데 사용
            emptySpots.push({ row, col });
          }
        }
      }
      
      // 플레이어가 놓은 돌 주변에 우선적으로 놓도록 선택
      // playerSpots 배열이 비어있지 않다면 playerSpots 배열을 possibleSpots에 할당하고, 그렇지 않다면 emptySpots 배열을 할당
      const possibleSpots = playerSpots.length > 0 ? playerSpots : emptySpots;
      // if (possibleSpots.length > 0) 구문은 possibleSpots 배열에 유효한 위치(빈 칸)이 존재하는지 확인
      // possibleSpots 배열이 비어있지 않으면, 컴퓨터는 다음 돌을 둘 위치를 선택
      if (possibleSpots.length > 0) {
        // 함수를 사용하여 0부터 1 사이의 수를 생성
        // 이 값에 possibleSpots 배열의 길이를 곱한 후, Math.floor() 함수를 사용하여 내림한 값을 randomIndex 변수에 저장
        // randomIndex는 possibleSpots 배열에서 무작위로 선택된 인덱스가 됨
        const randomIndex = Math.floor(Math.random() * possibleSpots.length);
        // possibleSpots[randomIndex]로 선택된 위치의 행(row)과 열(col) 정보를 가져온 후, placeStone 함수를 호출하여 컴퓨터의 돌을 해당 위치에 놓음
        const { row, col } = possibleSpots[randomIndex];
        placeStone(row, col, computerStone);
      }
    }
  };

      
      // 승리 조건 함수
      function checkWin(row, col, stone) {
        // 돌이 놓인 방향들을 정의 (가로, 세로, 대각선, 역대각선)
        const directions = [
          [1, 0], // 가로 방향에서 1칸의 행 씩 이동하면서 확인
          [0, 1], // 세로 방향에서 1칸의 열 씩 이동하면서 확인
          [1, 1], // 대각선 우하향 ->  1칸의 행, 1칸의 열 씩 이동
          [1, -1], // 역대각선 우상향 -> 1칸의 행, -1칸의 열 씩 이동
        ];
        
        // 각 방향에 대해 확인
        // for ... of : direction의 각 요소에 대해 반복해서 [dx, dy]변수에 할당하고 해당 요소를 출력
        // dx와 dy는 각각 방향의 변화
        for (const [dx, dy] of directions) {
          // sign은 1 또는 -1 중 하나 -> 주어진 방향을 양 방향으로 이동하는 데 사용
          for (const sign of [-1, 1]) {
            let count = 1;
            
            // 현재 위치에서 해당 방향으로 5번까지 이동하며 돌을 확인 / i는 이동 거리
            for (let i = 1; i < 5; i++) {
              // row와 col은 현재 위치이며, dx와 dy는 방향 -> sign을 사용하여 양 방향으로 이동
              const newRow = row + sign * i * dx;
              const newCol = col + sign * i * dy;
              
              // 새로운 위치(newRow, newCol)가 게임 보드 내에 있는지 확인
              if (
                newRow >= 0 &&
                newRow < boardSize &&
                newCol >= 0 &&
                newCol < boardSize
                ) {
                  // 새로운 위치에 있는 돌(board[newRow][newCol])이 주어진 stone과 일치하는지 확인
                  // 일치하는 경우 count가 증가하고, 그렇지 않으면 해당 방향의 검사를 중단하고 다음 방향으로 이동
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
            return true; // 5개 이상이면 승리
          }
        }
      }
      
      return false;
    }



function placeStone(row, col, stone) {
  // 게임 보드에서 해당 위치에 이미 돌이 놓여 있는지 확인 (0이 default)
  if (board[row][col] === 0) {
    // 해당 위치에 돌을 놓음
    board[row][col] = stone;
    // 돌을 나타내는 HTML 요소 생성
    const stoneElement = document.createElement("span");
    stoneElement.className = "stone";
    stoneElement.style.backgroundColor = stone;
    // 돌을 정확한 위치로 배치 -> 돌의 화면 위치 설정
    stoneElement.style.left = col * 50 + "px";
    stoneElement.style.top = row * 50 + "px";
    // 게임 보드에서 해당 위치에 돌을 추가 (위에서 생성한 stone을 해당 boardElement에 자식으로 추가)
    // 클릭한 셀(row와 col로 지정된 위치)이 게임 보드의 인덱스를 계산
    boardElements[row * boardSize + col].appendChild(stoneElement);
    // currentPlayer === playerStone(검은돌) 참이면 computerStone(흰돌) / 거짓이면 playerStone(검은돌)
    // 현재 플레이어 교체 (플레이어 <-> 컴퓨터)
    currentPlayer = currentPlayer === playerStone ? computerStone : playerStone;

    // 승리 확인을 여기서 수행
    if (checkWin(row, col, stone)) {
      winnerDeclared = true;
      console.log("승리!");
      alert(`${stone === playerStone ? "플레이어" : "컴퓨터"}가 승리했습니다!`);
    }

    // 승리자가 아직 선언되지 않았고, 컴퓨터 턴인 경우, 컴퓨터가 다음 수를 둘 수 있도록 설정
    if (!winnerDeclared && currentPlayer === computerStone) {
      setTimeout(computerMove, 1000);
    }
  }
}