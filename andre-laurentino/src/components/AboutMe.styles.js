import styled from 'styled-components';

export const SectionContainer = styled.section`
  padding: 80px 10%;
  background-color: #0a0a0a;
  color: ${({ theme }) => theme.colors.text};
  position: relative;
`;

export const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 50px;
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  letter-spacing: 2px;
  
  &::after {
      content: '';
      display: block;
      width: 60px;
      height: 4px;
      background-color: ${({ theme }) => theme.colors.text};
      margin-top: 10px;
  }
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

export const BioColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const BioText = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #cccccc;
  
  strong {
      color: ${({ theme }) => theme.colors.text};
      font-weight: 600;
  }
`;

export const InfoColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 40px;
`;

export const InfoBlock = styled.div``;

export const BlockTitle = styled.h3`
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 20px;
    color: ${({ theme }) => theme.colors.text};
    display: flex;
    align-items: center;
    gap: 10px;
    
    &::before {
        content: '';
        width: 8px;
        height: 24px;
        background-color: ${({ theme }) => theme.colors.primary};
        border-radius: 4px;
    }
`;

export const ExperienceItem = styled.div`
    margin-bottom: 25px;
    padding-left: 20px;
    border-left: 1px solid rgba(255,255,255,0.1);
`;

export const Role = styled.h4`
    font-size: 1.2rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 5px;
`;

export const Company = styled.div`
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 5px;
`;

export const Period = styled.div`
    font-size: 0.9rem;
    color: #888;
`;
