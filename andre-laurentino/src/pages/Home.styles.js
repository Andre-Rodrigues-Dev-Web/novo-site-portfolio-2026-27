import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 0;
  
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

export const ContentWrapper = styled.div`
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 60px;
    padding: 0 10%;
    
    @media (max-width: 992px) {
        flex-direction: column-reverse;
        gap: 40px;
        text-align: center;
        padding: 0 5%;
    }
`;

export const TextSection = styled.div`
    flex: 1;
    max-width: 600px;
`;

export const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 24px;
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: 768px) {
      font-size: 2.5rem;
  }
`;

export const Description = styled.p`
    font-size: 1.25rem;
    line-height: 1.6;
    color: #cccccc;
    margin-bottom: 40px;
    max-width: 500px;
    
    @media (max-width: 992px) {
        margin: 0 auto 40px;
    }
`;

export const ButtonGroup = styled.div`
    display: flex;
    gap: 20px;
    
     @media (max-width: 992px) {
        justify-content: center;
    }
`;

export const ImageSection = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
    position: relative;
    
    @media (max-width: 992px) {
        justify-content: center;
    }
`;

export const ProfileImage = styled.img`
    width: 100%;
    max-width: 650px;
    border-radius: 30px; 
    
    mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
    -webkit-mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
`;
