const express = require('express');
const fetch = require('node-fetch'); // npm install node-fetch
var cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;


// api 요청 옵션 변수
const start = 1; // 검색 시작지점
const end = 30; // 검색 끝지점
const pos = 1; // pos 옵션 1~27까지 선택 가능 (ex. 1: 명사, 5: 동사)


const API_URL = 'http://opendict.korean.go.kr/api/search';
const API_KEY = '3EA002DAFA58218A192AC80E387B8334'; // 우리말샘 오양호 발급키

app.use(cors()); // 일단 모든 요청에 대해서 cors 허용 이 부분에서 조건 설정도 가능하다고 함.

app.use(express.static(path.join(__dirname, '../frontend/build'))); // 리액트 기능1,기능2 앱 사용

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.get('/api/search', async (req, res) => {
  const query = req.query.q;
  const method = req.query.method; // start: 그것으로 시작하는, exact: 정확히 일치하는
  const target = req.query.target; // 1: 어휘, 9: 뜻 풀이, 10: 용례

  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}&target_type=search&req_type=json&q=${query}&sort=popular&start=${start}&num=${end}&advanced=y&target=${target}&method=${method}&type1=word&type2=all&type3=all&type4=all&pos=${pos}`); //start, end 조정가능
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