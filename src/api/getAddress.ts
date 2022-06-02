import EventInfo from "../models/EventInfo";

export async function getAddress(
  eventInfo: EventInfo,
  token: string
): Promise<any> {
  const response = await fetch(
    `https://geocode-maps.yandex.ru/1.x/?apikey=${token}&format=json&geocode=${eventInfo.coordinates[1]},${eventInfo.coordinates[0]}`
  )
    .then((r) => r.json())
    .then((r) => r.response);

  return await response.GeoObjectCollection.featureMember[0].GeoObject;
}
