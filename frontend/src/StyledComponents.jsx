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

export const GitLogo = styled.img`
  margin-top: 10px;
  width: 2vw;
  height: 4vh;
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
  //position: fixed;

  margin-top: auto; /* 아래로 이동 */

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
  height: 6vh; 
  border: 4px solid;
  padding: 30px;
  white-space: nowrap; /* 추가된 부분 */
  //overflow: auto;
  overflow: hidden; /* 스크롤바 감춤 */
  position: relative;

  &::-webkit-scrollbar {
    width: 12px;
    height: 20px;
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
  justify-content: ${props => props.content || 'space-between'};
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
  background-color: #D2B48C;
  color: black;
  font-size: 4vh;

  &:hover:not(:disabled) {
    background-color: #7d7272;
    color: white;
  }

  &:disabled {
    cursor: not-allowed;
    background-color: #D2B48C; /* UpdateButton의 기본 배경색으로 설정 */
    color: black; /* UpdateButton의 기본 글자색으로 설정 */
  }
`;



// 요약

export const SummaryContainer = styled.div`
  font-family: 'summary';
  display: flex;
  height: 90vh;
  white-space: pre-line
`;

export const LeftContainer = styled.div`
  flex: 1;
  padding: 20px;
  padding-right: 30px;
  padding-top: 30px;
  margin-left: 30px;
  display: flex;
  flex-direction: column;
`;

export const Category = styled.div`
  font-family: 'summary';
  font-size: 4vh;
  padding-bottom: 5px;
`;

export const SentenceContainer = styled.div`
  font-size: ${props => props.fontsize || '2.5vh'};
  max-height: ${props => props.height || '70vh'};
  border: 4px solid;
  padding: 20px;
  padding-bottom: 30px;
  margin-bottom: 20px;
  white-space: pre-line; /* 줄바꿈 처리 */
  overflow-y: auto; /* 세로 스크롤을 허용하도록 수정 */
  position: relative;

  &::-webkit-scrollbar {
    width: 12px;
    height: 20px;
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
    //overflow-y: auto;
    //cursor: grab;
  }

  // &:active {
  //   cursor: grabbing;
  // }
`;

export const RightContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  padding-top: 30px;
`;

export const BoxContainer2 = styled.div`
  height: 72vh;
  
  display: flex;
  flex-direction: column;

  margin-bottom: 20px;

`;

export const TopRightContainer = styled.div`
  flex: 1;
  margin-bottom: 10px;
`;

export const BottomRightContainer = styled.div`
  flex: 3;
  width: 40vw;
  padding: 2vh;
  border: 4px solid #000;
  background-color: #d0d0d0;
  font-size: 2vh;

  //display: flex;
  //justify-content: center;   가운데정렬 하고 싶은데, 텍스트가 이상해짐;;
  //align-items: center;

  white-space: pre-line; /* 줄바꿈 처리 */
  overflow-y: auto; /* 세로 스크롤을 허용하도록 수정 */
  position: relative;

  &::-webkit-scrollbar {
    width: 12px;
    height: 20px;
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
    //overflow-y: auto;
    //cursor: grab;
  }
`;

export const MidRightContainer = styled.div`
  flex: 2;
  width: 40vw;
  padding: 2vh;
  border: 4px solid #000;
  margin-bottom: 2vh;
  font-size: 2vh;



  white-space: pre-line; /* 줄바꿈 처리 */
  overflow-y: auto; /* 세로 스크롤을 허용하도록 수정 */
  position: relative;

  &::-webkit-scrollbar {
    width: 12px;
    height: 20px;
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
    //overflow-y: auto;
    //cursor: grab;
  }
