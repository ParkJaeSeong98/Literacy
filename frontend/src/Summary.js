import React, { useState, useEffect } from 'react';
import { StyledForm, StyledInput, StyledButton, StyledModal, StyledTextarea } from './StyledComponents.jsx';

const Summary = () => {
    
    const [userInput, setUserInput] = useState('');
    const [gptOutput, setGptOutput] = useState('');
    const [submittedInput, setSubmittedInput] = useState('');

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

            console.log(messageContent)
    
            return messageContent;
          } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
          }
            
    }

    // 사용자가 엔터를 누르거나 버튼을 클릭할 때 호출되는 함수
    const handleSubmit = async (input) => {
        input.preventDefault(); // 폼이 실제로 제출되는 것을 방지

        setSubmittedInput(userInput); // 사용자 입력을 저장합니다.
    
        const output = await talkToGPT(userInput); // GPT로부터 응답을 받습니다.

        setGptOutput(output);        
    };

    return (
        <div>
            <h1>긴글요약</h1>

            <form onSubmit={handleSubmit}>
                <StyledTextarea
                    // id="userText"
                    // name="userText"
                    rows="10"
                    value={userInput}
                    onChange={handleInputChange}
                />
                <br></br>
                <button type="submit">제출</button>
            </form>

            {gptOutput && <p>{gptOutput}</p>}
        </div>
    );

}

export default Summary;