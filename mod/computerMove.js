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
								// 유효한 위치인 경우, 해당 위치에 빈 칸(**0**으로 표시)인지 확인하고, 빈 칸인 경우 **playerSpots** 배열에 해당 위치를 저장
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
			// 컴퓨터가 놓을 수 있는 위치들을 저장할 배열
			// playerSpots.length > 0가 참(플레이어가 놓은 돌 주변에 놓을 수 있는 위치가 있음)이면 possibleSpots에 playerSpots 배열을 할당
			// 그렇지 않으면(플레이어 주변에 놓을 수 있는 위치가 없음), possibleSpots에 emptySpots 배열을 할당
    const possibleSpots = playerSpots.length > 0 ? playerSpots : emptySpots;

	
    if (possibleSpots.length > 0) {
			// Math.random() 함수를 사용하여 0과 1 사이의 난수를 생성
			// possibleSpots 배열의 길이에 난수를 곱한 후 Math.floor() 함수를 사용하여 내림하여 배열에서 무작위 인덱스(randomIndex)를 생성
			// possibleSpots 배열에서 randomIndex에 해당하는 위치를 가져와 { row, col } 형식의 객체로 추출
			// 이 위치에 computerStone을 놓기 위해 placeStone 함수를 호출
      const randomIndex = Math.floor(Math.random() * possibleSpots.length);
      const { row, col } = possibleSpots[randomIndex];
      placeStone(row, col, computerStone);
    }
  }
}

// 컴퓨터가 현재 게임 보드에서 플레이어가 놓은 돌 주변에 우선적으로 놓아야 할 위치를 찾는 역할. 이렇게 찾은 위치를 playerSpots 배열에 저장하고, 이후 컴퓨터가 수를 둘 때 컴퓨터는 playerSpots 배열에 놓을 수 있는 위치가 있으면 그 주변에 우선적으로 돌을 두고, 그렇지 않으면 빈 곳 중 하나를 무작위로 선택하여 돌을 둠