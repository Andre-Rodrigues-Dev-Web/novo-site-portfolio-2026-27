import styled from 'styled-components';
import { FiSearch } from 'react-icons/fi';

const SearchContainer = styled.div`
    margin-bottom: 40px;
    position: relative;
    max-width: 600px;
    width: 100%;
`;

const SearchInput = styled.input`
    width: 100%;
    padding: 15px 20px 15px 50px;
    background: #1e1e1e;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    color: #fff;
    font-size: 1rem;
    transition: all 0.3s;

    &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.colors.primary};
        background: #252525;
        box-shadow: 0 0 0 4px rgba(0, 224, 255, 0.1);
    }
`;

const IconWrapper = styled.div`
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    color: #888;
    display: flex;
    align-items: center;
    pointer-events: none;
`;

const SearchBar = ({ value, onChange, placeholder, options, listId }) => {
    return (
        <SearchContainer>
            <IconWrapper>
                <FiSearch size={20} />
            </IconWrapper>
            <SearchInput
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                list={listId}
            />
            {options && (
                <datalist id={listId}>
                    {options.map((opt, index) => (
                        <option key={index} value={opt} />
                    ))}
                </datalist>
            )}
        </SearchContainer>
    );
};

export default SearchBar;
