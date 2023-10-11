const express = require('express');
var cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

app.use(cors()); // 일단 모든 요청에 대해서 cors 허용 이 부분에서 조건 설정도 가능하다고 함.

app.use(express.static(path.join(__dirname, '../frontend/build'))); // 리액트 기능1,기능2 앱 사용

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});