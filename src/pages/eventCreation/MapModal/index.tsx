import React, { useState } from 'react';
import { Modal } from '@skbkontur/react-ui';
import CustomButton from '../../../shared/CustomButton/CustomButton';
import './index.scss';
import { Map, Placemark, YMaps } from 'react-yandex-maps';
import globalStore from '../../../stores/GlobalStore';
import { mapOptions, mapStyle } from '../../events/YandexMap/YaMap';
import { observer } from 'mobx-react-lite';
import { Coordinates } from '../../../models/Coordinates';

type ShowMapModalProps = {
    onClose: () => void;
    saveNewCoords: (coords: Coordinates | undefined) => void;
};

const { mapStore } = globalStore;

const MapModal: React.FC<ShowMapModalProps> = observer(
    ({ onClose, saveNewCoords }) => {
        const [coords, setCoords] = useState<Coordinates>();

        const currentMapState = {
            center: mapStore.coordinates,
            zoom: 10
        };

        const updateCoords = (e: any) => {
            const newCoords = e.get('coords');
            setCoords(newCoords);
        };

        return (
            <Modal onClose={onClose}>
                <Modal.Body>
                    <div className={'map-wrapper'}>
                        <YMaps className='yandex-maps'>
                            <Map
                                style={{ width: '100%', height: '100%' }}
                                state={currentMapState}
                                options={mapOptions}
                                onClick={updateCoords}
                                instanceRef={(map: any) => {
                                    if (map !== null) {
                                        map.behaviors.enable('scrollZoom');
                                        map.behaviors.disable('dblClickZoom');
                                        map.behaviors.disable('rightMouseButtonMagnifier');
                                    }
                                }}
                            >
                                {coords && <Placemark geometry={coords} />}
                            </Map>
                        </YMaps>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <CustomButton
                        onClick={() => {
                            saveNewCoords(coords);
                            onClose();
                        }}
                        label={'Сохранить место'}
                        width={'100%'}
                        height={36}
                    />
                </Modal.Footer>
            </Modal>
        );
    }
);

export default MapModal;
