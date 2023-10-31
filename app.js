const express = require('express');
const app = express();
const port = 3000;

// 정적 파일 서빙을 설정합니다.
app.use(express.static('static'));

// Body 파서 설정 (POST 요청의 body를 파싱하기 위해)
// urlencoded : 서버가 클라이언트로부터 URL-encoded 데이터를 받을 때 이 데이터를 파싱하고 JavaScript 객체로 변환
// urlencoded 형식은 웹 양식에서 보낸 데이터를 서버에서 쉽게 읽을 수 있는 형식으로 인코딩하는 방식
// urlencoded 형식의 요청 데이터를 파싱하기 위한 미들웨어를 설정 
// extended : false => parse to simple object with QueryString library
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// GET 요청으로 index.html 파일을 읽어옵니다.
app.get('/', (req, res) => {
  //sendFile로 ( 현재directory + 파일 directory ) 응답한다
  // __dirname : 읽어올 파일의 디렉토리 + 경로
    res.sendFile(__dirname + '/static/index.html');
});

app.post('/', (req, res) => {
  // 클라이언트에서 제출한 사용자 이름과 암호를 가져온다
  const submittedUsername = req.body.username;
  const submittedPassword = req.body.password;
  // 실제 사용자 이름과 암호를 설정. 이 예제에서는 하드코딩하여 비교
  const realUsername = 'bingmok';
  const realPassword = '1234';
  // 사용자 이름과 암호를 확인하고 로그인 결과를 반환
  if (submittedUsername === realUsername && submittedPassword === realPassword) {
    // 로그인 성공 시
    res.sendFile(__dirname + '/static/afterlogin.html');
    // GET 요청으로 odhello.html 파일을 읽어옴
    app.get('/static/odhello.html', (req, res) => {
      res.sendFile(__dirname + '/static/odhello.html');
      app.get('/static/oshelloScript.js', (req, res) => {
        res.sendFile(__dirname + '/static/oshelloScript.js');
      });
    });

    // GET 요청으로 bingo.html 파일을 읽어옴
    app.get('/static/bingo.html', (req, res) => {
      res.sendFile(__dirname + '/static/bingo.html');
    });
  } else {
    // 로그인 실패 시
    // send() : express method / send http res to client
    res.send('로그인 실패');
  }
});
// serv.listen
app.listen(port, () => {
  console.log(`
서버가 포트 ${port}에서 실행 중입니다.
http://localhost:${port}
`);
});