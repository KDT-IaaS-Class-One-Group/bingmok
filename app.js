const express = require('express');
const app = express();
const port = 3000;

// MySQL 모듈을 불러옵니다.
const mysql = require('mysql');

// MySQL 연결 정보를 설정합니다.
const db = mysql.createConnection({
  host: 'your-mysql-host',
  user: 'your-mysql-username',
  password: 'your-mysql-password',
  database: 'your-database-name'
});

// MySQL 연결을 시작합니다.
db.connect((err) => {
  if (err) {
    console.error('MySQL 연결에 실패했습니다: ' + err.stack);
    return;
  }
  console.log('MySQL 연결이 스레드 ID ' + db.threadId + '로 성공적으로 연결되었습니다.');
});

// Body 파서 설정 (POST 요청의 body를 파싱하기 위해)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/static/index.html');
});

app.post('/', (req, res) => {
  const submittedUsername = req.body.username;
  const submittedPassword = req.body.password;
  const realUsername = 'bingmok';
  const realPassword = '1234';

  if (submittedUsername === realUsername && submittedPassword === realPassword) {
    // 로그인 성공 시, MySQL 데이터를 가져오기
    db.query('SELECT * FROM your_table_name', (error, results, fields) => {
      if (error) {
        console.error('데이터를 가져오는 중 오류 발생: ' + error);
        res.send('데이터를 가져오는 중 오류가 발생했습니다.');
      } else {
        // 결과를 클라이언트에 응답으로 보냅니다.
        res.json(results);
      }
    });
  } else {
    res.send('로그인 실패');
  }
});

app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다. http://localhost:${port}`);
});
