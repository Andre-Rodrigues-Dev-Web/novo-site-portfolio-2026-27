import { FiExternalLink, FiGlobe } from 'react-icons/fi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { projects } from '../data/projects';
import {
  SectionContainer,
  SectionTitle,
  ProjectCard,
  CardHeader,
  IconWrapper,
  ProjectTitle,
  ProjectLinkDisplay
} from './Portfolio.styles';

const Portfolio = () => {
  return (
    <SectionContainer id="portfolio">
      <SectionTitle>Portfólio</SectionTitle>
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {projects.map((project, index) => (
          <SwiperSlide key={index}>
            <ProjectCard href={project.url} target="_blank" rel="noopener noreferrer">
              <CardHeader>
                <IconWrapper>
                  <FiGlobe />
                </IconWrapper>
                <FiExternalLink size={20} color="#666" />
              </CardHeader>
              <ProjectTitle>{project.name}</ProjectTitle>
              <ProjectLinkDisplay>
                Visitar site <FiExternalLink />
              </ProjectLinkDisplay>
            </ProjectCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </SectionContainer>
  );
};

export default Portfolio;
