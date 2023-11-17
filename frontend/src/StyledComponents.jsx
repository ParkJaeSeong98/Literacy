import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import './fonts/fonts.css';

//베이스 + 홈페이지

export const BaseContainer = styled.div`
  width: 100vw; 
  height: 100vh; 
  background-color: #D2B48C;  
  overflow: auto;
`;

export const HeadContainer = styled.div`       
  display: flex;  // Row로 
  padding-top: 2vh;
  background-color: #D2B48C;
`;

export const LoginContainer = styled.div`
  margin-left: auto;
  margin-right: 1.5vw;
`;

export const Logo = styled.img`
  width: 3vw;
  padding-left: 1.5vw;
  padding-top: 0.5vh;
  height: 4vh;
  margin-right: 0.6vw;
`;

export const HeadText = styled.div`
  font-size: ${props => props.size || '4.5vh'};
  font-family: 'logofont';
  text-decoration: none; /* 하이퍼링크 스타일 제거 */
`;

export const FunctionContainer = styled.div`
  border: 2px solid #000;
  border-radius: 20px; /* 둥근 테두리 설정 */
  width: 12vw;
  height: 13vh;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 2.7vh;
  font-family: 'logofont';
`;

export const StyledLink = styled(Link)`
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

export const StyledA = styled.a`
  text-decoration: none; 
  color: #000;
  font-size: 2.7vh;
  font-family: 'logofont';
  text-decoration: none; /* 하이퍼링크 스타일 제거 */
`;

export const FunctionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SizedBox = styled.div`
  margin: ${props => props.size || '3vh'};
`;

export const ContactContainer = styled.div`
  text-align: center;
  padding: 10px;
  position: absolute;
  bottom: 0;
  //background-color: #f5f5f5;
  //width: 100%;
`;

export const Tooltip = styled.div`
  display: ${props => (props.show ? 'block' : 'none')};
  position: absolute;
  top: 40;
  left: 60vw; /* 우측으로 이동 */
  background-color: #333;
  color: white;
  padding: 5px;
`;

// 끝말잇기

export const ColumnContainer = styled.div`       
  display: flex;  
  flex-direction: column;
  padding-top: 2vh;
  background-color: #D2B48C;
  align-items: center;
`;

export const StyledForm = styled.form`
  margin-top: 5vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledInput = styled.input`
  font-family: 'previous';
  font-size: 3.5vh;
  padding: 2vh;
  margin-bottom: 0.5vh;
  border: 4px solid #000; /* 검정 테두리 추가 */
  outline: none;
  text-align: center;
  background-color: #D2B48C;
`;

export const StyledButton = styled.button`
font-family: 'logofont';
padding: 10px 20px;
background-color: #ffffff;
color: #333;
border: 2px solid #333;
border-radius: 12px;
cursor: pointer;
transition: background-color 0.3s, color 0.3s, border-color 0.3s; /* 트랜지션 추가 */

&:hover {
  background-color: #333;
  color: #ffffff;
  border-color: #ffffff;
}

&:active {
  background-color: #1a1a1a;
  border-color: #1a1a1a;
}
`;

export const StyledModal = styled(Modal)`
  //text-align: center;
  font-family: 'logofont';
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  width: ${props => props.size || '30vw'};
  padding: 40px;
  padding-top: 30px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
`;

// 끝말잇기

export const StyledModalButton = styled.button`
  font-family: 'logofont';
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
`;

export const StyledList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const StyledListItem = styled.li`
  margin-left: -15px; /* 원하는 만큼 좌측으로 밀착시킵니다. */
  padding-left: 15px; /* 여백을 주기 위한 값입니다. */
`;

export const PreviousContainer = styled.div`
  font-family: 'previous';
  font-size: 5vh;
  width: 60vw; //60
  height: 6vh; /* 높이 고정 */
  border: 4px solid;
  padding: 30px;
  white-space: nowrap; /* 추가된 부분 */
  //overflow: auto;
  overflow: hidden; /* 스크롤바 감춤 */
  position: relative;

  &::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
    border-radius: 10px;
  }

  &:hover {
    overflow-x: auto; /* 마우스 호버시 수평 스크롤 활성화 */
    cursor: grab;
  }

  &:active {
    cursor: grabbing;
  }
`;

// 선지선택 모달

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ModalButton = styled.button`
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
  margin-top: 10px;
  transition: background-color 0.3s ease;

  &:disabled {
    cursor: not-allowed;
    background-color: #ccc;
  }

  &:hover:not(:disabled) {
    background-color: #7d7272;
    color: white;
  }
`;

export const SubmitButton = styled(ModalButton)`
  background-color: #444;
  color: white;
`;

export const UpdateButton = styled(ModalButton)`
  background-color: #444;
  color: white;
`;



// 요약

export const StyledTextarea = styled.textarea`
  width: 40vw;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none; /* 수직 리사이즈 활성화 */
`;

export const SummaryContainer = styled.div`
  display: flex;
  height: 80vh;
  white-space: pre-line
`;

export const LeftContainer = styled.div`
  flex: 1;
  padding: 20px;
`;

export const RightContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const TopRightContainer = styled.div`
  flex: 2;
  margin-bottom: 10px;
`;

export const BottomRightContainer = styled.div`
  flex: 3;
  background-color: #d0d0d0;
`;