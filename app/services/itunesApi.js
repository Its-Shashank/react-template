import { generateApiClient } from '@utils/apiUtils';
const itunesApi = generateApiClient('itunes');

export const getITunes = ituneName => itunesApi.get(`/search?term=${ituneName}`);
