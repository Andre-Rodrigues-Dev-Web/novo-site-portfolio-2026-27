import styled from 'styled-components';
import { Link } from 'react-router-dom';
import NewsCard from './NewsCard';
import Button from './Button';

const SectionContainer = styled.section`
  padding: 80px 10%;
  background-color: #0d0d0d;
  color: ${({ theme }) => theme.colors.text};
  position: relative;
`;

const SectionHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 50px;
    
    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 20px;
    }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  letter-spacing: 2px;
  margin: 0;
  
  &::after {
      content: '';
      display: block;
      width: 60px;
      height: 4px;
      background-color: ${({ theme }) => theme.colors.text};
      margin-top: 10px;
  }
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

import { posts } from '../data/posts';

const NewsSection = () => {
    const latestNews = posts.slice(0, 3);

    return (
        <SectionContainer id="blog">
            <SectionHeader>
                <SectionTitle>Últimas Notícias</SectionTitle>
            </SectionHeader>

            <CardsGrid>
                {latestNews.map(news => (
                    <NewsCard key={news.id} {...news} />
                ))}
            </CardsGrid>

            <ButtonWrapper>
                <Link to="/blog">
                    <Button variant="secondary">
                        Veja mais conteúdos
                    </Button>
                </Link>
            </ButtonWrapper>
        </SectionContainer>
    );
};

export default NewsSection;
