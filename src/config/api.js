import apiGenerated from './api-generated.json';

const DEFAULT_IP = '172.29.0.161';
const PORT = 5000;

const currentIp = apiGenerated?.ip ?? DEFAULT_IP;

export const API_URL = `http://${currentIp}:${PORT}/api`;



