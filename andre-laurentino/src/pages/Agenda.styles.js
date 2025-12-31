import styled from 'styled-components';

export const PageContainer = styled.div`
  min-height: 100vh;
  position: relative;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const ContentWrapper = styled.div`
  padding: 120px 10% 80px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const PageTitle = styled.h1`
  font-size: 3rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 20px;
  text-align: center;
  
  span {
      color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Subtitle = styled.p`
    font-size: 1.2rem;
    color: #888;
    margin-bottom: 60px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
`;

export const TimelineContainer = styled.div`
    position: relative;
    max-width: 800px;
    margin: 0 auto;
    
    &::before {
        content: '';
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 2px;
        height: 100%;
        background-color: rgba(255,255,255,0.1);
        
        @media (max-width: 768px) {
            left: 20px;
        }
    }
`;

export const EventCard = styled.div`
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 20px;
    padding: 30px;
    margin-bottom: 40px;
    position: relative;
    width: 45%;
    margin-left: ${({ isRight }) => (isRight ? 'auto' : '0')};
    
    @media (max-width: 768px) {
        width: 100%;
        margin-left: 0;
        padding-left: 80px;
    }
    
    &::after {
        content: '';
        position: absolute;
        top: 30px;
        ${({ isRight }) => (isRight ? 'left: -5.5%' : 'right: -5.5%')};
        
        @media (max-width: 900px) {
             ${({ isRight }) => (isRight ? 'left: -12%' : 'right: -12%')};
        }
        
         @media (max-width: 768px) {
             left: 11px;
             right: auto;
        }

        width: 20px;
        height: 20px;
        background-color: ${({ theme }) => theme.colors.primary};
        border-radius: 50%;
        box-shadow: 0 0 0 5px rgba(167, 242, 5, 0.2);
    }
`;

export const DateBadge = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background-color: rgba(167, 242, 5, 0.1);
    color: ${({ theme }) => theme.colors.primary};
    padding: 5px 15px;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 15px;
    
    @media (max-width: 768px) {
        position: absolute;
        left: 20px;
        top: 35px;
        writing-mode: vertical-rl;
        padding: 10px 5px;
        gap: 5px;
        
        span {
            font-size: 0.8rem;
        }
        
        svg {
            transform: rotate(90deg);
        }
    }
`;

export const EventTitle = styled.h3`
    font-size: 1.5rem;
    color: #fff;
    margin-bottom: 10px;
`;

export const EventType = styled.span`
    display: block;
    font-size: 0.9rem;
    color: #888;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    
    svg {
        color: ${({ theme }) => theme.colors.primary};
    }
`;

export const EventDescription = styled.p`
    font-size: 1rem;
    color: #ccc;
    line-height: 1.6;
`;

export const Location = styled.div`
    margin-top: 15px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.9rem;
    color: #888;
    
    svg {
        color: ${({ theme }) => theme.colors.primary};
    }
`;
