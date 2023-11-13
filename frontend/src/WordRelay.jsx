import React, { useState, useEffect, useRef } from 'react';
import { StyledForm, StyledInput, StyledButton, StyledModal, BaseContainer, HeadContainer, LoginContainer, Logo, HeadText, FunctionContainer, StyledLink, StyledA, FunctionWrapper, SizedBox, ContactContainer, Tooltip, ColumnContainer, DraggableContainerWrapper, DraggableContent } from './StyledComponents.jsx';
import { getDatabase, ref, onValue } from 'firebase/database';
// firebase.js 에서 내보낸 인스턴스
import app from './firebase.js';

// API 활용한 끝말잇기
const WordRelay = () => {
    const [word, setWord] = useState('');
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const [words, setWords] = useState([]);
    const [previous, setPrevious] = useState([word]); // 사용했던 단어를 담을 공간
    const [modalIsOpen, setModalIsOpen] = useState(false);  // 모달 팝업 위한 변수
    const [RmodalIsOpen, setRModalIsOpen] = useState(true); // 규칙보여줄 모달
    const inputEl = React.useRef(null);

    const [meaning, setMeaning] = useState([]);

    const [meaningPool, setMeaningPool] = useState([]); // 뜻을 가져온 정답 pool
    const [wrongAnswerPool1, setWrongAnswerPool1] = useState([]); // 오답 pool 1
    const [wrongAnswerPool2, setWrongAnswerPool2] = useState([]); // 오답 pool 2 
    const [wrongAnswerPool3, setWrongAnswerPool3] = useState([]); // 오답 pool 3 

    const [randomWord, setRandomWord] = useState([]); // 임시 오답 단어 

    const [answers, setAnswers] = useState([]); // 답 한 곳에 모으기

    const [firstAnswerIndex, setFirstAnswerIndex] = useState(0); // 정답 인덱스를 관리할 상태

    // firebase DB에서 단어를 가져오는 함수
    const fetchFireBase = async () => {
      // Firebase Realtime Database 인스턴스 가져오기
      const db = getDatabase(app);

      // 'words' 경로의 참조 가져오기
      const wordsRef = ref(db, 'words');

      // 참조에 대한 값 가져오기
      onValue(wordsRef, (snapshot) => {
        const data = snapshot.val();
        // 데이터가 객체라면 배열로 변환 (예: { word1: 'apple', word2: 'banana' } => ['apple', 'banana'])
        const wordsArray = data ? Object.values(data) : [];

        // 상태 업데이트
        setRandomWord(wordsArray); // 단어 목록에서 처음 10개만 가져오기
      }, {
        onlyOnce: true // 데이터가 한 번만 읽히도록 설정
      });
    }

    useEffect(() => {
      if (randomWord.length > 0) {
        const randIndex = Math.floor(Math.random() * randomWord.length);
        setWord(randomWord[randIndex]);
        setPrevious([randomWord[randIndex]]);
      }
    }, [randomWord]);
    

    // 컴포넌트가 마운트될 때 데이터베이스에서 단어 가져오기
    useEffect(() => {
      fetchFireBase();
    }, []);

    const getJsonFromDictionaryAPI = async (query) => {
      try {
        const response = await fetch(`http://localhost:3000/api/search?q=${query}&method=start&target=1`);
        // method: start, target: 1
        const data = await response.json();
        let fetchedWords = data.channel.item.map(item => item.word.replace(/[-^]/g, '')).filter(word => word.length > 1); 
        // '-' 이거 제거하고, 길이 1인거 제외
        //console.log(fetchedWords.length);
        console.log(fetchedWords);
        console.log(randomWord);
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

    useEffect(() => {
      if ((meaningPool.length > 0) && (wrongAnswerPool1.length > 0) && (wrongAnswerPool2.length > 0) && (wrongAnswerPool3.length > 0)) {

        console.log(wrongAnswerPool1);
        console.log(wrongAnswerPool2);
        console.log(wrongAnswerPool3);

        const secondIndex = Math.floor(Math.random() * wrongAnswerPool1.length); // 오답1 랜덤 인덱스
        const thirdIndex = Math.floor(Math.random() * wrongAnswerPool2.length); // 오답2 랜덤 인덱스
        const forthIndex = Math.floor(Math.random() * wrongAnswerPool3.length); // 오답3 랜덤 인덱스

        // 답안 선택지들 모아 놓기
        const combinedAnswers = [meaningPool[firstAnswerIndex], wrongAnswerPool1[secondIndex], wrongAnswerPool2[thirdIndex], wrongAnswerPool3[forthIndex]];

        // 답안 랜덤으로 섞기
        for (let i = combinedAnswers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [combinedAnswers[i], combinedAnswers[j]] = [combinedAnswers[j], combinedAnswers[i]];
        }

        console.log(combinedAnswers);
        setAnswers(combinedAnswers);
      }
    }, [meaningPool, wrongAnswerPool1, wrongAnswerPool2, wrongAnswerPool3, firstAnswerIndex]);
  
    // 단어 뜻 가져오는 함수
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
  
    const updateAnswerChoices = async () => {
      let newIndex = firstAnswerIndex + 1; // 정답의 인덱스를 한 칸 올림

      if (newIndex >= meaningPool.length) { // 정답의 인덱스가 범위를 벗어나지 않도록
        newIndex = 0;
      }

      setMeaning(meaningPool[newIndex]); // 정답 업데이트

      setFirstAnswerIndex(newIndex); // 인덱스 설정
      
    };

    

    function MultipleChoiceQuestion() {
      const [selectedAnswer, setSelectedAnswer] = useState('');
      const [result, setResult] = useState('');
      
      const choices = answers;

      const handleAnswerSubmit = () => {
        if (selectedAnswer === meaningPool[firstAnswerIndex]) {
          setResult('정답입니다!');
          setFirstAnswerIndex(0); // 인덱스 초기화
          setModalIsOpen(false);
        } else {
          setResult('틀렸습니다. 다시 시도하세요.');
        }
      };
    
      return (
        <div>
          {choices.map((answer, index) => (
            <div key={index}>
              <label>
                <input
                  type="radio"
                  name="answer"
                  value={answer}
                  checked={selectedAnswer === answer}
                  onChange={() => setSelectedAnswer(answer)}
                />
                {answer}
              </label>
              <br />
            </div>
          ))}
          <button onClick={handleAnswerSubmit}>제출</button>
          <button onClick={updateAnswerChoices} disabled={firstAnswerIndex === meaningPool.length - 1}>업데이트</button>
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
        
        // console.log(randomWord);

        // 정답 및 오답 뜻 넣기
        const tempMeaning = await getMeaning(value); // 정답 뜻
        setMeaningPool(tempMeaning); // meaingPool에 가져온 뜻 복사

        function getThreeUniqueRandomIndexes() {
          const indexes = new Set();
          while (indexes.size < 3) {
            const randomIndex = Math.floor(Math.random() * randomWord.length);
            indexes.add(randomIndex);
          }
          return Array.from(indexes);
        }

        const uniqueRandomIndex = getThreeUniqueRandomIndexes();

        // console.log(uniqueRandomIndex);

        const tempWrongAnswer1 = await getMeaning(randomWord[uniqueRandomIndex[0]]); // 오답1 뜻
        const tempWrongAnswer2 = await getMeaning(randomWord[uniqueRandomIndex[1]]); // 오답2 뜻
        const tempWrongAnswer3 = await getMeaning(randomWord[uniqueRandomIndex[2]]); // 오답3 뜻

        setWrongAnswerPool1(tempWrongAnswer1); // wrongAnswerPool1에 가져온 오답들 뜻 복사
        setWrongAnswerPool2(tempWrongAnswer2);
        setWrongAnswerPool3(tempWrongAnswer3);
      

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

    const RulesModal = () => {
    
      return (
        <StyledModal
          isOpen={RmodalIsOpen}
          onRequestClose={() => setRModalIsOpen(false)}
          shouldCloseOnEsc={false} // ESC 키로 닫기 비활성화
          shouldCloseOnOverlayClick={false} // 모달 외부 클릭으로 닫기 비활성화
        >
          <h2>끝말잇기 규칙</h2>
          <ul>
            <li>사전에 등재된 명사만 사용할 수 있어요.</li>
            <li>두음법칙 반드시 적용시켜야 해요.</li>
            <li>이미 사용한 단어와 한 글자 단어는 사용할 수 없어요.</li>
          </ul>
          <button onClick={() => setRModalIsOpen(false)}>확인</button>
        </StyledModal>
      );
    }

    const DraggableContainer = () => {

      const contentRef = useRef();

      useEffect(() => {
        // 스크롤이 항상 가장 오른쪽에 위치하도록 설정
        contentRef.current.scrollLeft = contentRef.current.scrollWidth;
      }, [previous]);
    
      return (
        <DraggableContainerWrapper>
          <DraggableContent ref={contentRef}>
            {previous.join(' ')}
          </DraggableContent>
        </DraggableContainerWrapper>
      );
    }
  
    return (
      <>
        <RulesModal></RulesModal>

        <SizedBox size='1.5vh'></SizedBox>
        <ColumnContainer>
          <HeadText size='8vh'>제시 단어</HeadText>
          <SizedBox></SizedBox>
          <HeadText size='8vh'>" {word} "</HeadText>
          <SizedBox size='1.5vh'></SizedBox>
          <HeadText size='8vh'>{result}</HeadText>

          <DraggableContainer></DraggableContainer>
          
        </ColumnContainer>

        <StyledForm onSubmit={onSubmitForm}>
          <StyledInput
            ref={inputEl}
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
          />
          <StyledButton>입력!</StyledButton>
        </StyledForm>
        <StyledModal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} shouldCloseOnEsc={false} shouldCloseOnOverlayClick={false}>
          <h2>{previous[previous.length - 2]}의 뜻을 고르세요!</h2>
          <MultipleChoiceQuestion></MultipleChoiceQuestion>
        </StyledModal>

      </>
    );
  }

  export default WordRelay;