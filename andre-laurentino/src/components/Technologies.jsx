import { technologies } from '../data/technologies';
import {
    SectionContainer,
    SectionTitle,
    CategoriesGrid,
    CategoryCard,
    CategoryTitle,
    IconGrid,
    TechItem
} from './Technologies.styles';

const Technologies = () => {
    return (
        <SectionContainer id="tecnologias-que-atuo">
            <SectionTitle>Tecnologias que atuo</SectionTitle>

            <CategoriesGrid>
                {technologies.map((cat, index) => (
                    <CategoryCard key={index}>
                        <CategoryTitle>{cat.title}</CategoryTitle>
                        <IconGrid>
                            {cat.items.map((tech, idx) => (
                                <TechItem key={idx}>
                                    {tech.icon ? <tech.icon /> : <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>C</span>}
                                    <span>{tech.name}</span>
                                </TechItem>
                            ))}
                        </IconGrid>
                    </CategoryCard>
                ))}
            </CategoriesGrid>
        </SectionContainer>
    );
};

export default Technologies;
