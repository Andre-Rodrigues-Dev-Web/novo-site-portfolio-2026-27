import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiArrowLeft, FiCode } from 'react-icons/fi';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { labs } from '../data/labs';

const PageContainer = styled.div`
  min-height: 100vh;
  position: relative;
  background-color: ${({ theme }) => theme.colors.background};
`;

const ArticleWrapper = styled.article`
  padding: 120px 0 80px;
  max-width: 800px;
  margin: 0 auto;
  
   @media (max-width: 900px) {
        padding: 120px 20px 80px;
    }
`;

const BackButton = styled.button`
    background: none;
    border: none;
    color: #888;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1rem;
    cursor: pointer;
    margin-bottom: 30px;
    transition: color 0.3s;
    
    &:hover {
        color: ${({ theme }) => theme.colors.primary};
    }
`;

const Title = styled.h1`
    font-size: 2.5rem;
    font-weight: 800;
    color: #fff;
    margin-bottom: 40px;
    line-height: 1.3;
    display: flex;
    align-items: center;
    gap: 15px;
    
    svg {
        color: ${({ theme }) => theme.colors.primary};
    }
`;

const BlockWrapper = styled.div`
    margin-bottom: 30px;
`;

const TextBlock = styled.div`
    color: #cccccc;
    font-size: 1.1rem;
    line-height: 1.8;
`;

const CodeBlockContainer = styled.div`
    border-radius: 10px;
    overflow: hidden;
    margin: 20px 0;
    border: 1px solid rgba(255,255,255,0.1);
`;

const CopyBar = styled.div`
    background: #1e1e1e;
    padding: 8px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: monospace;
    font-size: 0.8rem;
    color: #888;
    border-bottom: 1px solid rgba(255,255,255,0.05);
`;

const LabDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [lab, setLab] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        const foundLab = labs.find(l => l.id === parseInt(id));
        if (foundLab) {
            setLab(foundLab);
        } else {
            navigate('/labs');
        }
    }, [id, navigate]);

    if (!lab) return null;

    return (
        <PageContainer as="main">
            <SEO
                title={lab.title}
                description={`Confira o experimento ${lab.title} em meu laboratório de códigos.`}
            />
            <Header onMenuClick={() => setIsSidebarOpen(true)} />
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <ArticleWrapper>
                <BackButton onClick={() => navigate('/labs')} aria-label="Voltar para Labs">
                    <FiArrowLeft /> Voltar para Labs
                </BackButton>

                <Title>
                    <FiCode />
                    {lab.title}
                </Title>

                {lab.content.map((block, index) => (
                    <BlockWrapper key={index}>
                        {block.type === 'text' && (
                            <TextBlock dangerouslySetInnerHTML={{ __html: block.value }} />
                        )}
                        {block.type === 'code' && (
                            <CodeBlockContainer>
                                <CopyBar>
                                    <span>{block.language.toUpperCase()}</span>
                                </CopyBar>
                                <SyntaxHighlighter
                                    language={block.language}
                                    style={atomDark}
                                    customStyle={{ margin: 0, padding: '20px', background: '#151515' }}
                                >
                                    {block.value}
                                </SyntaxHighlighter>
                            </CodeBlockContainer>
                        )}
                    </BlockWrapper>
                ))}
            </ArticleWrapper>
            <Footer />
        </PageContainer>
    );
};

export default LabDetails;
