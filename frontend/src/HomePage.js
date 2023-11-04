import React, { useState } from 'react';
import { BaseContainer, HeadContainer, LoginContainer, Logo, HeadText, FunctionContainer, StyledLink, StyledA, FunctionWrapper, SizedBox, ContactContainer, Tooltip } from './StyledComponents.jsx';


const HomePage = () => {

    const [isTooltipVisible, setTooltipVisible] = useState(false);
  
    return (
      <FunctionWrapper>
        <SizedBox size='10px'></SizedBox>
        <HeadContainer>
          <HeadText size='60px'>
            <StyledLink to='/'>Literacy</StyledLink>
          </HeadText>
        </HeadContainer>
        
        <SizedBox size='10px'></SizedBox>
        <SizedBox></SizedBox>
        <StyledLink to='/function1' isHovered={true}>
          <FunctionContainer onMouseEnter={() => setTooltipVisible(true)} onMouseLeave={() => setTooltipVisible(false)}>
            긴 글 요약
            <Tooltip show={isTooltipVisible}>글 요약하여 문해력을 길러보세요.</Tooltip>
          </FunctionContainer>
        </StyledLink>
        <SizedBox></SizedBox>
        <StyledLink to='/function2' isHovered={true}>
          <FunctionContainer onMouseEnter={() => setTooltipVisible(true)} onMouseLeave={() => setTooltipVisible(false)}>
            그림 퀴즈
            <Tooltip show={isTooltipVisible}>그림 퀴즈를 풀어보세요.</Tooltip>
          </FunctionContainer>
        </StyledLink>
        <SizedBox></SizedBox>
        <StyledLink to='/function3' isHovered={true}>
          <FunctionContainer onMouseEnter={() => setTooltipVisible(true)} onMouseLeave={() => setTooltipVisible(false)}>
            끝말잇기
            <Tooltip show={isTooltipVisible}>끝말잇기로 어휘력을 늘려봐요.</Tooltip>
          </FunctionContainer>
        </StyledLink>
        
      </FunctionWrapper>
    ); 
  }

  export default HomePage;