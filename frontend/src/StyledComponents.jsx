import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const BaseContainer = styled.div`
  width: 100vw; 
  height: 100vh; 
  background-color: #D2B48C;  
`;

export const HeadContainer = styled.div`       
  display: flex;  // Row로 
  padding-left: 20px;
  padding-top: 20px;
  background-color: #D2B48C;
`;

export const LoginContainer = styled.div`
  margin-left: auto;
  margin-right: 20px;
`;

export const Logo = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

export const HeadText = styled.div`
  font-size: ${props => props.size || '30px'};
  font-family: 'logofont';
  text-decoration: none; /* 하이퍼링크 스타일 제거 */
`;

export const FunctionContainer = styled.div`
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
  font-size: 20px;
  font-family: 'logofont';
  text-decoration: none; /* 하이퍼링크 스타일 제거 */
`;

export const FunctionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SizedBox = styled.div`
  margin: ${props => props.size || '20px'};
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
  left: 60%; /* 우측으로 이동 */
  background-color: #333;
  color: white;
  padding: 5px;
`;