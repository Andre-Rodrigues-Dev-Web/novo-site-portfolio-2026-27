import { useRef, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

const RevealWrapper = styled.div`
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.17, 0.55, 0.55, 1);
  will-change: opacity, transform;

  ${({ isVisible }) => isVisible && css`
    opacity: 1;
    transform: translateY(0);
  `}
`;

const ScrollReveal = ({ children }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Animate only once
        }
      },
      {
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <RevealWrapper ref={ref} isVisible={isVisible}>
      {children}
    </RevealWrapper>
  );
};

export default ScrollReveal;
