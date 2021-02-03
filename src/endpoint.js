const MangameeBe = 'https://be-mangamee.herokuapp.com';
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


export const apiGetHistory = `${endpoint}/gethistory/`;
export const apiUpdateHistory = `${endpoint}/updatehistory/`;
export const apiDeleteHistory = `${endpoint}/deletehistory/`;
