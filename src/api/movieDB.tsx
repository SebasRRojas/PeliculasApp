import axios from 'axios';

const movieDB = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    params: {
        api_key: 'HERE GOES YOUR API KEY',
        language: 'es-ES',
    },
});

export default movieDB;
