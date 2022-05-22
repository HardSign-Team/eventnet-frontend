import { Coordinates } from '../models/Coordinates';

export const COORDS_SEP = ", ";

export const formatCoordinates = (coords: Coordinates) => {
    return coords.map((x) => x.toFixed(6)).join(COORDS_SEP);
};