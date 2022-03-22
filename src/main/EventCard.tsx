import React from 'react';
import EventInformation from '../shared/event';
import './EventCard.css';
type EventCardProps = {
    eventInfo: EventInformation;
};

export default function EventCard(event: EventCardProps) {
    return (
        <div className="event-card">
            <h2>{event.eventInfo.getAllInfo().name}</h2>
            <div className="description">{event.eventInfo.getDescription()}</div>
            <div className="event-card-data">
                Дата начала: {event.eventInfo.getDateOfBeginning()?.toLocaleDateString()}
            </div>
            <div className="event-card-data">Дата конца: {event.eventInfo.getDateOfEnding()?.toLocaleDateString()}</div>
        </div>
    );
}
