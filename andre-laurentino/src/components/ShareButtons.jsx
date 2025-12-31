import styled from 'styled-components';
import { FaLinkedinIn, FaTwitter, FaWhatsapp, FaFacebookF } from 'react-icons/fa';

const ShareContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid rgba(255,255,255,0.1);
`;

const ShareLabel = styled.span`
  color: #888;
  font-weight: 600;
  display: flex;
  align-items: center;
`;

const ShareButton = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255,255,255,0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  transition: all 0.3s ease;
  
  &:hover {
      background: ${({ theme, color }) => color || theme.colors.primary};
      color: #fff;
      transform: translateY(-3px);
  }
`;

const ShareButtons = ({ title, url }) => {
    // Encode strings for URL sharing
    const encodedTitle = encodeURIComponent(title);
    const encodedUrl = encodeURIComponent(url);

    return (
        <ShareContainer>
            <ShareLabel>Compartilhar:</ShareLabel>

            <ShareButton
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                color="#0077b5"
            >
                <FaLinkedinIn />
            </ShareButton>

            <ShareButton
                href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                color="#1DA1F2"
            >
                <FaTwitter />
            </ShareButton>

            <ShareButton
                href={`https://api.whatsapp.com/send?text=${encodedTitle} ${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                color="#25D366"
            >
                <FaWhatsapp />
            </ShareButton>

            <ShareButton
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                color="#4267B2"
            >
                <FaFacebookF />
            </ShareButton>
        </ShareContainer>
    );
};

export default ShareButtons;
