import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import { FiShoppingCart, FiBookOpen, FiCalendar } from 'react-icons/fi';

const Container = styled.main`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 4rem;
  
  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  p {
    font-size: 1.2rem;
    color: var(--color-text-secondary);
    max-width: 600px;
    margin: 0 auto;
  }
`;

const BookGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  padding: 1rem;
`;

const BookCard = styled.article`
  background: var(--color-surface);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  border: 1px solid var(--color-border);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  }
`;

const CoverWrapper = styled.div`
  background: linear-gradient(to bottom, #f0f0f0, #e0e0e0);
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  /* Efeito de capa de livro 3D simulado */
  &::after {
    content: '';
    position: absolute;
    width: 60px;
    height: 100%;
    left: 0;
    background: linear-gradient(to right, rgba(255,255,255,0.2), transparent);
    z-index: 1;
  }
`;

const PlaceholderCover = styled.div`
  width: 180px;
  height: 260px;
  background: ${props => props.color || 'var(--color-primary)'};
  border-radius: 4px 12px 12px 4px;
  box-shadow: 5px 5px 15px rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1rem;
  color: white;
  font-weight: bold;
  font-family: var(--font-mono);
  transform: rotateY(-15deg) rotateX(5deg);
  transform-style: preserve-3d;
`;

const Content = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Tags = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Tag = styled.span`
  font-size: 0.75rem;
  padding: 4px 8px;
  border-radius: 4px;
  background: ${props => props.highlight ? 'rgba(16, 185, 129, 0.1)' : 'var(--color-bg)'};
  color: ${props => props.highlight ? '#10b981' : 'var(--color-text-secondary)'};
  font-weight: 600;
  text-transform: uppercase;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  line-height: 1.3;
`;

const Description = styled.p`
  color: var(--color-text-secondary);
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
  flex: 1;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
`;

const Price = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--color-text);
  
  span {
    font-size: 0.9rem;
    font-weight: 400;
    color: var(--color-text-secondary);
  }
`;

const BuyButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.2rem;
  background: var(--color-primary);
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 0.9;
  }
  
  &.disabled {
    background: var(--color-text-secondary);
    cursor: not-allowed;
  }
`;

// MOCK DATA
const myBooks = [
  {
    id: 1,
    title: 'Arquitetura de Micro-frontends',
    description: 'Um guia completo e prático sobre como escalar o frontend em grandes empresas. Module Federation, Single-SPA e muito mais.',
    color: '#0070f3',
    status: 'AVAILABLE',
    price: 'R$ 49,90',
    link: '#',
    tags: ['Best Seller', 'Architecture']
  },
  {
    id: 2,
    title: 'Dominando o React 2026',
    description: 'Tudo sobre as novidades do React 19/20, Server Components, Hooks avançados e otimização de performance.',
    color: '#61dafb',
    status: 'PRE_ORDER',
    price: 'R$ 39,90',
    link: '#',
    tags: ['Pré-venda', 'React']
  },
  {
    id: 3,
    title: 'CSS Avançado: Design Tokens',
    description: 'Transforme seu fluxo de trabalho com CSS Moderno. Variáveis nativas, Container Queries e metodologia CUBE CSS.',
    color: '#E91E63',
    status: 'COMING_SOON',
    price: 'Breve',
    link: null,
    tags: ['Em Breve', 'CSS']
  }
];

const Books = () => {
  return (
    <Container>
      <Helmet>
        <title>Meus Livros | André Laurentino</title>
        <meta name="description" content="Conheça meus livros sobre desenvolvimento web, arquitetura e tecnologias modernas." />
      </Helmet>

      <Header>
        <h1>Publicações & Livros</h1>
        <p>Compartilhando conhecimento através da escrita. Guias técnicos aprofundados para impulsionar sua carreira.</p>
      </Header>

      <BookGrid>
        {myBooks.map((book) => (
          <BookCard key={book.id}>
            <CoverWrapper>
              <PlaceholderCover color={book.color}>
                {book.title}
              </PlaceholderCover>
            </CoverWrapper>
            
            <Content>
              <Tags>
                {book.tags.map(tag => (
                  <Tag key={tag} highlight={book.status === 'AVAILABLE'}>{tag}</Tag>
                ))}
              </Tags>
              
              <Title>{book.title}</Title>
              <Description>{book.description}</Description>
              
              <Footer>
                {book.status !== 'COMING_SOON' ? (
                  <>
                    <Price>{book.price}</Price>
                    <BuyButton href={book.link} target="_blank">
                       {book.status === 'PRE_ORDER' ? <FiCalendar /> : <FiShoppingCart />}
                       {book.status === 'PRE_ORDER' ? 'Reservar' : 'Comprar'}
                    </BuyButton>
                  </>
                ) : (
                   <>
                    <Price><span>Lançamento 2026</span></Price>
                    <BuyButton as="span" className="disabled">
                       <FiBookOpen /> Aguarde
                    </BuyButton>
                   </>
                )}
              </Footer>
            </Content>
          </BookCard>
        ))}
      </BookGrid>
    </Container>
  );
};

export default Books;
