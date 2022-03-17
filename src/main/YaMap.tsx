import { Circle, Clusterer, Map, YMaps } from 'react-yandex-maps';
import React from 'react';
import './Main.css';

const DEFAULT_ZOOM = 6;
const CIRCLE_RADIUS = 150;
const WINDOW_WIDTH: number = window.screen.width;
const WINDOW_HEIGHT: number = window.screen.height;
const MAX_ZOOM = 15;
const MIN_ZOOM = 4;
const mockMapState = {
    center: [56.817076, 60.611855],
    zoom: DEFAULT_ZOOM,
    behaviors: ['default', 'scrollZoom']
};

function getRandomPosition(): [[number, number], number] {
    const degree = 100;
    return [[Math.random() * degree, Math.random() * degree], CIRCLE_RADIUS];
}

function getPointOptions() {
    return {
        fillColor: '#008D8E',
        strokeColor: '#008D8E',
        strokeOpacity: 0.9,
        strokeWidth: 10
    };
}

function createCircles() {
    const rndNumber = Math.random() * 1000 + 1;
    const circles = [];
    for (let i = 0; i < rndNumber; i++) {
        circles.push(<Circle geometry={getRandomPosition()} options={getPointOptions()} key={i} />);
    }
    return circles;
}


const style = {
    position: 'absolute',
    margin: "0",
    padding: "0",
    width: '100%',
    height: '100%'
} as const;



export default function YaMap({className} : {className: string}) {
    return (
        <YMaps>
            <Map
                style={style}
                defaultState={mockMapState}
                width={WINDOW_WIDTH}
                height={WINDOW_HEIGHT}
                className={className}
                options={{
                    exitFullscreenByEsc: true,
                    maxZoom: MAX_ZOOM,
                    minZoom: MIN_ZOOM,
                    yandexMapAutoSwitch: true
                }}
            >
                <Clusterer>{createCircles()}</Clusterer>
            </Map>
        </YMaps>
    );
}
