import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const Card = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: transform 0.3s ease, border-color 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-5px);
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ImageContainer = styled.div`
  height: 200px;
  background-color: #222; /* Placeholder color */
  background-image: ${({ image }) => (image ? `url(${image})` : 'none')};
  background-size: cover;
  background-position: center;
`;

const Content = styled.div`
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Category = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 10px;
`;

const Title = styled.h3`
  font-size: 1.25rem;
  color: #fff;
  margin-bottom: 15px;
  line-height: 1.4;
`;

const Excerpt = styled.p`
  font-size: 0.95rem;
  color: #aaa;
  line-height: 1.6;
  margin-bottom: 20px;
  flex: 1;
`;

const ReadMore = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #fff;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const NewsCard = ({ id, image, category, title, excerpt }) => {
    return (
        <Card>
            <ImageContainer image={image} />
            <Content>
                <Category>{category}</Category>
                <Title>{title}</Title>
                <Excerpt>{excerpt}</Excerpt>
                <ReadMore to={`/blog/${id}`}>
                    Ler artigo <FiArrowRight />
                </ReadMore>
            </Content>
        </Card>
    );
};

export default NewsCard;
