import axios from 'axios';

const movieDB = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    params: {
        api_key: 'd95fa96cc24f5711805bb8119d520d2d',
        language: 'es-ES',
    },
});

export default movieDB;
