import { generateApiClient } from '@utils/apiUtils';
const tunesApi = generateApiClient('itunes');

export const getITunes = tuneName => tunesApi.get(`https://itunes.apple.com/search?term=${tuneName}`);
