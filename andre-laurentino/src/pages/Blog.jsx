import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import NewsCard from '../components/NewsCard';
import { posts } from '../data/posts';

const PageContainer = styled.div`
  min-height: 100vh;
  position: relative;
  background-color: ${({ theme }) => theme.colors.background};
`;

const ContentWrapper = styled.div`
  padding: 120px 10% 80px;
`;

const PageTitle = styled.h1`
  font-size: 3rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 50px;
  
  span {
      color: ${({ theme }) => theme.colors.primary};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 40px;
`;

const Blog = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageContainer as="main">
      <SEO
        title="Blog"
        description="Artigos sobre desenvolvimento, tecnologia e carreira."
      />
      <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} isMenuOpen={isSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <ContentWrapper>
        <PageTitle>Meu <span>Blog</span></PageTitle>
        <Grid>
          {posts.map(post => (
            <NewsCard key={post.id} {...post} />
          ))}
        </Grid>
      </ContentWrapper>
      <Footer />
    </PageContainer>
  );
};

export default Blog;
