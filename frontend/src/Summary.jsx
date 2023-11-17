import React, { useState, useEffect } from 'react';
import { StyledTextarea, SummaryContainer, RightContainer, LeftContainer, TopRightContainer, BottomRightContainer } from './StyledComponents.jsx';
import { getDatabase, ref, onValue } from 'firebase/database';

import app from './firebase.js'; // firebase.js 에서 내보낸 인스턴스
import { TailSpin } from 'react-loader-spinner'; // 기사 가져오는 동안 사용할 로딩 상태 표시

const Summary = () => {
    const [userText, setUserText] = useState(''); // 사용자 요약본
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
            // console.log("data:\n"+data);
            const formattedData = data.replace(/\\n/g, "\n");
            // console.log("수정된 데이터:\n" + formattedData);
            setArticle(formattedData);
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
        setUserText(event.target.value);
    };

    // gpt로부터 보낸 input에 대한 output을 받을 함수
    const talkToGPT = async (input) => {
        try {
            const encodedInput = encodeURIComponent(input);
            const response = await fetch(`http://localhost:3000/api/gpt?q=${encodedInput}`);
            const data = await response.json();
            
            console.log(input);
            console.log(data);
            const messageContent = data[0].message.content;
            console.log(messageContent);

            setIsGPTLoading(false); // gpt 응답 전에 로더 표시 끄기

            return messageContent;
          } catch (error) {
            console.error("Error fetching data:", error);
            setIsGPTLoading(false); // gpt 응답 전에 로더 표시 끄기
            throw error;
          }
            
    }

    // 사용자가 엔터를 누르거나 버튼을 클릭할 때 호출되는 함수
    // 이 함수에서 input을 넘겨줄 때, 사용자 인풋을 가지고 프롬프트를 구성하여 gpt에게 전달한다.
    const handleSubmit = async (input) => {
        input.preventDefault(); // 폼이 실제로 제출되는 것을 방지

        setIsGPTLoading(true); // gpt 답변 로더 켜기

        setSubmittedInput(userText); // 사용자 입력을 저장함.
    
        const prompt = `사용자는 자신의 문해력을 향상시키고 싶은 고등학생이다.

        해야할 작업은 다음과 같다:
        1. 원본 글을 읽고 모범 답안을 생성하라.
        2. 사용자의 요약본을 그대로 출력하라.
        3. 사용자 요약본을 평가하고 조언하라.
        
        1번 작업을 할 때 지켜야 할 사항은 다음과 같다:
        1. 원본 글의 사실을 왜곡하지 않아야 한다.
        2. 원본 글에서 핵심적인 내용이 포함되어야 한다.
        3. 원본 글에 필요한 핵심적인 내용 이외에 세세한 내용은 제외한다.
        4. 300자 내외로 요약한다.
        5. 존댓말을 사용하지 않는다.
        
        3번 작업을 할 때 지켜야 할 사항은 다음과 같다:
        1. 원본 글의 핵심 내용을 포함하고 있는지 평가.
        2. 원본 글의 사실을 왜곡했는지 평가.
        3. 필요하지 않은 내용이 요약에 누락된 것은 언급하지 않는다.
        4. 존댓말을 사용한다.
        
        
        답변의 예시는 다음과 같다:
        
        모범 답안: [요약 내용]
        
        사용자 요약본: [사용자 요약본]
        
        평가: [평가]

        답변을 생성할 때 지켜야 할 때 지켜야 할 사항은 다음과 같다:
        1. 답변의 예시를 반드시 지킬 것.
        
        원본글은 다음과 같다: ${article}
        
        
        사용자 요약본:${userText}`;

        const GPTText = await talkToGPT(prompt); // GPT로부터 받은 응답

        console.log(GPTText);

        setGptOutput(GPTText);
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
                <div>{article}</div>
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
                        value={userText}
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