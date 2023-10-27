# bingmok

- 로그인하면 게임할 수 있는 웹 서비스
- 사용자가 온라인으로 오목과 빙고를 즐길 수 있게
- 게임 1. 오목
- 게임 2. 빙고

**[팀원 간 고려사항]**

- Git Branch 준수
- commit 횟수 필수
- merge 전 다함께 코드리뷰
- 파일 간 호환성 고려

[**Git Branch]**

- main : test 통과된것 적용
- dev : 각 브랜치 적용 test
- serv : 서버 / 요청 : 첫페이지, 로그인, 오셀로게임, 빙고게임
- oshello : 오셀로 게임
- bingo : bingo 게임

**[BRANCH]**

serv - 성민

bingo - 영식, 승희

oshello - static - 유안

oshello - dynamic - 은정

mainP - static - 유안

[**Directory]**
*bingmok -> app.js
*bingmok -> static -> html, css
*bingmok -> mod -> loginmodule

**[목표]**

- express 활용
- module 활용
- git branch 적응
- 협업 속 분업
- 상호 간 성의 있는 코드 리뷰
- 커뮤니케이션 역량 기르기

**[231027]**

- serv - 성민 : 서버 요청 (메인페이지, 로그인, 오목, 빙고)에 대한 응답 → 다른 팀원 완료되는대로 정확한 경로로 수정 후 테스트 예정
- bingo - 영식, 승희 : static은 완료, dynamic은 문제점 개선 (AI가 이기는 방법을 모름, 3줄 빙고 안됨)
- oshello - static - 유안 : 완료
- oshello - dynamic - 은정 : 문제점 개선 (클릭 이벤트 좌표값 수정)
- mainP - static - 유안 : CSS style 요소 적용해야 함

- 게임 2가지 팀원들끼리 해보고 문제점 공유 후 오전 프로젝트 시작 예정
- 12:30 성민 제외한 팀원들 파일 공유 (빙고는 미완 예정 - 금일 내로 완성)
    
    → 코드 리뷰
    
    →  server test
    
    → main merge
    

**[오전]**

- 오목 : 클릭 좌표, 게임 종료 메세지 잘 안뜸
- 빙고 : 1줄만 성공해도 끝남 → 2줄로 수정, AI 상대할 때 시간이 너무 김, 시간초과
