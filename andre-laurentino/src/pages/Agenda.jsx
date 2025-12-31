import { useState, useEffect } from 'react';
import { FiCalendar, FiMapPin, FiMic } from 'react-icons/fi';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { events } from '../data/events';
import {
    PageContainer,
    ContentWrapper,
    PageTitle,
    Subtitle,
    TimelineContainer,
    EventCard,
    DateBadge,
    EventTitle,
    EventType,
    EventDescription,
    Location
} from './Agenda.styles';

const Agenda = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <PageContainer as="main">
            <SEO
                title="Agenda"
                description="Próximos eventos, palestras e conferências onde estarei presente."
            />
            <Header onMenuClick={() => setIsSidebarOpen(true)} />
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <ContentWrapper>
                <PageTitle>Minha <span>Agenda</span></PageTitle>
                <Subtitle>
                    Acompanhe meus próximos eventos, palestras e meetups.
                </Subtitle>

                <TimelineContainer>
                    {events.map((event, index) => (
                        <EventCard key={event.id} isRight={index % 2 !== 0}>
                            <DateBadge>
                                <FiCalendar />
                                <span>{event.date}</span>
                            </DateBadge>
                            <EventTitle>{event.title}</EventTitle>
                            <EventType>
                                <FiMic />
                                {event.type}
                            </EventType>
                            <EventDescription>
                                {event.description}
                            </EventDescription>
                            <Location>
                                <FiMapPin />
                                {event.location}
                            </Location>
                        </EventCard>
                    ))}
                </TimelineContainer>
            </ContentWrapper>
            <Footer />
        </PageContainer>
    );
};

export default Agenda;