`;


export const StyledTextarea = styled.textarea`
  width: 40vw;
  height: ${props => props.size || '20vh'};
  resize: none; /* 수직 리사이즈 활성화 */
  font-family: 'summary';
  font-size: 2.5vh;
  padding: 2vh;
  //margin: 20px;
  border: 4px solid #000; /* 검정 테두리 추가 */
  outline: none;
  background-color: #D2B48C;

  white-space: pre-line; /* 줄바꿈 처리 */
  overflow-y: auto; /* 세로 스크롤을 허용하도록 수정 */
  position: relative;

  &::-webkit-scrollbar {
    width: 12px;
    height: 20px;
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
    //overflow-y: auto;
    //cursor: grab;
  }
`;

// 문장별로 선택할 때 hover 기능에 필요한 스타일 컴포넌트
export const Sentence = styled.div`
    cursor: pointer;
    //margin: 0.5em 0;
    //padding: 0.5em;
    border-radius: 10px;
    &:hover {
        border: 1px solid #00BFFF; // 마우스 호버 시 테두리 색상 설정
        background-color: #f0f0f0; // 선택된 것처럼 보이도록 배경색도 변경
    }
`;


// 그림퀴즈


export const PictureBookContainer = styled.div`
  display: flex;
  //height: 100vh; // 전체 뷰포트 높이 사용
  align-items: center; // 첫 번째 행의 자식 요소들을 위쪽으로 정렬
  justify-content: center;
  white-space: pre-line
`;

export const PictureBookTop= styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  // div {
  //   list-style: none;
  //   margin: auto;
  //   //width: 100%;
  //   //max-width: 600px;

  //   div {
  //     padding: 20px;
  //     cursor: pointer; // 마우스를 올렸을 때 커서를 포인터로 변경
  //     transition: background-color 0.2s; // 배경 색상 변화에 애니메이션 효과를 적용 (적용시 좀 더 부드러움)

  //     &:hover {
  //       background-color: #f0f0f0; // 마우스 오버 시 배경 색상 변경
  //     }
  //   }
  // }
`;

export const PictureBookBottom = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  grid-gap: 16px;
`;

export const PictureBookBottomLeft = styled.div`
  grid-column: 1;
`;

export const PictureBookBottomRight = styled.div`
  grid-column: 2;

  //flex: 3;
  width: 40vw;
  height: 15vh;
  padding: 2vh;
  border: 4px solid #000;
  background-color: #d0d0d0;
  font-size: 2.5vh;

  //display: flex;
  //justify-content: center;   가운데정렬 하고 싶은데, 텍스트가 이상해짐;;
  //align-items: center;

  white-space: pre-line; /* 줄바꿈 처리 */
  overflow-y: auto; /* 세로 스크롤을 허용하도록 수정 */
  position: relative;

  &::-webkit-scrollbar {
    width: 12px;
    height: 20px;
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
    //overflow-y: auto;
    //cursor: grab;
  }
`;

export const ImageContainer = styled.div`
  position: relative; // 이미지 컨테이너에 상대적 위치 지정
  width: 360px; // 이미지 컨테이너의 너비 지정
  height: 360px; // 이미지 컨테이너의 높이 지정
  margin: auto; // 가운데 정렬
`;


export const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent; // 버튼 배경을 투명하게 설정
  border: none; // 버튼 테두리 제거
  font-size: 24px; // 화살표 크기 조정
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0; // 마우스 오버 시 배경 색상 변경
  }

  &.prev {
    left: -40px; // 이미지 왼쪽 바깥으로 이동
  }

  &.next {
    right: -40px; // 이미지 오른쪽 바깥으로 이동
  }
`;

export const FontH = styled.h1`
  font-family: 'logofont';
  font-size: 40px;
`;

export const CategoryImage = styled.div`
  padding: 20px;
  cursor: pointer; // 마우스를 올렸을 때 커서를 포인터로 변경
  transition: background-color 0.2s; // 배경 색상 변화에 애니메이션 효과를 적용 (적용시 좀 더 부드러움)
  &:hover {
    background-color: #f0f0f0; // 마우스 오버 시 배경 색상 변경
  }
`;