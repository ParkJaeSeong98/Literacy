import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { PictureBookContainer, PictureBookTop, PictureBookBottom, PictureBookBottomLeft, PictureBookBottomRight, ImageContainer, ArrowButton } from './StyledComponents.jsx';

import booksData from './booksData';

const PictureBook = () => {
  const [books, setBooks] = useState(booksData);
  const [selectedBook, setSelectedBook] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);

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
  };

  return (
      <PictureBookContainer>
          <PictureBookTop>
              {selectedBook ? (
                  <>
                    <button onClick={handleBackToList}>목록으로</button>
                    <h1>{selectedBook.title}</h1>
                    <ImageContainer>
                      <ArrowButton className="prev" onClick={handlePrevClick} disabled={imageIndex === 0}>
                        ◀
                      </ArrowButton>
                      <img 
                      src={getImagePath(selectedBook.id, imageIndex)} 
                      alt="Book Preview"
                      style={{ width: '300px', height: '300px' }}
                      />
                      <ArrowButton className="next" onClick={handleNextClick} disabled={selectedBook && imageIndex === selectedBook.pages_cnt - 1}>
                        ▶
                      </ArrowButton>
                    </ImageContainer>
                  </>
              ) : (
                  <>
                    <h1>책 목록</h1>
                    <ul>
                      {books.map((book) => (
                        <li key={book.id} onClick={() => handleBookClick(book)} style={{ cursor: 'pointer' }}>
                            {book.title}
                        </li>
                      ))}
                    </ul>
                  </>
              )}
          </PictureBookTop>
          <PictureBookBottom>
            <PictureBookBottomLeft>입력</PictureBookBottomLeft>
            <PictureBookBottomRight>결과</PictureBookBottomRight>
          </PictureBookBottom>
      </PictureBookContainer>
  );
}


export default PictureBook;