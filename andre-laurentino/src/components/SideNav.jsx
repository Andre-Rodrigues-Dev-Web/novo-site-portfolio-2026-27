import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { HashLink } from 'react-router-hash-link';

const NavContainer = styled.nav`
    position: fixed;
    right: 40px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 100;
    display: flex;
    flex-direction: column;
    gap: 20px;
    
    @media (max-width: 992px) {
        display: none;
    }
`;

const NavDot = styled(HashLink)`
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${({ active }) => (active ? '#a7f205' : 'rgba(255,255,255,0.2)')};
    border: 2px solid ${({ active }) => (active ? '#a7f205' : 'transparent')};
    transition: all 0.3s ease;
    cursor: pointer;
    position: relative;
    
    &:hover {
        background-color: ${({ theme }) => theme.colors.primary};
        transform: scale(1.2);
    }
    
    &::after {
        content: '${({ label }) => label}';
        position: absolute;
        right: 25px;
        top: 50%;
        transform: translateY(-50%);
        background-color: rgba(0,0,0,0.8);
        padding: 5px 10px;
        border-radius: 5px;
        color: #fff;
        font-size: 0.8rem;
        white-space: nowrap;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    }
    
    &:hover::after {
        opacity: 1;
        visibility: visible;
        right: 30px;
    }
`;

const sections = [
    { id: 'top', label: 'Início' },
    { id: 'sobre-mim', label: 'Sobre mim' },
    { id: 'tecnologias-que-atuo', label: 'Tecnologias' },
    { id: 'portfolio', label: 'Portfólio' },
    { id: 'blog', label: 'Notícias' },
];

const SideNav = () => {
    const [activeSection, setActiveSection] = useState('top');

    useEffect(() => {
        const handleScroll = () => {
            const viewportHeight = window.innerHeight;
            // Point of interest: 40% down from the top of the viewport
            const triggerPoint = viewportHeight * 0.4;
            
            let current = 'top';

            sections.forEach(section => {
                const element = document.getElementById(section.id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // Check if the section's top is "above" the trigger point
                    // And its bottom is still "below" the trigger point (meaning we are inside it)
                    
                    // Special case for 'top' which might wrap everything. 
                    // We treat 'top' as default, but specific sections take precedence if they are in view.
                    if (section.id === 'top') {
                        // "top" is always a fallback if we are at the very top
                        if (window.scrollY < 100) current = 'top';
                    } else {
                        // For specific sections
                        if (rect.top <= triggerPoint && rect.bottom >= triggerPoint) {
                            current = section.id;
                        }
                    }
                }
            });

            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <NavContainer>
            {sections.map(section => (
                <NavDot
                    key={section.id}
                    to={`/#${section.id}`}
                    smooth
                    active={activeSection === section.id ? 1 : 0}
                    label={section.label}
                />
            ))}
        </NavContainer>
    );
};

export default SideNav;
