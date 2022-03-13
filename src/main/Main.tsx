import React from 'react';
import { Clusterer, Map, Placemark, YMaps } from 'react-yandex-maps';
import getRandomWord from '../utils/randomWord';

const DEFAULT_ZOOM = 5;
const WINDOW_WIDTH: number = window.screen.width;
const WINDOW_HEIGHT: number = window.screen.height;
const mockMapState = {
    center: [56.817076, 60.611855],
    zoom: DEFAULT_ZOOM,
    behaviors: ['default', 'scrollZoom']
};

function getPointProperties(): { hintContent: string; balloonContent: string } {
    const word = getRandomWord();
    return {
        hintContent: word.split(' ').splice(0, 3).join(' ') + '...',
        balloonContent: word
    };
}

function getRandomPosition(): [number, number] {
    const degree = 100;
    return [Math.random() * degree, Math.random() * degree];
}

function getPointOptions(): {
    preset: string;
    iconLayout: string;
    // iconImageHref: string;
    iconImageSize: [number, number];
    iconImageOffset: [number, number];
} {
    return {
        preset: 'islands#violetIcon',
        iconLayout: 'default#image',
        // iconImageHref: '../assets/pin.png',
        iconImageSize: [30, 42],
        iconImageOffset: [-5, -38]
    };
}

function createPlacemarks() {
    const rndNumber = Math.random() * 1000 + 1;
    const placeMarks = [];
    for (let i = 0; i < rndNumber; i++) {
        placeMarks.push(
            <Placemark
                geometry={getRandomPosition()}
                properties={getPointProperties()}
                options={getPointOptions()}
                modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                key={i}
            />
        );
    }
    return placeMarks;
}

export default function Main() {
    return (
        <div className="ya-map">
            <YMaps>
                <Map defaultState={mockMapState} width={WINDOW_WIDTH} height={WINDOW_HEIGHT}>
                    <Clusterer>{createPlacemarks()}</Clusterer>
                </Map>
            </YMaps>
        </div>
    );
}
