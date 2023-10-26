const express = require('express');
const app = express();
const port = 3000;

// 정적 파일 서빙을 설정합니다.
app.use(express.static('public'));

// Body 파서 설정 (POST 요청의 body를 파싱하기 위해)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// GET 요청으로 index.html 파일을 읽어옵니다.
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/static/index.html');
});

// POST 요청으로 로그인 데이터를 받습니다.
app.post('/login', (req, res) => {
  // 이곳에서 POST 데이터를 처리할 수 있습니다.
  const username = req.body.username;
  const password = req.body.password;

  // 로그인 처리 코드를 작성하세요.

  // 예시 응답
  if (username === 'bingmok' && password === '1234') {
    res.send('로그인 성공');
  } else {
    res.send('로그인 실패');
  }
});

// GET 요청으로 gameOne.html 파일을 읽어옵니다.
app.get('/gameOne', (req, res) => {
  res.sendFile(__dirname + '/static/odhello.html');
});

// GET 요청으로 gameTwo.html 파일을 읽어옵니다.
app.get('/gameTwo', (req, res) => {
  res.sendFile(__dirname + '/static/gameTwo.html');
});

app.listen(port, () => {
  console.log(`
서버가 포트 ${port}에서 실행 중입니다.
http://localhost:${port}
`);
});
