import styled, { css } from 'styled-components';

const StyledButton = styled.button`
  padding: 12px 24px;
  border-radius: 50px;
  font-weight: 700;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  border: none;

  ${({ variant, theme }) =>
        variant === 'primary' &&
        css`
      background-color: ${theme.colors.primary};
      color: #000;
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(167, 242, 5, 0.4);
      }
    `}

  ${({ variant, theme }) =>
        variant === 'secondary' &&
        css`
      background-color: ${theme.colors.secondary};
      color: #000;
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(255, 255, 255, 0.4);
      }
    `}
`;

const Button = ({ children, variant = 'primary', ...props }) => {
    return (
        <StyledButton variant={variant} {...props}>
            {children}
        </StyledButton>
    );
};

export default Button;
