import { reactive } from 'vue'
import axios from 'axios'
import genreOnlyTvShow from './assets/data/genre_only_tvshows.json';

export const store = reactive({
    urlBase: 'https://api.themoviedb.org/3/search/multi?api_key=aa7ff67870b167647ae7e4a3d1b611a3&language=it-IT&include_adult=false&sort_by=popularity.desc&query=',
    results: [],
    genres: [],
    idGenreSelected: null,
    urlGenre: 'https://api.themoviedb.org/3/genre/movie/list?api_key=aa7ff67870b167647ae7e4a3d1b611a3&language=it-IT',
    cast: [],
    genreOnlyTvShow,
    /**
     * 
     * @param {String} url 
     * add the array with movie, tvshow and people in results=[].
     */
    fetchMoviesAndTvShow(url) {
        axios
            .get(url)
            .then(response => {
                //console.log(response.data);
                //console.log(response.data.results);
                this.results = response.data.results;
            }).catch(error => {
                console.error(error.message);
            })
    },
    /**
     * 
     * @param {number} id_movies 
     */
    fetchCastMovie(id_movies) {
        axios
            .get(`https://api.themoviedb.org/3/movie/${id_movies}/credits?api_key=aa7ff67870b167647ae7e4a3d1b611a3&language=it-IT`)
            .then(response => {
                //console.log(response);
                this.cast = response.data.cast;
                //console.log(this.cast);
            })
    },
    /**
     * 
     * @param {number} id_movies 
     */
    fetchCastTvShow(id_movies) {
        axios
            .get(`https://api.themoviedb.org/3/tv/${id_movies}/credits?api_key=aa7ff67870b167647ae7e4a3d1b611a3&language=it-IT`
            )
            .then(response => {
                //console.log(response);
                this.cast = response.data.cast;
                //console.log(this.cast);
            })
    },
    /**
     * 
     * @param {String} url 
     * add the array with id and name in genres=[].
     */
    fetchGenres(url) {
        axios
            .get(url)
            .then(response => {
                //console.log(response.data);
                //console.log(response.data.genres);
                this.genres = response.data.genres; //array with id and name
                //console.log(this.genres);
            }).catch(error => {
                console.error(error.message);
            })
    }
})