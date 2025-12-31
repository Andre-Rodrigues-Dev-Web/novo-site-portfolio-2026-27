import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiArrowLeft, FiClock, FiTag, FiCopy, FiCheck } from 'react-icons/fi';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import ShareButtons from '../components/ShareButtons';
import { posts } from '../data/posts';

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

const HeaderImage = styled.div`
    width: 100%;
    height: 400px;
    background-image: ${({ image }) => `url(${image})`};
    background-size: cover;
    background-position: center;
    border-radius: 20px;
    margin-bottom: 40px;
`;

const MetaInfo = styled.div`
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 0.9rem;
    font-weight: 600;
    
    div {
        display: flex;
        align-items: center;
        gap: 8px;
    }
`;

const Title = styled.h1`
    font-size: 2.5rem;
    font-weight: 800;
    color: #fff;
    margin-bottom: 30px;
    line-height: 1.3;
`;

const BlockWrapper = styled.div`
    margin-bottom: 30px;
`;

const TextBlock = styled.div`
    color: #cccccc;
    font-size: 1.15rem;
    line-height: 1.8;
    
    p {
        margin-bottom: 25px;
    }
    
    h3 {
        color: #fff;
        font-size: 1.8rem;
        margin-top: 40px;
        margin-bottom: 20px;
    }
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

const CopyButton = styled.button`
    background: none;
    border: none;
    color: #aaa;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: inherit;
    font-size: 0.85rem;
    transition: all 0.2s;
    
    &:hover {
        color: #fff;
    }
    
    svg {
        font-size: 1rem;
    }
`;

const ArticleDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [post, setPost] = useState(null);
    const [copiedIndex, setCopiedIndex] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        const foundPost = posts.find(p => p.id === parseInt(id));
        if (foundPost) {
            setPost(foundPost);
        } else {
            // Handle not found effectively
            navigate('/blog');
        }
    }, [id, navigate]);

    useEffect(() => {
        const processMath = () => {
            if (window.MathJax && window.MathJax.typesetPromise) {
                window.MathJax.typesetPromise();
            }
        };

        if (window.MathJax) {
            processMath();
        } else {
            const mathJaxInterval = setInterval(() => {
                if (window.MathJax) {
                    processMath();
                    clearInterval(mathJaxInterval);
                }
            }, 200);

            return () => clearInterval(mathJaxInterval);
        }
    }, [post]);

    const handleCopy = (text, index) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    if (!post) return null; // Or loading spinner

    return (
        <PageContainer as="main">
            <SEO
                title={post.title}
                description={`Leia sobre ${post.title} em meu blog.`}
                image={post.image}
            />
            <Header onMenuClick={() => setIsSidebarOpen(true)} />
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <ArticleWrapper>
                <BackButton onClick={() => navigate('/blog')} aria-label="Voltar para o Blog">
                    <FiArrowLeft /> Voltar para o Blog
                </BackButton>

                <HeaderImage image={post.image} />

                <MetaInfo>
                    <div><FiTag /> {post.category}</div>
                    <div><FiClock /> {post.date}</div>
                </MetaInfo>

                <Title>{post.title}</Title>

                {Array.isArray(post.content) ? (
                    // Render Structured Content
                    post.content.map((block, index) => (
                        <BlockWrapper key={index}>
                            {block.type === 'text' && (
                                <TextBlock dangerouslySetInnerHTML={{ __html: block.value }} />
                            )}
                            {block.type === 'code' && (
                                <CodeBlockContainer>
                                    <CopyBar>
                                        <span>{block.language ? block.language.toUpperCase() : 'CODE'}</span>
                                        <CopyButton onClick={() => handleCopy(block.value, index)} aria-label="Copiar código">
                                            {copiedIndex === index ? (
                                                <><FiCheck color="#4caf50" /> Copiado!</>
                                            ) : (
                                                <><FiCopy /> Copiar</>
                                            )}
                                        </CopyButton>
                                    </CopyBar>
                                    <SyntaxHighlighter
                                        language={block.language || 'text'}
                                        style={atomDark}
                                        customStyle={{ margin: 0, padding: '20px', background: '#151515' }}
                                    >
                                        {block.value}
                                    </SyntaxHighlighter>
                                </CodeBlockContainer>
                            )}
                        </BlockWrapper>
                    ))
                ) : (
                    // Fallback for Legacy String Content
                    <TextBlock dangerouslySetInnerHTML={{ __html: post.content }} />
                )}

                <ShareButtons title={post.title} url={window.location.href} />
            </ArticleWrapper>
            <Footer />
        </PageContainer>
    );
};

export default ArticleDetails;
