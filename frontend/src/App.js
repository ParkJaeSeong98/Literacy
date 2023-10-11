import './App.css';
import React, { useState } from 'react';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';

function Feature1() {
  return <h2>기능1입니다</h2>;
}

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
          <Route path="/function1" element={<Feature1></Feature1>} />
          <Route path="/function2" element={<WordRelay></WordRelay>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
