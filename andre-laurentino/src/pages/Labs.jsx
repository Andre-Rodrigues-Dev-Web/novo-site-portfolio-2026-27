import { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import LabCard from '../components/LabCard';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import { labs } from '../data/labs';

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
  margin-bottom: 20px;
  
  span {
      color: ${({ theme }) => theme.colors.primary};
  }
`;

const PageSubtitle = styled.p`
    font-size: 1.2rem;
    color: #888;
    margin-bottom: 60px;
    max-width: 600px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  margin-top: 40px;
`;

const Labs = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Filter Logic
    const filteredLabs = useMemo(() => {
        const term = searchTerm.toLowerCase();
        return labs.filter(lab =>
            lab.title.toLowerCase().includes(term) ||
            lab.tech.toLowerCase().includes(term)
        );
    }, [searchTerm]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredLabs.length / itemsPerPage);
    const currentLabs = useMemo(() => {
        const firstIndex = (currentPage - 1) * itemsPerPage;
        return filteredLabs.slice(firstIndex, firstIndex + itemsPerPage);
    }, [currentPage, filteredLabs]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <PageContainer as="main">
            <SEO
                title="Labs"
                description="Experimentos de código e explorações técnicas."
            />
            <Header onMenuClick={() => setIsSidebarOpen(true)} />
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <ContentWrapper>
                <PageTitle>Meus <span>Labs</span></PageTitle>
                <PageSubtitle>
                    Experimentos de código, snippets úteis e explorações técnicas.
                    Aqui é onde testo novas ideias e tecnologias.
                </PageSubtitle>

                <SearchBar
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Pesquisar laboratórios..."
                    options={labs.map(l => l.title)}
                    listId="labs-search-list"
                />

                {filteredLabs.length > 0 ? (
                    <>
                        <Grid>
                            {currentLabs.map(lab => (
                                <LabCard key={lab.id} {...lab} />
                            ))}
                        </Grid>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </>
                ) : (
                    <p style={{ marginTop: '40px', color: '#888', fontSize: '1.2rem' }}>
                        Nenhum laboratório encontrado para sua pesquisa.
                    </p>
                )}
            </ContentWrapper>
            <Footer />
        </PageContainer>
    );
};

export default Labs;
