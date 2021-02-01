const MangameeBe = 'https://mangamee.herokuapp.com';
const MangameeBeLocal = 'http://127.0.0.1:8000';


const apiURL = '/api';

export const endpoint = `${MangameeBe}${apiURL}`;

// export const endpoint = `${MangameeBeLocal}${apiURL}`;

export const apiBrowse = `${endpoint}/browse/`;
export const apiSearch = `${endpoint}/search/`;
export const apiManga = `${endpoint}/manga/`;
export const apiPage = `${endpoint}/page/`;

// auth user

export const apiLogin = `${endpoint}/auth/login/`;
export const apiRegister = `${endpoint}/auth/register/`;
export const apiHistory = `${endpoint}/auth/history/`;


