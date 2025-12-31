import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh; /* Ocupa espaço razoável durante carregamento */
  width: 100%;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid var(--color-surface);
  border-top: 4px solid var(--color-primary);
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const Loading = () => {
  return (
    <SpinnerContainer>
      <Spinner aria-label="Carregando..." />
    </SpinnerContainer>
  );
};

export default Loading;
