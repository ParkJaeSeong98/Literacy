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
};

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
      const fetchedWords = data.channel.item.map(item => item.word);
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

function App() {
  return (
    <BrowserRouter>
      <div>
        <div className="App">
          <h2><Link to='/function1'>기능1</Link></h2>
          <h2><Link to='/function2'>기능2</Link></h2>
          <br />
        </div>
        <Routes>
          <Route path="/function1" element={<KoreanDictionary></KoreanDictionary>} />
          <Route path="/function2" element={<WordRelay></WordRelay>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
