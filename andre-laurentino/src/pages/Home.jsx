import { useState } from 'react';
import { FiGithub, FiFileText } from 'react-icons/fi';
import Header from '../components/Header';
import SideNav from '../components/SideNav';
import Button from '../components/Button';
import Sidebar from '../components/Sidebar';
import AboutMe from '../components/AboutMe';
import Technologies from '../components/Technologies';
import Portfolio from '../components/Portfolio';
import NewsSection from '../components/NewsSection';
import WhatsAppButton from '../components/WhatsAppButton';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import profileImg from '../assets/imgs/eu.png';
import cvFile from '../assets/docs/profile.pdf';
import {
    Container,
    ContentWrapper,
    TextSection,
    Title,
    Description,
    ButtonGroup,
    ImageSection,
    ProfileImage
} from './Home.styles';

const Home = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <Container as="main" id="top">
            <SEO
                title="Página Inicial"
                description="Portfólio de André Laurentino. Desenvolvedor Full Stack especializado em React, Node.js e soluções web de alta performance."
            />
            <Header onMenuClick={() => setIsSidebarOpen(true)} />
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <SideNav />

            <ContentWrapper>
                <TextSection>
                    <Title>
                        Seja bem-vindo<br />
                        ao meu site!
                    </Title>
                    <Description>
                        Desenvolvo aplicações web de alta performance, unindo escalabilidade técnica e excelência em UX.
                    </Description>
                    <ButtonGroup>
                        <Button
                            as="a"
                            href="https://github.com/Andre-Rodrigues-Dev-Web"
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="primary"
                            aria-label="Ver GitHub"
                        >
                            Confira meu GitHub
                            <FiGithub />
                        </Button>
                        <Button 
                            as="a"
                            href={cvFile}
                            download="Andre-Laurentino-CV.pdf"
                            variant="secondary" 
                            aria-label="Baixar CV"
                        >
                            Baixar meu CV
                            <FiFileText />
                        </Button>
                    </ButtonGroup>
                </TextSection>

                <ImageSection>
                    <ProfileImage src={profileImg} alt="André Laurentino" />
                </ImageSection>
            </ContentWrapper>

            <AboutMe />
            <Technologies />
            <Portfolio />
            <NewsSection />
            <WhatsAppButton />
            <Footer />
        </Container>
    );
};

export default Home;

