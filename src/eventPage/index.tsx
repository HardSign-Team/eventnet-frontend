import styles from './index.module.scss'
import React from 'react';
import PhotoCarousel from '../shared/PhotoCarousel/Carousel/PhotoCarousel';
import globalStore from '../stores/GlobalStore';

const { eventStore } = globalStore;

export const EventPage: React.FC = () => {
    return (
        <section className={styles.eventPage}>
            <PhotoCarousel images={eventStore.events[0].info.photos ?? ['']}/>
        </section>
    )
}