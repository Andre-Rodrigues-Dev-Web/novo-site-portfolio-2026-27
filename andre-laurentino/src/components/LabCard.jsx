import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiCode } from 'react-icons/fi';

const Card = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 30px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-5px);
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const IconWrapper = styled.div`
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 20px;
`;

const Title = styled.h3`
  font-size: 1.4rem;
  color: #fff;
  margin-bottom: 15px;
  font-weight: 700;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #aaa;
  line-height: 1.6;
  margin-bottom: 25px;
  flex: 1;
`;

const Button = styled(Link)`
    display: inline-block;
    padding: 10px 20px;
    background: transparent;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    border-radius: 5px;
    text-decoration: none;
    text-align: center;
    font-weight: 600;
    transition: all 0.3s ease;
    
    &:hover {
        background: ${({ theme }) => theme.colors.primary};
        color: #000;
    }
`;

const LabCard = ({ id, title, description }) => {
    return (
        <Card>
            <IconWrapper>
                <FiCode />
            </IconWrapper>
            <Title>{title}</Title>
            <Description>{description}</Description>
            <Button to={`/labs/${id}`}>
                Conferir Lab
            </Button>
        </Card>
    );
};

export default LabCard;
