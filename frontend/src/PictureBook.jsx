import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { ButtonContainer, UpdateButton, FontH, StyledTextarea, PictureBookContainer, PictureBookTop, PictureBookBottom, PictureBookBottomLeft, PictureBookBottomRight, ImageContainer, ArrowButton, CategoryImage, SizedBox } from './StyledComponents.jsx';

import { TailSpin } from 'react-loader-spinner'; // 로딩 상태 표시

import booksData from './booksData';

const PictureBook = () => {
  const [books, setBooks] = useState(booksData); // booksData.js에서 책 정보 가져옴
  const [selectedBook, setSelectedBook] = useState(null); // 선택된 책 상태
  const [imageIndex, setImageIndex] = useState(0); // 이미지 인덱스

  const [userText, setUserText] = useState('3줄 이내로 작성하세요!'); // 사용자 입력
  const [submittedInput, setSubmittedInput] = useState('');
  const [isGPTLoading, setIsGPTLoading] = useState(false); // GPT 답변 로더
  const [gptOutput, setGptOutput] = useState(''); // GPT 답변

  // 선택된 책의 이미지 경로를 생성하는 함수
  const getImagePath = (id, index) => {
      return `/picturebook${String(id).padStart(2, '0')}/${index + 1}.jpg`; // 예시 경로, 실제 경로는 프로젝트에 맞게 조정
  };

  const handleBookClick = (book) => {
      setSelectedBook(book);
      setImageIndex(0);
  };

  const handleNextClick = () => {
    if (selectedBook && selectedBook.pages_cnt > 0){
      setImageIndex((prevIndex) => (prevIndex + 1) % selectedBook.pages_cnt);
    }
  };

  const handlePrevClick = () => {
    if (selectedBook && selectedBook.pages_cnt > 0){
      setImageIndex((prevIndex) => (prevIndex - 1 + selectedBook.pages_cnt) % selectedBook.pages_cnt);
    }
  };

  const handleBackToList = () => {
      setSelectedBook(null); // 책 목록으로 돌아가기
      setGptOutput('');
      setUserText('');
  };

  const talkToGPT = async (input, tpt, mxt) => { //input: 프롬프트, tpt: 온도, mxt: max_tokens
    try {
        const encodedInput = encodeURIComponent(input);
        const encodedTpt = encodeURIComponent(tpt);
        const encodedMxt = encodeURIComponent(mxt);

        const response = await fetch(`http://localhost:3000/api/gpt?q=${encodedInput}&${encodedTpt}&${encodedMxt}`);
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

  // 입력 필드의 값이 바뀔 때 호출되는 함수
  const handleInputChange = (event) => {
    const newText = event.target.value;

    if (newText.split('\n').length <= 3 && newText.length <= 132) {
      setUserText(newText);
    }
    //setUserText(event.target.value);
  };  

  // 사용자가 엔터를 누르거나 버튼을 클릭할 때 호출되는 함수
  const handleSubmit = async (input) => {
    input.preventDefault(); // 폼이 실제로 제출되는 것을 방지
    setIsGPTLoading(true); // gpt 답변 로더 켜기
    setSubmittedInput(userText); // 사용자 입력을 저장함.

    const prompt = `
    사용자는 현재 그림책의 미리보기를 보고 책의 내용을 유추했다.
    사용자가 유추한 내용과 책의 설명을 보고 사용자가 얼마나 유사하게 책의 내용을 유추했는지 이야기해 보아라.

    실제 책의 설명: ${selectedBook.preview}

    사용자 유추: ${userText}
    `;

    try {
      const GPTText = await talkToGPT(prompt, 0.3, 4095);
      console.log(GPTText);
      setGptOutput(GPTText);
      setIsGPTLoading(false); // GPT 응답 로딩 완료
    } catch (error) {
        console.error("Error fetching data:", error);
        setIsGPTLoading(false); // GPT 응답 로딩 완료
    }
  }

  return (
      <PictureBookContainer>
          <PictureBookTop>
              {selectedBook ? (
                  <>
                    <FontH>『 {selectedBook.title} 』</FontH>
                    <ImageContainer>
                      <ArrowButton className="prev" onClick={handlePrevClick} disabled={imageIndex === 0}>
                        ◀
                      </ArrowButton>
                      <img 
                      src={getImagePath(selectedBook.id, imageIndex)} 
                      alt="Book Preview"
                      style={{ width: '360px', height: '360px' }}
                      />
                      <ArrowButton className="next" onClick={handleNextClick} disabled={selectedBook && imageIndex === selectedBook.pages_cnt - 1}>
                        ▶
                      </ArrowButton>
                    </ImageContainer>
                    {/* <button onClick={handleBackToList}>🔙</button> */}
                    <SizedBox></SizedBox>

                    <PictureBookBottom>
                      <PictureBookBottomLeft>
                        {/* 사용자 입력창 */}
                        <form onSubmit={handleSubmit}>
                          <StyledTextarea
                            rows="3"
                            maxLength="132"
                            value={userText}
                            onChange={handleInputChange}
                            onClick={() => { if (userText === '3줄 이내로 작성하세요!') setUserText(''); }}
                          />
                          <br></br>

                          <ButtonContainer>
                            <UpdateButton onClick={handleBackToList} size='3vh'>
                              📂 목록
                            </UpdateButton> 
                            <ButtonContainer content='center'><UpdateButton type="submit">✔</UpdateButton></ButtonContainer>  
                          </ButtonContainer>  

                        </form>
                      </PictureBookBottomLeft>
                      <PictureBookBottomRight>
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
                      </PictureBookBottomRight>
                    </PictureBookBottom>

                  </>
              ) : (
                  <>
                    <FontH>책 목록</FontH>
                    <div>
                      {books.map((book) => (
                        <CategoryImage>
                        <div key={book.id} onClick={() => handleBookClick(book)} style={{ cursor: 'pointer' }}>
                            {/* {book.title} */}
                            <img src={getImagePath(book.id, 0)} alt="Book Preview" style={{ width: '200px', height: '200px' }} />  
                        </div>
                        <br></br>
                        </CategoryImage>
                      ))}
                    </div>
                    
                  </>
              )}
          </PictureBookTop>
          
      </PictureBookContainer>
  );
}


export default PictureBook;