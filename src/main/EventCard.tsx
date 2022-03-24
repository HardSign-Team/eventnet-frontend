import React from 'react';
import './EventCard.css';
import { EventType } from '../shared/EventType';

type EventCardProps = {
    eventInfo: EventType;
};

export default function EventCard(event: EventCardProps) {
    return (
        <div className="event-card">
            <h2>{event.eventInfo.name}</h2>
            <div className="description">{event.eventInfo.description}</div>
            <div className="event-card-data">Дата начала: {event.eventInfo.dateOfBeginning?.toLocaleDateString()}</div>
            <div className="event-card-data">Дата конца: {event.eventInfo.dateOfEnding?.toLocaleDateString()}</div>
        </div>
    );
}
