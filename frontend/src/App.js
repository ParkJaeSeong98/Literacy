import './App.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';

const WordRelay = () => {
  const [word, setWord] = useState('시작');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputEl = React.useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (word[word.length - 1] === value[0]) {
      setResult('딩동댕');
      setWord(value);
      setValue('');
      inputEl.current.focus();
    } else {
      setResult('땡');
      setValue('');
      inputEl.current.focus();
    }
  };

  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <input
          ref={inputEl}
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
        />
        <button>입력!</button>
      </form>
      <div>{result}</div>
    </>
  );
}

function KoreanDictionary() {
  const [tempInput, setTempInput] = useState(''); // 임시로 입력값을 저장할 상태
  const [storedValue, setStoreValue] = useState(''); // 버튼 클릭 시 값을 저장할 상태
  const [words, setWords] = useState([]); // API 응답에서 가져온 단어들을 저장할 상태

  const handleInputChange = (event) => {
    setTempInput(event.target.value); // 입력값 변화 감지 시 임시 상태에 저장
  };

  const handleButtonClick = () => {
    setStoreValue(tempInput); // 버튼 클릭 시 임시 상태의 값을 storedValue에 저장
    getJsonFromDictionaryAPI(tempInput);
  };

  const getJsonFromDictionaryAPI = (query) => { // 우리 백엔드 api로 연결함. 프론트에서 직접 요청하면 CORS 오류 때문에 직접 할 수가 없음.
    fetch(`http://localhost:3000/api/search?q=${query}`) // 백엔드에서 호출
    .then((response) => response.json())
    .then((data) => {
      console.log(query);
      console.log(data);
      const fetchedWords = data.channel.item.map(item => item.word.replace(/-/g, ''));
      setWords(fetchedWords); // API 응답에서 가져온 단어들을 상태에 저장
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  };

  return (
    <div>
      <p>설명: 우리 backend/index.js 에서 우리말샘 사전 api로 요청을 보낸 후에 받은 json을<br/> 
        다시 frontend/App.js 에서 backend/index.js의 api를 통해 받아가도록 구성했음.<br/>
        검색해서 나오는 단어 목록들은 입력창에 입력한 단어를 우리말샘 사전에 검색했을 때<br/>
        결과로 나오는 단어 첫 번째부터 백 번째까지 단어의 설명을 빼고 나열한 것임.<br/>
        </p>
      <input
        type="text"
        value={tempInput}
        onChange={handleInputChange}
      />
      <button onClick={handleButtonClick}>검색</button>
      <div>
      <h1>검색하신 단어는 "{storedValue}" 입니다.</h1>
        {
          words.map(function(content){ // words 리스트 쭉 나열하기
            return (
              <div>
                {content}
                <hr/>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

// API 활용한 끝말잇기
const WordRelayAPI = () => {
  const [word, setWord] = useState('남자');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const [words, setWords] = useState([]);
  const [previous, setPrevious] = useState([word]); // 사용했던 단어를 담을 공간
  const inputEl = React.useRef(null);

  const getJsonFromDictionaryAPI = async (query) => {
    try {
      const response = await fetch(`http://localhost:3000/api/search?q=${query}`);
      const data = await response.json();
      let fetchedWords = data.channel.item.map(item => item.word.replace(/[-^]/g, '')).filter(word => word.length > 1);  
      // '-' 이거 제거하고, 길이 1인거 제외
      //console.log(fetchedWords.length);
      console.log(fetchedWords);
      const setFetchedWords = new Set(fetchedWords);
      fetchedWords = [...setFetchedWords];
      //console.log(fetchedWords.length);
      console.log(fetchedWords);

      setWords(fetchedWords);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (words.length > 0) {
      let randIndex;
      do {
        randIndex = Math.floor(Math.random() * (words.length + 1));
      } while (previous.includes(words[randIndex]));
  
      setWord(words[randIndex]);
      setPrevious(previous => [...previous, words[randIndex]]);
    }
  }, [words]);

  // 실제로 존재하는 단어인지 검사할 함수
  const isRealWord = async (input) => {
    try {
      const response = await fetch(`http://localhost:3000/api/inspect?q=${input}`);
      const data = await response.json();
      const fetchedWords = data.channel.item.map(item => item.word);
      
      if ((fetchedWords) && (fetchedWords.length > 0)) { // 배열이 존재하는지 + 배열의 길이가 0보다 큰지 검사
        // console.log('this word is true'); // 작동 확인용
        return true;
      } else {
        // console.log('this word is false');
        return false;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return false;
    }
  };

  function convertDueum(s) {
    if (!s) return '';
    const HANGUL_FIRST_CODE = 44032;
    const HANGUL_LAST_CODE = 55203;
    const JONGSEONG_LEN = 28;
  
    let c = s.charCodeAt(0);
    if (c < HANGUL_FIRST_CODE || c > HANGUL_LAST_CODE) return s;
  
    switch (Math.floor((c - HANGUL_FIRST_CODE) / JONGSEONG_LEN)) {
        // 녀, 뇨, 뉴, 니
        case 48: case 54:
        case 59: case 62:
            c += 5292;
            break;
        // 랴, 려, 례, 료, 류, 리
        case 107: case 111:
        case 112: case 117:
        case 122: case 125:
            c += 3528;
            break;
        // 라, 래, 로, 뢰, 루, 르
        case 105: case 106:
        case 113: case 116:
        case 118: case 123:
            c -= 1764;
            break;
    }
  
    return String.fromCharCode(c) + s.slice(1);
  };

  // 사용자가 입력한 단어에 대한 처리를 담당하는 함수
  const onSubmitForm = async (e) => {
    e.preventDefault();

    const isReal = await isRealWord(value);
    const isUsed = !(previous.includes(value)); // previous 안에 입력한 단어가 존재하는지 판단할 변수

    if ((convertDueum(word[word.length - 1]) === value[0]) && (isReal) && (isUsed))  {
      await getJsonFromDictionaryAPI(convertDueum(value[value.length - 1]));
      setResult('딩동댕');
      setPrevious(previous => [...previous, value]);
      setValue('');
      inputEl.current.focus();
    } else { 
      setResult('땡');
      setValue('');
      inputEl.current.focus();
    }
  };

  return (
    <>
      <div>제시 단어: {word}</div>
      <div>사용했던 단어 목록: {previous}</div>
      <form onSubmit={onSubmitForm}>
        <input
          ref={inputEl}
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
        />
        <button>입력!</button>
      </form>
      <div>{result}</div>
    </>
  );
}


function App() {
  return (
    <BrowserRouter>
      <div>
        <div className="App">
          <h2><Link to='/function1'>기능1</Link></h2>
          <h2><Link to='/function2'>기능2</Link></h2>
          <h2><Link to='/function3'>기능3</Link></h2>
          <br />
        </div>
        <Routes>
          <Route path="/function1" element={<KoreanDictionary></KoreanDictionary>} />
          <Route path="/function2" element={<WordRelay></WordRelay>} />
          <Route path="/function3" element={<WordRelayAPI></WordRelayAPI>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
