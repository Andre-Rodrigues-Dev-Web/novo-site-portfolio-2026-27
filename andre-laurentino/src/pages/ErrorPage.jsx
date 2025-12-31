import { Link, useRouteError } from 'react-router-dom';
import styled from 'styled-components';
import { FiAlertTriangle, FiHome, FiRefreshCw } from 'react-icons/fi';

const Container = styled.div`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  background-color: var(--color-bg);
  color: var(--color-text);
`;

const ErrorCode = styled.h1`
  font-size: 8rem;
  font-weight: 900;
  color: var(--color-primary);
  opacity: 0.1;
  margin: 0;
  line-height: 1;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-top: -4rem;
  margin-bottom: 1rem;
  font-weight: 700;
`;

const Message = styled.p`
  font-size: 1.2rem;
  color: var(--color-text-secondary);
  max-width: 500px;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const ActionButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
  
  &.primary {
    background-color: var(--color-primary);
    color: white;
    &:hover { filter: brightness(1.1); }
  }

  &.secondary {
    background-color: var(--color-surface);
    color: var(--color-text);
    border: 1px solid var(--color-border);
    &:hover { background-color: var(--color-border); }
  }
`;

// Mensagens padrão para cada código
const errorMessages = {
  404: {
    title: 'Página Não Encontrada',
    message: 'O conteúdo que você procurou sumiu no hiperespaço. Verifique a URL ou volte para a base.',
  },
  500: {
    title: 'Erro Interno do Servidor',
    message: 'Nossos robôs estão tendo um dia ruim. Tente recarregar a página ou volte mais tarde.',
  },
  default: {
    title: 'Algo Deu Errado',
    message: 'Ocorreu um erro inesperado. Tente novamente.',
  }
};

const ErrorPage = ({ code = 404, customTitle, customMessage }) => {
  // Se usado como ErrorElement do React Router
  const routeError = useRouteError();
  
  // Determina o código final (prioridade: prop, erro de rota, ou padrão 404)
  const finalCode = code || routeError?.status || 404;
  
  const content = errorMessages[finalCode] || errorMessages.default;
  const displayTitle = customTitle || content.title;
  const displayMessage = customMessage || routeError?.statusText || routeError?.message || content.message;

  return (
    <Container>
      <ErrorCode>{finalCode}</ErrorCode>
      <Title>{displayTitle}</Title>
      <Message>{displayMessage}</Message>
      
      <ButtonGroup>
        <ActionButton to="/" className="primary">
          <FiHome /> Ir para Início
        </ActionButton>
        
        <ActionButton as="button" onClick={() => window.location.reload()} className="secondary">
          <FiRefreshCw /> Recarregar
        </ActionButton>
      </ButtonGroup>
    </Container>
  );
};

export default ErrorPage;
