const express = require('express');
const fetch = require('node-fetch'); // npm install node-fetch
var cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

const API_URL = 'http://opendict.korean.go.kr/api/search';
const API_KEY = '3EA002DAFA58218A192AC80E387B8334'; // 우리말샘 오양호 발급키

app.use(cors()); // 일단 모든 요청에 대해서 cors 허용 이 부분에서 조건 설정도 가능하다고 함.

app.use(express.static(path.join(__dirname, '../frontend/build'))); // 리액트 기능1,기능2 앱 사용

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.get('/api/search', async (req, res) => {
  const query = req.query.q;

  try {
    const response = await fetch(`${API_URL}?certkey_no=6027&key=${API_KEY}&target_type=search&req_type=json&part=word&q=${query}&sort=dict&start=1&num=100`); //start, end 조정가능
    const data = await response.json();
    res.json(data); // API 응답을 리액트 앱에 전달
  } catch (error) { // 에러 처리
    console.error('Error fetching from the dictionary API:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
  
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});