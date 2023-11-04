import WordRelay from './WordRelay';
import Summary from './Summary';
import PictureBook from './PictureBook';
import React, { useState } from 'react';
import { Routes, Route, BrowserRouter, Link, useNavigate, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import './fonts/fonts.css';

const BaseContainer = styled.div`
  width: 100vw; 
  height: 100vh; 
  background-color: #D2B48C;  
`;

const HeadContainer = styled.div`       
  display: flex;  // Row로 
  padding-left: 20px;
  padding-top: 20px;
  background-color: #D2B48C;
`;

const LoginContainer = styled.div`
  margin-left: auto;
  margin-right: 20px;
`;

const Logo = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

const HeadText = styled.div`
  font-size: ${props => props.size || '30px'};
  font-family: 'logofont';
  text-decoration: none; /* 하이퍼링크 스타일 제거 */
`;

const FunctionContainer = styled.div`
  border: 2px solid #000;
  border-radius: 20px; /* 둥근 테두리 설정 */
  width: 200px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 20px;
  font-family: 'logofont';
`;

const StyledLink = styled(Link)`
  text-decoration: none; 
  color: #000;
  //&:hover {
  //  color: #ff0000; /* 호버 시 텍스트 색상 변경 */
  //}

  ${props => props.isHovered && `
    &:hover {
      color: #ff0000;
    }
  `}
`;

const StyledA = styled.a`
  text-decoration: none; 
  color: #000;
  font-size: 20px;
  font-family: 'logofont';
  text-decoration: none; /* 하이퍼링크 스타일 제거 */
`;

const FunctionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SizedBox = styled.div`
  margin: ${props => props.size || '20px'};
`;

const ContactContainer = styled.div`
  text-align: center;
  padding: 10px;
  position: absolute;
  bottom: 0;
  //background-color: #f5f5f5;
  //width: 100%;
`;

const Tooltip = styled.div`
  display: ${props => (props.show ? 'block' : 'none')};
  position: absolute;
  top: 40;
  left: 60%; /* 우측으로 이동 */
  background-color: #333;
  color: white;
  padding: 5px;
`;

const BaseLayout = () => {

  return (
    <BaseContainer>
      <HeadContainer>
        <Logo src='/booklogo.png' alt='logo' />
        <HeadText>
          <StyledLink to='/'>Literacy</StyledLink>
        </HeadText>
        <LoginContainer>
          <StyledLink to='/login'><HeadText>Login/Register</HeadText></StyledLink>
        </LoginContainer>
      </HeadContainer>

      <FunctionWrapper>
        {/* <SizedBox size='10px'></SizedBox>
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
        </StyledLink> */}

        <Outlet />
        
        <ContactContainer>
        <img src='/gitlogo.png' alt='logo' margin-top='10' width='25' height='25' /><StyledA href='https://github.com/ParkJaeSeong98/Literacy' target='_blank'> Github</StyledA>
        </ContactContainer>
      </FunctionWrapper>

    </BaseContainer>
  );
}

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


function App() {
  return (
    <BrowserRouter>
      {/* <div>
        <BaseLayout></BaseLayout>
      
        <Routes>
          <Route path="/function1" element={<Summary></Summary>} />
          <Route path="/function2" element={<PictureBook></PictureBook>} />
          <Route path="/function3" element={<WordRelay></WordRelay>} />
        </Routes>
      </div> */}
      <Routes>
        <Route element={<BaseLayout></BaseLayout>}>
          <Route path="/" element={<HomePage></HomePage>} />
          <Route path="/function1" element={<Summary></Summary>} />
          <Route path="/function2" element={<PictureBook></PictureBook>} />
          <Route path="/function3" element={<WordRelay></WordRelay>} />
          <Route path="/login" element={<></>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
