import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledInput = styled.input`
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  text-align: center;
`;

const StyledButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  outline: none;
`;

const StyledModal = styled(Modal)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  width: 600px;
  padding: 40px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;


// API 활용한 끝말잇기
const WordRelay = () => {
    const [word, setWord] = useState('남자');
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const [words, setWords] = useState([]);
    const [previous, setPrevious] = useState([word]); // 사용했던 단어를 담을 공간
    const [modalIsOpen, setModalIsOpen] = useState(false);  // 모달 팝업 위한 변수
    const inputEl = React.useRef(null);

    const [meaning, setMeaning] = useState([]);
    const [randomWord, setRandomWord] = useState(['발전', '지구', '행성']); // 임시 오답 단어 추후에 DB에서 가져와서 3 발전,지구,행성 대신 다른 단어로 무작위 하게 이 배열을 채우면 됨.
    const [wrongAnswer, setWrongAnswer] = useState([]);

    const getJsonFromDictionaryAPI = async (query) => {
      try {
        const response = await fetch(`http://localhost:3000/api/search?q=${query}&method=start&target=1`);
        // method: start, target: 1
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
        throw error; // 에러를 상위 함수에 전달
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
    const getMeaning = async (input) => {
      try {
        const response = await fetch(`http://localhost:3000/api/search?q=${input}&method=exact&target=1`);
        const data = await response.json();
        
        const fetchedMeaning = data.channel.item.map(item => item.sense.map(s => s.definition));
        
        console.log(fetchedMeaning);

        return fetchedMeaning;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    };

    // 실제로 존재하는 단어인지 검사할 함수
    const isRealWord = async (input) => {
      try {
        const response = await fetch(`http://localhost:3000/api/search?q=${input}&method=exact&target=1`);
        // method: exact, target: 1
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
        return null; // 이 경우에는 throw를 쓸 수 없어서 특별한 값을 반환하도록 함.
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
  
    function MultipleChoiceQuestion() {
      const [selectedAnswer, setSelectedAnswer] = useState('');
      const [result, setResult] = useState('');

      const handleAnswerSubmit = () => {
        if (selectedAnswer === 'apple') {
          setResult('정답입니다!');
          setModalIsOpen(false);
        } else {
          setResult('틀렸습니다. 다시 시도하세요.');
        }
      };
    
      return (
        <div>
          <label>
            <input
              type="radio"
              name="answer"
              value="apple"
              checked={selectedAnswer === 'apple'}
              onChange={() => setSelectedAnswer('apple')}
            />
            {meaning}
          </label>
          <br />
    
          <label>
            <input
              type="radio"
              name="answer"
              value="carrot"
              checked={selectedAnswer === 'carrot'}
              onChange={() => setSelectedAnswer('carrot')}
            />
            {wrongAnswer[0]}
          </label>
          <br />
    
          <label>
            <input
              type="radio"
              name="answer"
              value="banana"
              checked={selectedAnswer === 'banana'}
              onChange={() => setSelectedAnswer('banana')}
            />
            {wrongAnswer[1]}
          </label>
          <br />
    
          <label>
            <input
              type="radio"
              name="answer"
              value="potato"
              checked={selectedAnswer === 'potato'}
              onChange={() => setSelectedAnswer('potato')}
            />
            {wrongAnswer[2]}
          </label>
          <br />
    
          <button onClick={handleAnswerSubmit}>제출</button>
          <p>{result}</p>
        </div>
      );
    }
  
    // 사용자가 입력한 단어에 대한 처리를 담당하는 함수
    const onSubmitForm = async (e) => {
      e.preventDefault();
  
      try {
        const isReal = await isRealWord(value); // null은 false로 처리됨.
        const isUsed = !(previous.includes(value)); // previous 안에 입력한 단어가 존재하는지 판단할 변수
        
        // 정답 및 오답 뜻 넣기
        const tempMeaning = await getMeaning(value); // 정답 뜻
        const firstAnswerRandomIndex = Math.floor(Math.random() * tempMeaning.length); // 정답 랜덤 인덱스
        setMeaning(tempMeaning[firstAnswerRandomIndex]); // 정답 설정

        const tempWrong1 = await getMeaning(randomWord[0]); // 오답1 뜻
        const tempWrong2 = await getMeaning(randomWord[1]); // 오답2 뜻
        const tempWrong3 = await getMeaning(randomWord[2]); // 오답3 뜻

        const secondAnswerRandomIndex = Math.floor(Math.random() * tempWrong1.length); // 오답1 랜덤 인덱스
        const thirdAnswerRandomIndex = Math.floor(Math.random() * tempWrong2.length); // 오답2 랜덤 인덱스
        const forthAnswerRandomIndex = Math.floor(Math.random() * tempWrong3.length); // 오답3 랜덤 인덱스

        setWrongAnswer([tempWrong1[secondAnswerRandomIndex], tempWrong2[thirdAnswerRandomIndex], tempWrong3[forthAnswerRandomIndex]]); // 오답 설정

        if ((convertDueum(word[word.length - 1]) === value[0]) && (isReal) && (isUsed) && (value.length > 1))  {
          await getJsonFromDictionaryAPI(convertDueum(value[value.length - 1]));
          setResult('딩동댕');
          setPrevious(previous => [...previous, value]);
          setValue('');
          inputEl.current.focus();
  
          // 모달 팝업
          setModalIsOpen(true);
  
        } else {
          if (isReal === null) {
            setResult('죄송합니다. 다시 시도해주세요.');
            setValue('');
            inputEl.current.focus();
          } else {
            setResult('땡');
            setValue('');
            inputEl.current.focus();
          }
        }
  
      } catch (error){
        console.error("Error:", error);
        setResult('죄송합니다. 다시 시도해주세요.');
        setValue('');
        inputEl.current.focus();
      }
      
    };
  
    return (
      <>
        <div className="Word">제시 단어: {word}</div>
        <div>사용했던 단어 목록: {previous}</div>
        <StyledForm onSubmit={onSubmitForm}>
          <StyledInput
            ref={inputEl}
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
          />
          <StyledButton>입력!</StyledButton>
        </StyledForm>
        <StyledModal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
          <h2>{previous[previous.length - 2]}의 뜻을 고르세요!</h2>
          <MultipleChoiceQuestion></MultipleChoiceQuestion>
        </StyledModal>
        <div>{result}</div>
      </>
    );
  }

  export default WordRelay;