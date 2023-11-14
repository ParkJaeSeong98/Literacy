import React, { useState, useEffect } from 'react';
import { StyledTextarea, SummaryContainer, RightContainer, LeftContainer, TopRightContainer, BottomRightContainer } from './StyledComponents.jsx';
import { getDatabase, ref, onValue } from 'firebase/database';

import app from './firebase.js'; // firebase.js 에서 내보낸 인스턴스
import { TailSpin } from 'react-loader-spinner'; // 기사 가져오는 동안 사용할 로딩 상태 표시

const Summary = () => {

    const [userInput, setUserInput] = useState('');
    const [gptOutput, setGptOutput] = useState('');
    const [submittedInput, setSubmittedInput] = useState('');

    const [article, setArticle] = useState(''); // 기사를 저장할 상태 변수
    const [isArticleLoading, setIsArticleLoading] = useState(false); // 데이터 로딩 상태를 추적하는 상태 변수 (기사 가져올 때 로더)
    const [isGPTLoading, setIsGPTLoading] = useState(false); // GPT 답변 로더

    const [currentArticleKey, setCurrentArticleKey] = useState(0); // 현재 보고 있는 기사의 키
    const maxArticleKey = 4; // 기사 키의 최대값

    // currentArticleKey 값이 변하면(다음 또는 이전 버튼 클릭 시) DB에서 데이터 가져오도록 함
    useEffect(() => {
        setIsArticleLoading(true); // 데이터 로딩 시작
        const db = getDatabase(app);
        const articleRef = ref(db, `articles/society/${currentArticleKey}`); // 동적으로 키를 업데이트

        // onValue는 이벤트 리스너 해제를 위한 함수를 반환
        const unsubscribe = onValue(articleRef, (snapshot) => {
            const data = snapshot.val();
            setArticle(data);
            setIsArticleLoading(false); // 로딩 완료
        }, (error) => { 
            console.error(error);
            setIsArticleLoading(false); // 로딩 완료
        });

        // cleanup function에서는 반환된 함수를 호출
        return () => {
            unsubscribe(); // 리스너 해제
        };
    }, [currentArticleKey]); // currentArticleKey가 변경될 때 useEffect가 재실행

    // 입력 필드의 값이 바뀔 때 호출되는 함수
    const handleInputChange = (event) => {
        setUserInput(event.target.value);
    };

    // gpt로부터 보낸 input에 대한 output을 받을 함수
    const talkToGPT = async (input) => {
        try {
            const response = await fetch(`http://localhost:3000/api/gpt?q=${input}`);
            const data = await response.json();
            
            console.log(data);
            const messageContent = data[0].message.content;
            console.log(messageContent);

            return messageContent;
          } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
          }
            
    }

    // 사용자가 엔터를 누르거나 버튼을 클릭할 때 호출되는 함수
    // 이 함수에서 input을 넘겨줄 때, 사용자 인풋을 가지고 프롬프트를 바꿔서 gpt에게 전달한다.
    const handleSubmit = async (input) => {
        input.preventDefault(); // 폼이 실제로 제출되는 것을 방지

        setIsGPTLoading(true); // gpt 답변 로더 켜기

        setSubmittedInput(userInput); // 사용자 입력을 저장함.
    
        const format = "ChatGPT가 요약한 내용: (네가 요약한 내용), 사용자가 요약한 내용: (사용자 요약본의 원본), 사용자 요약본 평가: (사용자 요약본에서 원본 글의 사실과 다른 점)";

        const prompt = `내가 준 "원본 글"을 요약하고, "사용자 요약본"과 비교해서 다음과 같은 "양식"으로 
        답변해줘. 양식: ${format}, 원본 글: ${article} 사용자 요약본 ${userInput}`;

        console.log(prompt);
        console.log(userInput);

        const output = await talkToGPT(prompt); // GPT로부터 받은 응답

        setIsGPTLoading(false); // gpt 응답 전에 로더 표시 끄기
        setGptOutput(output);

        if (gptOutput.includes('\n')) {
            console.log(gptOutput);
            console.log('GPT output contains newline characters');
        } else {
            console.log(gptOutput);
            console.log(`GPT output don't contain newline characters`);
        }
    };

    // '다음' 버튼 핸들러
    const handleNext = () => {
        if (currentArticleKey < maxArticleKey) {
            setCurrentArticleKey(currentArticleKey + 1);
        }
    };

    // '이전' 버튼 핸들러
    const handlePrev = () => {
        if (currentArticleKey > 0) {
            setCurrentArticleKey(currentArticleKey - 1);
        }
    };

    return (
        <SummaryContainer>
          <LeftContainer>
            <h1>글 내용</h1>
            {/* 로딩 인디케이터를 조건부 렌더링 */}
            {isArticleLoading ? (
                <TailSpin
                color="#00BFFF" // 로더의 색상
                height={100} // 로더의 높이
                width={100} // 로더의 너비
                />
            ) : (
                <div> {article && <p>{article}</p>} </div>
            )}

            {/* 기사 네비게이션 버튼 */}
            <button onClick={handlePrev} disabled={currentArticleKey === 0}>
                이전
            </button>
            <button onClick={handleNext} disabled={currentArticleKey === maxArticleKey}>
                다음
            </button>
          </LeftContainer>
          <RightContainer>

            <TopRightContainer>
            {/* 사용자 입력창 */}
                <form onSubmit={handleSubmit}>
                    <StyledTextarea
                        rows="10"
                        value={userInput}
                        onChange={handleInputChange}
                    />
                    <br></br>
                    <button type="submit">제출</button>
                </form>
            </TopRightContainer>

            <BottomRightContainer>

                {/* gpt output */}
                {isGPTLoading ? (
                    <TailSpin
                    color="#00BFFF" // 로더의 색상
                    height={100} // 로더의 높이
                    width={100} // 로더의 너비
                    />
                ) : (
                    <div>{gptOutput}</div>
                )}
            </BottomRightContainer>    
          </RightContainer>    
        </SummaryContainer>
    );

}

export default Summary;