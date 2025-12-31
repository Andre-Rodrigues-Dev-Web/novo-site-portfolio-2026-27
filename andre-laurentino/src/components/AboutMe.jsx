import {
    SectionContainer,
    SectionTitle,
    ContentGrid,
    BioColumn,
    BioText,
    InfoColumn,
    InfoBlock,
    BlockTitle,
    ExperienceItem,
    Role,
    Company,
    Period
} from './AboutMe.styles';

const AboutMe = () => {
    return (
        <SectionContainer id="sobre-mim">
            <SectionTitle>Sobre mim</SectionTitle>

            <ContentGrid>
                <BioColumn>
                    <BioText>
                        <strong>André Laurentino Rodrigues</strong> — Bambuí, Minas Gerais, Brasil.
                    </BioText>
                    <BioText>
                        Engenheiro de software com certificação AWS, Oracle, NodeJS, IoT, Blockchain e DataDog.
                    </BioText>
                </BioColumn>

                <InfoColumn>
                    <InfoBlock>
                        <BlockTitle>Experiência Profissional</BlockTitle>
                        <ExperienceItem>
                            <Role>CEO</Role>
                            <Company>GrupoVel</Company>
                            <Period>Atual • Tempo integral</Period>
                            <Period>Brasil</Period>
                        </ExperienceItem>
                        <ExperienceItem>
                            <Role>Gerente de Projetos</Role>
                            <Company>CESBBANKING</Company>
                            <Period>Atual</Period>
                            <Period>Brasil</Period>
                        </ExperienceItem>
                        <ExperienceItem>
                            <Role>Engenheiro de software sênior</Role>
                            <Company>NTT DATA Europe & Latam — Itaú</Company>
                            <Period>Agosto de 2021 — Outubro de 2025 • Tempo integral</Period>
                            <Period>Brasil</Period>
                        </ExperienceItem>
                    </InfoBlock>

                    <InfoBlock>
                        <BlockTitle>Formação</BlockTitle>
                        <ExperienceItem>
                            <Role>Tecnologia em Análise e Desenvolvimento de Sistemas (ADS)</Role>
                            <Company>Instituto Federal de Minas Gerais (IFMG)</Company>
                            <Period>Minas Gerais · BR • Concluído</Period>
                            <Period>Brasil</Period>
                        </ExperienceItem>
                        <ExperienceItem>
                            <Role>Técnico em Informática</Role>
                            <Company>Instituto Federal de Minas Gerais (IFMG)</Company>
                            <Period>Minas Gerais · BR • Concluído</Period>
                        </ExperienceItem>
                    </InfoBlock>
                </InfoColumn>
            </ContentGrid>
        </SectionContainer>
    );
};

export default AboutMe;
