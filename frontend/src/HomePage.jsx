import React, { useState } from 'react';
import { BaseContainer, HeadContainer, LoginContainer, Logo, HeadText, FunctionContainer, StyledLink, StyledA, FunctionWrapper, SizedBox, ContactContainer, Tooltip,
GitLogo } from './StyledComponents.jsx';


const HomePage = () => {

    const [isTooltipVisible, setTooltipVisible] = useState(false);
  
    return (
      <FunctionWrapper>
        <SizedBox size='1.5vh'></SizedBox>
        <HeadContainer>
          <HeadText size='8vh'>
            <StyledLink to='/'>Literacy</StyledLink>
          </HeadText>
        </HeadContainer>
        
        <SizedBox size='1.5vh'></SizedBox>
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
            <Tooltip show={isTooltipVisible}>그림책 내용을 생각해보아요.</Tooltip>
          </FunctionContainer>
        </StyledLink>
        <SizedBox></SizedBox>
        <StyledLink to='/function3' isHovered={true}>
          <FunctionContainer onMouseEnter={() => setTooltipVisible(true)} onMouseLeave={() => setTooltipVisible(false)}>
            끝말잇기
            <Tooltip show={isTooltipVisible}>끝말잇기로 어휘력을 늘려봐요.</Tooltip>
          </FunctionContainer>
        </StyledLink>
        <SizedBox></SizedBox>

        <ContactContainer>
          <GitLogo src='/gitlogo.png' alt='logo' />
          <StyledA href='https://github.com/ParkJaeSeong98/Literacy' target='_blank'> Github</StyledA>
        </ContactContainer>
        
      </FunctionWrapper>
    ); 
  }

  export default HomePage;