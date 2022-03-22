import React from 'react';
import EventInformation from "../shared/event";
import "./EventCard.css"
type EventCardProps = {
    eventInfo: EventInformation
}

export default function EventCard(event: EventCardProps) {
    return (
        <div className="event-card">
            <h2>{event.eventInfo.getAllInfo().name}</h2>
            <div className="description">{event.eventInfo.getAllInfo().description}</div>
            <div className="event-card-data">Дата начала: {event.eventInfo.getAllInfo().dateOfBeginning?.toDateString()}</div>
            <div className="event-card-data">Дата конца: {event.eventInfo.getAllInfo().dateOfEnding?.toDateString()}</div>
        </div>
    );
}
