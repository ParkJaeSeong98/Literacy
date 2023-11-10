var admin = require("firebase-admin");
const fs = require('fs');
const readline = require('readline');

var serviceAccount = require("./literacy-633f2-firebase-adminsdk-bt8ue-172c08a271.json"); // ./ 같은 디렉토리

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://literacy-633f2-default-rtdb.asia-southeast1.firebasedatabase.app"
});

// 데이터베이스 참조
const dbRef = admin.database().ref('/words'); // '/words' 부분 바꾸면 firebase DB에 다른 속성에 데이터 추가

// txt 파일에서 단어 읽기
const fileStream = fs.createReadStream('../wordsnext.txt'); // 상대경로, 하위 경로로 이동 ../

const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  // 각 줄(단어)을 데이터베이스에 추가
  dbRef.push(line);
});

rl.on('close', () => {
  console.log('All words have been imported to Firebase.');
});