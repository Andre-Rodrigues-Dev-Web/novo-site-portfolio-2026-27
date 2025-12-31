import styled from 'styled-components';
import { FiX } from 'react-icons/fi';
import { HashLink } from 'react-router-hash-link';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 200;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 400px;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background};
  z-index: 201;
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  padding: 40px;
  display: flex;
  flex-direction: column;
  box-shadow: -5px 0 20px rgba(0,0,0,0.5);
  border-left: 1px solid rgba(255,255,255,0.1);
`;

const CloseButton = styled.button`
  align-self: flex-end;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 2rem;
  cursor: pointer;
  margin-bottom: 40px;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const NavItem = styled.li`
  opacity: 0;
  transform: translateY(20px);
  animation: ${({ isOpen }) => (isOpen ? 'fadeInUp 0.5s forwards' : 'none')};
  animation-delay: ${({ delay }) => delay}s;

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const NavLink = styled(HashLink)`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  transition: color 0.2s;
  position: relative;
  display: inline-block;
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  &::after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: -4px;
      left: 0;
      background-color: ${({ theme }) => theme.colors.primary};
      transition: width 0.3s ease;
  }

  &:hover::after {
      width: 100%;
  }
`;

const links = [
  { label: 'Home', to: '/#top' },
  { label: 'Sobre-mim', to: '/#sobre-mim' },
  { label: 'Tecnologias que atuo', to: '/#tecnologias-que-atuo' },
  { label: 'Portfólio', to: '/#portfolio' },
  { label: 'Blog', to: '/blog' },
  { label: 'Lab', to: '/labs' },
  { label: 'Agenda', to: '/agenda' },
  { label: 'Meus livros', to: '/#meus-livros' },
  { label: 'Contato', to: '/contato' },
];

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      <Overlay isOpen={isOpen} onClick={onClose} />
      <SidebarContainer isOpen={isOpen}>
        <CloseButton onClick={onClose}>
          <FiX />
        </CloseButton>
        <NavList>
          {links.map((link, index) => (
            <NavItem key={link.label} isOpen={isOpen} delay={0.1 + index * 0.05}>
              <NavLink
                to={link.to}
                smooth
                onClick={onClose}
              >
                {link.label}
              </NavLink>
            </NavItem>
          ))}
        </NavList>
      </SidebarContainer>
    </>
  );
};

export default Sidebar;
