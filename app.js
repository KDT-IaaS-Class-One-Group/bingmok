const express = require('express');
const app = express();
const port = 3000;

// 정적 파일 서빙을 설정합니다.
app.use(express.static('static'));

// Body 파서 설정 (POST 요청의 body를 파싱하기 위해)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// GET 요청으로 index.html 파일을 읽어옵니다.
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/index.html');
});


app.post('/', (req, res) => {
  // 클라이언트에서 제출한 사용자 이름과 암호를 가져옵니다.
  const submittedUsername = req.body.username;
  const submittedPassword = req.body.password;

  // 실제 사용자 이름과 암호를 설정합니다. 이 예제에서는 하드코딩하여 비교합니다.
  const realUsername = 'bingmok';
  const realPassword = '1234';

  // 사용자 이름과 암호를 확인하고 로그인 결과를 반환합니다.
  if (submittedUsername === realUsername && submittedPassword === realPassword) {
    // 로그인 성공 시
    res.sendFile(__dirname + '/static/index.html');
    // res.send(`<script>document.getElementById('welcom').textContent = '환영합니다, ${submittedUsername} 님!';</script>`);
  } else {
    // 로그인 실패 시
    res.send('로그인 실패');
  }
});

// GET 요청으로 gameOne.html 파일을 읽어옵니다.
app.get('/odhello', (req, res) => {
  res.sendFile(__dirname + '/static/odhello.html');
});

// GET 요청으로 gameTwo.html 파일을 읽어옵니다.
app.get('/bingo', (req, res) => {
  res.sendFile(__dirname + '/static/odhello.html');
});

app.listen(port, () => {
  console.log(`
서버가 포트 ${port}에서 실행 중입니다.
http://localhost:${port}
`);
});
