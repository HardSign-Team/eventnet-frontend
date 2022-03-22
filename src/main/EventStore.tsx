import React from 'react';
import EventInformation from '../shared/event';
import EventCard from './EventCard';
import "./EventStore.css"
function getEvents(): Array<EventInformation> {
    const event1 = new EventInformation('День пикачу', new Date(2021, 10, 15));
    const event2 = new EventInformation('01.06.2022', new Date(2022, 6, 1));
    event1.addLike()?.setDescription('Абемнта купили называется')?.setDateOfEnding(new Date(2021, 10, 15));
    event2.addLike()?.setDescription('Челлендж окончен')?.setDateOfEnding(new Date(2022, 6, 2));
    return [event1, event2];
}

export default function EventStore() {
    const events = getEvents();
    return (
        <div className="event-container">
            {events.map((event, index) => (
                <EventCard key={index} eventInfo={event} />
            ))}
        </div>
    );
}
