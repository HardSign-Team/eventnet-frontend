import React from 'react';
import EventCard from './EventCard';
import "./EventStore.css"
import {EventType} from "../shared/EventType";

function getEvents(): Array<EventType> {
    const event1: EventType = {
        id: 1,
        name: 'День пикачу',
        coordinates: [56.817076, 60.611855],
        dateOfBeginning: new Date(2021, 10, 15),
        likes: 2,
        description: 'Абемнта купили называется',
        dateOfEnding: new Date(2021, 10, 15)
    }

    const event2: EventType = {
        id: 2,
        coordinates: [55.817076, 61.611855],
        name: '01.06.2022',
        dateOfBeginning: new Date(2022, 6, 1),
        likes: 0,
        description: 'Челлендж окончен',
        dateOfEnding: new Date(2022, 6, 2)
    }
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
