import { Outlet } from 'react-router-dom';
import { BaseContainer, HeadContainer, LoginContainer, Logo, HeadText, FunctionContainer, StyledLink, StyledA, FunctionWrapper, SizedBox, ContactContainer, Tooltip } from './StyledComponents.jsx';


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
  
          <Outlet />
          
          <ContactContainer>
            <img src='/gitlogo.png' alt='logo' margin-top='10' width='25vw' height='25vh' />
            <StyledA href='https://github.com/ParkJaeSeong98/Literacy' target='_blank'> Github</StyledA>
          </ContactContainer>
        </FunctionWrapper>
  
      </BaseContainer>
    );
  }

export default BaseLayout;
