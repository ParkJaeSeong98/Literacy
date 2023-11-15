import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { BottomRightContainer, LeftContainer, RightContainer, SummaryContainer, TopRightContainer } from './StyledComponents.jsx';

const PictureBook = () => {
    return (
    <SummaryContainer>       
      <LeftContainer>사진</LeftContainer>

      <RightContainer>
        <TopRightContainer>입력</TopRightContainer>
        <BottomRightContainer>결과</BottomRightContainer>
      </RightContainer>  
    </SummaryContainer>
    );
}

export default PictureBook;