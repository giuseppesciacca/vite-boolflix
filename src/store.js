import { reactive } from 'vue'
import axios from 'axios'

export const store = reactive({
    urlBase: 'https://api.themoviedb.org/3/search/multi?api_key=aa7ff67870b167647ae7e4a3d1b611a3&language=it-IT&include_adult=false&sort_by=popularity.desc&query=',
    results: [],
    genres: [],
    idGenreSelected: null,
    urlGenre: 'https://api.themoviedb.org/3/genre/movie/list?api_key=aa7ff67870b167647ae7e4a3d1b611a3',
    fetchMoviesAndTvShow(url) {
        axios
            .get(url)
            .then(response => {
                //console.log(response.data);
                console.log(response.data.results);
                this.results = response.data.results;
            }).catch(error => {
                console.error(error.message);
            })
    },
    fetchGenres(url) {
        axios
            .get(url)
            .then(response => {
                //console.log(response.data);
                //console.log(response.data.genres);
                this.genres = response.data.genres; //array with id and name
            }).catch(error => {
                console.error(error.message);
            })
    },
    switchGenre() {
        console.log(this.idGenreSelected);
    }
})
