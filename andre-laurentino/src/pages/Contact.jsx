import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiMail, FiPhone, FiLinkedin, FiGithub } from 'react-icons/fi';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

const PageContainer = styled.div`
  min-height: 100vh;
  position: relative;
  background-color: ${({ theme }) => theme.colors.background};
`;

const ContentWrapper = styled.div`
  padding: 120px 10% 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PageTitle = styled.h1`
  font-size: 3rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 20px;
  text-align: center;
  
  span {
      color: ${({ theme }) => theme.colors.primary};
  }
`;

const Subtitle = styled.p`
    font-size: 1.2rem;
    color: #888;
    margin-bottom: 60px;
    max-width: 600px;
    text-align: center;
`;

const ContactGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    width: 100%;
    max-width: 1000px;
`;

const ContactCard = styled.a`
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 20px;
    padding: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    text-decoration: none;
    transition: all 0.3s ease;
    
    &:hover {
        transform: translateY(-5px);
        background: rgba(255, 255, 255, 0.08);
        border-color: ${({ theme }) => theme.colors.primary};
    }
    
    svg {
        font-size: 3rem;
        color: ${({ theme }) => theme.colors.primary};
    }
`;

const Label = styled.span`
    font-size: 1.1rem;
    color: #888;
    font-weight: 600;
`;

const Value = styled.span`
    font-size: 1.3rem;
    color: #fff;
    font-weight: 700;
    text-align: center;
`;

const Contact = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <PageContainer as="main">
            <SEO
                title="Contato"
                description="Entre em contato comigo para projetos, consultorias ou oportunidades."
            />
            <Header onMenuClick={() => setIsSidebarOpen(true)} />
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <ContentWrapper>
                <PageTitle>Entre em <span>Contato</span></PageTitle>
                <Subtitle>
                    Sinta-se à vontade para entrar em contato comigo para projetos, consultorias ou apenas para tomar um café.
                </Subtitle>

                <ContactGrid>
                    <ContactCard href="https://wa.me/5537999262829" target="_blank" aria-label="WhatsApp">
                        <FiPhone />
                        <Label>Telefone / WhatsApp</Label>
                        <Value>(37) 99926-2829</Value>
                    </ContactCard>

                    <ContactCard href="mailto:andrelaurentinomg@gmail.com" aria-label="Email">
                        <FiMail />
                        <Label>E-mail</Label>
                        <Value>andrelaurentinomg@gmail.com</Value>
                    </ContactCard>

                    <ContactCard href="https://www.linkedin.com" target="_blank" aria-label="LinkedIn">
                        <FiLinkedin />
                        <Label>LinkedIn</Label>
                        <Value>Conectar</Value>
                    </ContactCard>

                    <ContactCard href="https://github.com" target="_blank" aria-label="GitHub">
                        <FiGithub />
                        <Label>GitHub</Label>
                        <Value>Seguir</Value>
                    </ContactCard>
                </ContactGrid>
            </ContentWrapper>
            <Footer />
        </PageContainer>
    );
};

export default Contact;
