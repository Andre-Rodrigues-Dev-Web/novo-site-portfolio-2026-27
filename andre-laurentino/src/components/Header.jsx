import styled from 'styled-components';
import logo from '../assets/imgs/logo.svg';
import { FiMenu } from 'react-icons/fi';

const HeaderContainer = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
`;

const Logo = styled.img`
  height: 50px;
  /* Adjust based on actual SVG/design need */
`;

const LogoContainer = styled.div`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 0;
    
    /* Decoration line/shape behind logo - conceptual based on image */
    &::before {
        content: '';
        position: absolute;
        top: -20px;
        left: 50%;
        transform: translateX(-50%);
        width: 120px;
        height: 80px;
        background: #0a0a0a;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        z-index: -1;
        border: 1px solid rgba(255,255,255,0.1);
        border-top: none;
    }
`;

const MenuButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  
  span {
      font-weight: 500;
  }
`;

const Header = () => {
    return (
        <HeaderContainer>
            <div /> {/* Spacer for left side if needed */}

            <LogoContainer>
                <Logo src={logo} alt="André Laurentino Logo" />
            </LogoContainer>

            <MenuButton>
                <span>Menu</span>
                <FiMenu size={24} />
            </MenuButton>
        </HeaderContainer>
    );
};

export default Header;
