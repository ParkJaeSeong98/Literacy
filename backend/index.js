const OpenAI = require('openai'); 
// openai 패키지에서 Configuration과 OpenAIApi 불러오기
// Configuration : 인증정보 설정 및 OpenAIApi를 사용하기 위한 초기 설정
// OpenAIApi : OpenAI의 API와 상호작용할 수 있는 메소드 제공

require('dotenv').config({ path: 'APIkeys.env' }); // env 파일에서 api key 추가

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
const USE_DICTIONARY_API_KEY = process.env.DICTIONARY_API_KEY; // 우리말샘 오양호 발급키

const USE_CHATGPT_API_KEY = process.env.CHATGPT_API_KEY; // chatgpt api 키

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
    const response = await fetch(`${API_URL}?key=${USE_DICTIONARY_API_KEY}&target_type=search&req_type=json&q=${query}&sort=popular&start=${start}&num=${end}&advanced=y&target=${target}&method=${method}&type1=word&type2=all&type3=all&type4=all&pos=${pos}`); //start, end 조정가능
    const data = await response.json();
    res.json(data); // API 응답을 리액트 앱에 전달
  } catch (error) { // 에러 처리
    console.error('Error fetching from the dictionary API:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
  
});

const openai = new OpenAI({
  apiKey: USE_CHATGPT_API_KEY,
}) // api키를 사용하여 OpenAIApi 객체 생성

async function getChatGPTMessage(query, res) {
  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: query }],
      model: 'gpt-3.5-turbo',
    }); // openai API로 답변 받아서 chatCompletion에 저장

    console.log(chatCompletion.choices); // 콘솔로 출력해보기
    res.json(chatCompletion.choices); // 응답을 클라이언트로 반환
  } catch (error) {
    console.error('Error fetching from the chatGPT API:', error);
    res.status(500).json({ error: 'Failed to fetch data' }); // 에러를 클라이언트로 반환
  }
  
}

app.get('/api/gpt', async (req, res) => {
  const query = req.query.q;

  if (query) {
    await getChatGPTMessage(query, res); // 비동기 처리
    
  } else {
    res.status(400).json({ error: 'No query provided' }); // status(400)-> Bad request 사용자의 요청이 잘못되었을 때
  }

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
