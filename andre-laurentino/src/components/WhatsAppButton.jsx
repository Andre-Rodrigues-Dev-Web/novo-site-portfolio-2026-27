import styled, { keyframes } from 'styled-components';
import { FaWhatsapp } from 'react-icons/fa';

const float = keyframes`
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
`;

const ButtonContainer = styled.a`
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 60px;
    height: 60px;
    background-color: #25D366;
    color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.3);
    z-index: 1000;
    transition: all 0.3s ease;
    animation: ${float} 3s ease-in-out infinite;
    text-decoration: none;
    
    &:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 14px rgba(0,0,0,0.4);
    }
`;

const WhatsAppButton = () => {
    return (
        <ButtonContainer
            href="https://wa.me/5537999262829"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contato via WhatsApp"
        >
            <FaWhatsapp />
        </ButtonContainer>
    );
};

export default WhatsAppButton;
