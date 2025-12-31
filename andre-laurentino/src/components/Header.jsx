import styled from 'styled-components';
import logo from '../assets/imgs/logo.svg';
import { FiMenu } from 'react-icons/fi';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 10%; /* Match page padding */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
`;

const Logo = styled.img`
  height: 80px;
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
        z-index: -1;
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

const Header = ({ onMenuClick }) => {
    return (
        <HeaderContainer>
            <div /> {/* Spacer for left side if needed */}

            <LogoContainer>
                <Logo src={logo} alt="André Laurentino Logo" />
            </LogoContainer>

            <MenuButton onClick={onMenuClick}>
                <span>Menu</span>
                <FiMenu size={24} />
            </MenuButton>
        </HeaderContainer>
    );
};

export default Header;
