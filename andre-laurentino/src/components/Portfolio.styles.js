import styled from 'styled-components';

export const SectionContainer = styled.section`
  padding: 80px 10%;
  background-color: #0a0a0a;
  color: ${({ theme }) => theme.colors.text};
  
  /* Swiper custom styles */
  .swiper-pagination-bullet {
      background: #888;
  }
  .swiper-pagination-bullet-active {
      background: ${({ theme }) => theme.colors.primary};
  }
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

export const ProjectCard = styled.a`
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 30px;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.05);
  height: 350px; /* Fixed height for uniform slides */
  margin-bottom: 40px; /* Space for pagination */

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.08);
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
`;

export const IconWrapper = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2rem;
`;

export const ProjectTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 15px;
`;

export const ProjectLinkDisplay = styled.span`
  font-size: 0.9rem;
  color: #888;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: auto;
  
  svg {
      transition: transform 0.3s ease;
  }
  
  ${ProjectCard}:hover & {
      color: ${({ theme }) => theme.colors.primary};
      
      svg {
          transform: translateX(3px) translateY(-3px);
      }
  }
`;
