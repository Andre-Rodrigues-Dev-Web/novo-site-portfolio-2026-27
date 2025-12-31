import styled from 'styled-components';

export const SectionContainer = styled.section`
  padding: 80px 10%;
  background-color: #0d0d0d;
  color: ${({ theme }) => theme.colors.text};
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

export const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
`;

export const CategoryCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 30px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: transform 0.3s ease;
  
  &:hover {
      transform: translateY(-5px);
      border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const CategoryTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 25px;
  color: #fff;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  padding-bottom: 10px;
`;

export const IconGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

export const TechItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 80px;
  
  svg {
      width: 60px;
      height: 60px;
      fill: #bbb;
      transition: fill 0.3s ease;
      
      @media (max-width: 768px) {
          width: 40px;
          height: 40px;
      }
  }
  
  span {
      font-size: 0.8rem;
      color: #888;
      text-align: center;
  }
  
  &:hover svg {
      fill: ${({ theme }) => theme.colors.primary};
  }
  
  &:hover span {
      color: #fff;
      font-weight: 600;
  }
`;
