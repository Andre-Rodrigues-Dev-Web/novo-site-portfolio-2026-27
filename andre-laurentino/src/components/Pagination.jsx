import styled from 'styled-components';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 60px;
`;

const PageButton = styled.button`
    width: 40px;
    height: 40px;
    border-radius: 10px;
    border: 1px solid ${({ active }) => (active ? 'transparent' : 'rgba(255,255,255,0.1)')};
    background: ${({ active, theme }) => (active ? theme.colors.primary : '#1e1e1e')};
    color: ${({ active }) => (active ? '#000' : '#fff')};
    font-weight: ${({ active }) => (active ? '800' : 'normal')};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;

    &:hover:not(:disabled) {
        background: ${({ active, theme }) => (active ? theme.colors.primary : '#333')};
        transform: translateY(-2px);
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
    }
`;

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    return (
        <PaginationContainer>
            <PageButton
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Página anterior"
            >
                <FiChevronLeft />
            </PageButton>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PageButton
                    key={page}
                    active={currentPage === page}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </PageButton>
            ))}

            <PageButton
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Próxima página"
            >
                <FiChevronRight />
            </PageButton>
        </PaginationContainer>
    );
};

export default Pagination;
