import styled from 'styled-components';

const SideNavContainer = styled.div`
    position: fixed;
    right: 40px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 15px;
    z-index: 10;
`;

const Dot = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${({ active, theme }) => active ? theme.colors.primary : 'rgba(255,255,255,0.2)'};
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: ${({ theme }) => theme.colors.primary};
    }
`;

const SideNav = () => {
    return (
        <SideNavContainer>
            <Dot active />
            <Dot />
            <Dot />
            <Dot />
            <Dot />
            <Dot />
        </SideNavContainer>
    )
}

export default SideNav;
