import styled from 'styled-components';
import { FiGithub, FiFileText } from 'react-icons/fi';
import Header from '../components/Header';
import SideNav from '../components/SideNav';
import Button from '../components/Button';
import profileImg from '../assets/imgs/eu.png';

const Container = styled.div`
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 0 10%;
  
  /* Background grid/geometric lines hint */
  &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: 
        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
      background-size: 50px 50px;
      z-index: 0;
  }
`;

const ContentWrapper = styled.div`
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 60px; /* Offset for header */
    
    @media (max-width: 992px) {
        flex-direction: column-reverse;
        gap: 40px;
        text-align: center;
    }
`;

const TextSection = styled.div`
    flex: 1;
    max-width: 600px;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 24px;
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: 768px) {
      font-size: 2.5rem;
  }
`;

const Description = styled.p`
    font-size: 1.25rem;
    line-height: 1.6;
    color: #cccccc;
    margin-bottom: 40px;
    max-width: 500px;
    
    @media (max-width: 992px) {
        margin: 0 auto 40px;
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 20px;
    
     @media (max-width: 992px) {
        justify-content: center;
    }
`;

const ImageSection = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
    position: relative;
    
    @media (max-width: 992px) {
        justify-content: center;
    }
`;

const ProfileImage = styled.img`
    width: 100%;
    max-width: 500px;
    border-radius: 30px; 
    /* The visual shows a rounded rectangle style or mask */
    mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
    -webkit-mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
`;

const Home = () => {
    return (
        <Container>
            <Header />
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
                        <Button variant="primary">
                            Confira meu GitHub
                            <FiGithub />
                        </Button>
                        <Button variant="secondary">
                            Baixar meu CV
                            <FiFileText />
                        </Button>
                    </ButtonGroup>
                </TextSection>

                <ImageSection>
                    <ProfileImage src={profileImg} alt="André Laurentino" />
                </ImageSection>
            </ContentWrapper>
        </Container>
    );
};

export default Home;
