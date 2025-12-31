import styled from 'styled-components';
import { FiGithub, FiLinkedin, FiInstagram, FiMail } from 'react-icons/fi';

const FooterContainer = styled.footer`
  padding: 50px 10%;
  background-color: #050505;
  color: #888;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 0.9rem;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  
  @media (max-width: 768px) {
      flex-direction: column;
      text-align: center;
  }
`;

const Copyright = styled.div`
    p {
        margin: 0;
    }
    span {
        color: ${({ theme }) => theme.colors.primary};
        font-weight: 600;
    }
`;

const SocialLinks = styled.div`
    display: flex;
    gap: 20px;
`;

const SocialIcon = styled.a`
    color: #888;
    font-size: 1.2rem;
    transition: all 0.3s;
    
    &:hover {
        color: ${({ theme }) => theme.colors.primary};
        transform: translateY(-2px);
    }
`;

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <FooterContainer>
            <Content>
                <Copyright>
                    <p>&copy; {currentYear} <span>André Laurentino</span>. Todos os direitos reservados.</p>
                </Copyright>

                <SocialLinks>
                    <SocialIcon href="https://github.com" target="_blank"><FiGithub /></SocialIcon>
                    <SocialIcon href="https://linkedin.com" target="_blank"><FiLinkedin /></SocialIcon>
                    <SocialIcon href="https://instagram.com" target="_blank"><FiInstagram /></SocialIcon>
                    <SocialIcon href="mailto:andrelaurentinomg@gmail.com"><FiMail /></SocialIcon>
                </SocialLinks>
            </Content>
        </FooterContainer>
    );
};

export default Footer;
